/*
  Warnings:

  - Added the required column `duration` to the `recipes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serves` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "serves" TEXT NOT NULL;
