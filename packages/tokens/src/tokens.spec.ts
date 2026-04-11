import { describe, it, expect } from 'vitest';
import {
  BRAND_NAVY,
  BRAND_NAVY_SOFT,
  BRAND_BLUE,
  BRAND_CYAN,
  BRAND_GOLD,
  BRAND_GRAY,
  BRAND_WHITE,
  BRAND_PAGE,
  NEUTRAL,
  FONT_SANS,
  FONT_MONO,
  RADIUS_BTN,
  RADIUS_CARD,
  SHADOW_CARD,
} from './tokens';

const HEX_RE = /^#[0-9a-f]{6}$/i;

describe('tokens de marque', () => {
  it.each([
    ['BRAND_NAVY', BRAND_NAVY, '#122b4a'],
    ['BRAND_NAVY_SOFT', BRAND_NAVY_SOFT, '#1c4e86'],
    ['BRAND_BLUE', BRAND_BLUE, '#1673ae'],
    ['BRAND_CYAN', BRAND_CYAN, '#4cc3d9'],
    ['BRAND_GOLD', BRAND_GOLD, '#f0c433'],
    ['BRAND_GRAY', BRAND_GRAY, '#8b8d92'],
    ['BRAND_WHITE', BRAND_WHITE, '#ffffff'],
    ['BRAND_PAGE', BRAND_PAGE, '#f3f3f3'],
  ])('%s vaut %s', (_name, value, expected) => {
    expect(value).toBe(expected);
    expect(value).toMatch(HEX_RE);
  });
});

describe('échelle de neutres', () => {
  const EXPECTED_KEYS = [
    0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ];

  it('contient exactement 12 paliers', () => {
    expect(Object.keys(NEUTRAL)).toHaveLength(12);
  });

  it.each(EXPECTED_KEYS)('palier %i est un hex valide', (key) => {
    expect(NEUTRAL[key]).toMatch(HEX_RE);
  });

  it('le palier 0 est blanc et le palier 950 est quasi-noir', () => {
    expect(NEUTRAL[0]).toBe('#ffffff');
    expect(NEUTRAL[950]).toBe('#030712');
  });
});

describe('typographie', () => {
  it('FONT_SANS commence par Poppins', () => {
    expect(FONT_SANS).toContain('Poppins');
  });

  it('FONT_MONO commence par IBM Plex Mono', () => {
    expect(FONT_MONO).toContain('IBM Plex Mono');
  });
});

describe('rayons de bordure', () => {
  it('RADIUS_BTN est exprimé en rem', () => {
    expect(RADIUS_BTN).toMatch(/^\d+(\.\d+)?rem$/);
  });

  it('RADIUS_CARD est exprimé en rem', () => {
    expect(RADIUS_CARD).toMatch(/^\d+(\.\d+)?rem$/);
  });
});

describe('ombres', () => {
  it('SHADOW_CARD est une chaîne non vide', () => {
    expect(SHADOW_CARD).toBeTruthy();
    expect(typeof SHADOW_CARD).toBe('string');
  });
});
