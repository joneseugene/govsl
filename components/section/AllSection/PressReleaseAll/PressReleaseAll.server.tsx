import { getPressReleases } from "@/libs/api/press-releases.api";
import PressReleasesAllClient from "./PreaseReleaseAll.client";

export default async function AllPressReleasesSectionServer() {
    const data = await getPressReleases({
        status: "approved",
    });


    return <PressReleasesAllClient initialData={data} />;
}