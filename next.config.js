/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? "127.0.0.1:1999";
const PARTYKIT_PROTOCOL =
    PARTYKIT_HOST?.startsWith("localhost") || PARTYKIT_HOST?.startsWith("127.0.0.1") ? "http" : "https";
const PARTYKIT_URL = `${PARTYKIT_PROTOCOL}://${PARTYKIT_HOST}`;

/** @type {import("next").NextConfig} */
const config = {
    rewrites: async () => [
        {
            source: "/partykit/auth",
            has: [{ type: "query", key: "_pk", value: "(?<pk>.*)" }],
            destination: `${PARTYKIT_URL}/party/partykit-room/auth?_pk=:pk`,
        },
    ],
};

export default config;
