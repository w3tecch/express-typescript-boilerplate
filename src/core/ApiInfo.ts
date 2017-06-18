import * as express from 'express';
import * as path from 'path';
import { myExpress } from 'my-express';
import { Environment } from './Environment';


export class ApiInfo {

    constructor(public app: express.Application) { }

    public setup(): void {
        if (Environment.get<string>('API_INFO_ENABLED').toLowerCase() === 'true') {
            this.app.get(
                path.join(Environment.get<string>('APP_URL_PREFIX'), Environment.get<string>('API_INFO_ROUTE')),
                (req: myExpress.Request, res: myExpress.Response) => {
                    const pkg = Environment.getPkg();
                    const links = {
                        links: {}
                    };
                    const appUrl = Environment.get<string>('APP_URL_PREFIX');
                    if (Environment.get<string>('SWAGGER_ENABLED').toLowerCase() === 'true') {
                        links.links['swagger'] =
                            `${this.app.get('host')}:${this.app.get('port')}${path.join(appUrl, Environment.get<string>('SWAGGER_ROUTE'))}`;
                    }
                    if (Environment.get<string>('MONITOR_ENABLED').toLowerCase() === 'true') {
                        links.links['monitor'] =
                            `${this.app.get('host')}:${this.app.get('port')}${path.join(appUrl, Environment.get<string>('MONITOR_ROUTE'))}`;
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
