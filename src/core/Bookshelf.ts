import * as bookshelf from 'bookshelf';
import { Knex } from './Knex';


export const Bookshelf: bookshelf = bookshelf(Knex);
Bookshelf.plugin(['bookshelf-camelcase']);
