/*
  Warnings:

  - You are about to drop the column `showtimes` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `movieName` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "showtimes";

-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "cancellation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "movieName" TEXT NOT NULL,
ADD COLUMN     "showtimes" TEXT[];

-- CreateTable
CREATE TABLE "Showtimes" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "Showtimes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Showtimes" ADD CONSTRAINT "Showtimes_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
