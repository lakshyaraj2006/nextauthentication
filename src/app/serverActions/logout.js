"use server"

import { cookies } from "next/headers";

export default async function logout() {
    const cookiesStore = await cookies();
    const authToken = cookiesStore.get('authtoken');
    let success = false;

    if (authToken) {
        cookiesStore.delete('authtoken');
        success = true;
        return { success, message: "Logged out successfully!" }
    } else {
        return { success, message: "Some error occurred! No auth token." }
    }
}

