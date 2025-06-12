/*
  Warnings:

  - A unique constraint covering the columns `[id_kamar]` on the table `Pembayaran` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Pembayaran_id_kamar_key` ON `Pembayaran`(`id_kamar`);
