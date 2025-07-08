// API endpoint pour récupérer tous les formulaires
export async function GET({ request }) {
  try {
    // Pour le moment, on simule les données car DynamoDB n'est pas configuré en local
    // En production, remplacer par la vraie logique DynamoDB
    
    const mockData = {
      success: true,
      data: [
        {
          city: "annot",
          country: "France",
          department: "04 - Alpes-de-Haute-Provence",
          contactMode: "Accueil physique",
          profile: "Famille",
          ageGroups: ["25-40", "40-60"],
          specificRequests: ["Escalade", "Train à Vapeur"],
          generalRequests: ["Randonnées", "Patrimoine Culturel"],
          otherRequest: "Informations sur les sentiers"
        },
        {
          city: "colmars-les-alpes",
          country: "France",
          department: "04 - Alpes-de-Haute-Provence",
          contactMode: "Accueil physique",
          profile: "Couple",
          ageGroups: ["60+"],
          specificRequests: ["À définir"],
          generalRequests: ["Restaurants", "Hébergements"],
          otherRequest: "Accessibilité PMR"
        },
        {
          city: "entrevaux",
          country: "Belgique",
          department: "",
          contactMode: "Accueil physique",
          profile: "Groupe d'amis",
          ageGroups: ["18-25", "25-40"],
          specificRequests: ["Citadelle", "Train à Vapeur"],
          generalRequests: ["Activité d'eau douce (pédalo, canoë)", "Commerces"],
          otherRequest: "Parking camping-car"
        },
        {
          city: "la-palud-sur-verdon",
          country: "France",
          department: "83 - Var",
          contactMode: "Accueil physique",
          profile: "Seul",
          ageGroups: ["25-40"],
          specificRequests: ["Blanc-Martel", "Escalade et via cordatta"],
          generalRequests: ["Randonnées", "Autres activités de pleine nature"],
          otherRequest: "Conditions météo"
        },
        {
          city: "saint-andre-les-alpes",
          country: "France",
          department: "04 - Alpes-de-Haute-Provence",
          contactMode: "Accueil physique",
          profile: "Famille",
          ageGroups: ["40-60", "18-25"],
          specificRequests: ["Lac de Castillon", "Parapente"],
          generalRequests: ["Baignade", "Vélo"],
          otherRequest: "Location de matériel"
        },
        {
          city: "annot",
          country: "France",
          department: "06 - Alpes-Maritimes",
          contactMode: "Accueil physique",
          profile: "Couple",
          ageGroups: ["40-60"],
          specificRequests: ["Grès d'Annot"],
          generalRequests: ["Patrimoine Culturel", "Restaurants"],
          otherRequest: "Visites guidées"
        },
        {
          city: "entrevaux",
          country: "Italie",
          department: "",
          contactMode: "Accueil physique",
          profile: "Famille",
          ageGroups: ["25-40", "Inconnu"],
          specificRequests: ["Gorge de Daluis"],
          generalRequests: ["Informations pratiques", "Accès"],
          otherRequest: "Horaires d'ouverture"
        },
        {
          city: "la-palud-sur-verdon",
          country: "France",
          department: "13 - Bouches-du-Rhône",
          contactMode: "Accueil physique",
          profile: "Groupe d'amis",
          ageGroups: ["18-25"],
          specificRequests: ["Route des Crêtes"],
          generalRequests: ["Hébergements", "Evènements, animations"],
          otherRequest: "Réservation camping"
        }
      ]
    };
    
    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des formulaires:', error);
    
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