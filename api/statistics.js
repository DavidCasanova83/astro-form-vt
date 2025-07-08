import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Récupérer la région depuis les variables d'environnement
const REGION = process.env.AWS_REGION; // ex: 'us-east-1'
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    // Exécute une requête de scan pour compter le nombre d'entrées
    const command = new ScanCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Select: "COUNT", // Permet de récupérer uniquement le nombre d'entrées
    });

    const result = await ddbDocClient.send(command);

    res.status(200).json({ success: true, count: result.Count });
  } catch (error) {
    console.error("Erreur DynamoDB :", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
