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
    let totalCount = 0;
    let lastEvaluatedKey = null;

    // Boucle de pagination pour compter toutes les entrées
    do {
      const command = new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE,
        Select: "COUNT", // Permet de récupérer uniquement le nombre d'entrées
        ExclusiveStartKey: lastEvaluatedKey
      });

      const result = await ddbDocClient.send(command);
      
      // Ajouter le nombre d'items de cette page au total
      totalCount += result.Count;
      
      // Mettre à jour la clé pour la prochaine page
      lastEvaluatedKey = result.LastEvaluatedKey;
      
    } while (lastEvaluatedKey);

    res.status(200).json({ success: true, count: totalCount });
  } catch (error) {
    console.error("Erreur DynamoDB :", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
