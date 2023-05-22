import crypto from 'crypto'

// Générer une paire de clés RSA (privée et publique)
export function generateRSAKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Taille de la clé en bits (2048 est recommandé pour une bonne sécurité)
  })

  return {
    privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }),
    publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
  }
}

// Encrypt RSA avec public key
export function publicKeyEncrypt(data: Buffer, publicKey: string): string {
  console.error(data, publicKey)
  const publicKeyBuffer = Buffer.from(publicKey, 'utf-8')
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKeyBuffer,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    data
  )

  return encryptedData.toString('base64')
}

// decrypt RSA avec private key
export function privateKeyDecrypt(
  encryptedDataBuffer: Buffer,
  privateKey: string
): Buffer {
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    encryptedDataBuffer
  )

  return decryptedData
}
