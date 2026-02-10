export type Status = 'pending' | 'success' | 'error';

export class Logger {
	log(message: string): void {
		console.log(message);
	}
}
