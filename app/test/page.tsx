import { getAnnouncements } from "@/libs/api/announcements.api";
import { getAppointments } from "@/libs/api/appointments.api";
import { getMdas } from "@/libs/api/mdas.api";
import { getNewsArticles } from "@/libs/api/news.articles.api";
import { getPressReleases } from "@/libs/api/press-releases.api";
import { getPublications } from "@/libs/api/publications.api";
import { getServiceDetails } from "@/libs/api/service_details.api";
import { getServices } from "@/libs/api/services.api";
import { AnnouncementInterface } from "@/libs/interface/announcements.interface";
import { AppointmentInterface } from "@/libs/interface/appointments.interface";
import { MDAInterface } from "@/libs/interface/mda/mdas.interface";
import { NewsArticleInterface } from "@/libs/interface/news.articles.interface";
import { PressReleaseInterface } from "@/libs/interface/press.releases.interface";
import { PublicationInterface } from "@/libs/interface/publications.interface";
import { ServiceDetailsInterface } from "@/libs/interface/service/service.details.interface";
import { ServicesInterface } from "@/libs/interface/service/services.interface";

export default async function PressReleaseSection() {
    const announcement_data: AnnouncementInterface[] =
        await getAnnouncements();

    const appointment_data: AppointmentInterface[] =
        await getAppointments();

    const news_data: NewsArticleInterface[] =
        await getNewsArticles();

    const press_release_data: PressReleaseInterface[] =
        await getPressReleases();

    const publication_data: PublicationInterface[] =
        await getPublications();

    const mda_data: MDAInterface[] =
        await getMdas();

    const service_data: ServicesInterface[] =
        await getServices();

    const service_detail_data: ServiceDetailsInterface[] =
        await getServiceDetails();

    return (
        <div className="space-y-10">

            {/* ===================== ANNOUNCEMENTS ===================== */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Announcements
                </h2>

                {announcement_data?.length ? (
                    <div className="grid gap-4">
                        {announcement_data.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 border rounded-lg hover:shadow-sm transition"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {item.title ?? "Untitled"}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.description ?? "No description available"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No announcements available.
                    </p>
                )}
            </section>

            {/* ===================== APPOINTMENT ===================== */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Appointments
                </h2>

                {appointment_data?.length ? (
                    <div className="grid gap-4">
                        {appointment_data.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 border rounded-lg hover:shadow-sm transition"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {item.title ?? "Untitled"}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.description ?? "No description available"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No announcements available.
                    </p>
                )}
            </section>

            {/* ===================== NEWS ===================== */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    News
                </h2>

                {news_data?.length ? (
                    <div className="grid gap-4">
                        {news_data.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 border rounded-lg hover:shadow-sm transition"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {item.title ?? "Untitled"}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.headline ?? "No headline available"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No news articles available.
                    </p>
                )}
            </section>

            {/* ===================== PRESS RELEASE ===================== */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Press Release
                </h2>

                {press_release_data?.length ? (
                    <div className="grid gap-4">
                        {press_release_data.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 border rounded-lg hover:shadow-sm transition"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {item.title ?? "Untitled"}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.description ?? "No description available"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No press release available.
                    </p>
                )}
            </section>

            {/* ===================== PUBLICATIONS ===================== */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Publications
                </h2>

                {publication_data?.length ? (
                    <div className="grid gap-4">
                        {publication_data.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 border rounded-lg hover:shadow-sm transition"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {item.title ?? "Untitled"}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.description ?? "No description available"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No publication available.
                    </p>
                )}
            </section>

            {/* ===================== MDA ===================== */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    MDA
                </h2>

                {mda_data?.length ? (
                    <div className="grid gap-4">
                        {mda_data.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 border rounded-lg hover:shadow-sm transition"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {item.name ?? "Untitled"}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.acronym ?? "No acronym available"}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.minister?.name ?? "No minister available"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No mda available.
                    </p>
                )}
            </section>

            {/* ===================== SERVICES ===================== */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Services
                </h2>

                {service_data?.length ? (
                    <div className="grid gap-4">
                        {service_data.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 border rounded-lg hover:shadow-sm transition"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {item.name ?? "Untitled"}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.description ?? "No description available"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No service available.
                    </p>
                )}
            </section>

            {/* ===================== SERVICE DETAIL ===================== */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Service Detail
                </h2>

                {service_detail_data?.length ? (
                    <div className="grid gap-4">
                        {service_detail_data.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 border rounded-lg hover:shadow-sm transition"
                            >
                                <h3 className="font-semibold text-gray-900">
                                    {item.name ?? "Untitled"}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.price ?? "No price available"}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {item.description ?? "No description available"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No service detail available.
                    </p>
                )}
            </section>

        </div>
    );
}