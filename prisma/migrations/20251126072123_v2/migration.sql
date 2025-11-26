/*
  Warnings:

  - You are about to drop the column `brandId` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organisationId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cars` DROP FOREIGN KEY `cars_brandId_fkey`;

-- DropIndex
DROP INDEX `cars_brandId_fkey` ON `cars`;

-- AlterTable
ALTER TABLE `cars` DROP COLUMN `brandId`,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `organisationId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `brands`;

-- CreateTable
CREATE TABLE `organisations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `zipcode` INTEGER NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_organisationId_fkey` FOREIGN KEY (`organisationId`) REFERENCES `organisations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
