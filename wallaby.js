module.exports = (wallaby) => {
    process.env.NODE_ENV = 'test';
    // View test statistics (for locally running wallaby): http://wallabyjs.com/app/#/tests
    return {

        files: [
            'tsconfig.json',
            'src/**/*.ts',
            'test/lib/**/*.ts',
            'src/**/*.json',
        ],

        tests: ['test/unit/**/*.test.ts'],

        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',

        // setup(wallaby) {
        //     wallaby.testFramework.configure(require('./package.json').jest);
        // },

        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({ module: 'commonjs' })
        }

        // // If you want to do database testing with async calls then
        // // you have to set this options, so that wallaby uses only
        // // one worker
        // workers: {
        //     recycle: true,
        //     initial: 1,
        //     regular: 1
        // }

    };
};
