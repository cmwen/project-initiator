import { defaultState, type ProjectState } from '../types/app';

type Listener = (s: ProjectState) => void;

class State {
  private state: ProjectState = defaultState;
  private listeners = new Set<Listener>();

  get(): ProjectState { return this.state; }

  set(partial: Partial<ProjectState>) {
    this.state = { ...this.state, ...partial };
  this.applyTheme();
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
    try {
      localStorage.setItem('app-state', JSON.stringify(this.state));
    } catch (err) {
      // Ignore storage quota/security errors in private/incognito modes
    }
    history.replaceState(
      null,
      '',
      `#${btoa(unescape(encodeURIComponent(JSON.stringify(this.state))))}`,
    );
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
    } catch (err) {
      // Ignore malformed hash/localStorage JSON; fall back to defaults
    }
    this.applyTheme();
    this.emit();
  }

  private applyTheme() {
    const doc = document.documentElement;
    const pref = this.state.theme ?? 'system';
    let theme = pref;
    if (pref === 'system') {
      const m = window.matchMedia('(prefers-color-scheme: dark)');
      theme = m.matches ? 'dark' : 'light';
    }
    doc.setAttribute('data-theme', theme);
  }
}

export const appState = new State();
