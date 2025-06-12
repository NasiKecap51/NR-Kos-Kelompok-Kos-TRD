/*
  Warnings:

  - You are about to drop the column `user_id` on the `pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `pemesanan` table. All the data in the column will be lost.
  - The primary key for the `pengguna` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `pengguna` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_user]` on the table `Pembayaran` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user]` on the table `Pemesanan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user]` on the table `Pengguna` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_user` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Pengguna` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pemesanan` DROP FOREIGN KEY `Pemesanan_user_id_fkey`;

-- DropIndex
DROP INDEX `Pembayaran_user_id_key` ON `pembayaran`;

-- DropIndex
DROP INDEX `Pengguna_user_id_key` ON `pengguna`;

-- AlterTable
ALTER TABLE `pembayaran` DROP COLUMN `user_id`,
    ADD COLUMN `id_user` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pemesanan` DROP COLUMN `user_id`,
    ADD COLUMN `id_user` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pengguna` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_user`);

-- CreateIndex
CREATE UNIQUE INDEX `Pembayaran_id_user_key` ON `Pembayaran`(`id_user`);

-- CreateIndex
CREATE UNIQUE INDEX `Pemesanan_id_user_key` ON `Pemesanan`(`id_user`);

-- CreateIndex
CREATE UNIQUE INDEX `Pengguna_id_user_key` ON `Pengguna`(`id_user`);

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Pengguna`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
