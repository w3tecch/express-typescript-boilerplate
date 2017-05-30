// /**
//  * IOC - CONTAINER
//  * ----------------------------------------
//  *
//  * Bind every controller and service to the ioc container. All controllers
//  * will then be bonded to the express structure with their defined routes.
//  */

// import * as fs from 'fs';
// import { interfaces } from 'inversify-express-utils';
// import { Container } from 'inversify';
// import { Types } from '../constants/Types';
// import { Core, Controller, Model, Service, Repository } from '../constants/Targets';

// import { events, EventEmitter } from './api/events';
// import { Log } from './log';


// class IoC {

//     public container: Container;

//     constructor() {
//         this.container = new Container();
//         this.bindAll();
//     }

//     public get Container(): Container {
//         return this.container;
//     }

//     private bindAll(): void {
//         this.bindCore();
//         this.bindModels();
//         // this.bindControllers();
//     }

//     private bindCore(): void {
//         this.container.bind<typeof Log>(Types.Core).toConstantValue(Log).whenTargetNamed(Core.Log);
//     }

//     private async bindControllers(): Promise<void> {
//         this.getFiles('/controllers', (files: string[]) => {
//             files.forEach((file: any) => {
//                 console.log(file);
//                 const fileExport = require(`${file.path}/${file.fileName}`);
//                 console.log(fileExport);
//                 this.container
//                     .bind<interfaces.Controller>(Types.Controller)
//                     .to(fileExport[file.name])
//                     .whenTargetNamed(Controller[file.name]);
//             });
//         });
//     }

//     private async bindModels(): Promise<void> {
//         console.log('Models');
//         this.getFiles('/models', (files: string[]) => {
//             files.forEach((file: any) => {
//                 const fileExport = require(`${file.path}/${file.fileName}`);
//                 this.validateExport(fileExport[file.name]);
//                 this.validateTarget(Model, file.name);
//                 console.log(Model[file.name]);
//                 this.container
//                     .bind<any>(Types.Model)
//                     .to(fileExport[file.name])
//                     .whenTargetNamed(Model[file.name]);
//             });
//         });
//     }

//     private getBasePath(): string {
//         const baseFolder = __dirname.indexOf('/src/') >= 0 ? '/src/' : '/dist/';
//         const baseRoot = __dirname.substring(0, __dirname.indexOf(baseFolder));
//         return `${baseRoot}${baseFolder}api`;
//     }

//     private getFiles(path: string, done: (files: any[]) => void): void {
//         fs.readdir(this.getBasePath() + path, (err: any, files: string[]): void => {
//             if (err) {
//                 console.error(err);
//             }
//             done(files.map((fileName: string) => ({
//                 path: this.getBasePath() + path,
//                 fileName: fileName,
//                 name: this.parseName(fileName)
//             })));
//         });
//     }

//     private parseName(fileName: string): string {
//         return fileName.substring(0, fileName.length - 3);
//     }

//     private validateExport(value: any): void {
//         if (!value) {
//             throw new Error(`${value} is not defined in the target constants`);
//         }
//     }

//     private validateTarget(target: any, value: any): void {
//         if (target && target[value] === undefined) {
//             throw new Error(`${value} is not defined in the target constants`);
//         }
//     }

// }

// export const ioc = new IoC();
