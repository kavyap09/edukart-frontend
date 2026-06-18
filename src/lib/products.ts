export type Product = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  gallery: string[];
  description: string;
  grade?: string;
  subject?: string;
  publication?: string;
};

const img = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "ncert-math-5",
    name: "NCERT Mathematics — Class 5",
    vendor: "Sunrise Publications",
    category: "Books",
    price: 215, mrp: 280, rating: 4.7, reviews: 312, stock: 124,
    image: img("photo-1497633762265-9d179a990aa6"),
    gallery: [img("photo-1497633762265-9d179a990aa6"), img("photo-1519682337058-a94d519337bc"), img("photo-1456513080510-7bf3a84b82f8")],
    description: "Official NCERT mathematics textbook for Class 5, covering arithmetic, geometry, and problem-solving with full-colour illustrations.",
    grade: "Grade 5", subject: "Mathematics", publication: "NCERT",
  },
  {
    id: "oxford-english-3",
    name: "Oxford New Pathways English — Class 3",
    vendor: "Oxford India",
    category: "Books",
    price: 340, mrp: 420, rating: 4.6, reviews: 198, stock: 88,
    image: img("photo-1544716278-ca5e3f4abd8c"),
    gallery: [img("photo-1544716278-ca5e3f4abd8c"), img("photo-1491841550275-ad7854e35ca6")],
    description: "Engaging English coursebook with stories, grammar exercises, and listening activities.",
    grade: "Grade 3", subject: "English", publication: "Oxford",
  },
  {
    id: "bag-pro-blue",
    name: "EduPro Ergonomic School Bag 22L",
    vendor: "Skybag Co.",
    category: "School Bags",
    price: 1299, mrp: 1899, rating: 4.5, reviews: 540, stock: 64,
    image: img("photo-1553062407-98eeb64c6a62"),
    gallery: [img("photo-1553062407-98eeb64c6a62"), img("photo-1564422170194-896b89110ef8"), img("photo-1577733966973-d680bffd2e80")],
    description: "Padded, water-resistant school bag with multiple compartments and reflective strips for safety.",
  },
  {
    id: "uniform-shirt-white",
    name: "Cotton School Shirt — White (Half Sleeve)",
    vendor: "Neat & Tidy Uniforms",
    category: "Uniforms",
    price: 459, mrp: 599, rating: 4.4, reviews: 220, stock: 200,
    image: img("photo-1622445275576-721325763afe"),
    gallery: [img("photo-1622445275576-721325763afe"), img("photo-1602810318383-e386cc2a3ccf")],
    description: "Soft breathable cotton uniform shirt, easy-wash and pre-shrunk.",
  },
  {
    id: "shoes-black-velcro",
    name: "Black School Shoes — Velcro",
    vendor: "Stride Footwear",
    category: "Shoes",
    price: 899, mrp: 1199, rating: 4.6, reviews: 410, stock: 150,
    image: img("photo-1542291026-7eec264c27ff"),
    gallery: [img("photo-1542291026-7eec264c27ff"), img("photo-1460353581641-37baddab0fa2")],
    description: "Durable rubber sole with anti-slip grip and velcro fastening for easy wear.",
  },
  {
    id: "stationery-kit",
    name: "Complete Stationery Starter Kit (24 pcs)",
    vendor: "Camlin Kokuyo",
    category: "Stationery",
    price: 549, mrp: 720, rating: 4.8, reviews: 670, stock: 95,
    image: img("photo-1513151233558-d860c5398176"),
    gallery: [img("photo-1513151233558-d860c5398176"), img("photo-1456735190827-d1262f71b8a3")],
    description: "Pens, pencils, eraser, sharpener, ruler, geometry box, glue stick — everything in one box.",
  },
  {
    id: "bottle-steel-750",
    name: "Insulated Steel Water Bottle 750ml",
    vendor: "HydroKids",
    category: "Water Bottles",
    price: 499, mrp: 699, rating: 4.7, reviews: 380, stock: 180,
    image: img("photo-1602143407151-7111542de6e8"),
    gallery: [img("photo-1602143407151-7111542de6e8"), img("photo-1523362628745-0c100150b504")],
    description: "Keeps drinks cool for 24 hours. BPA-free, leak-proof, with carry strap.",
  },
  {
    id: "lunchbox-3compartment",
    name: "3-Compartment Steel Lunch Box",
    vendor: "Milton",
    category: "Lunch Boxes",
    price: 649, mrp: 850, rating: 4.6, reviews: 290, stock: 120,
    image: img("photo-1606787366850-de6330128bfc"),
    gallery: [img("photo-1606787366850-de6330128bfc"), img("photo-1565299624946-b28f40a0ae38")],
    description: "Insulated three-section lunch box with secure clip-lock lid. Microwave-safe inner trays.",
  },
  {
    id: "science-kit-junior",
    name: "Junior Science Experiment Kit",
    vendor: "Explorer Labs",
    category: "Science Kits",
    price: 1499, mrp: 1999, rating: 4.9, reviews: 145, stock: 40,
    image: img("photo-1532094349884-543bc11b234d"),
    gallery: [img("photo-1532094349884-543bc11b234d"), img("photo-1518152006812-edab29b069ac")],
    description: "30+ safe experiments covering chemistry, physics and biology with illustrated guidebook.",
    grade: "Grade 4-7", subject: "Science",
  },
  {
    id: "art-supplies-48",
    name: "Premium Art Supplies Set (48 pcs)",
    vendor: "Faber-Castell",
    category: "Art Supplies",
    price: 999, mrp: 1399, rating: 4.8, reviews: 520, stock: 110,
    image: img("photo-1513364776144-60967b0f800f"),
    gallery: [img("photo-1513364776144-60967b0f800f"), img("photo-1502691876148-a84978e59af8")],
    description: "Colour pencils, sketch pens, oil pastels and watercolours in a sturdy carry case.",
  },
  {
    id: "notebooks-pack-6",
    name: "Premium Ruled Notebooks (Pack of 6)",
    vendor: "Classmate",
    category: "Stationery",
    price: 399, mrp: 540, rating: 4.7, reviews: 820, stock: 300,
    image: img("photo-1531346878377-a5be20888e57"),
    gallery: [img("photo-1531346878377-a5be20888e57")],
    description: "172-page A4 ruled notebooks with sturdy binding and smooth paper.",
  },
  {
    id: "geometry-box",
    name: "Complete Geometry Box",
    vendor: "Camlin",
    category: "Stationery",
    price: 199, mrp: 280, rating: 4.5, reviews: 410, stock: 220,
    image: img("photo-1455390582262-044cdead277a"),
    gallery: [img("photo-1455390582262-044cdead277a")],
    description: "Compass, divider, set squares, ruler, protractor and pencil — all in a sturdy metal case.",
  },
];

export const CATEGORIES = [
  "All", "Books", "School Bags", "Uniforms", "Shoes", "Stationery",
  "Water Bottles", "Lunch Boxes", "Science Kits", "Art Supplies",
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
export function similarProducts(id: string, n = 4) {
  const p = getProduct(id);
  if (!p) return [];
  return PRODUCTS.filter((x) => x.id !== id && x.category === p.category).slice(0, n);
}
