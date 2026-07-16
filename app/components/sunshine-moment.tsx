"use client";

import type { CSSProperties, ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User, UserCheck, UserRound, Users } from "lucide-react";
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
  accent: string;
  href: string;
  action: string;
  notes: string[];
  icon: ElementType;
};

const moments: Moment[] = [
  {
    id: "morning",
    tab: "Morning",
    eyebrow: "Start bright",
    title: "Blend a sunnier morning.",
    description: "Keep the first decision of the day simple with soft Medjools ready for smoothies, bowls and quick breakfasts.",
    image: "/assets/pack_whole.webp",
    imageAlt: "Whole Medjool dates package",
    accent: "#ffb020",
    href: "/supercharge-your-smoothies",
    action: "Build a smoothie",
    notes: ["Smoothie-ready", "Breakfast ideas"],
    icon: User,
  },
  {
    id: "movement",
    tab: "Movement",
    eyebrow: "Keep moving",
    title: "Pack a simple active snack.",
    description: "Choose a convenient format for the gym bag, a hike or the space between one busy moment and the next.",
    image: "/assets/whole_dates.webp",
    imageAlt: "Pitted fresh Medjool dates package",
    accent: "#698f59",
    href: "/fitness",
    action: "Explore fitness ideas",
    notes: ["Pitted format", "Easy to carry"],
    icon: UserCheck,
  },
  {
    id: "on-the-go",
    tab: "On the go",
    eyebrow: "Pocket sunshine",
    title: "Take a tropical little break.",
    description: "Coconut Mini Medjools bring a bright, portable option to commutes, lunch bags and afternoon adventures.",
    image: "/assets/mini_coconut.webp",
    imageAlt: "Coconut Mini Medjools package",
    accent: "#008b93",
    href: "/products/coconut-mini-medjools",
    action: "Meet Coconut Minis",
    notes: ["Bite-size", "Coconut finish"],
    icon: Users,
  },
  {
    id: "sweet-break",
    tab: "Sweet break",
    eyebrow: "Rich & satisfying",
    title: "Make the pause feel special.",
    description: "Deep cacao, nutty pecan and Medjool character come together for a more playful kind of snack break.",
    image: "/assets/mini_pecan.webp",
    imageAlt: "Cacao Pecan Mini Medjools package",
    accent: "#d44b28",
    href: "/products/cacao-pecan-mini-medjools",
    action: "Meet Cacao Pecan",
    notes: ["Cacao notes", "Pecan finish"],
    icon: UserRound,
  },
];

export function SunshineMoment() {
  return (
    <section className="sunshine-moment" aria-labelledby="sunshine-moment-title">
      <div className="section-inner sunshine-moment-inner">
        <div className="sunshine-moment-heading">
          <div>
            <p className="script small">Made for real life</p>
            <h2 id="sunshine-moment-title">Choose your sunshine moment.</h2>
          </div>
          <p>Pick the rhythm of your day and discover a product, recipe or idea that fits naturally into it.</p>
        </div>

        <Tabs className="moment-tabs" defaultValue={moments[0].id}>
          <TabsList className="moment-tabs-list" aria-label="Choose a moment">
            {moments.map((moment) => {
              const Icon = moment.icon;
              return (
                <TabsTrigger key={moment.id} value={moment.id} className="moment-tab-trigger">
                  <Icon size={18} aria-hidden="true" />
                  {moment.tab}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {moments.map((moment) => (
            <TabsContent key={moment.id} value={moment.id} className="moment-tab-content">
              <article className="moment-panel" style={{ "--moment-accent": moment.accent } as CSSProperties}>
                <div className="moment-copy">
                  <p className="moment-eyebrow">{moment.eyebrow}</p>
                  <h3>{moment.title}</h3>
                  <p>{moment.description}</p>
                  <ul aria-label="Highlights">
                    {moment.notes.map((note) => <li key={note}>{note}</li>)}
                  </ul>
                  <Button asChild size="lg">
                    <Link href={moment.href}>{moment.action} <ArrowRight size={18} /></Link>
                  </Button>
                </div>
                <div className="moment-visual">
                  <span className="moment-orbit orbit-one" />
                  <span className="moment-orbit orbit-two" />
                  <span className="moment-sun" />
                  <Image src={moment.image} alt={moment.imageAlt} width={622} height={569} sizes="(max-width: 720px) 72vw, 430px" />
                  <span className="moment-stamp">Your pick</span>
                </div>
              </article>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
