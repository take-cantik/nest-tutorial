-- CreateTable
CREATE TABLE "Reply" (
    "toId" VARCHAR(255) NOT NULL,
    "fromId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("toId","fromId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reply_fromId_key" ON "Reply"("fromId");

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;
