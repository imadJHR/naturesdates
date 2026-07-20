
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
    productImage: "/assets/pack_whole.webp",
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
    productImage: "/assets/whole_dates.webp",
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
    productImage: "/assets/mini_coconut.webp",
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
    productImage: "/assets/mini_pecan.webp",
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
      className="sunshine-moment"
      id="moments"
      aria-labelledby="sunshine-moment-title"
    >
      <div className="section-inner sunshine-moment-inner">
        <div className="sunshine-moment-heading">
          <div>
            <p className="script small">Made for real life</p>
            <h2 id="sunshine-moment-title">
              Choose your sunshine moment.
            </h2>
          </div>

          <p>
            Pick the rhythm of your day and discover a product, recipe or idea
            that fits naturally into it.
          </p>
        </div>

        <Tabs className="moment-tabs" defaultValue={moments[0].id}>
          <TabsList
            className="moment-tabs-list"
            aria-label="Choose a moment"
          >
            {moments.map((moment) => (
              <TabsTrigger
                key={moment.id}
                value={moment.id}
                className="moment-tab-trigger"
              >
                {moment.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {moments.map((moment) => (
            <TabsContent
              key={moment.id}
              value={moment.id}
              className="moment-tab-content"
            >
              <article
                className="moment-panel"
                style={
                  {
                    "--moment-accent": moment.accent,
                  } as CSSProperties
                }
              >
                <div className="moment-visual">
                  <Image
                    className="moment-scene"
                    src={moment.image}
                    alt={moment.imageAlt}
                    fill
                    sizes="(max-width: 900px) 94vw, 62vw"
                  />

                  <span className="moment-photo-label">
                    A moment made yours
                  </span>
                </div>

                <div className="moment-copy">
                  <p className="moment-eyebrow">{moment.eyebrow}</p>
                  <h3>{moment.title}</h3>
                  <p>{moment.description}</p>

                  <ul aria-label="Highlights">
                    {moment.notes.map((note) => (
                      <li key={note}>{note}</li>
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
