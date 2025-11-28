/*
  Warnings:

  - You are about to drop the `organisations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_organisationId_fkey`;

-- DropTable
DROP TABLE `organisations`;

-- DropTable
DROP TABLE `users`;
