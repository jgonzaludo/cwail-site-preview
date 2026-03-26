import { storage } from './storage';

export interface Section {
  id: string;
  title: string;
  required: boolean;
}

export interface Module {
  sections: Section[];
}

const PROGRESS_KEY = 'cwail:progress';
const MODULE_KEY = 'cwail:module';

let moduleCache: Module | null = null;

/** Normalize legacy shapes: string[] or { completedSections: string[] } → string[]. */
export function normalizeCompletedSectionIds(raw: unknown): string[] {
  if (raw === null || raw === undefined) return [];
  if (Array.isArray(raw)) {
    return raw.filter((id): id is string => typeof id === 'string');
  }
  if (typeof raw === 'object' && raw !== null && 'completedSections' in raw) {
    const cs = (raw as { completedSections?: unknown }).completedSections;
    if (Array.isArray(cs)) {
      return cs.filter((id): id is string => typeof id === 'string');
    }
  }
  return [];
}

export async function loadModule(): Promise<Module> {
  if (moduleCache) {
    return moduleCache;
  }

  try {
    const response = await fetch('/content/module.json');
    const module = await response.json();
    moduleCache = module;
    storage.set(MODULE_KEY, module);
    return module;
  } catch (error) {
    console.error('Failed to load module:', error);
    const cached = storage.get<Module>(MODULE_KEY, { sections: [] });
    moduleCache = cached;
    return cached;
  }
}

export function getModule(): Module {
  if (!moduleCache) {
    return storage.get<Module>(MODULE_KEY, { sections: [] });
  }
  return moduleCache;
}

export function getAllSectionIds(): string[] {
  const module = getModule();
  return module.sections.map(s => s.id);
}

export function getRequiredSectionIds(): string[] {
  const module = getModule();
  return module.sections.filter(s => s.required).map(s => s.id);
}

export function getCompleted(): string[] {
  const raw = storage.get<unknown>(PROGRESS_KEY, []);
  return normalizeCompletedSectionIds(raw);
}

export function isCompleted(id: string): boolean {
  return getCompleted().includes(id);
}

export function setCompleted(id: string, value: boolean): void {
  const completed = [...getCompleted()];

  if (value && !completed.includes(id)) {
    completed.push(id);
  } else if (!value && completed.includes(id)) {
    const index = completed.indexOf(id);
    if (index > -1) {
      completed.splice(index, 1);
    }
  }

  storage.set(PROGRESS_KEY, completed);
}

export function markCompleted(id: string): void {
  setCompleted(id, true);
}

export function unmarkCompleted(id: string): void {
  setCompleted(id, false);
}

export function hasSubmittedResponse(sectionId: string): boolean {
  if (sectionId === 'conclusion') {
    const conclusionData = storage.get('conclusion-response', null);
    return conclusionData && conclusionData.response && conclusionData.response.trim().length > 0;
  }
  const response = storage.get(`cwail:response:${sectionId}`, '');
  return response.trim().length > 0;
}

export function completedCount(): number {
  return getCompleted().length;
}

export function completedRequiredCount(): number {
  const completed = getCompleted();
  const requiredIds = getRequiredSectionIds();
  return requiredIds.filter(id => completed.includes(id)).length;
}

export function allRequiredCompleted(): boolean {
  const requiredIds = getRequiredSectionIds();
  const completed = getCompleted();
  return requiredIds.every(id => completed.includes(id));
}

export function canAccessConclusion(): boolean {
  const module = getModule();
  const coreRequiredSections = module.sections.filter(s => s.required && s.id !== 'conclusion');
  const completed = getCompleted();
  return coreRequiredSections.every(section => completed.includes(section.id));
}

export function canAccessPartingMessage(): boolean {
  const module = getModule();
  const coreRequiredSections = module.sections.filter(s => s.required && s.id !== 'conclusion');
  const completed = getCompleted();
  return coreRequiredSections.every(section => completed.includes(section.id));
}

export function canAccessQuiz(): boolean {
  return allRequiredCompleted();
}

export function canAccessSection(sectionId: string): boolean {
  const module = getModule();
  const allSections = module.sections;
  const currentIndex = allSections.findIndex(s => s.id === sectionId);

  if (currentIndex === -1) {
    return true;
  }

  if (currentIndex === 0) {
    return true;
  }

  const optionalSections = ['try-it-out', 'professional-case'];
  if (optionalSections.includes(sectionId)) {
    const previousSection = allSections[currentIndex - 1];
    return previousSection ? getCompleted().includes(previousSection.id) : true;
  }

  const completed = getCompleted();
  for (let i = 0; i < currentIndex; i++) {
    if (!completed.includes(allSections[i].id)) {
      return false;
    }
  }

  return true;
}

export function getAllRequiredSections(): string[] {
  return getRequiredSectionIds();
}

export function nextSectionId(currentId: string): string | null {
  const module = getModule();
  const currentIndex = module.sections.findIndex(s => s.id === currentId);
  if (currentIndex === -1 || currentIndex === module.sections.length - 1) {
    return null;
  }
  return module.sections[currentIndex + 1].id;
}

export function prevSectionId(currentId: string): string | null {
  const module = getModule();
  const currentIndex = module.sections.findIndex(s => s.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return module.sections[currentIndex - 1].id;
}

export function firstIncompleteRequired(): string | null {
  const requiredIds = getRequiredSectionIds();
  const completed = getCompleted();

  for (const id of requiredIds) {
    if (!completed.includes(id)) {
      return id;
    }
  }

  return null;
}

export function getProgressPercentage(): number {
  const requiredIds = getRequiredSectionIds();
  if (requiredIds.length === 0) return 0;

  const completedRequired = completedRequiredCount();
  return Math.round((completedRequired / requiredIds.length) * 100);
}
