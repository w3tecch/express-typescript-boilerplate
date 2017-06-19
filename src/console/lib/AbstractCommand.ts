/**
 * AbstractCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';

export interface Command {
    run(): Promise<void>;
}

export class AbstractCommand {

    static command = 'make:command';
    static description = 'description';

    public context: any;

    static async action(command: Command): Promise<void> {
        try {
            await command.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    constructor(context?: any) {
        this.context = _.cloneDeep(context);
    }

    public async run(): Promise<void> {
        console.log('You have to implement a run method!');
    }

}
