import { Router } from "express"
import { userLogin, userLogout, userRegister } from "../controllers/auth.controllers.js"


const router = Router()

// Register a new user
router.post("/register", userRegister)

// Login existing user
router.post("/login", userLogin)

// Logout user
router.post("/logout",userLogout)

export default router