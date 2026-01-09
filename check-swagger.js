const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { 
        title: 'Test Debug Swagger', 
        version: '1.0.0' 
    },
  },
  apis: ['./routes/*.js'], 
};

console.log("🔍 Analyse des commentaires Swagger en cours...");
console.log("📂 Dossier cible : ./routes/*.js");

try {
  const specs = swaggerJsdoc(options);
  
  if (!specs.paths || Object.keys(specs.paths).length === 0) {
      console.warn("⚠️  ATTENTION : Aucune route n'a été détectée !");
      console.warn("   -> Vérifie que tes fichiers contiennent bien /** @swagger ... */");
  } else {
      console.log("✅ SUCCÈS ! L'analyse s'est terminée sans erreur critique.");
      console.log(`   -> ${Object.keys(specs.paths).length} routes trouvées.`);
      console.log("   -> Structure JSON valide.");
  }

} catch (error) {
  console.error("\n❌ ERREUR FATALE DÉTECTÉE !");
  console.error("---------------------------------------------------");
  console.error(error.message);
  console.error("---------------------------------------------------");
  
  if (error.message.includes('Map keys must be unique')) {
    console.log("\n💡 DIAGNOSTIC : Problème d'indentation YAML.");
    console.log("   Swagger pense que plusieurs lignes sont au même niveau alors qu'elles devraient être décalées.");
    console.log("   Vérifie que tu as bien des espaces (2 ou 4) devant 'post:', 'summary:', etc.");
  }
}