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
                runFast('./src/lib/seeds/')
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
                pretest: 'tslint -c ./tslint.json -t stylish ./test/unit/**/*.ts',
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
                pretest: 'tslint -c ./tslint.json -t stylish ./test/integration/**/*.ts',
                verbose: 'nps "test.integration --verbose"',
                run: 'cross-env NODE_ENV=test jest --testPathPattern=integration -i',
            },
            e2e: {
                default: {
                    script: series(
                        'nps banner.test',
                        'nps test.e2e.pretest',
                        runInNewWindow(series('nps build', 'nps start')),
                        'nps test.e2e.run'
                    )
                },
                pretest: {
                    script: 'tslint -c ./tslint.json -t stylish ./test/e2e/**/*.ts'
                },
                verbose: {
                    script: 'nps "test.e2e --verbose"'
                },
                run: series(
                    `wait-on --timeout 120000 http-get://localhost:3000/api/info`,
                    'cross-env NODE_ENV=test jest --testPathPattern=e2e -i'
                )
            }
        },
        /**
         * Runs TSLint over your project
         */
        lint: `tslint -c ./tslint.json -p tsconfig.json src/**/*.ts --format stylish`,
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
