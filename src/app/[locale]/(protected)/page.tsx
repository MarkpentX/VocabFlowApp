import Image from "next/image";
import Header from "@/presentation/components/layout/Header";
import StartLearning from "@/presentation/components/features/home/StartLearning";
import { TextAnimate } from "@/presentation/components/ui/text-animate";
import { HyperText } from "@/presentation/components/ui/hyper-text";
import { ReviewsList } from "@/presentation/components/features/home/ReviewsList";
import FeatureDuck from "@/presentation/components/features/practice/FeatureDuck";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("home");

    const advantages = [
        { icon: "/book.svg", key: "saveWords" },
        { icon: "/exam.svg", key: "grammar" },
        { icon: "/brain.svg", key: "aiDiagnostics" },
    ] as const;

  return (
      <>
          <Header/>
          <main>
              <section className="max-w-2xl text-center mx-auto px-4 pt-10 pb-6 mt-16 mb-8 max-md:my-8 max-md:py-[26px]">
                  <div className="flex justify-center mb-2">
                      <FeatureDuck src="/duck_looking_for.lottie" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36" />
                  </div>

                  <h1 className="animate-[fadeInUp_0.6s_ease-out_forwards] font-spaceGrotesk text-[3.75rem] tracking-[-0.025em] font-bold leading-[1] animate-fade-up opacity-0 max-md:text-[2.75rem] max-sm:text-[2.25rem]">{t("heroTitlePrefix")}
                      <span className="text-green-600"> {t("heroTitleHighlight")}</span>
                  </h1>
                      <TextAnimate className="font-dMSans text-[rgb(103,126,119)] text-base my-[1.5rem] max-w-md mx-auto animate-[fadeInUp_0.6s_ease-out_forwards] max-md:text-sm" animation="blurIn" as="p">
                          {t("heroSubtitle")}
                      </TextAnimate>
                  <StartLearning/>
              </section>
              <ReviewsList/>
              <section className="mt-8 px-4">
                  <h2 className="text-green-600 text-2xl text-center font-spaceGrotesk font-bold">{t("featuresTitle")}</h2>
                  <ul className="flex flex-col md:flex-row gap-6 my-4 w-full max-w-[896px] mx-auto">
                      {advantages.map(item => (
                          <li className="flex-1 animate-[fadeInUp_0.6s_ease-out_forwards] bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-6 rounded-xl" key={item.key}>
                              <Image className="w-10 h-10" src={item.icon} alt="advantage-icon" width={40} height={40}/>
                              <h3>
                                  <HyperText className="my-3 text-[rgb(18,33,28)] font-spaceGrotesk font-bold text-lg py-0">{t(`advantages.${item.key}.title`)}</HyperText>
                              </h3>
                              <p className="text-[rgb(103,126,119)] font-dMSans text-sm">{t(`advantages.${item.key}.desc`)}</p>
                          </li>
                      ))}
                  </ul>
              </section>
          </main>
      </>
  );
}
