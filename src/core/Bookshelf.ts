import * as bookshelf from 'bookshelf';
import { Knex } from './Knex';


export const Bookshelf: bookshelf = bookshelf(<any>Knex);
Bookshelf.plugin(['bookshelf-camelcase']);
