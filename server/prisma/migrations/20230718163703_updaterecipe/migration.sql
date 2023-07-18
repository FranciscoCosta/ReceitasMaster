/*
  Warnings:

  - Made the column `comment` on table `reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "totalReviews" INTEGER,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "comment" SET NOT NULL;
