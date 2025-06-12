/*
  Warnings:

  - You are about to drop the column `category` on the `kamar` table. All the data in the column will be lost.
  - You are about to drop the column `id_kamar` on the `pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `pembayaran` on the `pemesanan` table. All the data in the column will be lost.
  - The values [SudahDibayar,BelumDibayar] on the enum `Pemesanan_status_booking` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Pembayaran_id_kamar_key` ON `pembayaran`;

-- DropIndex
DROP INDEX `Pembayaran_id_user_key` ON `pembayaran`;

-- AlterTable
ALTER TABLE `kamar` DROP COLUMN `category`;

-- AlterTable
ALTER TABLE `pembayaran` DROP COLUMN `id_kamar`,
    DROP COLUMN `id_user`;

-- AlterTable
ALTER TABLE `pemesanan` DROP COLUMN `pembayaran`,
    MODIFY `status_booking` ENUM('Menunggu', 'Terverifikasi') NOT NULL DEFAULT 'Menunggu';

-- AlterTable
ALTER TABLE `pengguna` MODIFY `password_user` VARCHAR(225) NOT NULL;

-- DropTable
DROP TABLE `admin`;

-- AddForeignKey
ALTER TABLE `Pembayaran` ADD CONSTRAINT `Pembayaran_id_pemesanan_fkey` FOREIGN KEY (`id_pemesanan`) REFERENCES `Pemesanan`(`id_pemesanan`) ON DELETE RESTRICT ON UPDATE CASCADE;
