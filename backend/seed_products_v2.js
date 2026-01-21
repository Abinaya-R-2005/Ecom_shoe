const mongoose = require("mongoose");
require("dotenv").config();

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    image: String,
    images: [String],
    discountPercent: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    tag: String, // Added tag for "New", "Sale"
    features: [String] // Added features list
});

const Product = mongoose.model("Product", productSchema);

const products = [
    {
        name: "Yoga Grip Socks",
        category: "Yoga Socks",
        price: 399,
        description: "Anti-slip yoga socks for better balance and stability.",
        image: "/uploads/sock1.jpg",
        images: ["/uploads/sock1.jpg"],
        features: ["Performance", "Comfort", "Stability"],
        tag: "Trending"
    },
    {
        name: "Compression Sleeves",
        category: "Compression Sleeves",
        price: 499,
        description: "Support your calves and reduce fatigue with compression sleeves.",
        image: "/uploads/compression_sleeves_new.jpg",
        images: ["/uploads/compression_sleeves_new.jpg"],
        features: ["Performance", "Recovery", "Circulation"],
        tag: "Best Seller"
    },
    {
        name: "Thigh High Socks",
        category: "Thigh High Socks",
        price: 599,
        description: "Stylish thigh-high socks for warmth and comfort.",
        image: "/uploads/thigh_high_socks_full.jpg",
        images: ["/uploads/thigh_high_socks_full.jpg"],
        features: ["Style", "Warmth", "Soft"],
        tag: "New"
    },
    {
        name: "Medical Stockings",
        category: "Medical Stockings",
        price: 699,
        description: "Medical grade compression stockings.",
        image: "/uploads/sock5.jpg",
        images: ["/uploads/sock5.jpg"],
        features: ["Medical Grade", "Support", "Durable"],
        tag: "Professional"
    },
    {
        name: "Trampoline Socks",
        category: "Trampoline Socks",
        price: 350,
        description: "High-grip trampoline socks for safety and fun.",
        image: "/uploads/trampoline_socks.jpg",
        images: ["/uploads/trampoline_socks.jpg"],
        features: ["Performance", "Comfort", "Personalization"],
        tag: "Fun"
    },
    {
        name: "Ankle Grip Socks",
        category: "Ankle Grip Socks",
        price: 450,
        description: "Low-cut ankle grip socks for pilates and barre.",
        image: "/uploads/ankle_grip_socks.jpg",
        images: ["/uploads/ankle_grip_socks.jpg"],
        features: ["Performance", "Comfort", "Personalization"],
        tag: "Essential"
    },
    {
        name: "Crawling Knee Pads",
        category: "Crawling Knee Pads",
        price: 299,
        description: "Protective knee pads for crawling babies.",
        image: "/uploads/knee_pads.jpg",
        images: ["/uploads/knee_pads.jpg"],
        features: ["Performance", "Comfort", "Personalization"],
        tag: "Baby"
    }
];

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        try {
            // Clear existing products to avoid duplicates during this dev phase
            await Product.deleteMany({});
            console.log("Cleared existing products");

            const created = await Product.insertMany(products);
            console.log(`Created ${created.length} products`);
        } catch (err) {
            console.error(err);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch((err) => console.log(err));
