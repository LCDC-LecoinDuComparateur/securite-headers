export default {
  async fetch(request, env, ctx) {
    // Laisse passer la requête vers le serveur d'origine (GitHub Pages)
    const response = await fetch(request);

    // Crée une nouvelle réponse modifiable à partir de la réponse originale
    const newResponse = new Response(response.body, response);

    // Ajoute les en-têtes de sécurité
    newResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    newResponse.headers.set('X-Frame-Options', 'DENY');
    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';");
    
    // Important : Supprime un en-tête potentiellement conflictuel ajouté par GitHub Pages
    newResponse.headers.delete('x-github-request-id');

    return newResponse;
  },
};
