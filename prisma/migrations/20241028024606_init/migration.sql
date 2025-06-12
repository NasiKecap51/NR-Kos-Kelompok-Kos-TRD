-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('AnakKost', 'BapakKost') NOT NULL DEFAULT 'AnakKost';
