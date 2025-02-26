import express from "express";
import cors from "cors";
import "dotenv/config";
import boxRoutes from "./routes/boxRoutes.js"

const app = express();

//CORS [allow the request from frontend port 5173]
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} =====> URL: ${req.url}`);
  next();
})

app.use("/api", boxRoutes);


// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
