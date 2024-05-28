import type * as Party from "partykit/server";

import { getNextAuthSession } from "@/party/utils/auth";
import { uuidv7 } from "uuidv7";

export default class Server implements Party.Server {
    constructor(readonly room: Party.Room) {}

    async authUser(proxiedRequest: Party.Request) {
        const id = new URL(proxiedRequest.url).searchParams.get("_pk");
        const connection = id && this.room.getConnection(id);
        if (!connection) return { status: 401, body: "Unauthorized" };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const session = await getNextAuthSession(proxiedRequest);
        if (!session) return { status: 401, body: "Unauthorized" };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        connection.setState({ user: session });
    }

    async onRequest(req: Party.Request): Promise<Response> {
        if (req.method === "POST") {
            if (new URL(req.url).pathname.endsWith("/auth")) {
                await this.authUser(req);

                return Promise.resolve(new Response());
            }
        }
        return Promise.resolve(new Response());
    }

    onMessage(message: string, sender: Party.Connection) {
        console.log(sender.state);
        this.room.broadcast(`Message from ${sender.id}: ${uuidv7()}`, [sender.id]);
    }

    onConnect(connection: Party.Connection) {
        connection.send(`Welcome, ${connection.id}`);
        this.room.broadcast(`Heads up! ${connection.id} joined the party!`, [connection.id]);
    }

    onClose(connection: Party.Connection) {
        this.room.broadcast(`So sad! ${connection.id} left the party!`);
    }
}

Server satisfies Party.Worker;
