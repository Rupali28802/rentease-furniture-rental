// constants/categories.js
export const CATEGORY_LIST = 
  [
    { _id: "1", name: "Sofa", slug: "sofa", image: "sofa.jpg" },
    { _id: "2", name: "Beds", slug: "beds", image: "bed.jpg" },
    {
      _id: "3",
      name: "Appliances",
      slug: "appliances",
      image: "appliances.jpg",
    },
    { _id: "4", name: "Dining", slug: "dining", image: "dining.jpg" },
    { _id: "5", name: "Office", slug: "office", image: "office.jpg" },
    { _id: "6", name: "Storage", slug: "storage", image: "storage.jpg" },
    { _id: "7", name: "Home Decor", slug: "home-decor", image: "decor.jpg" },
    { _id: "8", name: "Kids Room", slug: "kids-room", image: "kids.jpg" },
    { _id: "9", name: "Outdoor", slug: "outdoor", image: "outdoor.jpg" },
    {
      _id: "10",
      name: "Event Furniture",
      slug: "event-furniture",
      image: null,
    },
    {
      _id: "11",
      name: "Kitchen Essentials",
      slug: "kitchen",
      image: "kitchen.jpg",
    },
    {
      _id: "12",
      name: "Fitness Equipment",
      slug: "fitness",
      image: "fitness.jpg",
    },
    {
      _id: "13",
      name: "Electronics",
      slug: "electronics",
      image: "electronics.jpg",
    },
    { _id: "14", name: "Lighting", slug: "lighting", image: "lighting.jpg" },
    {
      _id: "15",
      name: "Garden & Patio",
      slug: "garden-patio",
      image: "garden.jpg",
    },
    {
      _id: "16",
      name: "Pet Furniture",
      slug: "pet-furniture",
      image: "pet.jpg",
    },
    { _id: "17", name: "Offers", slug: "offers", image: null },
  ];


export const CATEGORY_NAMES = {
  FURNITURE: "Furniture",
  APPLIANCES: "Appliances",
  ELECTRONICS: "Electronics",
  HOME_DECOR: "Home Decor",
  OFFICE: "Office Furniture",

  SOFA: "Sofa",
  BEDS: "Beds",
  DINING: "Dining",
  STORAGE: "Storage",
  KIDS_ROOM: "Kids Room",
  OUTDOOR: "Outdoor",
  EVENT_FURNITURE: "Event Furniture",
  KITCHEN_ESSENTIALS: "Kitchen Essentials",
  FITNESS_EQUIPMENT: "Fitness Equipment",
  LIGHTING: "Lighting",
  GARDEN_PATIO: "Garden & Patio",
  PET_FURNITURE: "Pet Furniture",

  OFFERS: "Offers"
};


export const CATEGORY_TENURE_RULES = {
  FURNITURE: [1, 3, 6, 12],
  APPLIANCES: [1, 3, 6],
  ELECTRONICS: [1, 3],
};
