/*
  Warnings:

  - Added the required column `duration_in_sec` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "duration_in_sec" INTEGER NOT NULL;
