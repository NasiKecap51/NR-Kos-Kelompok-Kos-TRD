import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get all bookings
export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.pemesanan.findMany({
      include: { user: true, kamar: true, pembayaran: true },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: `Tidak bisa melihat booking: ${error}` });
  }
};

// Create new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      id_user,
      room_id,
      price,
      tanggal_mulai,
      tanggal_akhir,
      pembayaran, // pembayaran: [{ metode_pembayaran: "Transfer" }]
    } = req.body;

    // Validasi enum metode_pembayaran bisa ditambahkan di sini

    const newBooking = await prisma.pemesanan.create({
      data: {
        id_user,
        room_id,
        price,
        tanggal_mulai: new Date(tanggal_mulai),
        tanggal_akhir: new Date(tanggal_akhir),
        pembayaran: {
          create: pembayaran, // Pastikan ini array of pembayaran object
        },
      },
      include: {
        pembayaran: true,
      },
    });

    return res.status(201).json({
      data: newBooking,
      message: "Booking berhasil dibuat",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Tidak bisa membuat booking: ${error}` });
  }
};

// Update status booking
export const updateStatusBooking = async (req: Request, res: Response) => {
  try {
    const { id_pemesanan } = req.body;

    const pemesanan = await prisma.pemesanan.update({
      where: { id_pemesanan },
      data: { status_booking: "Terverifikasi" }, // pastikan enum `StatusBooking` punya value ini
    });

    return res.status(200).json({
      status: true,
      data: pemesanan,
      message: "Pembayaran Berhasil",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: `Tidak bisa memperbarui status: ${error}`,
    });
  }
};
