// API endpoint pour récupérer les statistiques
export async function GET({ request }) {
  try {
    // Pour le moment, on simule les données car DynamoDB n'est pas configuré en local
    // En production, remplacer par la vraie logique DynamoDB
    
    const mockData = {
      success: true,
      count: 42 // Nombre fictif pour les tests
    };
    
    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}