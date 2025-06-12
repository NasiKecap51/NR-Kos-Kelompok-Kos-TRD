import express from "express";
import {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  authentication,
  registerUser,
} from "../controller/userController";
import { verifyAuthentication } from "../middleware/userValidation";
import { verifyAddUser, verifyidUser } from "../middleware/userValidation";
import uploadFile from "../middleware/uploadUser";
import { verifyRole, verifyToken } from "../middleware/authorization";

const app = express();
app.use(express.json()); // Pastikan ini dipasang sebelum route lainnya

app.get(`/`, [verifyToken, verifyRole(["BapakKost"])], getAllUser);
app.post(`/`, [verifyToken, verifyRole(["BapakKost"]), verifyAddUser], createUser);
app.post(`/login`, [verifyAuthentication], authentication);
app.put(`/:id`, [verifyToken, verifyRole(["BapakKost"]), verifyidUser], updateUser);
app.delete(`/:id`, [verifyToken, verifyRole(["BapakKost"])], deleteUser); // Tambahkan [] jika hanya ada satu middleware
app.post(`/register`, registerUser); // Pertimbangkan untuk menambahkan middleware di sini

export default app;
