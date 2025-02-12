// api/saveAnswer.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// Crée le client DynamoDB
const REGION = process.env.AWS_REGION; // ex: "us-east-1"
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  
  try {
    // Récupère les données envoyées par le client
    const data = req.body; // Attendu en JSON
    // Prépare l'objet à insérer
    const item = {
      id: uuidv4(), // Génère un identifiant unique
      ...data,
      formulaire: 'toulon',
      timestamp: new Date().toISOString(),
    };

    // Prépare la commande Put pour DynamoDB
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE, // Nom de la table, défini dans Vercel
      Item: item,
    });

    // Exécute la commande pour sauvegarder l'item dans DynamoDB
    await ddbDocClient.send(command);

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("Erreur DynamoDB :", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
