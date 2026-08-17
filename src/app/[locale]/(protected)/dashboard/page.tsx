import Header from "@/presentation/components/layout/Header";
import DashboardStatistics from "@/presentation/components/features/dashboard/DashboardStatistics";
import { Suspense } from "react";
import StudyingAnim from "@/presentation/components/features/dashboard/StudyingAnim";
import { getTranslations } from "next-intl/server";
import OnboardingFlow from "@/presentation/components/features/onboarding/OnboardingFlow";
import { getOnboardingStatusAction } from "@/presentation/actions/onboarding-actions";

export const dynamic = "force-dynamic";

async function Page() {
    const tCommon = await getTranslations("common");
    const onboardingStatus = await getOnboardingStatusAction();

    return (
        <>
            {onboardingStatus.isSuccess && onboardingStatus.data && <OnboardingFlow/>}
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
