-- CreateTable
CREATE TABLE "UserAppAsso" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT DEFAULT 'Membre',
    "profilePictureUrl" TEXT,
    "isAdmin" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAppAsso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "status" TEXT DEFAULT 'Pending',
    "begin" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssoEvent" (
    "id" SERIAL NOT NULL,
    "afficheUrl" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT DEFAULT 'Admin',
    "modifyAt" TEXT,
    "modifyBy" TEXT,
    "beginAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "linkUrl" TEXT,
    "linkContent" TEXT DEFAULT 'En savoir plus',

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
CREATE UNIQUE INDEX "UserAppAsso_email_key" ON "UserAppAsso"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_userId_key" ON "Contribution"("userId");

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserAppAsso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackUpAssoEvent" ADD CONSTRAINT "BackUpAssoEvent_assoEventId_fkey" FOREIGN KEY ("assoEventId") REFERENCES "AssoEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
