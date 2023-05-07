import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import axios from 'axios';
import { ICountries } from '../types/Country';
import { env } from '../../env';

@Service()
export class CountryService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async countryList(): Promise<ICountries[]> {
        this.log.info('Get Country List');
        const url = env.external.countryDataUrl; 
        const headers = {
            'Content-Type': 'application/json',
        };
        const countriesList: ICountries[] = [];
        try {
            const response = await axios({
                method: 'GET',
                url: url,
                headers: headers,
            });
            if (response.status== 200) {
                response.data.forEach((country: { name: any; currencies: any }) => {
                    countriesList.push({
                        name: country.name.common,
                        currencies: country.currencies,
                    });
                });
                this.log.info(`countriesList: ${JSON.stringify(countriesList)}`);
            }
        } catch (err) {
            this.log.error(`exception caught while getting countriesList : ${JSON.stringify(err)}`);
        }
        return countriesList;
    }
}
