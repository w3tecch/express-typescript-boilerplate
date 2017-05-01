import * as express from 'express';
const router = express.Router();

import * as core from '../../core';
import * as repo from '../repositories';
import * as models from '../models';
import * as service from '../services';
import * as controller from '../controllers';

const log = new core.Log('api:routes:users');
log.debug('init');

const usersController = new controller.UsersController(
    new service.UserService(
        new repo.UserRepository(
            models.User
        )
    )
);


router.route('/users')
    .get(usersController.findAll.bind(usersController));

router.route('/users/:id')
    .get(usersController.findOne.bind(usersController));


export const userRoutes = router;
