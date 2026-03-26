import { describe, it, expect } from 'vitest';
import { normalizeCompletedSectionIds } from '../lib/progress';

describe('Progress storage normalization', () => {
  it('normalizes plain string arrays', () => {
    expect(normalizeCompletedSectionIds(['a', 'b'])).toEqual(['a', 'b']);
  });

  it('filters non-strings from arrays', () => {
    expect(normalizeCompletedSectionIds(['ok', 1, null, 'x'] as unknown[])).toEqual(['ok', 'x']);
  });

  it('reads completedSections from legacy object shape', () => {
    expect(
      normalizeCompletedSectionIds({ completedSections: ['intro', 'conclusion'] })
    ).toEqual(['intro', 'conclusion']);
  });

  it('returns empty array for malformed completedSections', () => {
    expect(normalizeCompletedSectionIds({ completedSections: undefined })).toEqual([]);
    expect(normalizeCompletedSectionIds({ completedSections: 'nope' })).toEqual([]);
  });

  it('returns empty for null and primitives', () => {
    expect(normalizeCompletedSectionIds(null)).toEqual([]);
    expect(normalizeCompletedSectionIds(undefined)).toEqual([]);
    expect(normalizeCompletedSectionIds('x')).toEqual([]);
  });
});
