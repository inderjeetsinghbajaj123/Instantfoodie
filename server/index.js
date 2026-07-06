import app from "./src/app.js"
import { connectDB } from "./src/db/db.js"

// Port comes from .env, fallback to 3000 if not set
const PORT = process.env.PORT || 3000;

// Connect to DB first, only start server if DB connects successfully
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`app running is ${PORT}`)
    })
})
.catch((error) => {
    console.log(`error in Database`, error)
})