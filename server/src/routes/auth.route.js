import { Router } from "express"

const router = Router()

// Register a new user
router.post("/register", (req, res) => {
    res.send("register route")
})

// Login existing user
router.post("/login", (req, res) => {
    res.send("login route")
})

// Logout user
router.post("/logout", (req, res) => {
    res.send("logout route")
})

export default router