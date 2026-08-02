import app from "./src/app.js";
import { connectDB } from "./src/db/db.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app running is ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`error in Database`, error);
  });
