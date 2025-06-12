/*
  Warnings:

  - The primary key for the `pembayaran` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id_pembayaran` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pembayaran` DROP PRIMARY KEY,
    ADD COLUMN `id_pembayaran` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_pemesanan` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_pembayaran`);

-- AlterTable
ALTER TABLE `pemesanan` ADD COLUMN `pembayaran` ENUM('Transfer', 'Qris', 'Ewallet') NULL;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Pengguna`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_kamar_fkey` FOREIGN KEY (`id_kamar`) REFERENCES `Kamar`(`id_kamar`) ON DELETE RESTRICT ON UPDATE CASCADE;
