/*
  Warnings:

  - A unique constraint covering the columns `[id_Admin]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_kamar]` on the table `Kamar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Admin_id_Admin_key` ON `Admin`(`id_Admin`);

-- CreateIndex
CREATE UNIQUE INDEX `Kamar_id_kamar_key` ON `Kamar`(`id_kamar`);
