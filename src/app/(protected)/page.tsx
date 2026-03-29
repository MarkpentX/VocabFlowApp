import bookIcon from '../../../public/book.svg'
import tagIcon from '../../../public/tag.svg'
import brainIcon from '../../../public/brain.svg'
import Image from "next/image";
import Header from "@/components/Header";
import StartLearning from "@/app/(protected)/components/StartLearning";

export default function Home() {
    const advantages = [
        {
            icon: bookIcon,
            title: "Save Words",
            desc: "Build your personal vocabulary with words and translations.",
        },
        {
            icon: tagIcon,
            title: "Organize with Tags",
            desc: "Group words by topic — food, travel, business, and more.",
        },
        {
            icon: brainIcon,
            title: "Practice & Learn",
            desc: "Test yourself with interactive quizzes and track progress.",
        },
    ]

  return (
      <>
          <Header/>
          <main>
              <section className="max-w-2xl text-center mx-auto py-[64px] my-24 max-md:my-12 max-md:py-[26px]">
                  <h1 className="animate-[fadeInUp_0.6s_ease-out_forwards] font-spaceGrotesk text-[3.75rem] tracking-[-0.025em] font-bold leading-[1] animate-fade-up opacity-0 max-md:text-[2.75rem]">Learn languages by
                      <span className="text-green-600"> practicing vocabulary</span>
                  </h1>
                  <p className="font-dMSans text-[rgb(103,126,119)] text-lg my-[1.5rem] max-w-lg mx-auto animate-[fadeInUp_0.6s_ease-out_forwards] max-md:text-sm">Save words, organize them with tags, and practice with interactive quizzes. Your personal vocabulary trainer — simple and effective.</p>
                  <StartLearning/>
              </section>

              <ul className="flex gap-6 my-[4rem] w-[896px] mx-auto max-md:flex-col max-md:w-[316]">
                  {advantages.map(item => (
                      <li className="animate-[fadeInUp_0.6s_ease-out_forwards] bg-[rgb(255,255,255)] border-[rgb(226,229,220)] drop-shadow-sm shadow-black p-6 rounded-xl" key={item.title}>
                          <Image className="w-10 h-10" src={item.icon} alt="advantage-icon"/>
                          <h3 className="my-3 text-[rgb(18,33,28)] font-spaceGrotesk font-bold text-lg">{item.title}</h3>
                          <p className="text-[rgb(103,126,119)] font-dMSans text-sm">{item.desc}</p>
                      </li>
                  ))}
              </ul>
          </main>
      </>
  );
}
