import express from "express";
import { register, login } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "You can access this protected route",
    userId: req.userId,
  });
});

export default router;
