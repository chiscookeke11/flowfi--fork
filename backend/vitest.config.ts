import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        setupFiles: [],
        include: ['tests/**/*.{test,spec}.ts', 'src/__tests__/**/*.{test,spec}.ts'],
        coverage: {
            enabled: true,
            provider: 'v8',
            reportsDirectory: './coverage',
            reporter: ['text', 'json', 'html', 'lcov'],
            thresholds: {
                statements: 60,
                branches: 60,
                functions: 60,
                lines: 60,
            },
        },
        testTimeout: 30000,
        hookTimeout: 30000,
        // Run each test file in its own forked process so vi.mock() doesn't leak
        pool: 'forks',
        isolate: true,
    },
});
