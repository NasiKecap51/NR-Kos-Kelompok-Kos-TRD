/*
  Warnings:

  - Added the required column `deskripsi` to the `Kamar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kamar` ADD COLUMN `deskripsi` VARCHAR(191) NOT NULL;
