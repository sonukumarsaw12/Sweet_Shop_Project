import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Sweet from "../models/Sweet.model.js";

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB for seeding...");

        // 1. Create Admin User
        const adminEmail = "admin@sweetshop.com";
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await User.create({
                name: "Admin User",
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN"
            });
            console.log("✅ Admin user created: admin@sweetshop.com / admin123");
        } else {
            console.log("ℹ️ Admin user already exists");
        }

        // 2. Create Normal User
        const userEmail = "user@sweetshop.com";
        const existingUser = await User.findOne({ email: userEmail });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash("user123", 10);
            await User.create({
                name: "Normal User",
                email: userEmail,
                password: hashedPassword,
                role: "USER"
            });
            console.log("✅ Normal user created: user@sweetshop.com / user123");
        } else {
            console.log("ℹ️ Normal user already exists");
        }

        // 3. Seed Sweets
        const sweetCount = await Sweet.countDocuments();
        if (sweetCount === 0) {
            await Sweet.insertMany([
                { name: "Besan Ladoo", category: "Ladoo", price: 150, quantity: 20 },
                { name: "Kaju Katli", category: "Barfi", price: 800, quantity: 10 },
                { name: "Rasgulla", category: "Syrup", price: 200, quantity: 50 },
                { name: "Gulab Jamun", category: "Syrup", price: 220, quantity: 0 },
                { name: "Mysore Pak", category: "Mysore", price: 400, quantity: 15 },
            ]);
            console.log("✅ Seeded 5 sweets");
        } else {
            console.log("ℹ️ Sweets already exist");
        }

        process.exit(0);

    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
};

seed();
