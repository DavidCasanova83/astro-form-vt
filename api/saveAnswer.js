// api/saveAnswer.js

// Vercel attend une fonction handler exportée par défaut.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  
  try {
    // On suppose que les données sont envoyées en JSON.
    const data = req.body;

    // Ici, tu ajoutes ta logique pour sauvegarder les données.
    // Attention : Le filesystem des fonctions serverless sur Vercel est éphémère.
    // Pour un stockage persistant, il faudrait utiliser une base de données ou un service KV.

    // Exemple de réponse (en ajoutant la propriété "formulaire": "toulon")
    const result = {
      ...data,
      formulaire: 'toulon',
      timestamp: new Date().toISOString()
    };

    // Pour cet exemple, on ne va pas réellement écrire dans un fichier.
    // On renvoie simplement la réponse.
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
