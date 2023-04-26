import {Get, JsonController} from 'routing-controllers';
import {ResponseSchema} from 'routing-controllers-openapi';

export class Country {
    public name: string;
    public currency: string;
}

@ResponseSchema(Country, { isArray: true })
class CountryListResponse {
    public countries: Country[];
}

@JsonController('/countries')
export class CountryController {

    @Get()
    @ResponseSchema(CountryListResponse)
    public async getCountries(): Promise<CountryListResponse> {
        const countries: Country[] = await this.fetchCountries();
        return {countries};
    }

    private async fetchCountries(): Promise<Country[]> {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            return data.map((country: any) => {
                const currencyCode = Object.keys(country.currencies)[0];
                const currency = `${country.currencies[currencyCode].name} (${currencyCode})`;
                return {
                    name: country.name.official,
                    currency,
                };
            });
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    }
}
