import request from "supertest";
import app from "../app.js";
import Sweet from "../models/Sweet.model.js";
// Mock Mongoose Model
jest.mock("../models/Sweet.model");
// Mock Auth Middleware
jest.mock("../middleware/auth.middleware", () => ({
    protect: (req, res, next) => {
        req.user = { id: "user123", role: "ADMIN" }; // Mock Admin User
        next();
    },
}));
jest.mock("../middleware/role.middleware", () => ({
    adminOnly: (req, res, next) => {
        // Assuming protect middleware sets req.user
        if (req.user?.role === "ADMIN") {
            next();
        }
        else {
            res.status(403).json({ message: "Admin only" });
        }
    },
}));
describe("Sweet API Endpoints", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("GET /api/sweets/search", () => {
        it("should return sweets matching the query", async () => {
            const mockSweets = [
                { name: "Besan Ladoo", category: "Ladoo", price: 100, quantity: 10 },
            ];
            Sweet.find.mockReturnValue({
                select: jest.mock,
                exec: jest.fn().mockResolvedValue(mockSweets),
            }); // Mocking chainable query
            const res = await request(app).get("/api/sweets/search?query=Ladoo");
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockSweets);
        });
    });
    describe("PUT /api/sweets/:id", () => {
        it("should update a sweet", async () => {
            const updatedSweet = { name: "Updated Ladoo", price: 150 };
            Sweet.findByIdAndUpdate.mockResolvedValue(updatedSweet);
            const res = await request(app)
                .put("/api/sweets/123")
                .send({ name: "Updated Ladoo", price: 150 });
            expect(res.status).toBe(200);
            expect(res.body).toEqual(updatedSweet);
        });
    });
    describe("DELETE /api/sweets/:id", () => {
        it("should delete a sweet", async () => {
            Sweet.findByIdAndDelete.mockResolvedValue({ _id: "123" });
            const res = await request(app).delete("/api/sweets/123");
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ message: "Sweet deleted" });
        });
    });
});
//# sourceMappingURL=sweet.test.js.map