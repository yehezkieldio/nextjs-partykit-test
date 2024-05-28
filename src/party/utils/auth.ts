import type * as Party from "partykit/server";

export type User = {
    username: string;
    name?: string;
    email?: string;
    image?: string;
    expires?: string;
};

/** Check that the user exists, and isn't expired */
export const isSessionValid = (session?: User | null): session is User => {
    return Boolean(session && (!session.expires || session.expires > new Date().toISOString()));
};

/**
 * Authenticate the user against the NextAuth API of the server that proxied the request
 */
export const getNextAuthSession = async (proxiedRequest: Party.Request) => {
    const headers = proxiedRequest.headers;
    const origin = headers.get("origin") ?? "";
    const cookie = headers.get("cookie") ?? "";

    const url = `${origin}/api/auth/session`;

    const res = await fetch(url, {
        headers: {
            Accept: "application/json",
            Cookie: cookie,
        },
    });

    if (res.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const session = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        if (isSessionValid(session.user)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            return { ...session.user, expires: session.expires };
        }
    } else {
        console.error("Failed to authenticate user", await res.text());
    }

    return null;
};
