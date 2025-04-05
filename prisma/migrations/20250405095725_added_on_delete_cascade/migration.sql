-- DropForeignKey
ALTER TABLE "Showtimes" DROP CONSTRAINT "Showtimes_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_movieId_fkey";

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showtimes" ADD CONSTRAINT "Showtimes_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
