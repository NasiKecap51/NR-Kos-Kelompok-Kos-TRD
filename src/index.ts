import express from "express";
import cors from "cors";
// import MenuRoute from "./routers/menuRoutes";
import UserRoutes from "./route/userRoute";
import KamarRoutes from "./route/kamarRoute"
import pemesananRoute from "./route/pemesananRoute";

const PORT: number = 8080;
const app = express();
app.use(cors());

// app.use(`/menu`, MenuRoute);
app.use("/user", UserRoutes);
app.use("/kamar", KamarRoutes)
app.use("/pemesanan", pemesananRoute)

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});