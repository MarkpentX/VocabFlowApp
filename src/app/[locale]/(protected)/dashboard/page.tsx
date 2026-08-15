import Header from "@/presentation/components/layout/Header";
import DashboardStatistics from "@/presentation/components/features/dashboard/DashboardStatistics";
import { Suspense } from "react";
import StudyingAnim from "@/presentation/components/features/dashboard/StudyingAnim";
import { useTranslations } from "next-intl";

function Page() {
    const tCommon = useTranslations("common");

    return (
        <>
            <Header/>
            <section className="max-w-3xl mx-auto px-6 py-8">
                <Suspense fallback={<div>{tCommon("loading")}</div>}>
                    <DashboardStatistics/>
                </Suspense>
            </section>
            <StudyingAnim/>
        </>
    );
}

export default Page;
