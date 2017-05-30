/**
 * Middlewares
 * ------------------------------------
 * We build them up here so we can easily use them in the controllers and
 * also be able to test the middlewares without any big effort.
 */

import * as request from 'request';
import container from '../../container';
import { Log } from '../../core/log';
import { Types } from '../../constants/Types';
import { Service } from '../../constants/Targets';
import { UserService } from '../services/UsersService';

import { authenticate as Authenticate } from './authenticate';
import { populateUser as PopulateUser } from './populateUser';

const logPrefix = 'api:middleware';


export const authenticate = Authenticate(request, new Log(`${logPrefix}:authenticate`));
export const populateUser = PopulateUser(() => container.getNamed<UserService>(Types.Service, Service.UserService), new Log(`${logPrefix}:populateUser`));
