addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Verifica si es el subdominio cdn
  if (url.hostname === 'cdn.comunidad-n8n.com') {
    // Obtén el path de la URL original
    const path = url.pathname
    
    // Construye la nueva URL de GitHub
    const githubUrl = `https://raw.githubusercontent.com/aitorroma/comunidad-n8n-blog/main/assets${path}`
    
    try {
      // Realiza la petición a GitHub
      const response = await fetch(githubUrl)
      
      // Si la respuesta no es ok, lanza un error
      if (!response.ok) {
        throw new Error(`GitHub respondió con status: ${response.status}`)
      }
      
      // Crea una nueva respuesta con headers de cache
      const modifiedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Cache-Control': 'public, max-age=86400',  // Cache por 24 horas
          'Content-Type': response.headers.get('Content-Type'),
          'Access-Control-Allow-Origin': '*'
        }
      })
      
      return modifiedResponse
    } catch (error) {
      // En caso de error, devuelve un 404
      return new Response('Archivo no encontrado', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'no-store'
        }
      })
    }
  }
  
  // Si no es el subdominio cdn, devuelve la respuesta original
  return fetch(request)
}