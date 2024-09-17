import express from "express";
import dotenv from "dotenv";
import countriesRoutes from "./src/routes/countries.js";
import cors from "cors";

dotenv.config(); // Cargar las variables de entorno

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Usar las rutas de países
app.use("/api/countries", countriesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
