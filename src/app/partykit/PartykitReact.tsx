"use client";

import type { Session } from "next-auth";
import type PartySocket from "partysocket";

import usePartySocket from "partysocket/react";

import { Button } from "@/components/ui/button";
import { env } from "@/env";

const identify = async (socket: PartySocket) => {
    const url = `${window.location.pathname}/auth?_pk=${socket._pk}`;
    const req = await fetch(url, { method: "POST" });

    if (!req.ok) {
        const res = await req.text();
        console.error("Failed to authenticate connection to PartyKit room", res);
    }
};

export const PartykitReact = ({ session }: { session: Session }) => {
    const ws = usePartySocket({
        host: env.NEXT_PUBLIC_PARTYKIT_HOST,
        room: "partykit-room",

        onOpen(e) {
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
            <p>
                {session.user ? (
                    <span>Hello, {session.user.name}! You are connected to the PartyKit room.</span>
                ) : (
                    <span>Not connected to PartyKit room.</span>
                )}
            </p>
            <br />
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
