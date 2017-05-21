import * as request from 'request';
import container from '../../container';
import { Log } from '../../core/log';
import { Types } from '../../constants/Types';
import { UserService } from '../services/UsersService';

import { authenticate as Authenticate } from './authenticate';
import { populateUser as PopulateUser } from './populateUser';


/**
 * Middlewares
 * ------------------------------------
 * We build them up here so we can easily use them in the controllers and
 * also be able to test the middlewares without any big effort.
 */
export const authenticate = Authenticate(request, new Log('api:middleware.authenticate'));
export const populateUser = PopulateUser(() => container.get<UserService>(Types.UserService), new Log('api:middleware.populateUser'));

