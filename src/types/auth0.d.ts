/**
 * auth0
 * ----------------------------------------
 *
 * Type definitions for the auth0 responses.
 */

declare namespace auth0 {

    interface User {
        user_id: string;
        email: string;
        email_verified: boolean;
        picture: string;
        created_at: Date;
        updated_at: Date;
        clientID?: string;
        nickname?: string;
        name?: string;
        global_client_id?: string;
        identities?: UserIdentities[];
    }

    interface UserIdentities {
        user_id: string;
        provider: string;
        connection: string;
        isSocial: boolean;
    }

    interface Body {
        client_id: string;
        client_secret: string;
        audience: string;
        grant_type: string;
    }

}

export as namespace auth0;
export = auth0;
