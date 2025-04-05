/*
  Warnings:

  - Added the required column `price` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "price" INTEGER NOT NULL;
