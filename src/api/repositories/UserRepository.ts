
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../models/User';


@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User>  {



    // @OrmConnection()
    // private connection: Connection;

    // public findAll(): Promise<User[]> {
    //     // here, for example you can load categories using mongoose
    //     // you can also return a promise here
    //     // simulate async with creating an empty promise
    //     return Promise.resolve(this.users);
    // }

    // public findOne(id: number): User | undefined {
    //     // here, for example you can load category id using mongoose
    //     // you can also return a promise here
    //     let foundUser: User | undefined = undefined;
    //     this.users.forEach(u => {
    //         if (u.id === id) {
    //             foundUser = u;
    //         }
    //     });
    //     return foundUser;
    // }

    // public save(user: User): User {
    //     // here, for example you can save a user to mongodb using mongoose
    //     this.users.push(user);
    //     return user;
    // }

    // public remove(id: number): User | undefined {
    //     // here, for example you can save a category to mongodb using mongoose
    //     const user = this.findOne(id);
    //     if (user) {
    //         this.users.splice(this.users.indexOf(user), 1);
    //     }
    //     return user;
    // }

}
