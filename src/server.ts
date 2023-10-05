import express, { Request, Response } from "express";
import expressListRoutes from "express-list-routes";
import { authRoutes } from "./auth/auth.routes";
import { requireAcessTokenMiddleware } from "./middlewares/requireAcessToken.middleware";
import cors from "cors";

const app = express();
const PORT = 3555;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola Mundo con Express y TypeScript!");
});

app.get(
  "/protected-endpoint",
  requireAcessTokenMiddleware,
  (req: Request, res: Response) => {
    res.send("Este es un recurso protegido de ejemplo :O");
  }
);

app.use("/auth", authRoutes);

expressListRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
