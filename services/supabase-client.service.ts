import { supabase } from './supabase-client'

export class SupabaseClient {
  bucketName = process.env.BUCKET

  async uploadFile(path: string, file: File): Promise<string> {
    if (!this.bucketName) {
      throw new Error("BUCKET non trouvé dans l'environnement")
    }

    const { error } = await supabase.storage
      .from(this.bucketName)
      .upload(path, file)

    if (error) {
      throw error
    }

    const { data, error: urlError } = await supabase.storage
      .from(this.bucketName)
      .createSignedUrl(path, 60 * 24 * 365) // URL valide pour un an

    if (urlError || !data) {
      throw (
        urlError || new Error("Erreur lors de la création de l'URL du fichier.")
      )
    }

    return data.signedUrl
  }
}
