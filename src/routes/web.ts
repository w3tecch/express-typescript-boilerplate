import * as express from 'express';

const router = express.Router();


router.route('/')
    .get((req: express.Request, res: express.Response) => {
        const pkg = require('../../package.json');
        res.json({
            name: pkg.name,
            version: pkg.version,
            description: pkg.description
        });
    });

export const web = router;
