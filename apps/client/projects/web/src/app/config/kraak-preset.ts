import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Palettes générées à partir des couleurs de marque KRAAK
const navy = palette('#122b4a');
const blue = palette('#1673ae');
const cyan = palette('#4cc3d9');
const gold = palette('#f0c433');

export const KraakPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '4px',
      sm: '6px',
      md: '0.75rem', // --radius-btn
      lg: '1rem',
      xl: '1.25rem', // --radius-card
    },
    navy,
    blue,
    cyan,
    gold,
  },
  semantic: {
    // Palette primaire → navy
    primary: {
      50: '{navy.50}',
      100: '{navy.100}',
      200: '{navy.200}',
      300: '{navy.300}',
      400: '{navy.400}',
      500: '{navy.500}',
      600: '{navy.600}',
      700: '{navy.700}',
      800: '{navy.800}',
      900: '{navy.900}',
      950: '{navy.950}',
    },
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{cyan.500}',
      offset: '2px',
    },
    formField: {
      borderRadius: '{border.radius.md}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{navy.600}',
          contrastColor: '#ffffff',
          hoverColor: '{navy.700}',
          activeColor: '{navy.800}',
        },
        highlight: {
          background: '{gold.100}',
          focusBackground: '{gold.200}',
          color: '{navy.800}',
          focusColor: '{navy.900}',
        },
        surface: {
          0: '#ffffff',
          50: '#f8f8f8',
          100: '#f3f3f3',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        text: {
          color: '{surface.900}',
          hoverColor: '{surface.800}',
          mutedColor: '#8b8d92',
          hoverMutedColor: '{surface.600}',
        },
        content: {
          background: '{surface.0}',
          hoverBackground: '{surface.50}',
          borderColor: '{surface.200}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
      },
    },
  },
  components: {
    button: {
      root: {
        borderRadius: '{border.radius.md}',
      },
    },
    card: {
      root: {
        borderRadius: '{border.radius.xl}',
      },
    },
  },
});
