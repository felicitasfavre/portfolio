# Portfolio — Felicitas Favre

Pequeño proyecto estático pensado para GitHub Pages. Mobile-first, modular y fácil de editar para usuarias sin conocimientos técnicos.

Archivos clave:
- `js/data.js`: EDITAR AQUI para cambiar textos, links, habilitar/deshabilitar secciones y reemplazar rutas de imágenes/videos.
- `index.html`: Estructura semántica. No suele necesitar cambios.
- `assets/img/`: Carpeta de imágenes (reemplazá los archivos sugeridos).

Cómo editar (rápido):
1. Abrir `js/data.js` y modificar `contact.instagram` y `contact.email`.
2. Reemplazar imágenes en `assets/img/` con los nombres usados en `js/data.js`.
3. Para desactivar una sección, cambiar `sections[].enabled` a `false` en `js/data.js`.
4. Para reordenar secciones, cambiar el orden de objetos en `sections` en `js/data.js`.

Publicar en GitHub Pages:

1. Crear un repositorio en GitHub y pushear la carpeta `portfolio-felicitas-favre` a la rama `main`.
2. En la configuración del repo -> Pages, seleccionar la rama `main` y la carpeta `/ (root)` o `gh-pages` si usás esa rama.

Git (ejemplo):
```bash
git init
git add .
git commit -m "Initial portfolio Felicitas Favre"
git remote add origin git@github.com:TU_USUARIO/portfolio-felicitas-favre.git
git push -u origin main
```

Notas rápidas:
- Performance: usa imágenes optimizadas (WebP o JPG comprimido) y carga videos en baja resolución si es necesario.
- Para cambios visuales (paleta/espaciado), editá `css/variables.css`.
