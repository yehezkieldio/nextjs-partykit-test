"use client";

import { useState } from "react";

import type { Session, User } from "next-auth";
import type PartySocket from "partysocket";

import usePartySocket from "partysocket/react";

import { Button } from "@/components/ui/button";
import { env } from "@/env";

const identify = async (socket: PartySocket) => {
    // the ./auth route will authenticate the connection to the partykit room
    const url = `${window.location.pathname}/auth?_pk=${socket._pk}`;
    const req = await fetch(url, { method: "POST" });

    if (!req.ok) {
        const res = await req.text();
        console.error("Failed to authenticate connection to PartyKit room", res);
    }
};

export const PartykitReact = ({ session }: { session: Session }) => {
    const [user, setUser] = useState<User | null>(null);

    const ws = usePartySocket({
        host: env.NEXT_PUBLIC_PARTYKIT_HOST, // or localhost:1999 in dev
        room: "partykit-room",

        onOpen(e) {
            // identify user upon connection
            if (session.user) {
                void identify(e.target as PartySocket);
            }
        },
        onMessage(event) {
            console.log(event.data);
        },
    });

    return (
        <div className="mt-8 border p-4">
            <Button
                variant="outline"
                onClick={() => {
                    ws.send("Hello, world!");
                }}
            >
                Send
            </Button>
        </div>
    );
};
