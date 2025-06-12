import { Request, Response } from "express";
import { PrismaClient, StatusKamar } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const getAllKamar = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const kamarList = await prisma.kamar.findMany({
      where: search
        ? {
            room_number: Number(search),
          }
        : {},
    });

    return res.status(200).json({
      status: true,
      data: kamarList,
      message: "Kamar berhasil diambil",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Kesalahan server: ${error}`,
    });
  }
};

export const createKamar = async (req: Request, res: Response) => {
  try {
    const { room_number, price, room_capacity, deskripsi } = req.body;

    if (!room_number || !price || !room_capacity || !deskripsi) {
      return res.status(400).json({
        status: false,
        message: "room_number, price, room_capacity, dan deskripsi wajib diisi",
      });
    }

    if (
      isNaN(Number(room_number)) ||
      isNaN(Number(price)) ||
      isNaN(Number(room_capacity))
    ) {
      return res.status(400).json({
        status: false,
        message: "room_number, price, dan room_capacity harus berupa angka",
      });
    }

    const kamarBaru = await prisma.kamar.create({
      data: {
        room_number: Number(room_number),
        price: Number(price),
        room_capacity: Number(room_capacity),
        deskripsi,
        picture: req.file?.filename || "",
        status: StatusKamar.Tersedia,
      },
    });

    return res.status(201).json({
      status: true,
      data: kamarBaru,
      message: "Kamar baru berhasil dibuat",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Gagal membuat kamar: ${error}`,
    });
  }
};

export const updateKamar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { room_number, price, room_capacity, status, deskripsi } = req.body;

    if (!room_number && !price && !room_capacity && !status && !deskripsi) {
      return res.status(400).json({
        status: false,
        message: "Minimal satu field harus diisi untuk update",
      });
    }

    const kamarLama = await prisma.kamar.findUnique({
      where: { room_id: Number(id) },
    });

    if (!kamarLama) {
      return res.status(404).json({
        status: false,
        message: "Kamar tidak ditemukan",
      });
    }

    const updateData: any = {};

    if (room_number) {
      if (isNaN(Number(room_number))) {
        return res.status(400).json({
          status: false,
          message: "room_number harus berupa angka",
        });
      }
      updateData.room_number = Number(room_number);
    }

    if (price) {
      if (isNaN(Number(price))) {
        return res.status(400).json({
          status: false,
          message: "price harus berupa angka",
        });
      }
      updateData.price = Number(price);
    }

    if (room_capacity) {
      if (isNaN(Number(room_capacity))) {
        return res.status(400).json({
          status: false,
          message: "room_capacity harus berupa angka",
        });
      }
      updateData.room_capacity = Number(room_capacity);
    }

    if (status) {
      if (status !== "Tersedia" && status !== "TidakTersedia") {
        return res.status(400).json({
          status: false,
          message: "Status harus Tersedia atau TidakTersedia",
        });
      }
      updateData.status = status;
    }

    if (deskripsi) {
      updateData.deskripsi = deskripsi;
    }

    const kamarUpdated = await prisma.kamar.update({
      where: { room_id: Number(id) },
      data: updateData,
    });

    return res.status(200).json({
      status: true,
      data: kamarUpdated,
      message: "Kamar berhasil diupdate",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Gagal update kamar: ${error}`,
    });
  }
};

export const changePicture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const kamar = await prisma.kamar.findUnique({
      where: { room_id: Number(id) },
    });

    if (!kamar) {
      return res.status(404).json({
        status: false,
        message: "Kamar tidak ditemukan",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "File gambar harus diupload",
      });
    }

    if (kamar.picture) {
      const filePath = path.join(__dirname, "../public/fotoKamar", kamar.picture);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const updatedKamar = await prisma.kamar.update({
      where: { room_id: Number(id) },
      data: { picture: req.file.filename },
    });

    return res.status(200).json({
      status: true,
      data: updatedKamar,
      message: "Foto kamar berhasil diperbarui",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Gagal update foto kamar: ${error}`,
    });
  }
};

export const deleteKamar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const kamar = await prisma.kamar.findUnique({
      where: { room_id: Number(id) },
    });

    if (!kamar) {
      return res.status(404).json({
        status: false,
        message: "Kamar tidak ditemukan",
      });
    }

    if (kamar.picture) {
      const filePath = path.join(__dirname, "../public/fotoKamar", kamar.picture);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const deleted = await prisma.kamar.delete({
      where: { room_id: Number(id) },
    });

    return res.status(200).json({
      status: true,
      data: deleted,
      message: "Kamar berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Gagal menghapus kamar: ${error}`,
    });
  }
};
