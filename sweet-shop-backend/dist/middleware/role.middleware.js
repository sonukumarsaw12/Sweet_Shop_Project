export const adminOnly = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = req.user;
    if (user.role !== "ADMIN") {
        return res.status(403).json({ message: "Admin only" });
    }
    next();
};
//# sourceMappingURL=role.middleware.js.map