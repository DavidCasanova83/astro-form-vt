import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Configuration DynamoDB
const REGION = process.env.AWS_REGION; // ex: 'us-east-1'
const client = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(client);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    let allItems = [];
    let lastEvaluatedKey = null;

    // Boucle de pagination pour récupérer toutes les entrées
    do {
      const command = new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE,
        ExclusiveStartKey: lastEvaluatedKey
      });

      const result = await ddbDocClient.send(command);
      
      // Ajouter les items de cette page au tableau total
      if (result.Items) {
        allItems = allItems.concat(result.Items);
      }
      
      // Mettre à jour la clé pour la prochaine page
      lastEvaluatedKey = result.LastEvaluatedKey;
      
    } while (lastEvaluatedKey);

    res.status(200).json({ success: true, data: allItems });
  } catch (error) {
    console.error("Erreur DynamoDB :", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
