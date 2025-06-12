import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Create Pembayaran
export const createPembayaran = async (req: Request, res: Response) => {
  try {
    const {
      id_pemesanan,
      jumlah_pembayaran,
      metode_pembayaran,  // enum Bayar
      status_pembayaran,  // enum StatusBayar (opsional, default SudahDibayar)
    } = req.body;

    // Validasi enum `Bayar`
    const validMetode = ["Transfer", "Qris", "Ewallet"];
    if (!validMetode.includes(metode_pembayaran)) {
      return res.status(400).json({ error: "Metode pembayaran tidak valid." });
    }

    // Validasi enum `StatusBayar`
    const validStatus = ["Menunggu", "SudahDibayar", "BelumDibayar"];
    if (status_pembayaran && !validStatus.includes(status_pembayaran)) {
      return res.status(400).json({ error: "Status pembayaran tidak valid." });
    }

    // Pastikan pemesanan ada
    const existing = await prisma.pemesanan.findUnique({
      where: { id_pemesanan },
    });

    if (!existing) {
      return res.status(404).json({ error: "Pemesanan tidak ditemukan." });
    }

    // Pastikan belum ada pembayaran untuk pemesanan ini (karena id_pemesanan unique)
    const existingPayment = await prisma.pembayaran.findUnique({
      where: { id_pemesanan },
    });

    if (existingPayment) {
      return res.status(400).json({ error: "Pembayaran untuk pemesanan ini sudah ada." });
    }

    const newPayment = await prisma.pembayaran.create({
      data: {
        id_pemesanan,
        jumlah_pembayaran,
        metode_pembayaran,
        status_pembayaran, // jika tidak ada, akan default ke SudahDibayar
      },
    });

    return res.status(201).json({
      status: true,
      data: newPayment,
      message: "Pembayaran berhasil dibuat.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Terjadi kesalahan saat membuat pembayaran: ${error}`,
    });
  }
};

// Update Status Pembayaran
export const updateStatusPembayaran = async (req: Request, res: Response) => {
  try {
    const { id_pembayaran, status_pembayaran } = req.body;

    if (!["Menunggu", "SudahDibayar", "BelumDibayar"].includes(status_pembayaran)) {
      return res.status(400).json({
        status: false,
        message: "Status pembayaran tidak valid.",
      });
    }

    const pembayaran = await prisma.pembayaran.update({
      where: { id_pembayaran },
      data: { status_pembayaran },
    });

    return res.status(200).json({
      status: true,
      data: pembayaran,
      message: "Status pembayaran berhasil diperbarui",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Gagal memperbarui status pembayaran: ${error}`,
    });
  }
};
