import { signIn } from "@/server/auth";

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn();
            }}
        >
            <button type="submit">Sign in</button>
        </form>
    );
}

export default async function Home() {
    return (
        <main className="p-8">
            <h1 className="text-xl">Hello, world!</h1>
            <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit sed sequi ut. Sint, harum.
            </p>
            <br />
            <SignIn />
        </main>
    );
}
