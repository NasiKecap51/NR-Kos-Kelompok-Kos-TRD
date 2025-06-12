/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email_user` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nama_user` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password_user` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pemesanan` DROP FOREIGN KEY `Pemesanan_id_user_fkey`;

-- DropIndex
DROP INDEX `User_id_user_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `email_user`,
    DROP COLUMN `id_user`,
    DROP COLUMN `nama_user`,
    DROP COLUMN `password_user`,
    ADD COLUMN `email` VARCHAR(100) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(10) NOT NULL,
    ADD COLUMN `password` VARCHAR(225) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
