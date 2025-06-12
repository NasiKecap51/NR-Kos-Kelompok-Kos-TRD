import express from "express";
import {
  getAllKamar,
  createKamar,
  updateKamar,
  deleteKamar,
  changePicture,
} from "../controller/kamarController";
import { verifyAddMenu, verifyidMenu } from "../middleware/verifyKamar";
import uploadFile from "../middleware/uploadKamar";
import { verifyRole, verifyToken } from "../middleware/authorization";

const app = express();
app.use(express.json());

app.get(`/`, [verifyToken, verifyRole(["AnakKost", "BapakKost"])], getAllKamar);

// ✅ Perbaikan di sini:
app.post(`/`, [
  verifyToken,
  verifyRole(["BapakKost"]),
  uploadFile.single("picture"), // ⬅️ WAJIB ADA
  verifyAddMenu,
], createKamar);

app.put(`/:id`, [
  verifyToken,
  verifyRole(["BapakKost"]),
  verifyidMenu,
], updateKamar);

app.put(`/pic/:id`, [
  verifyToken,
  verifyRole(["BapakKost"]),
  uploadFile.single("picture"), // ⬅️ sudah benar
], changePicture);

app.delete(`/:id`, [verifyToken, verifyRole(["BapakKost"])], deleteKamar);

export default app;
