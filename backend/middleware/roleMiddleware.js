export const admin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  next();
};

export const user = (req, res, next) => {
  if (req.user.role !== "user") return res.status(403).json({ message: "Forbidden" });
  next();
};
