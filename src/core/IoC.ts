/**
 * IOC - CONTAINER
 * ----------------------------------------
 *
 * Bind every controller and service to the ioc container. All controllers
 * will then be bonded to the express structure with their defined routes.
 */

import * as fs from 'fs';
import { interfaces } from 'inversify-express-utils';
import { Container } from 'inversify';
import { Types } from '../constants/Types';
import { Core, Controller, Model, Service, Repository } from '../constants/Targets';

import { events, EventEmitter } from './api/events';
import { Log } from './log';

const log = new Log('core:IoC');


class IoC {

    public container: Container;
    public customConfiguration: (container: Container) => Container;

    constructor() {
        this.container = new Container();
    }

    public get Container(): Container {
        return this.container;
    }

    public configure(configuration: (container: Container) => Container): void {
        this.customConfiguration = configuration;
    }

    public async bindModules(): Promise<void> {
        this.bindCore();
        await this.bindModels();
        await this.bindRepositories();
        await this.bindServices();
        await this.bindControllers();

        this.container = this.customConfiguration(this.container);
    }

    private bindCore(): void {
        this.container.bind<typeof Log>(Types.Core).toConstantValue(Log).whenTargetNamed(Core.Log);
        this.container.bind<EventEmitter>(Types.Core).toConstantValue(events).whenTargetNamed(Core.Events);
    }

    private bindModels(): Promise<void> {
        return this.bindFiles('/models', Model, (name: any, value: any) => {
            this.container
                .bind<any>(Types.Model)
                .toConstantValue(value)
                .whenTargetNamed(name);
        });
    }

    private bindRepositories(): Promise<void> {
        return this.bindFiles('/repositories', Repository, (name: any, value: any) => {
            this.container
                .bind<any>(Types.Repository)
                .to(value)
                .whenTargetNamed(name);
        });
    }

    private bindServices(): Promise<void> {
        return this.bindFiles('/services', Service, (name: any, value: any) => {
            this.container
                .bind<any>(Types.Service)
                .to(value)
                .whenTargetNamed(name);
        });
    }

    private bindControllers(): Promise<void> {
        return this.bindFiles('/controllers', Controller, (name: any, value: any) => {
            this.container
                .bind<any>(Types.Controller)
                .to(value)
                .whenTargetNamed(name);
        });
    }

    private bindFiles(path: string, target: any, callback: (name: any, value: any) => void): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.getFiles(path, (files: string[]) => {
                files.forEach((file: any) => {
                    let fileExport;
                    try {
                        fileExport = require(`${file.path}/${file.fileName}`);
                    } catch (e) {
                        log.warn(e.message);
                        return;
                    }
                    if (fileExport === undefined) {
                        log.warn(`Could not find the file ${file.name}!`);
                        return;
                    }
                    if (fileExport[file.name] === undefined) {
                        log.warn(`Name of the file '${file.name}' does not match to the class name!`);
                        return;
                    }
                    if (target && target[file.name] === undefined) {
                        log.warn(`Please define your '${file.name}' class is in the target constants.`);
                        return;
                    }
                    callback(target[file.name], fileExport[file.name]);
                });
                resolve();
            });
        });
    }

    private getBasePath(): string {
        const baseFolder = __dirname.indexOf('/src/') >= 0 ? '/src/' : '/dist/';
        const baseRoot = __dirname.substring(0, __dirname.indexOf(baseFolder));
        return `${baseRoot}${baseFolder}api`;
    }

    private getFiles(path: string, done: (files: any[]) => void): void {
        fs.readdir(this.getBasePath() + path, (err: any, files: string[]): void => {
            if (err) {
                log.warn(`Could not read the folder ${path}!`);
                return;
            }
            done(files.map((fileName: string) => ({
                path: this.getBasePath() + path,
                fileName: fileName,
                name: this.parseName(fileName)
            })));
        });
    }

    private parseName(fileName: string): string {
        return fileName.substring(0, fileName.length - 3);
    }

}

export const ioc = new IoC();
