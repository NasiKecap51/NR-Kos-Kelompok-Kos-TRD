-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('BapakKost', 'AnakKost', 'PengunjungWebsite') NOT NULL DEFAULT 'AnakKost';
