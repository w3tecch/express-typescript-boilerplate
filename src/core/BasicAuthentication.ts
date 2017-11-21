import * as basicAuth from 'express-basic-auth';


export const BasicAuthentication = (): any => {
    return basicAuth({
        users: {
            [process.env.APP_BASIC_USER as string]: process.env.APP_BASIC_PASSWORD as string
        },
        challenge: true
    });
};
