import * as _ from 'lodash';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';


@ValidatorConstraint({ name: 'endsWith', async: false })
export class EndsWithValidator implements ValidatorConstraintInterface {

    public validate(text: string, args: ValidationArguments): boolean {
        for (const ending of args.constraints) {
            if (_.endsWith(text, ending)) {
                return true;
            }
        }
        return false;
    }

    public defaultMessage(args: ValidationArguments): string {
        return 'Incorrect suffix';
    }

}
