/*
  Warnings:

  - You are about to drop the `pengguna` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pemesanan` DROP FOREIGN KEY `Pemesanan_id_user_fkey`;

-- DropTable
DROP TABLE `pengguna`;

-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_user` VARCHAR(10) NOT NULL,
    `email_user` VARCHAR(100) NOT NULL,
    `password_user` VARCHAR(225) NOT NULL,
    `nomortlp_user` VARCHAR(12) NOT NULL,
    `role_user` ENUM('BapakKost', 'AnakKost') NOT NULL DEFAULT 'AnakKost',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_user_key`(`id_user`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
