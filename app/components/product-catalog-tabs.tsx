"use client";

import { productCategories, products } from "@/app/data/products";
import { ProductGrid } from "./product-tile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ProductCatalogTabs() {
  return (
    <Tabs defaultValue="all">
      <TabsList aria-label="Filter products by category">
        <TabsTrigger value="all">All</TabsTrigger>
        {productCategories.map((category) => <TabsTrigger value={category.slug} key={category.slug}>{category.name}</TabsTrigger>)}
      </TabsList>
      <TabsContent value="all"><ProductGrid products={products} /></TabsContent>
      {productCategories.map((category) => (
        <TabsContent value={category.slug} key={category.slug}>
          <ProductGrid products={products.filter((product) => product.category === category.slug)} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
