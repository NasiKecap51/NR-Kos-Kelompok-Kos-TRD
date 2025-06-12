/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Pembayaran` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Pemesanan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_kamar]` on the table `Pemesanan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Pengguna` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Pembayaran_user_id_key` ON `Pembayaran`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Pemesanan_user_id_key` ON `Pemesanan`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Pemesanan_id_kamar_key` ON `Pemesanan`(`id_kamar`);

-- CreateIndex
CREATE UNIQUE INDEX `Pengguna_user_id_key` ON `Pengguna`(`user_id`);
