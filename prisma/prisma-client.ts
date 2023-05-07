// Importer prisma depuis ce fichier et ne jamais instancier de PrismaClient() ailleurs dans l'appli
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
