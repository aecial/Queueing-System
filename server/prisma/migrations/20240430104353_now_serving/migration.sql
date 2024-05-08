/*
  Warnings:

  - Added the required column `now_serving` to the `department` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `department` ADD COLUMN `now_serving` VARCHAR(255) NOT NULL;
