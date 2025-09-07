import { defaultState, type ProjectState } from '../types/app';

type Listener = (s: ProjectState) => void;

class State {
  private state: ProjectState = defaultState;
  private listeners = new Set<Listener>();

  get(): ProjectState { return this.state; }

  set(partial: Partial<ProjectState>) {
    this.state = { ...this.state, ...partial };
    this.queuePersist();
    this.emit();
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    for (const l of this.listeners) l(this.state);
  }

  private persistTimer?: number;
  private queuePersist() {
    if (this.persistTimer) window.clearTimeout(this.persistTimer);
    this.persistTimer = window.setTimeout(() => this.persist(), 200);
  }

  private persist() {
    try { localStorage.setItem('app-state', JSON.stringify(this.state)); } catch {}
    history.replaceState(null, '', `#${btoa(unescape(encodeURIComponent(JSON.stringify(this.state))))}`);
  }

  restore() {
    try {
      if (location.hash.length > 1) {
        const json = decodeURIComponent(escape(atob(location.hash.slice(1))));
        this.state = { ...this.state, ...JSON.parse(json) };
      } else {
        const raw = localStorage.getItem('app-state');
        if (raw) this.state = { ...this.state, ...JSON.parse(raw) };
      }
    } catch {}
    this.emit();
  }
}

export const appState = new State();
