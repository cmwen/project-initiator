import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/preact';

afterEach(() => cleanup());

// JSDOM matchMedia polyfill for theme detection
if (!window.matchMedia) {
	// @ts-ignore
	window.matchMedia = (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	});
}
