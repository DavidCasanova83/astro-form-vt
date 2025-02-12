// api/saveAnswer.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

// Récupérer la région depuis les variables d'environnement
const REGION = process.env.AWS_REGION; // ex: 'us-east-1'
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  
  try {
    // Récupère les données envoyées par le client
    const data = req.body;
    console.log("Données reçues :", data);

    // Prépare l'objet à insérer dans DynamoDB
    const item = {
      primaire: uuidv4(), // Clé primaire unique
      ...data,
      formulaire: 'toulon',  // Ajoute le champ "formulaire"
      timestamp: new Date().toISOString(),
    };
    console.log("Item à insérer :", item);

    // Prépare la commande Put pour DynamoDB
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE, // Assure-toi que cette variable est bien définie (ex: 'Answers')
      Item: item,
    });

    const result = await ddbDocClient.send(command);
    console.log("Résultat de PutCommand :", result);

    // Envoie la commande pour insérer l'item dans la table
    await ddbDocClient.send(command);

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("Erreur DynamoDB :", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
