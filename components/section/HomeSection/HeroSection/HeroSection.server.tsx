import { SectionHeading } from "@/components/ui/SectionHeading"
import HeroSearch from "./HeroSection.client"


interface HeroProps {
    suggestions: any[]
    isLoading?: boolean
    lastUpdated?: string
}

export default function HeroSection({
    suggestions,
    isLoading = false,
    lastUpdated = "January 2025",
}: HeroProps) {
    return (
        <section className="bg-white py-16 md:py-24 px-6 lg:px-8 border-b border-gray-200 dark:border-zinc-800">
            <div className="mx-auto max-w-5xl">
                <div className="space-y-8 md:space-y-10">

                    {/* Server-safe heading */}
                    <SectionHeading
                        level="h1"
                        title="Welcome to GOV.SL"
                        description={
                            <>
                                Your go-to source for verified government information,
                                <br />
                                official press releases, announcements, and public communications in Sierra Leone.
                            </>
                        }
                    />

                    {/* Client search component */}
                    <HeroSearch
                        suggestions={suggestions}
                        isLoading={isLoading}
                    />

                    {/* Footer text */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left pt-2">
                        All content officially verified • Last updated: {lastUpdated}
                    </p>

                </div>
            </div>
        </section>
    )
}