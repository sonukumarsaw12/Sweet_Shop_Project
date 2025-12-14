import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";
import {
  createSweet,
  getSweets,
  purchaseSweet,
  restockSweet,
  searchSweets,
  updateSweet,
  deleteSweet
} from "../controllers/sweet.controller.js";

const router = express.Router();

router.get("/", getSweets);
router.post("/", protect, adminOnly, createSweet);
router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, adminOnly, restockSweet);
router.get("/search", searchSweets);
router.put("/:id", protect, adminOnly, updateSweet);
router.delete("/:id", protect, adminOnly, deleteSweet);

export default router;
