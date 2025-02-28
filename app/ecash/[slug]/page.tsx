import { notFound } from "next/navigation";
import {
    allInfrastructures,
    allInfrastructureSlugs,
} from "@/util/infrastructure_index";
import InfrastructureMenu from "@/components/infrastructure/infrastructureMenu";
import InfrastructureBody from "@/components/infrastructure/infrastructureBody";
import InfrastructureOverview from "@/components/infrastructure/infrastructureOverview";
import InfrastructureImage from "@/components/infrastructure/infrastructure-image";
import AltTVLChart from "@/components/charts/alt-tvl-chart";

async function getInfrastructureFromSlug(slug: string) {
    const infrastructure = allInfrastructures.find(
        (infrastructure) => infrastructure.slug === slug,
    );
    if (!infrastructure) {
        return null;
    }
    return infrastructure;
}

export default async function InfrastructurePage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    const infrastructure = await getInfrastructureFromSlug(slug);

    if (!infrastructure) {
        return notFound();
    }

    return (
        <article className="flex flex-col lg:min-h-screen max-w-5xl mx-auto lg:pt-24 pt-12">
            <div className="flex justify-start items-center lg:gap-8 gap-2 lg:my-12 my-6 px-4 lg:px-0">
                <div className="flex justify-center items-center">
                    <InfrastructureImage
                        title={infrastructure.title}
                        src={`/logos/${infrastructure.slug}.png`}
                    />{" "}
                </div>
                <div className="flex-grow flex items-center">
                    <h1 className="layer_header flex-grow">
                        {infrastructure.title}
                    </h1>
                </div>
            </div>
            <div className="container flex lg:flex-row flex-col">
                <div className="lg:w-1/5 sticky top-[48px] lg:h-screen w-full overflow-y-auto lg:pt-6 px-4 lg:px-0 no-scrollbar py-0 bg-white">
                    <InfrastructureMenu infrastructure={infrastructure} />
                </div>
                <div className="lg:w-4/5 flex flex-col px-4 lg:px-0">
                    <InfrastructureOverview infrastructure={infrastructure} />
                    <AltTVLChart />
                    <InfrastructureBody infrastructure={infrastructure} />
                </div>
            </div>
        </article>
    );
}

export async function generateStaticParams() {
    return allInfrastructureSlugs.map((slug) => ({
        slug,
    }));
}
