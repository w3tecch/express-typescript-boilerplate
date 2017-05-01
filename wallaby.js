module.exports = (wallaby) => {
    process.env.NODE_ENV = 'test';
    // View test statistics (for locally running wallaby): http://wallabyjs.com/app/#/tests
    return {

        files: [
            'tsconfig.json',
            'src/**/*.ts',
            'src/**/*.json',
        ],

        tests: [
            'test/unit/**/*.test.ts'
        ],

        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({
                module: 'commonjs'
            })
        },

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jest',

        debug: true

        // If you want to do database testing with asymc calls then
        // you have to set this options, so that wallaby uses olny
        // one worker
        // workers: {
        //     recycle: true,
        //     initial: 1,
        //     regular: 1
        // }


    };
};
