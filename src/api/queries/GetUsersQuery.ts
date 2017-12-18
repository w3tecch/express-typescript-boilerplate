import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { Query, AbstractGraphQLQuery, GraphQLContext } from './../../lib/graphql';
import { UserService } from '../services/UserService';
import { UserType } from './../types/UserType';
import { User } from '../models/User';
import { Logger, LoggerInterface } from '../../decorators/Logger';


@Query()
export class GetUsersQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, User[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(UserType);
    public allow = [];
    public args = {};

    constructor(
        private userService: UserService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<User[]> {
        const users = await this.userService.find();
        this.log.info(`Found ${users.length} users`);
        return users;
    }

}
