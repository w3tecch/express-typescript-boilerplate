import { Logger } from './Logger';
import { env } from './env';


export function banner(log: Logger): void {
    if (env.app.banner) {
        log.info(``);
        log.info(`Aloha, your app is ready on ${env.app.route}${env.app.routePrefix}`);
        log.info(`To shut it down, press <CTRL> + C at any time.`);
        log.info(``);
        log.info('-------------------------------------------------------');
        log.info(`Environment  : ${env.node}`);
        log.info(`Version      : ${env.app.version}`);
        log.info(``);
        log.info(`API Info     : ${env.app.route}${env.app.routePrefix}`);
        if (env.graphql.enabled) {
            log.info(`GraphQL      : ${env.app.route}${env.graphql.route}`);
        }
        if (env.swagger.enabled) {
            log.info(`Swagger      : ${env.app.route}${env.swagger.route}`);
        }
        if (env.monitor.enabled) {
            log.info(`Monitor      : ${env.app.route}${env.monitor.route}`);
        }
        log.info('-------------------------------------------------------');
        log.info('');
    } else {
        log.info(`Application is up and running.`);
    }
}
