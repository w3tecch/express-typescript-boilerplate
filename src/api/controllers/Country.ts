
import { Authorized, Get, JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

export class Country {
    public name: string;
    public currency: string;
}
@ResponseSchema(Country, { isArray: true })
export class CountryResponse {
    public countries: Country[];
}

@Authorized()
@JsonController('/countries')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class PetController {

    @Get()
    @ResponseSchema(CountryResponse, { isArray: true })
    public async getCountries(): Promise<CountryResponse> {
        const countries: Country[] = await this.fetchCountries();
        return {countries}
    }

    private async fetchCountries(): Promise<Country[]> {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            return data.map((country: any) => {

                return {
                    name: country.name.official,
                    currency: country.currencies,
                };
            });

        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    }


}
