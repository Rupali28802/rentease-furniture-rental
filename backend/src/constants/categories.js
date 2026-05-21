// constants/categories.js
export const CATEGORY_LIST = [
  { key: "FURNITURE", name: "Furniture", slug: "furniture" },
  { key: "APPLIANCES", name: "Appliances", slug: "appliances" },
  { key: "ELECTRONICS", name: "Electronics", slug: "electronics" },
  { key: "HOME_DECOR", name: "Home Decor", slug: "home-decor" },
  { key: "OFFICE", name: "Office Furniture", slug: "office-furniture" },
  { key: "KITCHEN", name: "Kitchen Essentials", slug: "kitchen-essentials" },
  { key: "OUTDOOR", name: "Outdoor Furniture", slug: "outdoor-furniture" },
];

export const CATEGORY_NAMES = {
  FURNITURE: "Furniture",
  APPLIANCES: "Appliances",
  ELECTRONICS: "Electronics",
  HOME_DECOR: "Home Decor",
  OFFICE: "Office Furniture",
  KITCHEN: "Kitchen Essentials",
  OUTDOOR: "Outdoor Furniture",
};

export const CATEGORY_TENURE_RULES = {
  FURNITURE: [1, 3, 6, 12],
  APPLIANCES: [1, 3, 6],
  ELECTRONICS: [1, 3],
};
