import * as express from 'express';
import * as path from 'path';
import { Environment } from './helpers/Environment';


export class ApiInfo {
    public setup(app: express.Application): void {
        if (Environment.isTruthy(process.env.API_INFO_ENABLED)) {
            app.get(
                path.join(process.env.APP_URL_PREFIX, process.env.API_INFO_ROUTE),
                (req: myExpress.Request, res: myExpress.Response) => {
                    const pkg = Environment.getPkg();
                    const links = {
                        links: {}
                    };
                    const appUrl = process.env.APP_URL_PREFIX;
                    if (Environment.isTruthy(process.env.SWAGGER_ENABLED)) {
                        links.links['swagger'] =
                            `${app.get('host')}:${app.get('port')}${path.join(appUrl, process.env.SWAGGER_ROUTE)}`;
                    }
                    if (Environment.isTruthy(process.env.MONITOR_ENABLED)) {
                        links.links['monitor'] =
                            `${app.get('host')}:${app.get('port')}${path.join(appUrl, process.env.MONITOR_ROUTE)}`;
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
