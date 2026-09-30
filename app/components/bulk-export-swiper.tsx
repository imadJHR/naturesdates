"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type BulkFormat = {
  size: string;
  title: string;
  image: string;
  packWeight: string;
  packaging: string;
  imageWidth: number;
  sourceWidth: number;
  imageHeight: number;
  specs: string[][];
};

const pendingBulkSpecs = [
  "Unit dimensions (cm)",
  "Case gross weight",
  "UPC",
  "TI x HI",
  "Pallet quantity",
  "GTIN",
].map((label) => [label, "Available on request"]);

const retailFormats = [
  { size: "125 G", packWeight: "125 g", imageWidth: 260, image: "/images/bulk/retail-125g.webp", imageHeight: 540 },
  { size: "250 G", packWeight: "250 g", imageWidth: 285, image: "/images/bulk/retail-250g.webp", imageHeight: 480 },
  { size: "300 G", packWeight: "300 g", imageWidth: 305, image: "/images/bulk/retail-300g.webp", imageHeight: 480 },
  { size: "500 G", packWeight: "500 g", imageWidth: 330, image: "/images/bulk/retail-500g.webp", imageHeight: 480 },
  { size: "750 G", packWeight: "750 g", imageWidth: 355, image: "/images/bulk/retail-750g.webp", imageHeight: 480 },
].map((format) => ({
  ...format,
  title: "",
  sourceWidth: 720,
  packaging: "clear plastic clamshell",
  specs: pendingBulkSpecs,
}));

const bulkFormats: BulkFormat[] = [
  ...retailFormats,
  {
    size: "1 kg x 6", title: "Whole Medjool Dates", image: "/images/bulk/individual-1kg.webp", packWeight: "1 kg", packaging: "window box", imageWidth: 200, sourceWidth: 720, imageHeight: 520,
    specs: [["Unit dimensions (cm)", "21.82 (L) x 15.95 (W) x 5.49 (H)"], ["Case gross weight", "7.34 kg"], ["UPC", "0 97923-00125 2"], ["TI x HI", "14 x 11"], ["Pallet quantity", "154"], ["GTIN", "10097923001259"]],
  },
  {
    size: "2 kg x 6", title: "Whole Medjool Dates", image: "/images/bulk/individual-2kg.webp", packWeight: "2 kg", packaging: "window box", imageWidth: 240, sourceWidth: 720, imageHeight: 520,
    specs: [["Unit dimensions (cm)", "26.50 (L) x 25.08 (W) x 7.77 (H)"], ["Case gross weight", "13.3 kg"], ["UPC", "0 97923-00116 0"], ["TI x HI", "8 x 8"], ["Pallet quantity", "64"], ["GTIN", "10097923001167"]],
  },
  {
    size: "5 kg", title: "Whole Medjool Dates", image: "/images/bulk/individual-5kg.webp", packWeight: "5 kg", packaging: "window box", imageWidth: 300, sourceWidth: 720, imageHeight: 520,
    specs: [["Unit dimensions (cm)", "39.52 (L) x 29.36 (W) x 9.52 (H)"], ["Case gross weight", "5.556 kg"], ["UPC", "0 97923-54335 6"], ["TI x HI", "10 x 23"], ["Pallet quantity", "230"], ["GTIN", "00097923000309"]],
  },
];

export function BulkExportSwiper() {
  const swiper = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="bulk-export" className="bulk-export bulk-export-swiper-section">
      <div className="bulk-export-ribbon" aria-hidden="true" />
      <div className="section-inner bulk-export-swiper-inner">
        <header className="bulk-export-swiper-heading">
          <div>
            <p className="script small tan">Wholesale ready</p>
            <h2>Export bulk items</h2>
            <p>Reliable Medjool formats for distributors, retailers and foodservice buyers.</p>
          </div>
          <Link className="btn red" href="/contact-us">Request bulk pricing <ArrowRight size={18} /></Link>
        </header>

        <Swiper
          modules={[A11y]}
          slidesPerView={1}
          speed={550}
          onSwiper={(instance) => { swiper.current = instance; }}
          onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
          className="bulk-export-swiper"
        >
          {bulkFormats.map((item) => (
            <SwiperSlide key={item.size}>
              <article className="bulk-export-slide">
                <div className="bulk-export-slide-image">
                  <Image
                    src={item.image}
                    alt={`Natures Dates ${item.packWeight} whole Medjool dates in a ${item.packaging}`}
                    width={item.sourceWidth}
                    height={item.imageHeight}
                    style={{ maxWidth: item.imageWidth }}
                    sizes="(max-width: 700px) 74vw, 320px"
                    priority={item.size === "125 G"}
                  />
                </div>
                <div className="bulk-export-slide-details">
                  <p className="bulk-export-slide-index">Format {String(activeIndex + 1).padStart(2, "0")} / {String(bulkFormats.length).padStart(2, "0")}</p>
                  <h3><strong>{item.size}</strong> {item.title}</h3>
                  <dl>
                    {item.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                  </dl>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="bulk-export-swiper-footer">
          <div className="bulk-export-swiper-controls" aria-label="Bulk format navigation">
            <button type="button" onClick={() => swiper.current?.slidePrev()} aria-label="Previous format"><ArrowLeft size={19} /></button>
            <button type="button" onClick={() => swiper.current?.slideNext()} aria-label="Next format"><ArrowRight size={19} /></button>
          </div>
          <div className="bulk-export-swiper-thumbs" role="tablist" aria-label="Choose a bulk format">
            {bulkFormats.map((item, index) => (
              <button
                type="button"
                role="tab"
                key={item.size}
                aria-selected={activeIndex === index}
                className={activeIndex === index ? "is-active" : ""}
                onClick={() => swiper.current?.slideTo(index)}
              >
                <Image src={item.image} alt="" width={item.sourceWidth} height={item.imageHeight} sizes="88px" />
                <span>{item.size}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
