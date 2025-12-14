import type { Request, Response } from "express";
import Sweet from "../models/Sweet.model.js";

export const getSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity, image } = req.body;
    const sweet = new Sweet({ name, category, price, quantity, image });
    await sweet.save();
    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Error creating sweet" });
  }
};

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    // Use null assertion or type check, assuming quantity is defined in schema
    if (sweet.quantity! > 0) {
      sweet.quantity = (sweet.quantity || 0) - 1;
      await sweet.save();
      res.json({ message: "Purchase successful", sweet });
    } else {
      res.status(400).json({ message: "Out of stock" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    sweet.quantity = (sweet.quantity || 0) + 1; // Simple increment
    await sweet.save();
    res.json({ message: "Restocked", sweet });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }
    const regex = new RegExp(query as string, "i");
    const sweets = await Sweet.find({
      $or: [{ name: regex }, { category: regex }],
    });
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json({ message: "Sweet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
