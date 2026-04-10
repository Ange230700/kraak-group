import net from 'node:net';
import { spawn } from 'node:child_process';

const portInUsePattern = /Port \d+ is already in use/i;
const addressInUsePattern = /EADDRINUSE|address already in use/i;

const services = [
  {
    name: 'web',
    color: '\x1b[36m',
    preferredPort: 4200,
    cwd: process.cwd(),
    command: ['pnpm.cmd', '--filter', '@kraak/client', 'run', 'dev:web'],
    portArg: true,
  },
  {
    name: 'mobile',
    color: '\x1b[35m',
    preferredPort: 4300,
    cwd: process.cwd(),
    command: ['pnpm.cmd', '--filter', '@kraak/client', 'run', 'dev:mobile'],
    portArg: true,
  },
  {
    name: 'api',
    color: '\x1b[32m',
    preferredPort: 3000,
    cwd: process.cwd(),
    command: ['pnpm.cmd', '--filter', '@kraak/api', 'run', 'dev'],
    portArg: false,
    allowPortFallback: false,
  },
];

const reset = '\x1b[0m';
const children = new Set();
let shuttingDown = false;
const dryRun = process.argv.includes('--dry-run');

function forwardStream(stream, label, color, onLine) {
  let buffer = '';

  stream.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (line.length > 0) {
        process.stdout.write(`${color}[${label}]${reset} ${line}\n`);
        onLine?.(line);
      }
    }
  });

  stream.on('end', () => {
    if (buffer.length > 0) {
      process.stdout.write(`${color}[${label}]${reset} ${buffer}\n`);
      onLine?.(buffer);
    }
  });
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen({
      port,
      host: '0.0.0.0',
      exclusive: true,
    });
  });
}

async function findAvailablePort(preferredPort) {
  let port = preferredPort;

  while (!(await isPortFree(port))) {
    port += 1;
  }

  return port;
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    child.kill('SIGINT');
  }

  setTimeout(() => {
    for (const child of children) {
      if (!child.killed) {
        child.kill('SIGTERM');
      }
    }
  }, 1500);

  setTimeout(() => {
    process.exit(exitCode);
  }, 2000);
}

async function startService(service) {
  const allowPortFallback = service.allowPortFallback ?? true;

  if (!(await isPortFree(service.preferredPort)) && !allowPortFallback) {
    process.stdout.write(
      `${service.color}[${service.name}]${reset} port ${service.preferredPort} déjà occupé, démarrage ignoré. Le front local continue d'attendre l'API sur ce port.\n`,
    );
    return;
  }

  const port = allowPortFallback
    ? service.preferredPort
    : await findAvailablePort(service.preferredPort);
  const args = [...service.command];
  const env = { ...process.env };

  if (service.portArg) {
    args.push('--port', String(port));
  } else {
    env.PORT = String(port);
  }

  const preferred = service.preferredPort === port
    ? `port ${port}`
    : `port ${port} (port préféré ${service.preferredPort} occupé)`;

  if (dryRun) {
    const simulatedPort = allowPortFallback
      ? await findAvailablePort(service.preferredPort)
      : port;
    const simulatedPreferred = service.preferredPort === simulatedPort
      ? `port ${simulatedPort}`
      : `port ${simulatedPort} (port préféré ${service.preferredPort} occupé)`;

    process.stdout.write(
      `${service.color}[${service.name}]${reset} simulation sur ${simulatedPreferred}\n`,
    );
    return;
  }

  process.stdout.write(
    `${service.color}[${service.name}]${reset} démarrage sur ${preferred}\n`,
  );

  const child = spawn(args[0], args.slice(1), {
    cwd: service.cwd,
    env,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true,
  });

  children.add(child);
  let retryOnNextPort = false;
  let portBusyOnStart = false;

  forwardStream(child.stdout, service.name, service.color);
  forwardStream(child.stderr, service.name, service.color, (line) => {
    if (service.portArg && allowPortFallback && !retryOnNextPort) {
      if (portInUsePattern.test(line)) {
        retryOnNextPort = true;
        process.stdout.write(
          `${service.color}[${service.name}]${reset} port ${port} occupé détecté, nouvelle tentative sur ${port + 1}\n`,
        );
        child.kill('SIGTERM');
      }
      return;
    }

    if (!service.portArg && !allowPortFallback && addressInUsePattern.test(line)) {
      portBusyOnStart = true;
    }
  });

  child.on('exit', (code) => {
    children.delete(child);

    if (shuttingDown) {
      return;
    }

    if (retryOnNextPort) {
      startService({
        ...service,
        preferredPort: port + 1,
      }).catch((error) => {
        console.error(error);
        shutdown(1);
      });
      return;
    }

    if (portBusyOnStart) {
      process.stdout.write(
        `${service.color}[${service.name}]${reset} port ${port} déjà occupé, l'API existante est conservée et le reste du mode dev continue.\n`,
      );
      return;
    }

    const exitCode = code ?? 0;
    process.stderr.write(
      `${service.color}[${service.name}]${reset} arrêté avec le code ${exitCode}\n`,
    );

    if (exitCode !== 0) {
      shutdown(exitCode);
    }
  });
}

async function main() {
  process.on('SIGINT', () => shutdown(0));
  process.on('SIGTERM', () => shutdown(0));

  for (const service of services) {
    await startService(service);
  }
}

main().catch((error) => {
  console.error(error);
  shutdown(1);
});
