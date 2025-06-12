/*
  Warnings:

  - You are about to drop the column `tanggal_pembayaran` on the `pembayaran` table. All the data in the column will be lost.
  - Added the required column `jumlah_pembayaran` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Kamar_room_id_key` ON `kamar`;

-- AlterTable
ALTER TABLE `pembayaran` DROP COLUMN `tanggal_pembayaran`,
    ADD COLUMN `jumlah_pembayaran` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pemesanan` ADD COLUMN `price` INTEGER NOT NULL;
