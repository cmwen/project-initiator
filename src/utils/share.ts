import type { ProjectState } from '../types/app';

export function buildShareUrl(state: ProjectState) {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(state))));
  const base = location.origin + location.pathname;
  return `${base}#${encoded}`;
}

export function downloadJson(state: ProjectState, name = 'project-state') {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
