import * as basicAuth from 'express-basic-auth';


export const BasicAuthenticate = (): any => {
    return basicAuth({
        users: {
            [process.env.APP_BASIC_USER]: process.env.APP_BASIC_PASSWORD
        },
        challenge: true
    });
};
