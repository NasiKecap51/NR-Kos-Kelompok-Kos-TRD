/*
  Warnings:

  - You are about to drop the column `nomortlp_user` on the `user` table. All the data in the column will be lost.
  - Added the required column `nomortlp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `nomortlp_user`,
    ADD COLUMN `nomortlp` VARCHAR(12) NOT NULL;
