/*
  Warnings:

  - Changed the type of `genre` on the `Song` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "genre",
ADD COLUMN     "genre" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Genre";
