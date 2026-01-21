const mongoose = require("mongoose");
require("dotenv").config();

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true },
});
const Category = mongoose.model("Category", categorySchema);

const categories = [
    { name: "Yoga Socks" },
    { name: "Compression Sleeves" },
    { name: "Thigh High Socks" },
    { name: "Medical Stockings" },
    { name: "Trampoline Socks" },
    { name: "Ankle Grip Socks" },
    { name: "Crawling Knee Pads" }
];

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        try {
            await Category.deleteMany({});
            console.log("Cleared existing categories");

            const created = await Category.insertMany(categories);
            console.log(`Created ${created.length} categories`);
        } catch (err) {
            console.error(err);
        } finally {
            mongoose.disconnect();
        }
    })
    .catch((err) => console.log(err));
