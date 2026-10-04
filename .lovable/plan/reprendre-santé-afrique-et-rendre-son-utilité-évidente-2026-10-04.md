# Reprendre Santé.Afrique et rendre son utilité évidente

## Objectif

Recréer dans ce projet Lovable le site public Santé.Afrique du dépôt fourni, en conservant son identité actuelle : fond clair, vert profond, accent doré, titres à empattements et sobriété générale. Dès l’arrivée, chacun doit comprendre qu’il s’agit d’un guide d’information et de prévention sur six maladies, et savoir quoi faire ensuite, même avec peu d’habitude du numérique.

## Parcours et présentation

1. Reprendre les pages et contenus publics existants : accueil, recherche, liste et fiches des maladies, consultation par pays et pages d’information légale. Conserver les faits médicaux et les avertissements du site source sans inventer de conseils.
2. Repenser la première lecture de l’accueil : nom et mission du site clairement visibles, phrase directe en français simple, deux choix évidents (« Chercher une maladie ou un signe » et « Voir les six maladies »), puis un aperçu concret d’une fiche. Placer le rappel « information, pas diagnostic » sans qu’il masque l’action principale.
3. Simplifier les intitulés, agrandir les zones de clic et rendre la navigation et la recherche compréhensibles sur téléphone comme sur ordinateur. Montrer un état clair quand une recherche ne donne aucun résultat ; expliquer qu’un symptôme ne permet pas d’établir un diagnostic.
4. Garder le langage visuel du site, mais rendre les mouvements plus utiles : transitions discrètes entre étapes, retours immédiats après une action et révélations légères. Éviter les animations continues qui détournent de la lecture ; respecter les préférences de réduction des mouvements.
5. Vérifier les liens, la lecture des fiches, la recherche, les textes et le rendu sur petit écran et ordinateur, ainsi que l’accessibilité de base (clavier, contrastes, libellés).

## Détails techniques

- Le projet Lovable ouvert est actuellement une page vierge ; le dépôt public et le site publié serviront de référence pour reprendre le code, les données et le design dans **ce** projet, sans modifier directement le dépôt GitHub d’origine.
- Commencer par inventorier le code source et ses dépendances avant de l’adapter au projet TanStack Start. Préserver les URLs et les contenus existants lorsqu’ils sont disponibles ; pas de nouvelle base de données ni de service externe si le site reste statique.
- Limiter la dépense : réutiliser les ressources, composants et animations CSS du site ; pas de génération d’images ou de services payants inutiles.  ATTENTION IL TE RESTE 3,5 CREDIT