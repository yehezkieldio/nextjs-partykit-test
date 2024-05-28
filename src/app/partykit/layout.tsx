import { redirect } from "next/navigation";

import { getAuth } from "@/server/auth";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
    const session = await getAuth();
    if (!session?.user) {
        redirect("/");
    }

    return children;
}
