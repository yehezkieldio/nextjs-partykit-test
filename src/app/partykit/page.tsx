import { PartykitReact } from "@/app/partykit/PartykitReact";
import { getAuth } from "@/server/auth";

export default async function PartyKit() {
    const session = await getAuth();

    return (
        <main className="p-8">
            <h1 className="text-xl">Hello, world!</h1>
            <PartykitReact session={session!} />
        </main>
    );
}
