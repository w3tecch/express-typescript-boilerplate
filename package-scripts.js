/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, crossEnv, concurrent, rimraf, runInNewWindow } = require('nps-utils');

module.exports = {
    scripts: {
        default: {
            script: 'nps start'
        },
        /**
         * Starts the builded app from the dist directory
         */
        start: {
            script: 'node dist/app.js'
        },
        /**
         * Serves the current app and watches for changes to restart it
         */
        serve: {
            script: series(
                'nps banner.serve',
                'nodemon --watch src --watch .env'
            )
        },
        /**
         * Setup's the development environment and the database
         */
        setup: {
            script: series(
                'yarn install',
                'nps db.migrate',
                'nps db.seed'
            )
        },
        /**
         * Builds the app into the dist directory
         */
        build: {
            script: series(
                'nps banner.build',
                'nps lint',
                'nps clean.dist',
                'nps transpile',
                'nps copy'
            )
        },
        /**
         * Database scripts
         */
        db: {
            migrate: {
                script: series(
                    'nps banner.migrate',
                    'nps db.config',
                    runFast('./node_modules/typeorm/cli.js migrations:run')
                )
            },
            revert: {
                script: series(
                    'nps banner.revert',
                    'nps db.config',
                    runFast('./node_modules/typeorm/cli.js migrations:revert')
                )
            },
            seed: {
                script: series(
                    'nps banner.seed',
                    'nps db.config',
                    runFast('./src/lib/seeds/')
                )
            },
            config: {
                script: runFast('./src/lib/ormconfig.ts')
            },
            drop: {
                script: runFast('./node_modules/typeorm/cli.js schema:drop')
            }
        },
        /**
         * These run various kinds of tests. Default is unit.
         */
        test: {
            default: 'nps test.unit',
            unit: {
                default: {
                    script: series(
                        'nps banner.test',
                        'nps test.unit.pretest',
                        'nps test.unit.run'
                    )
                },
                pretest: {
                    script: 'tslint -c ./tslint.json -t stylish ./test/unit/**/*.ts'
                },
                run: {
                    script: 'cross-env NODE_ENV=test jest --testPathPattern=unit'
                },
                verbose: {
                    script: 'nps "test --verbose"'
                },
                coverage: {
                    script: 'nps "test --coverage"'
                }
            },
            integration: {
                default: {
                    script: series(
                        'nps banner.test',
                        'nps test.integration.pretest',
                        'nps test.integration.run'
                    )
                },
                pretest: {
                    script: 'tslint -c ./tslint.json -t stylish ./test/integration/**/*.ts'
                },
                verbose: {
                    script: 'nps "test.integration --verbose"'
                },
                run: {
                    // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                    script: 'cross-env NODE_ENV=test jest --testPathPattern=integration -i'
                },
            },
            e2e: {
                default: {
                    script: series(
                        'nps banner.test',
                        'nps test.e2e.pretest',
                        'nps test.e2e.run'
                    )
                },
                pretest: {
                    script: 'tslint -c ./tslint.json -t stylish ./test/e2e/**/*.ts'
                },
                verbose: {
                    script: 'nps "test.e2e --verbose"'
                },run: {
                    // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                    script: 'cross-env NODE_ENV=test jest --testPathPattern=e2e -i'
                },
            }
        },
        /**
         * Runs TSLint over your project
         */
        lint: {
            script: `tslint -c ./tslint.json -p tsconfig.json src/**/*.ts --format stylish`
        },
        /**
         * Transpile your app into javascript
         */
        transpile: {
            script: `tsc`
        },
        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: series(
                    `nps banner.clean`,
                    `nps clean.dist`
                )
            },
            dist: {
                script: rimraf('./dist')
            }
        },
        /**
         * Copies static files to the build folder
         */
        copy: {
            default: {
                script: series(
                    `nps copy.swagger`,
                    `nps copy.public`
                )
            },
            swagger: {
                script: copy(
                    './src/api/swagger.json',
                    './dist'
                )
            },
            public: {
                script: copy(
                    './src/public/*',
                    './dist'
                )
            }
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
