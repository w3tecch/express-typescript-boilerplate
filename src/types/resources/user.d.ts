declare module 'resources' {

    interface User {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        auth0UserId: string;
        picture: string;
        createdAt: Date;
        updatedAt: Date;
    }

}
