/*
  Warnings:

  - A unique constraint covering the columns `[id_pemesanan]` on the table `Pembayaran` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_kamar` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pembayaran` ADD COLUMN `id_kamar` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Pembayaran_id_pemesanan_key` ON `Pembayaran`(`id_pemesanan`);
