/*
  Warnings:

  - You are about to drop the column `role_user` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `role_user`,
    ADD COLUMN `role` ENUM('BapakKost', 'AnakKost') NOT NULL DEFAULT 'AnakKost';
