// src/pages/api/saveAnswer.js
export const prerender = false;
import { promises as fs } from 'fs';
import { join } from 'path';

export async function POST({ request }) {
  try {
    // Récupérer les données envoyées par le client
    const data = await request.json();

    // Définir le chemin vers le fichier answers.json dans le dossier data
    const filePath = join(process.cwd(), 'data', 'answers.json');

    let answers = [];
    try {
      // Essayer de lire le fichier existant
      const fileContent = await fs.readFile(filePath, 'utf8');
      answers = JSON.parse(fileContent);
    } catch (err) {
      // Si le fichier n'existe pas ou est vide, on initialise answers en tableau
      answers = [];
    }

    // Ajouter la nouvelle réponse avec un timestamp
    answers.push({ ...data,
      formulaire: "toulon", 
      timestamp: new Date().toISOString()
    });

    // Écrire les données mises à jour dans le fichier
    await fs.writeFile(filePath, JSON.stringify(answers, null, 2));

    return new Response(JSON.stringify({ success: true, message: 'Données enregistrées' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
