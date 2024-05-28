import { Button } from "@/components/ui/button";
import { getAuth, signIn, signOut } from "@/server/auth";

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn();
            }}
        >
            <Button variant="outline" type="submit">
                Sign in
            </Button>
        </form>
    );
}

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <Button variant="outline" type="submit">
                Sign Out
            </Button>
        </form>
    );
}

export default async function Home() {
    const session = await getAuth();

    return (
        <main className="p-8">
            <h1 className="text-xl">Hello, world!</h1>
            <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit sed sequi ut. Sint, harum.
            </p>
            <br />
            {session?.user ? (
                <div>
                    <p className="mb-4">Hello, {session.user.name}! You are signed in.</p>
                    <SignOut />
                </div>
            ) : (
                <SignIn />
            )}
        </main>
    );
}
