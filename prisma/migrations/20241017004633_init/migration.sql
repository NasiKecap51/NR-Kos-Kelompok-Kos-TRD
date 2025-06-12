/*
  Warnings:

  - The primary key for the `kamar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `harga_kamar` on the `kamar` table. All the data in the column will be lost.
  - You are about to drop the column `id_kamar` on the `kamar` table. All the data in the column will be lost.
  - You are about to drop the column `kapasitas` on the `kamar` table. All the data in the column will be lost.
  - You are about to drop the column `nomor_kamar` on the `kamar` table. All the data in the column will be lost.
  - You are about to drop the column `id_kamar` on the `pemesanan` table. All the data in the column will be lost.
  - The values [WebsiteVisitor] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[room_id]` on the table `Kamar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[room_id]` on the table `Pemesanan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Kamar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_capacity` to the `Kamar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `Kamar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_number` to the `Kamar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pemesanan` DROP FOREIGN KEY `Pemesanan_id_kamar_fkey`;

-- DropIndex
DROP INDEX `Kamar_id_kamar_key` ON `kamar`;

-- AlterTable
ALTER TABLE `kamar` DROP PRIMARY KEY,
    DROP COLUMN `harga_kamar`,
    DROP COLUMN `id_kamar`,
    DROP COLUMN `kapasitas`,
    DROP COLUMN `nomor_kamar`,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `room_capacity` INTEGER NOT NULL,
    ADD COLUMN `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `room_number` INTEGER NOT NULL,
    ADD PRIMARY KEY (`room_id`);

-- AlterTable
ALTER TABLE `pemesanan` DROP COLUMN `id_kamar`,
    ADD COLUMN `room_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('BapakKost', 'AnakKost') NOT NULL DEFAULT 'AnakKost';

-- CreateIndex
CREATE UNIQUE INDEX `Kamar_room_id_key` ON `Kamar`(`room_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Pemesanan_room_id_key` ON `Pemesanan`(`room_id`);

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Kamar`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
