import { test, expect, beforeEach, afterEach } from 'bun:test';
import dts from './index';

const TEST_DIR = './test-output';

beforeEach(async () => {
	const dir = Bun.file(TEST_DIR);
	if (await dir.exists()) {
		await dir.delete();
	}
});

afterEach(async () => {
	const dir = Bun.file(TEST_DIR);
	if (await dir.exists()) {
		await dir.delete();
	}
});

test('generates .d.ts file for single entrypoint', async () => {
	const result = await Bun.build({
		entrypoints: ['./test/fixtures/simple.ts'],
		outdir: TEST_DIR,
		plugins: [dts()],
	});

	expect(result.success).toBe(true);
	expect(await Bun.file(`${TEST_DIR}/simple.d.ts`).exists()).toBe(true);
});

test('generates .d.ts files for multiple entrypoints', async () => {
	const result = await Bun.build({
		entrypoints: ['./test/fixtures/simple.ts', './test/fixtures/another.ts'],
		outdir: TEST_DIR,
		plugins: [dts()],
	});

	expect(result.success).toBe(true);
	expect(await Bun.file(`${TEST_DIR}/simple.d.ts`).exists()).toBe(true);
	expect(await Bun.file(`${TEST_DIR}/another.d.ts`).exists()).toBe(true);
});

test('creates output directory if it does not exist', async () => {
	const result = await Bun.build({
		entrypoints: ['./test/fixtures/simple.ts'],
		outdir: `${TEST_DIR}/nested/dir`,
		plugins: [dts()],
	});

	expect(result.success).toBe(true);
	expect(await Bun.file(`${TEST_DIR}/nested/dir/simple.d.ts`).exists()).toBe(true);
});

test('generated .d.ts contains expected exports', async () => {
	await Bun.build({
		entrypoints: ['./test/fixtures/simple.ts'],
		outdir: TEST_DIR,
		plugins: [dts()],
	});

	const content = await Bun.file(`${TEST_DIR}/simple.d.ts`).text();
	expect(content).toContain('export');
});

test('respects custom library options', async () => {
	const result = await Bun.build({
		entrypoints: ['./test/fixtures/simple.ts'],
		outdir: TEST_DIR,
		plugins: [
			dts({
				libraries: {
					allowedTypesLibraries: ['node', 'custom'],
				},
			}),
		],
	});

	expect(result.success).toBe(true);
});
