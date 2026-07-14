export const productCategories = [
  { slug: "fresh-dates", name: "Fresh Dates", description: "Classic whole and pitted Medjool dates for snacking and recipes." },
  { slug: "organic", name: "Organic", description: "Organic Medjool selections with the same soft texture and caramel-like flavor." },
  { slug: "mini-medjools", name: "Mini Medjools", description: "Portable Medjool bites blended with simple, flavorful ingredients." },
] as const;

export type ProductCategorySlug = (typeof productCategories)[number]["slug"];

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategorySlug;
  image: string;
  accent: string;
  description: string;
  longDescription: string;
  highlights: string[];
  isNew?: boolean;
};

export const products: Product[] = [
  {
    slug: "whole-fresh-medjool-dates",
    name: "Whole Fresh Medjool Dates",
    shortName: "Whole Fresh",
    category: "fresh-dates",
    image: "/assets/pack_whole.webp",
    accent: "#c10230",
    description: "Plump, soft Medjool dates with their pits intact.",
    longDescription: "The classic Medjool experience: naturally sweet fruit with a soft bite and deep caramel-like character. Enjoy them straight from the pack or use them in your favorite kitchen creations.",
    highlights: ["Whole Medjool fruit", "Soft, rich texture", "Ideal for snacking or recipes"],
  },
  {
    slug: "pitted-fresh-medjool-dates",
    name: "Pitted Fresh Medjool Dates",
    shortName: "Pitted Fresh",
    category: "fresh-dates",
    image: "/assets/whole_dates.webp",
    accent: "#d35a23",
    description: "The same Medjool flavor with the pit already removed.",
    longDescription: "Ready when you are, pitted Medjool dates make everyday snacking and recipe prep beautifully simple. Their soft texture works especially well in smoothies, energy bites and baked recipes.",
    highlights: ["Conveniently pitted", "Recipe-ready", "Naturally sweet flavor"],
  },
  {
    slug: "organic-whole-medjool-dates",
    name: "Organic Whole Medjool Dates",
    shortName: "Organic Whole",
    category: "organic",
    image: "/assets/pack_whole.webp",
    accent: "#28724b",
    description: "Whole Medjool dates presented as an organic selection.",
    longDescription: "A whole-fruit organic option for shoppers who love classic Medjool texture and flavor. Keep the pit in until you are ready to enjoy each naturally sweet bite.",
    highlights: ["Organic selection", "Whole fruit format", "Versatile pantry staple"],
  },
  {
    slug: "organic-pitted-medjool-dates",
    name: "Organic Pitted Medjool Dates",
    shortName: "Organic Pitted",
    category: "organic",
    image: "/assets/whole_dates.webp",
    accent: "#698f59",
    description: "Organic Medjool dates in a convenient pitted format.",
    longDescription: "A convenient organic option made for quick snacks and easy recipe preparation. The pits are removed so the naturally soft Medjool fruit is ready to blend, chop or enjoy.",
    highlights: ["Organic selection", "Pit removed", "Easy everyday use"],
    isNew: true,
  },
  {
    slug: "coconut-mini-medjools",
    name: "Coconut Mini Medjools",
    shortName: "Coconut Minis",
    category: "mini-medjools",
    image: "/assets/mini_coconut.webp",
    accent: "#008b93",
    description: "Portable Medjool bites finished with coconut flavor.",
    longDescription: "A bright, tropical take on Medjool snacking. The bite-size format is easy to carry and pairs the fruit's caramel-like depth with a light coconut finish.",
    highlights: ["Portable bite-size format", "Coconut flavor", "Made for on-the-go moments"],
    isNew: true,
  },
  {
    slug: "cacao-pecan-mini-medjools",
    name: "Cacao Pecan Mini Medjools",
    shortName: "Cacao Pecan Minis",
    category: "mini-medjools",
    image: "/assets/mini_pecan.webp",
    accent: "#004c5a",
    description: "Medjool bites with a rich cacao and pecan profile.",
    longDescription: "A satisfying bite that brings together Medjool fruit, deep cacao notes and nutty pecan character. Designed for snack drawers, travel bags and afternoon breaks.",
    highlights: ["Cacao and pecan profile", "Portable bite-size format", "Rich, satisfying flavor"],
    isNew: true,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getProductsByCategory(category: ProductCategorySlug) {
  return products.filter((product) => product.category === category);
}
