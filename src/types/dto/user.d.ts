declare module 'dto' {

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
