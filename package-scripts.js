/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, rimraf, } = require('nps-utils');

module.exports = {
    scripts: {
        default: 'nps start',
        /**
         * Starts the builded app from the dist directory.
         */
        start: {
            script: 'cross-env NODE_ENV=production node dist/app.js',
            description: 'Starts the builded app',
        },
        /**
         * Serves the current app and watches for changes to restart it
         */
        serve: {
            inspector: {
                script: series(
                    'nps banner.serve',
                    'nodemon --watch src --watch .env --inspect'
                ),
                description: 'Serves the current app and watches for changes to restart it, you may attach inspector to it.'
            },
            script: series(
                'nps banner.serve',
                'nodemon --watch src --watch .env'
            ),
            description: 'Serves the current app and watches for changes to restart it'
        },
        /**
         * Setup of the development environment
         */
        setup: {
            script: series(
                'yarn install',
                'nps db.setup',
            ),
            description: 'Setup`s the development environment(yarn & database)'
        },
        /**
         * Creates the needed configuration files
         */
        config: {
            script: series(
                runFast('./commands/tsconfig.ts'),
            ),
            hiddenFromHelp: true
        },
        /**
         * Builds the app into the dist directory
         */
        build: {
            script: series(
                'nps banner.build',
                'nps config',
                'nps lint',
                'nps clean.dist',
                'nps transpile',
                'nps copy',
                'nps copy.tmp',
                'nps clean.tmp',
            ),
            description: 'Builds the app into the dist directory'
        },
        /**
         * Runs TSLint over your project
         */
        lint: {
            script: tslint(`./src/**/*.ts`),
            hiddenFromHelp: true
        },
        /**
         * Transpile your app into javascript
         */
        transpile: {
            script: `tsc --project ./tsconfig.build.json`,
            hiddenFromHelp: true
        },
        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: series(
                    `nps banner.clean`,
                    `nps clean.dist`
                ),
                description: 'Deletes the ./dist folder'
            },
            dist: {
                script: rimraf('./dist'),
                hiddenFromHelp: true
            },
            tmp: {
                script: rimraf('./.tmp'),
                hiddenFromHelp: true
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
                ),
                hiddenFromHelp: true
            },
            swagger: {
                script: copy(
                    './src/api/swagger.json',
                    './dist'
                ),
                hiddenFromHelp: true
            },
            public: {
                script: copy(
                    './src/public/*',
                    './dist'
                ),
                hiddenFromHelp: true
            },
            tmp: {
                script: copyDir(
                    './.tmp/src',
                    './dist'
                ),
                hiddenFromHelp: true
            }
        },
        /**
         * Database scripts
         */
        db: {
            migrate: {
                script: series(
                    'nps banner.migrate',
                    'nps config',
                    runFast('./node_modules/typeorm/cli.js migration:run')
                ),
                description: 'Migrates the database to newest version available'
            },
            revert: {
                script: series(
                    'nps banner.revert',
                    'nps config',
                    runFast('./node_modules/typeorm/cli.js migration:revert')
                ),
                description: 'Downgrades the database'
            },
            seed: {
                script: series(
                    'nps banner.seed',
                    'nps config',
                    runFast('./commands/seed.ts')
                ),
                description: 'Seeds generated records into the database'
            },
            drop: {
                script: runFast('./node_modules/typeorm/cli.js schema:drop'),
                description: 'Drops the schema of the database'
            },
            setup: {
                script: series(
                    'nps db.drop',
                    'nps db.migrate',
                    'nps db.seed'
                ),
                description: 'Recreates the database with seeded data'
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
                        'nps banner.testUnit',
                        'nps test.unit.pretest',
                        'nps test.unit.run'
                    ),
                    description: 'Runs the unit tests'
                },
                pretest: {
                    script: tslint(`./test/unit/**.ts`),
                    hiddenFromHelp: true
                },
                run: {
                    script: 'cross-env NODE_ENV=test jest --testPathPattern=unit',
                    hiddenFromHelp: true
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true
                }
            },
            integration: {
                default: {
                    script: series(
                        'nps banner.testIntegration',
                        'nps test.integration.pretest',
                        'nps test.integration.run'
                    ),
                    description: 'Runs the integration tests'
                },
                pretest: {
                    script: tslint(`./test/integration/**.ts`),
                    hiddenFromHelp: true
                },
                run: {
                    // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                    script: 'cross-env NODE_ENV=test jest --testPathPattern=integration -i',
                    hiddenFromHelp: true
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true
                }
            },
            e2e: {
                default: {
                    script: series(
                        'nps banner.testE2E',
                        'nps test.e2e.pretest',
                        'nps test.e2e.run'
                    ),
                    description: 'Runs the e2e tests'
                },
                pretest: {
                    script: tslint(`./test/e2e/**.ts`),
                    hiddenFromHelp: true
                },
                run: {
                    // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                    script: 'cross-env NODE_ENV=test jest --testPathPattern=e2e -i',
                    hiddenFromHelp: true
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true
                }
            },
        },
        /**
         * This creates pretty banner to the terminal
         */
        banner: {
            build: banner('build'),
            serve: banner('serve'),
            testUnit: banner('test.unit'),
            testIntegration: banner('test.integration'),
            testE2E: banner('test.e2e'),
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
        description: `Shows ${name} banners to the console`,
        script: runFast(`./commands/banner.ts ${name}`),
    };
}

function copy(source, target) {
    return `copyfiles --up 1 ${source} ${target}`;
}

function copyDir(source, target) {
    return `ncp ${source} ${target}`;
}

function run(path) {
    return `ts-node ${path}`;
}

function runFast(path) {
    return `ts-node --transpileOnly ${path}`;
}

function tslint(path) {
    return `tslint -c ./tslint.json ${path} --format stylish`;
}
