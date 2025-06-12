import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL, SECRET } from "../global";
import fs from "fs";
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient({ errorFormat: "pretty" });

// ==============================
// GET ALL USER
// ==============================
export const getAllUser = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const allUser = await prisma.user.findMany({
      where: {
        name: {
          contains: search?.toString() || "",
        },
      },
    });

    return response.status(200).json({
      status: true,
      data: allUser,
      message: "Data User Berhasil Ditampilkan.",
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: `Data User Gagal Ditampilkan. ${error}`,
    });
  }
};

// ==============================
// CREATE USER
// ==============================
export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password, nomortlp, role } = request.body;
    const uuid = uuidv4();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: md5(password),
        nomortlp,
        role,
      },
    });

    return response.status(200).json({
      status: true,
      data: newUser,
      message: "Data User Berhasil Ditambahkan.",
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: `Data User Gagal Ditambahkan. ${error}`,
    });
  }
};

// ==============================
// UPDATE USER
// ==============================
export const updateUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, email, password, role } = request.body;

    const findUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!findUser) {
      return response.status(404).json({
        status: false,
        message: "User tidak ditemukan",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name || findUser.name,
        email: email || findUser.email,
        password: password ? md5(password) : findUser.password,
        role: role || findUser.role,
      },
    });

    return response.status(200).json({
      status: true,
      data: updatedUser,
      message: "Info user berhasil diupdate.",
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: `Ada kesalahan teknis. ${error}`,
    });
  }
};

// ==============================
// DELETE USER
// ==============================
export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const findUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!findUser) {
      return response.status(404).json({
        status: false,
        message: "User tidak ditemukan.",
      });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return response.status(200).json({
      status: true,
      data: deletedUser,
      message: "User berhasil dihapus",
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: `Ada kesalahan teknis. ${error}`,
    });
  }
};

// ==============================
// LOGIN / AUTHENTICATION
// ==============================
export const authentication = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const findUser = await prisma.user.findFirst({
      where: {
        email,
        password: md5(password),
      },
    });

    if (!findUser) {
      return response.status(401).json({
        status: false,
        logged: false,
        message: "Email atau password salah",
      });
    }

    const data = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
    };

    const token = sign(JSON.stringify(data), SECRET || "");

    return response.status(200).json({
      status: true,
      logged: true,
      data,
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: `Terjadi kesalahan: ${error}`,
    });
  }
};

// ==============================
// REGISTER USER
// ==============================
export const registerUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password, nomortlp } = request.body;
    const uuid = uuidv4();

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: md5(password),
        nomortlp,
        role: "AnakKost",
      },
    });

    return response.status(200).json({
      status: true,
      data: newUser,
      message: "Data User Berhasil Ditambahkan.",
    });
  } catch (error) {
    return response.status(500).json({
      status: false,
      message: `Data User Gagal Ditambahkan. ${error}`,
    });
  }
};
