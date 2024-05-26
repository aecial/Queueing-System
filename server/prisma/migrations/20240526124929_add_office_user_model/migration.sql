-- AlterTable
ALTER TABLE `user` ADD COLUMN `officeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_officeId_fkey` FOREIGN KEY (`officeId`) REFERENCES `office`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
