export type ProductRecord = {
  id: string;
  name: string;
  category: string;
  supplier: string;
  availability: "in-stock" | "low" | "backorder";
  description: string;
  updatedAt: string;
};

const products: ProductRecord[] = [
  {
    id: "prod-arabica",
    name: "Organic Arabica Roast",
    category: "Agro Commodities",
    supplier: "Aurora Commodities",
    availability: "in-stock",
    description:
      "Single-origin lots with full traceability, popular with specialty roasters.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "prod-sensors",
    name: "Smart Cold Chain Sensors",
    category: "Industrial Components",
    supplier: "Zenith Devices",
    availability: "low",
    description:
      "IoT sensors actively monitoring temperature for pharmaceutical logistics.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "prod-packaging",
    name: "Sustainable Packaging Kit",
    category: "Fast Moving Goods",
    supplier: "Evergreen Supplies",
    availability: "in-stock",
    description:
      "Compostable packaging configurations tailored for direct-to-consumer brands.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "prod-denim",
    name: "Technical Denim Roll",
    category: "Textiles & Apparel",
    supplier: "Harbor Textiles",
    availability: "backorder",
    description:
      "Performance denim with sustainable dyeing processes and moisture-wicking properties.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

export async function getProducts(): Promise<ProductRecord[]> {
  // simulate async data fetch
  await new Promise((resolve) => setTimeout(resolve, 150));
  return products;
}

