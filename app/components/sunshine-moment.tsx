"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type Moment = {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  productImage: string;
  productLabel: string;
  accent: string;
  href: string;
  action: string;
  notes: string[];
};

const moments: Moment[] = [
  {
    id: "morning",
    tab: "Morning",
    eyebrow: "Start bright",
    title: "Blend a sunnier morning.",
    description:
      "Keep the first decision of the day simple with soft Medjools ready for smoothies, bowls and quick breakfasts.",
    image: "/images/home/moments/morning-medjool-moment.webp",
    imageAlt:
      "A breakfast bowl topped with Medjool dates beside a morning smoothie",
    productImage: "/natures-dates-logo.webp",
    productLabel: "Organic Whole Medjools",
    accent: "#ffb020",
    href: "/supercharge-your-smoothies",
    action: "Build a smoothie",
    notes: ["Smoothie-ready", "Breakfast ideas"],
  },
  {
    id: "movement",
    tab: "Movement",
    eyebrow: "Keep moving",
    title: "Pack a simple active snack.",
    description:
      "Choose a convenient format for the gym bag, a hike or the space between one busy moment and the next.",
    image: "/images/home/moments/movement-medjool-moment.webp",
    imageAlt:
      "A hiker enjoying Medjool dates during a sunlit trail break",
    productImage: "/natures-dates-logo.webp",
    productLabel: "Pitted Fresh Medjools",
    accent: "#698f59",
    href: "/fitness",
    action: "Explore fitness ideas",
    notes: ["Pitted format", "Easy to carry"],
  },
  {
    id: "on-the-go",
    tab: "On the go",
    eyebrow: "Pocket sunshine",
    title: "Take a tropical little break.",
    description:
      "Coconut Mini Medjools bring a bright, portable option to commutes, lunch bags and afternoon adventures.",
    image: "/images/home/moments/on-the-go-medjool-moment.webp",
    imageAlt:
      "A young professional packing date bites into a reusable lunch tote",
    productImage: "/natures-dates-logo.webp",
    productLabel: "Coconut Mini Medjools",
    accent: "#008b93",
    href: "/products/coconut-mini-medjools",
    action: "Meet Coconut Minis",
    notes: ["Bite-size", "Coconut finish"],
  },
  {
    id: "sweet-break",
    tab: "Sweet break",
    eyebrow: "Rich & satisfying",
    title: "Make the pause feel special.",
    description:
      "Deep cacao, nutty pecan and Medjool character come together for a more playful kind of snack break.",
    image: "/images/home/moments/sweet-break-medjool-moment.webp",
    imageAlt:
      "Cacao Medjool date bites with espresso and pecans on a ceramic tray",
    productImage: "/natures-dates-logo.webp",
    productLabel: "Cacao Pecan Mini Medjools",
    accent: "#d44b28",
    href: "/products/cacao-pecan-mini-medjools",
    action: "Meet Cacao Pecan",
    notes: ["Cacao notes", "Pecan finish"],
  },
];

export function SunshineMoment() {
  return (
    <section
      className="relative overflow-hidden isolate bg-[#1B4D3E] text-white scroll-mt-[110px] before:content-[''] before:absolute before:z-[-1] before:w-[620px] before:h-[620px] before:top-[-360px] before:right-[-130px] before:border-[105px] before:border-[rgba(201,169,97,0.18)] before:rounded-full after:content-[''] after:absolute after:z-[-1] after:w-[420px] after:h-[420px] after:bottom-[-310px] after:left-[-120px] after:rounded-[44%_56%_58%_42%] after:bg-[rgba(139,24,50,0.35)] after:rotate-[23deg]"
      id="moments"
      aria-labelledby="sunshine-moment-title"
    >
      <div className="w-[min(1240px,calc(100%-32px))] mx-auto py-[clamp(76px,9vw,118px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.65fr] gap-[clamp(30px,7vw,100px)] items-end mb-[42px]">
          <div>
            <p className="font-script text-[clamp(40px,5vw,76px)] leading-[0.95] text-[#C9A961] mb-3">Made for real life</p>
            <h2 id="sunshine-moment-title" className="max-w-[760px] m-0 text-white text-[clamp(48px,7vw,92px)] leading-[0.86] tracking-[-0.06em]">
              Choose your sunshine moment.
            </h2>
          </div>

          <p className="m-0 text-[rgba(255,255,255,0.76)] text-[clamp(16px,2vw,19px)] font-bold leading-[1.65]">
            Pick the rhythm of your day and discover a product, recipe or idea
            that fits naturally into it.
          </p>
        </div>

        <Tabs className="grid gap-[26px]" defaultValue={moments[0].id}>
          <TabsList
            className="w-fit border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)]"
            aria-label="Choose a moment"
          >
            {moments.map((moment) => (
              <TabsTrigger
                key={moment.id}
                value={moment.id}
                className="min-w-0 gap-2 text-[rgba(255,255,255,0.68)] data-[state=active]:bg-white data-[state=active]:text-[#1B4D3E] data-[state=active]:shadow-[0_12px_28px_rgba(27,77,62,0.22)] hover:text-white"
              >
                {moment.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {moments.map((moment) => (
            <TabsContent
              key={moment.id}
              value={moment.id}
              className="data-[state=active]:animate-[moment-in_0.48s_cubic-bezier(0.2,0.8,0.2,1)]"
            >
              <article
                className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] min-h-[560px] overflow-hidden border border-white/20 rounded-[52px] bg-white text-[#1B4D3E] shadow-[0_38px_90px_rgba(27,77,62,0.3)]"
                style={
                  {
                    "--moment-accent": moment.accent,
                  } as CSSProperties
                }
              >
                <div className="relative min-h-[400px] lg:min-h-full grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_52%,color-mix(in_srgb,var(--moment-accent)_28%,white),transparent_54%),rgba(212,165,116,0.2)] after:content-[''] after:absolute after:right-[-10%] after:bottom-[-24%] after:w-[64%] after:aspect-square after:rounded-[42%_58%_45%_55%] after:bg-[color-mix(in_srgb,var(--moment-accent)_72%,transparent)] after:-rotate-[24deg]">
                  <Image
                    src={moment.image}
                    alt={moment.imageAlt}
                    fill
                    className="z-[4] object-cover animate-[moment-float_5.5s_ease-in-out_infinite]"
                    sizes="(max-width: 900px) 94vw, 62vw"
                  />
                </div>

                <div className="z-[3] flex flex-col items-start justify-center p-[clamp(36px,5vw,72px)]">
                  <p className="m-0 mb-[15px] text-[var(--moment-accent)] text-xs font-black tracking-[0.15em] uppercase">{moment.eyebrow}</p>
                  <h3 className="max-w-[540px] m-0 text-[clamp(42px,5vw,70px)] leading-[0.9] tracking-[-0.055em]">{moment.title}</h3>
                  <p className="max-w-[560px] mt-[22px] text-[rgba(27,77,62,0.74)] text-[17px] leading-[1.65]">{moment.description}</p>

                  <ul className="m-6 mb-[30px] p-0 flex flex-wrap gap-2 list-none" aria-label="Highlights">
                    {moment.notes.map((note) => (
                      <li key={note} className="border border-[color-mix(in_srgb,var(--moment-accent)_36%,transparent)] rounded-full px-3 py-2 bg-[color-mix(in_srgb,var(--moment-accent)_11%,white)] text-[#1B4D3E] text-xs font-black uppercase tracking-[0.04em]">
                        {note}
                      </li>
                    ))}
                  </ul>

                  <Button asChild size="lg">
                    <Link href={moment.href}>
                      {moment.action}
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>
              </article>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
