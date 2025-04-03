# CDN Worker para Cloudflare

Este Worker de Cloudflare redirige las peticiones de `cdn.comunidad-n8n.com` a los archivos almacenados en GitHub.

## Funcionamiento

Cuando se hace una petición a `cdn.comunidad-n8n.com/imagen.jpg`, el Worker:
1. Redirige la petición a `https://raw.githubusercontent.com/aitorroma/comunidad-n8n-blog/main/assets/imagen.jpg`
2. Añade headers de caché para mejorar el rendimiento
3. Maneja errores y devuelve 404 si el archivo no existe

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

## Uso

Una vez desplegado, puedes usar las URLs de la siguiente manera:
- Original: `https://raw.githubusercontent.com/aitorroma/comunidad-n8n-blog/main/assets/imagen.jpg`
- Nueva: `https://cdn.comunidad-n8n.com/imagen.jpg`