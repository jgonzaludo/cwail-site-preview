import { storage } from './storage';

export const USER_NAME_KEY = 'user_name';
const LEARNER_SESSION_KEY = 'cwail:learner_session_id';

const INTRO_RESPONSE_KEY = 'cwail:response:introduction';
const INTRO_LEGACY_KEY = 'cwail:response:intro_prompt';

/** Plain-text introduction response; migrate legacy `intro_prompt` storage key. */
export function getIntroductionResponseText(): string {
  const primary = storage.get(INTRO_RESPONSE_KEY, '');
  if (primary.trim()) return primary;
  const legacy = storage.get(INTRO_LEGACY_KEY, '');
  if (!legacy.trim()) return '';
  storage.set(INTRO_RESPONSE_KEY, legacy);
  const ts = storage.get(`${INTRO_LEGACY_KEY}:ts`, '');
  if (ts) storage.set(`${INTRO_RESPONSE_KEY}:ts`, ts);
  return legacy;
}

/** Conclusion short-answer text (interview reflection). */
export function getConclusionResponseText(): string {
  try {
    const raw = localStorage.getItem('conclusion-response');
    if (!raw) return '';
    const d = JSON.parse(raw) as { response?: string };
    return typeof d?.response === 'string' ? d.response : '';
  } catch {
    return '';
  }
}

export function getStoredUserName(): string {
  try {
    return localStorage.getItem(USER_NAME_KEY)?.trim() ?? '';
  } catch {
    return '';
  }
}

/** Persist display name for certificate and merge into `progress_data`. */
export function persistUserNameForModule(name: string): void {
  const trimmed = name.trim();
  localStorage.setItem(USER_NAME_KEY, trimmed);
  let progress: Record<string, unknown> = {};
  try {
    const p = localStorage.getItem('progress_data');
    if (p) progress = JSON.parse(p) as Record<string, unknown>;
  } catch {
    /* ignore */
  }
  localStorage.setItem(
    'progress_data',
    JSON.stringify({
      ...progress,
      course_id:
        typeof progress.course_id === 'string' && progress.course_id.trim() ?
          progress.course_id
        : 'cwail-ai-literacy',
      ...(trimmed ? { user_name: trimmed } : {}),
    })
  );
}

/** Clear saved learner display name and remove it from merged progress (does not clear module progress). */
export function clearStoredUserName(): void {
  try {
    localStorage.removeItem(USER_NAME_KEY);
  } catch {
    /* ignore */
  }
  let progress: Record<string, unknown> = {};
  try {
    const p = localStorage.getItem('progress_data');
    if (p) progress = JSON.parse(p) as Record<string, unknown>;
  } catch {
    /* ignore */
  }
  delete progress.user_name;
  try {
    localStorage.setItem('progress_data', JSON.stringify(progress));
  } catch {
    /* ignore */
  }
}

/** Clear all browser-persisted learner state for a clean local restart. */
export function clearLearnerSiteState(): void {
  try {
    localStorage.clear();
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.clear();
  } catch {
    /* ignore */
  }
}

/**
 * Stable per-browser id for tying module responses (and future records) in the database.
 */
export function getOrCreateLearnerSessionId(): string {
  try {
    const existing = localStorage.getItem(LEARNER_SESSION_KEY)?.trim();
    if (existing) return existing;
    const id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ?
        crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    localStorage.setItem(LEARNER_SESSION_KEY, id);
    return id;
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  }
}
