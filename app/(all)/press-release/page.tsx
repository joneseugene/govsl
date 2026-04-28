'use server'

import AllPressReleasesClient from "@/components/section/AllSection/PressReleaseAll/PreaseReleaseAll.client"
import { getPressReleases } from "@/libs/api/press-releases.api"


export default async function AllPressReleasesPage() {
  const pressReleases = await getPressReleases()

  const safeData = JSON.parse(JSON.stringify(pressReleases))

  return <AllPressReleasesClient initialData={safeData} />
}