/*
  Warnings:

  - Made the column `duration` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serves` on table `recipes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "recipes" ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "serves" SET NOT NULL;
