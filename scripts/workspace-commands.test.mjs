import assert from 'node:assert/strict';
import test from 'node:test';

import { createWorkflows } from './workspace-commands.mjs';

test('test workflow runs shared libraries before unit and e2e phases', () => {
  const workflows = createWorkflows();
  const [librariesPhase, unitPhase, e2ePhase] = workflows.test.phases;

  assert.equal(librariesPhase.parallel, false);
  assert.deepEqual(
    librariesPhase.commands.map((command) => command.name),
    ['libs'],
  );

  assert.equal(unitPhase.parallel, true);
  assert.deepEqual(
    unitPhase.commands.map((command) => command.name),
    ['api', 'client'],
  );

  assert.equal(e2ePhase.parallel, false);
  assert.deepEqual(
    e2ePhase.commands.map((command) => command.name),
    ['e2e'],
  );
});

test('test workflow preserves the current root test commands', () => {
  const workflows = createWorkflows();
  const [librariesPhase, unitPhase, e2ePhase] = workflows.test.phases;

  assert.deepEqual(librariesPhase.commands[0].args, ['test:libs']);
  assert.deepEqual(unitPhase.commands[0].args, ['test:api']);
  assert.deepEqual(unitPhase.commands[1].args, ['test:unit']);
  assert.deepEqual(e2ePhase.commands[0].args, ['test:e2e']);
});
