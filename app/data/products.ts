export const productCategories = [
  {
    slug: "fresh-dates",
    name: "Fresh Dates",
    description: "Classic whole and pitted Medjool dates for snacking and recipes.",
    eyebrow: "The Medjool original",
    heroTitle: "Classic fruit. Two easy ways.",
    heroImage: "/images/home/date-palm-golden-hour.webp",
    heroAlt: "A bowl of premium Medjool dates in a golden-hour palm grove",
    highlights: ["Whole or pitted", "Soft, caramel-like bite", "Snack and recipe ready"],
    guideTitle: "Choose around the moment.",
    guideBody: "Keep the pit for the classic whole-fruit ritual, or choose pitted dates when speed matters. Both formats bring the same generous Medjool character to snacks and recipes.",
  },
  {
    slug: "organic",
    name: "Organic",
    description: "Organic Medjool selections with the same soft texture and caramel-like flavor.",
    eyebrow: "Label-aware organic choices",
    heroTitle: "Organic options, made beautifully simple.",
    heroImage: "/images/ingredients/date-harvest.webp",
    heroAlt: "Fresh date clusters being carefully harvested from a palm",
    highlights: ["Whole and pitted formats", "Current label comes first", "Everyday pantry versatility"],
    guideTitle: "Look for the mark on the pack.",
    guideBody: "Organic status belongs to the exact product and certification shown on its current package. Choose whole or pitted based on how you plan to snack, blend or cook.",
  },
  {
    slug: "mini-medjools",
    name: "Mini Medjools",
    description: "Portable Medjool bites blended with simple, flavorful ingredients.",
    eyebrow: "Small bites, bright flavors",
    heroTitle: "A little Medjool moment, ready to go.",
    heroImage: "/images/family/lunchbox-kitchen.webp",
    heroAlt: "A parent and child preparing a colorful date snack box",
    highlights: ["Portable bite-size format", "Coconut or cacao pecan", "Made for busy snack breaks"],
    guideTitle: "Pick the flavor that fits the break.",
    guideBody: "Coconut keeps things light and tropical; cacao pecan brings a deeper, nutty profile. Always check the current ingredient and allergen statement before choosing.",
  },
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
  taste: string;
  suggestedUses: string[];
  storage: string;
  ingredientNote: string;
  purchaseNote: string;
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
    taste: "Deep caramel-like sweetness with a soft, chewy bite.",
    suggestedUses: ["Enjoy straight from the pack after removing the pit", "Stuff with a favorite sweet or savory filling", "Chop into breakfast bowls and salads"],
    storage: "Follow the storage directions on the current package. Reseal after opening and keep away from excess heat and moisture.",
    ingredientNote: "Whole Medjool dates. Verify the current package for the definitive ingredient and allergen information.",
    purchaseNote: "Pack sizes, availability and pricing must be confirmed for your market.",
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
    taste: "Soft and caramel-like, with the pit already removed for convenience.",
    suggestedUses: ["Blend into smoothies", "Pulse into no-bake energy bites", "Chop into oats or baked recipes"],
    storage: "Follow the storage directions on the current package. Reseal after opening and keep away from excess heat and moisture.",
    ingredientNote: "Pitted Medjool dates. Check each date before serving and verify the current package for definitive details.",
    purchaseNote: "Pack sizes, availability and pricing must be confirmed for your market.",
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
    taste: "Classic Medjool richness with a tender, chewy texture.",
    suggestedUses: ["Serve on a premium snack board", "Stuff after removing the pit", "Chop into sweet or savory recipes"],
    storage: "Follow the storage directions on the current package and reseal after opening.",
    ingredientNote: "Verify the current package for ingredients, allergens and the applicable organic certification mark.",
    purchaseNote: "Organic status, pack sizes and availability must be verified on the current product listing or package.",
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
    taste: "Rich, naturally sweet Medjool flavor in an easy-to-prepare format.",
    suggestedUses: ["Blend into smoothies", "Make homemade date paste", "Fold into breakfast recipes"],
    storage: "Follow the storage directions on the current package and reseal after opening.",
    ingredientNote: "Verify the current package for ingredients, allergens and the applicable organic certification mark.",
    purchaseNote: "Organic status, pack sizes and availability must be verified on the current product listing or package.",
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
    taste: "Caramel-like date sweetness with a light tropical coconut finish.",
    suggestedUses: ["Pack for a workday break", "Add to a snack board", "Carry as a convenient travel snack"],
    storage: "Follow the storage directions on the current package and reseal after opening.",
    ingredientNote: "Contains a flavored date-based blend. Verify the full ingredient and allergen statement on the current package.",
    purchaseNote: "Flavor formulation, pack sizes and availability must be confirmed from the current package or seller.",
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
    taste: "Deep cacao notes, nutty pecan character and naturally sweet date flavor.",
    suggestedUses: ["Enjoy as an afternoon snack", "Pack for travel", "Serve with fruit on a snack board"],
    storage: "Follow the storage directions on the current package and reseal after opening.",
    ingredientNote: "Contains pecan and may contain other allergens. Verify the full ingredient and allergen statement on the current package.",
    purchaseNote: "Flavor formulation, pack sizes and availability must be confirmed from the current package or seller.",
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
