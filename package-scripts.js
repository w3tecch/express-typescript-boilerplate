/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, crossEnv, concurrent, rimraf, runInNewWindow } = require('nps-utils');

module.exports = {
    scripts: {
        default: 'nps start',
        /**
         * Starts the builded app from the dist directory
         */
        start: 'node dist/app.js',
        /**
         * Serves the current app and watches for changes to restart it
         */
        serve: series(
            'nps banner.serve',
            'nodemon --watch src --watch .env'
        ),
        /**
         * Setup's the development environment and the database
         */
        setup: series(
            'yarn install',
            'nps db.migrate',
            'nps db.seed'
        ),
        /**
         * Builds the app into the dist directory
         */
        build: series(
            'nps banner.build',
            'nps lint',
            'nps clean.dist',
            'nps transpile',
            'nps copy'
        ),
        /**
         * Database scripts
         */
        db: {
            migrate: series(
                'nps banner.migrate',
                'nps db.config',
                runFast('./node_modules/typeorm/cli.js migrations:run')
            ),
            revert: series(
                'nps banner.revert',
                'nps db.config',
                runFast('./node_modules/typeorm/cli.js migrations:revert')
            ),
            seed: series(
                'nps banner.seed',
                'nps db.config',
                runFast('./src/lib/seeds/cli.ts')
            ),
            config: runFast('./src/lib/ormconfig.ts'),
            drop: runFast('./node_modules/typeorm/cli.js schema:drop')
        },
        /**
         * These run various kinds of tests. Default is unit.
         */
        test: {
            default: 'nps test.unit',
            unit: {
                default: series(
                    'nps banner.test',
                    'nps test.unit.pretest',
                    'nps test.unit.run'
                ),
                pretest: tslint(`./test/unit/**.ts`),
                run: 'cross-env NODE_ENV=test jest --testPathPattern=unit',
                verbose: 'nps "test --verbose"',
                coverage: 'nps "test --coverage"'
            },
            integration: {
                default: series(
                    'nps banner.test',
                    'nps test.integration.pretest',
                    'nps test.integration.run'
                ),
                pretest: tslint(`./test/integration/**.ts`),
                verbose: 'nps "test.integration --verbose"',
                // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                run: 'cross-env NODE_ENV=test jest --testPathPattern=integration -i',
            },
            e2e: {
                default: series(
                    'nps banner.test',
                    'nps test.e2e.pretest',
                    'nps test.e2e.run'
                ),
                pretest: tslint(`./test/e2e/**.ts`),
                verbose: 'nps "test.e2e --verbose"',
                // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                run: 'cross-env NODE_ENV=test jest --testPathPattern=e2e -i',
            }
        },
        /**
         * Runs TSLint over your project
         */
        lint: tslint(`./src/**/*.ts`),
        /**
         * Transpile your app into javascript
         */
        transpile: `tsc`,
        /**
         * Clean files and folders
         */
        clean: {
            default: series(
                `nps banner.clean`,
                `nps clean.dist`
            ),
            dist: rimraf('./dist')
        },
        /**
         * Copies static files to the build folder
         */
        copy: {
            default: series(
                `nps copy.swagger`,
                `nps copy.public`
            ),
            swagger: copy(
                './src/api/swagger.json',
                './dist'
            ),
            public: copy(
                './src/public/*',
                './dist'
            )
        },
        /**
         * This creates pretty banner to the terminal
         */
        banner: {
            build: banner('build'),
            serve: banner('serve'),
            test: banner('test'),
            migrate: banner('migrate'),
            seed: banner('seed'),
            revert: banner('revert'),
            clean: banner('clean')
        }
    }
};

function banner(name) {
    return {
        hiddenFromHelp: true,
        silent: true,
        logLevel: 'error',
        description: `Shows ${name} banners to the console`,
        script: runFast(`./src/lib/banner.ts ${name}`),
    };
}

function copy(source, target) {
    return `copyup ${source} ${target}`;
}

function run(path) {
    return `ts-node ${path}`;
}

function runFast(path) {
    return run(`-F ${path}`);
}

function tslint(path) {
    return `tslint -c './tslint.json' '${path}' --format stylish`;
}
