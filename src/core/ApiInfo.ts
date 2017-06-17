import * as express from 'express';
import { my } from 'my-express';
import { Environment } from './Environment';


export class ApiInfo {

    constructor(public app: express.Application) { }

    public setup(): void {
        if (Environment.get<string>('API_INFO_ENABLED').toLowerCase() === 'true') {
            this.app.get(Environment.get<string>('APP_URL_PREFIX') + Environment.get<string>('API_INFO_ROUTE'), (req: my.Request, res: my.Response) => {
                const pkg = Environment.getPkg();
                const links = {
                    links: {}
                };
                if (Environment.get<string>('SWAGGER_ENABLED').toLowerCase() === 'true') {
                    links.links['swagger'] = `${this.app.get('host')}:${this.app.get('port')}${process.env.APP_URL_PREFIX}${process.env.SWAGGER_ROUTE}`;
                }
                if (Environment.get<string>('MONITOR_ENABLED').toLowerCase() === 'true') {
                    links.links['monitor'] = `${this.app.get('host')}:${this.app.get('port')}${process.env.APP_URL_PREFIX}${process.env.MONITOR_ROUTE}`;
                }
                return res.json({
                    name: pkg.name,
                    version: pkg.version,
                    description: pkg.description,
                    ...links
                });
            });
        }
    }

}
