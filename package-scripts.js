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
                '\"./node_modules/.bin/nodemon\" --watch src --watch .env',
            ),
        },
        /**
         * Setup's the development environment and the database
         */
        setup: {
            script: series(
                'yarn install',
                'nps db.migrate',
                'nps db.seed'
            ),
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
                'nps copy',
            ),
        },
        /**
         * Database scripts
         */
        db: {
            migrate: {
                script: series(
                    'nps banner.migrate',
                    'nps migrate.config',
                    runFast('./node_modules/.bin/typeorm migrations:run'),
                ),
            },
            revert: {
                script: series(
                    'nps banner.revert',
                    'nps migrate.config',
                    runFast('./node_modules/.bin/typeorm migrations:revert'),
                ),
            },
            seed: {
                script: series(
                    'nps banner.seed',
                    'nps migrate.config',
                    runFast('./src/lib/seeds.ts'),
                ),
            },
            config: {
                script: runFast('./src/lib/ormconfig.ts'),
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
                        'nps test.unit.run',
                    ),
                },
                pretest: {
                    script: './node_modules/.bin/tslint -c ./tslint.json -t stylish "./test/unit/**/*.ts"'
                },
                run: {
                    script: './node_modules/.bin/cross-env NODE_ENV=test \"./node_modules/.bin/jest\" --testPathPattern=unit'
                },
                verbose: {
                    script: 'nps "test --verbose"'
                },
                coverage: {
                    script: 'nps "test --coverage"'
                },
            },
            e2e: {
                default: {
                    script: series(
                        'nps banner.test',
                        'nps test.e2e.pretest',
                        runInNewWindow(series('nps build', 'nps start')),
                        'nps test.e2e.run',
                    ),
                },
                pretest: {
                    script: './node_modules/.bin/tslint -c ./tslint.json -t stylish "./test/e2e/**/*.ts"'
                },
                verbose: {
                    script: 'nps "test.e2e --verbose"'
                },
                run: series(
                    `wait-on --timeout 120000 http-get://localhost:3000/api/info`,
                    './node_modules/.bin/cross-env NODE_ENV=test \"./node_modules/.bin/jest\" --testPathPattern=e2e -i',
                ),
            }
        },
        /**
         * Runs TSLint over your project
         */
        lint: {
            script: `./node_modules/.bin/tslint -c ./tslint.json -p tsconfig.json 'src/**/*.ts' --format stylish`
        },
        /**
         * Transpile your app into javascript
         */
        transpile: {
            script: `./node_modules/.bin/tsc`
        },
        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: series(
                    `nps banner.clean`,
                    `nps clean.dist`,
                ),
            },
            dist: {
                script: `./node_modules/.bin/trash './dist'`
            }
        },
        /**
         * Copies static files to the build folder
         */
        copy: {
            default: {
                script: series(
                    `nps copy.swagger`,
                    `nps copy.public`,
                ),
            },
            swagger: {
                script: copy(
                    './src/api/swagger.json',
                    './dist',
                ),
            },
            public: {
                script: copy(
                    './src/public/*',
                    './dist',
                ),
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
            clean: banner('clean'),
        },
    },
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
    return `./node_modules/.bin/copyup ${source} ${target}`;
}

function run(path) {
    return `./node_modules/.bin/ts-node ${path}`;
}

function runFast(path) {
    return run(`-F ${path}`);
}
