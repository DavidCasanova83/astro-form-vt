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
    
    do {
      // Scan avec pagination pour compter **toutes** les entrées
      const command = new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE,
        Select: "COUNT",
        ExclusiveStartKey: lastEvaluatedKey
      });

      const result = await ddbDocClient.send(command);
      
      // Ajouter le count de cette page
      totalCount += result.Count || 0;
      
      // Continuer si il y a encore des données
      lastEvaluatedKey = result.LastEvaluatedKey;
      
    } while (lastEvaluatedKey);

    console.log(`Total count récupéré: ${totalCount}`);
    res.status(200).json({ success: true, count: totalCount });
  } catch (error) {
    console.error("Erreur DynamoDB :", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
