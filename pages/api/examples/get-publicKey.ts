import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const publicKey =
    '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEA5ruuf1oWrALDt023V0I447qPSZGd+A95HW0l59bOOE+AQiObwzTR\nwQDbceH29HIu2BXTTKkoX2YeBwOsjJthKX1t3KfLlfDNN7AuFZmz9foWEPXI3n94\nqm7aYLBs7WpEfM5O7yy6GJyMuma5Zbc7yGCocDHZvrLxoIkcCA0Zc8aaVKagxmL0\nZwYYmiFB9gy5yqnhf1tsorD+lxifeXsjAJHjwWpJ4BMYm69qswcrpU9jO1gYnJ1C\nmOU+9+iVUzmGO7T0n4pnB4e2UclYA4NDBrStT3CtHTkPMQyZ6Ts4z5VrwiMecjLu\nnJ2vJmGbzkibSe47CG/npx0cXu945L7xvQIDAQAB\n-----END RSA PUBLIC KEY-----\n'

  return res.status(200).json({ publicKey: publicKey })
}
