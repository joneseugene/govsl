'use server'

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabase_url, supabase_anon_key } from "./info";

export async function createServerSupabaseClient() {
    const cookieStore = await cookies();

    if (!supabase_url || !supabase_anon_key) {
        throw new Error("Missing Supabase environment variables");
    }

    return createServerClient(supabase_url, supabase_anon_key, {
        cookies: {
        getAll() {
            return cookieStore.getAll();
        },
        setAll() {},
        },
    });
}
