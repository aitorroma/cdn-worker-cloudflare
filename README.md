# CDN Worker para Cloudflare

Este Worker de Cloudflare redirige las peticiones de `cdn.comunidad-n8n.com` a los archivos almacenados en GitHub.

## Funcionamiento

El Worker soporta dos formatos de URL:

1. Con /assets/ explícito:
```
cdn.comunidad-n8n.com/assets/imagen.jpg
→ raw.githubusercontent.com/aitorroma/comunidad-n8n-blog/main/assets/imagen.jpg
```

2. Sin /assets/ (se añade automáticamente):
```
cdn.comunidad-n8n.com/imagen.jpg
→ raw.githubusercontent.com/aitorroma/comunidad-n8n-blog/main/assets/imagen.jpg
```

## Instalación

1. Instala Wrangler CLI:
```bash
npm install -g wrangler
```

2. Inicia sesión en tu cuenta de Cloudflare:
```bash
wrangler login
```

3. Despliega el Worker:
```bash
wrangler deploy
```

## Configuración en Cloudflare

1. Ve a tu panel de control de Cloudflare
2. Selecciona el dominio `comunidad-n8n.com`
3. Ve a "DNS" y añade un registro CNAME:
   - Nombre: `cdn`
   - Destino: `comunidad-n8n.com`
   - Proxy status: Activado (naranja)

## Características

- Redirección automática a GitHub
- Soporte para rutas con y sin /assets/
- Caché de 24 horas para mejor rendimiento
- Headers CORS para uso desde cualquier dominio
- Manejo de errores con respuestas 404 apropiadas