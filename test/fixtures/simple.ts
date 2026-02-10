export function greet(name: string): string {
	return `Hello, ${name}!`;
}

export interface User {
	id: number;
	name: string;
}

export const DEFAULT_TIMEOUT = 5000;
