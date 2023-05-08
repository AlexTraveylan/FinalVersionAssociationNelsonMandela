-- CreateTable
CREATE TABLE "UserApp" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "profilePictureUrl" TEXT,
    "iv" TEXT,
    "encryptedAESKey" BYTEA,
    "publicKey" BYTEA NOT NULL,
    "privateKey" BYTEA NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "begin" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssoEvent" (
    "id" SERIAL NOT NULL,
    "afficheUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "modifyAt" TEXT,
    "modifyBy" TEXT,
    "beginAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "linkUrl" TEXT,
    "linkContent" TEXT NOT NULL DEFAULT 'En savoir plus',

    CONSTRAINT "AssoEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackUpAssoEvent" (
    "id" SERIAL NOT NULL,
    "afficheUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "modifyAt" TEXT,
    "modifyBy" TEXT,
    "beginAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "linkUrl" TEXT,
    "linkContent" TEXT NOT NULL DEFAULT 'En savoir plus',
    "assoEventId" INTEGER NOT NULL,

    CONSTRAINT "BackUpAssoEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAssoEvent" (
    "id" SERIAL NOT NULL,
    "objectId" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "LogAssoEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comptabilite" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "from" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paiementType" TEXT NOT NULL,
    "note" TEXT,
    "tresorierToken" TEXT NOT NULL,

    CONSTRAINT "Comptabilite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserApp_email_key" ON "UserApp"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_userId_key" ON "Contribution"("userId");

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserApp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackUpAssoEvent" ADD CONSTRAINT "BackUpAssoEvent_assoEventId_fkey" FOREIGN KEY ("assoEventId") REFERENCES "AssoEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
