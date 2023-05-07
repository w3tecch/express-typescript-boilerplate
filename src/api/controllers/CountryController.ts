import { IsNotEmpty } from 'class-validator';
import { Get, JsonController} from 'routing-controllers';
import {ResponseSchema } from 'routing-controllers-openapi';

import { CountryService } from '../services/CountryService';
import { ICountries } from '../types/Country';

export class CountryResponse {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public currencies: any;

}

@JsonController('/countries')
export class CountryController {

    constructor(
        private countryService: CountryService
    ) { }

    @Get()
    @ResponseSchema(CountryResponse, { isArray: true })
    public find(): Promise<ICountries[]> {
        return this.countryService.countryList();
    }
}
