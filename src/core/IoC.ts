/**
 * IOC - CONTAINER
 * ----------------------------------------
 *
 * Bind every controller and service to the ioc container. All controllers
 * will then be bonded to the express structure with their defined routes.
 */

import * as glob from 'glob';
import { Container, decorate, injectable } from 'inversify';
import { Types } from '../constants/Types';
import { Core } from './Targets';
import { Controller, Model, Service, Repository, Middleware, Listener } from '../constants/Targets';
import { events, EventEmitter } from './api/events';
import { Log } from './log';

const log = new Log('core:IoC');


class IoC {

    public container: Container;
    public libConfiguration: (container: Container) => Container;
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

    public configureLib(configuration: (container: Container) => Container): void {
        this.libConfiguration = configuration;
    }

    public async bindModules(): Promise<void> {
        this.bindCore();

        this.container = this.libConfiguration(this.container);

        await this.bindModels();
        await this.bindRepositories();
        await this.bindServices();

        await this.bindListeners();
        await this.bindMiddlewares();
        await this.bindControllers();

        this.container = this.customConfiguration(this.container);
    }

    private bindCore(): void {
        this.container.bind<typeof Log>(Types.Core).toConstantValue(Log).whenTargetNamed(Core.Log);
        this.container.bind<EventEmitter>(Types.Core).toConstantValue(events).whenTargetNamed(Core.Events);
    }

    private bindModels(): Promise<void> {
        return this.bindFiles('/models/**/*.ts', Model, (name: any, value: any) => {
            decorate(injectable(), value);
            this.container
                .bind<any>(Types.Model)
                .toConstantValue(value)
                .whenTargetNamed(name);
        });
    }

    private bindRepositories(): Promise<void> {
        return this.bindFiles(
            '/repositories/**/*Repository.ts',
            Repository,
            (name: any, value: any) => this.bindFile(Types.Repository, name, value));
    }

    private bindServices(): Promise<void> {
        return this.bindFiles(
            '/services/**/*Service.ts',
            Service,
            (name: any, value: any) => this.bindFile(Types.Service, name, value));
    }

    private bindMiddlewares(): Promise<void> {
        return this.bindFiles(
            '/middlewares/**/*Middleware.ts',
            Middleware,
            (name: any, value: any) => this.bindFile(Types.Middleware, name, value));
    }

    private bindControllers(): Promise<void> {
        return this.bindFiles(
            '/controllers/**/*Controller.ts',
            Controller,
            (name: any, value: any) => this.bindFile(Types.Controller, name, value));
    }

    private bindListeners(): Promise<void> {
        return this.bindFiles('/listeners/**/*Listener.ts', Listener, (name: any, value: any) => {
            decorate(injectable(), value);
            this.container
                .bind<any>(Types.Listener)
                .to(value)
                .whenTargetNamed(name);

            const listener = ioc.Container.getNamed<any>(Types.Listener, name);
            events.on(value.Event, (...args) => listener.run(...args));
        });
    }

    private bindFile(type: any, name: string, value: any): void {
        decorate(injectable(), value);
        this.container
            .bind<any>(type)
            .to(value)
            .whenTargetNamed(name);
    }

    private bindFiles(path: string, target: any, callback: (name: any, value: any) => void): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.getFiles(path, (files: string[]) => {
                files.forEach((file: any) => {
                    let fileExport, fileClass, fileTarget;
                    const isRecursive = file.name.indexOf('.') > 0;
                    try {
                        fileExport = require(`${file.path}`);
                    } catch (e) {
                        log.warn(e.message);
                        return;
                    }
                    if (fileExport === undefined) {
                        log.warn(`Could not find the file ${file.name}!`);
                        return;
                    }
                    if (isRecursive) {
                        fileClass = this.getClassOfFileExport(file.name, fileExport);
                        fileTarget = this.getTargetOfFile(file.name, target);

                    } else {
                        fileClass = fileExport[file.name];
                        fileTarget = target && target[file.name];
                    }

                    if (fileClass === undefined) {
                        log.warn(`Name of the file '${file.name}' does not match to the class name!`);
                        return;
                    }

                    if (fileTarget === undefined) {
                        log.warn(`Please define your '${file.name}' class is in the target constants.`);
                        return;
                    }

                    callback(fileTarget, fileClass);
                });
                resolve();
            });
        });
    }

    private getClassOfFileExport(name: string, fileExport: any): any {
        const fileParts = name.split('.');
        let fileClass = fileExport;
        fileParts.forEach((part) => {
            fileClass = fileClass[part];
        });
        return fileClass;
    }

    private getTargetOfFile(name: string, target: any): any {
        const fileParts = name.split('.');
        let fileTarget = target;
        fileParts.forEach((part) => {
            fileTarget = fileTarget[part];
        });
        return fileTarget;
    }

    private getBasePath(): string {
        const baseFolder = __dirname.indexOf('/src/') >= 0 ? '/src/' : '/dist/';
        const baseRoot = __dirname.substring(0, __dirname.indexOf(baseFolder));
        return `${baseRoot}${baseFolder}api`;
    }

    private getFiles(path: string, done: (files: any[]) => void): void {
        const isTypeScript = __dirname.indexOf('/src/') >= 0;
        if (!isTypeScript) {
            path = path.replace('.ts', '.js');
        }
        glob(this.getBasePath() + path, (err: any, files: string[]) => {
            if (err) {
                log.warn(`Could not read the folder ${path}!`);
                return;
            }
            done(files.map((p: string) => this.parseFilePath(p)));
        });
    }

    private parseFilePath(path: string): any {
        const filePath = path.substring(this.getBasePath().length + 1);
        const dir = filePath.split('/')[0];
        const file = filePath.substr(dir.length + 1);
        const name = file.replace('/', '.').substring(0, file.length - 3);
        return {
            path: path,
            filePath: filePath,
            dir: dir,
            file: file,
            name: name
        };
    }

}

export const ioc = new IoC();
