import { getServices } from "@/libs/api/services.api";

export const popularServicesQueryKey = ["home-popular-services"];

export async function getHomePopularServices() {
    return getServices();
}