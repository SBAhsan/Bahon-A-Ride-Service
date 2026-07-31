-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD', 'WALLET');

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_rideId_key" ON "payments"("rideId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "ride_bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
