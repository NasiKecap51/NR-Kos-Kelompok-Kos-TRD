/*
  Warnings:

  - You are about to drop the column `id_user` on the `pembayaran` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `pemesanan` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Pembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pembayaran` DROP COLUMN `id_user`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pemesanan` DROP COLUMN `id_user`,
    ADD COLUMN `user_id` INTEGER NOT NULL;
