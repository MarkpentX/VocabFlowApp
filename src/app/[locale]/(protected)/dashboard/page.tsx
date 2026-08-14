import { Link } from "@/i18n/navigation";
import Header from "@/presentation/components/layout/Header";
import AddWordsBtn from "@/presentation/components/features/dashboard/AddWordsBtn";
import DashboardStatistics from "@/presentation/components/features/dashboard/DashboardStatistics";
import { Suspense } from "react";
import StudyingAnim from "@/presentation/components/features/dashboard/StudyingAnim";
import { useTranslations } from "next-intl";

function Page() {
    const t = useTranslations("dashboard");
    const tCommon = useTranslations("common");

    return (
        <>
            <Header/>
            <section className="max-w-3xl mx-auto px-6 py-8">
                <Suspense fallback={<div>{tCommon("loading")}</div>}>
                    <DashboardStatistics/>
                </Suspense>
                <nav className="mt-8">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                        <li>
                            <AddWordsBtn/>
                        </li>

                        <li>
                            <Link href={"/dictionary"} className="flex items-center justify-center gap-2 text-black text-sm border-1 border-[rgb(226,229,220)] py-3 w-full px-8 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="lucide lucide-tags w-4 h-4">
                                    <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"></path>
                                    <path
                                        d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                    <circle cx="6.5" cy="9.5" r=".5" fill="currentColor"></circle>
                                </svg>
                                {t("viewDictionaries")}
                            </Link>
                        </li>

                        <li>
                            <Link href={"/practice"} className="flex items-center justify-center gap-2 bg-[rgba(236,239,231,0.8)] text-black text-sm border-1 border-[rgb(226,229,220)] py-3 w-full px-8 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="lucide lucide-brain w-4 h-4">
                                    <path
                                        d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                                    <path
                                        d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
                                    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
                                    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
                                    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                                    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                                    <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
                                    <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                                    <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
                                </svg>
                                {t("startPractice")}
                            </Link>
                        </li>

                        <li>
                            <Link href={"/shop"} className="flex items-center justify-center gap-2 text-black text-sm border-1 border-[rgb(226,229,220)] py-3 w-full px-8 rounded-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="lucide lucide-store w-4 h-4">
                                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                                    <path d="M2 7h20"></path>
                                    <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path>
                                </svg>
                                {t("shop")}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </section>
            <StudyingAnim/>
        </>
    );
}

export default Page;
