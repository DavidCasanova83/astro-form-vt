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
    
    do {
      // Scan avec pagination pour récupérer **toutes** les entrées
      const command = new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE,
        ExclusiveStartKey: lastEvaluatedKey
      });

      const result = await ddbDocClient.send(command);
      
      // Ajouter les items récupérés
      if (result.Items) {
        allItems = allItems.concat(result.Items);
      }
      
      // Continuer si il y a encore des données
      lastEvaluatedKey = result.LastEvaluatedKey;
      
    } while (lastEvaluatedKey);

    console.log(`Total items récupérés: ${allItems.length}`);
    res.status(200).json({ success: true, data: allItems });
  } catch (error) {
    console.error("Erreur DynamoDB :", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
