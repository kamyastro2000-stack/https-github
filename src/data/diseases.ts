export type Disease = {
  slug: string; name: string; summary: string;
  steps: string[]; signs: string[]; urgent: string[]; prevent: string[];
  myths: { claim: string; truth: boolean; explain: string }[];
};

export const diseases: Disease[] = [
  { slug: "paludisme", name: "Paludisme", summary: "Infection parasitaire transmise par la piqûre du moustique anophèle.",
    steps: ["Moustique", "Piqûre", "Parasite", "Sang", "Symptômes"],
    signs: ["Fièvre", "Frissons", "Maux de tête", "Grande fatigue"],
    urgent: ["Convulsions", "Somnolence ou confusion", "Vomissements répétés", "Fièvre chez un jeune enfant ou une femme enceinte"],
    prevent: ["Dormir sous moustiquaire imprégnée", "Supprimer les eaux stagnantes", "Répulsifs le soir", "Consulter dès la fièvre"],
    myths: [{ claim: "Le paludisme est causé par le froid.", truth: false, explain: "Il est causé par un parasite transmis par un moustique." }] },
  { slug: "drepanocytose", name: "Drépanocytose", summary: "Maladie génétique de l'hémoglobine qui déforme les globules rouges.",
    steps: ["Gènes des parents", "Hémoglobine anormale", "Globules en faucille", "Vaisseaux bouchés", "Crises"],
    signs: ["Douleurs osseuses", "Fatigue", "Jaunisse", "Infections fréquentes"],
    urgent: ["Douleur intense", "Fièvre", "Difficulté à respirer", "Faiblesse d'un côté du corps"],
    prevent: ["Test avant mariage", "Bien s'hydrater", "Vaccinations à jour", "Suivi médical régulier"],
    myths: [{ claim: "La drépanocytose est contagieuse.", truth: false, explain: "Elle est héréditaire, transmise par les deux parents." }] },
  { slug: "hypertension", name: "Hypertension", summary: "Pression trop élevée du sang dans les artères, souvent silencieuse.",
    steps: ["Sel, stress, âge", "Artères rigides", "Pression élevée", "Cœur fatigué", "Complications"],
    signs: ["Souvent aucun", "Maux de tête", "Vertiges", "Bourdonnements"],
    urgent: ["Douleur dans la poitrine", "Paralysie ou bouche déviée", "Trouble de la parole", "Vision brutalement trouble"],
    prevent: ["Moins de sel", "Activité physique", "Mesurer sa tension", "Limiter l'alcool et le tabac"],
    myths: [{ claim: "Si je me sens bien, ma tension est normale.", truth: false, explain: "L'hypertension est souvent sans symptôme : seule la mesure le dit." }] },
  { slug: "diabete", name: "Diabète", summary: "Excès de sucre dans le sang lié à un défaut d'insuline.",
    steps: ["Alimentation", "Sucre dans le sang", "Insuline insuffisante", "Hyperglycémie", "Organes touchés"],
    signs: ["Soif intense", "Urines fréquentes", "Fatigue", "Plaies qui guérissent mal"],
    urgent: ["Malaise ou perte de connaissance", "Respiration rapide", "Vomissements", "Confusion"],
    prevent: ["Manger équilibré", "Bouger 30 min par jour", "Surveiller son poids", "Dépistage régulier"],
    myths: [{ claim: "Seules les personnes âgées ont le diabète.", truth: false, explain: "Il peut toucher tous les âges, y compris les enfants." }] },
  { slug: "tuberculose", name: "Tuberculose", summary: "Infection bactérienne qui touche surtout les poumons.",
    steps: ["Toux d'un malade", "Bactérie dans l'air", "Inhalation", "Poumons", "Symptômes"],
    signs: ["Toux de plus de 2 semaines", "Sueurs nocturnes", "Perte de poids", "Fièvre le soir"],
    urgent: ["Crachats de sang", "Essoufflement", "Amaigrissement rapide"],
    prevent: ["Vaccin BCG", "Aérer les pièces", "Se faire dépister", "Suivre le traitement jusqu'au bout"],
    myths: [{ claim: "La tuberculose se guérit.", truth: true, explain: "Oui, avec un traitement complet et bien suivi, gratuit dans de nombreux pays." }] },
  { slug: "hepatite-b", name: "Hépatite B", summary: "Infection virale du foie, transmissible par le sang et les rapports sexuels.",
    steps: ["Sang ou rapport", "Virus", "Foie", "Inflammation", "Risque de cirrhose"],
    signs: ["Souvent aucun", "Fatigue", "Jaunisse", "Urines foncées"],
    urgent: ["Jaunisse marquée", "Ventre gonflé", "Confusion", "Saignements"],
    prevent: ["Vaccination", "Préservatif", "Ne pas partager rasoirs ni seringues", "Dépistage"],
    myths: [{ claim: "On attrape l'hépatite B en partageant un repas.", truth: false, explain: "Elle se transmet par le sang et les rapports sexuels, pas par la nourriture." }] },
];

export const countries: { code: string; name: string; slugs: string[] }[] = [
  { code: "CI", name: "Côte d'Ivoire", slugs: ["paludisme", "drepanocytose", "hypertension", "hepatite-b"] },
  { code: "SN", name: "Sénégal", slugs: ["paludisme", "tuberculose", "diabete"] },
  { code: "CM", name: "Cameroun", slugs: ["paludisme", "drepanocytose", "hepatite-b"] },
  { code: "GA", name: "Gabon", slugs: ["paludisme", "hypertension", "tuberculose"] },
  { code: "BJ", name: "Bénin", slugs: ["paludisme", "drepanocytose", "hypertension"] },
  { code: "TG", name: "Togo", slugs: ["paludisme", "hepatite-b", "diabete"] },
  { code: "CD", name: "RDC", slugs: ["paludisme", "tuberculose", "drepanocytose"] },
];
