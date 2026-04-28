import { createBrowserClient } from "@supabase/ssr";
import { supabase_url, supabase_anon_key } from "./info";

export function createClient() {
    if (!supabase_url || !supabase_anon_key) {
        throw new Error("Missing Supabase environment variables");
    }
    return createBrowserClient(
        supabase_url,
        supabase_anon_key
    );
}