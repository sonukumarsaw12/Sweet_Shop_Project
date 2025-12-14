import mongoose from "mongoose";
const sweetSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    quantity: Number,
    image: { type: String, required: false }
});
export default mongoose.model("Sweet", sweetSchema);
//# sourceMappingURL=Sweet.model.js.map