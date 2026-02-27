---
name: modo-produccion
description: Revisa una app/landing, detecta problemas típicos, propone mejoras y aplica correcciones con un checklist fijo para dejarlo listo para enseñar o publicar.
---

# Modo Producción (QA + Fix)

---

## Cuándo usar esta habilidad

- Cuando ya tenés algo generado (landing/app) y querés dejarlo "presentable".
- Cuando algo funciona "a medias" (móvil raro, imágenes rotas, botones sin acción, espaciados feos).
- Antes de enseñárselo a un cliente, grabarlo o publicarlo.

---

## Inputs necesarios

Si alguno falta, **preguntá antes de continuar**:

1. **Archivo principal** → ej: `index.html` o ruta del proyecto
2. **Objetivo de la revisión** → `"lista para enseñar"` o `"lista para publicar"`
3. **Restricciones** → ej: no cambiar branding / no cambiar copy / no tocar estructura

---

## Checklist de calidad (orden fijo)

### A) Funciona y se ve
- [ ] Abre preview / localhost sin errores
- [ ] Imágenes cargan y no hay rutas rotas
- [ ] Tipografías y estilos se aplican correctamente

### B) Responsive (móvil primero)
- [ ] Se ve bien en móvil (sin cortes, sin scroll horizontal)
- [ ] Botones y textos tienen tamaños legibles
- [ ] Secciones con espaciado coherente

### C) Copy y UX básica
- [ ] Titular claro y coherente con la propuesta
- [ ] CTAs consistentes (mismo verbo, misma intención)
- [ ] No hay texto placeholder tipo "lorem ipsum"

### D) Accesibilidad mínima
- [ ] Contraste razonable en textos
- [ ] Imágenes con atributo `alt`
- [ ] Estructura de headings (`h1`, `h2`) lógica

---

## Workflow

1. **Diagnóstico rápido** → lista de problemas en 5–10 bullets (priorizados por impacto)
2. **Plan de arreglos** → "qué cambio y por qué" (máximo 8 cambios)
3. **Aplicar cambios** → modificar los archivos necesarios
4. **Validación** → volver a abrir preview y confirmar checklist
5. **Resumen final** → cambios hechos + qué queda opcional para mejorar

---

## Reglas

- No cambies el estilo de marca si hay un skill de marca activo (ej: `identidad-guiarg`).
- No rehagás todo: corregí lo mínimo para ganar calidad rápido.
- Si hay conflicto entre "bonito" y "claro", **priorizá claridad**.

---

## Output (formato exacto)

Devolvé siempre en este orden:

```
1) DIAGNÓSTICO
   - [Problema priorizado 1]
   - [Problema priorizado 2]
   - ...

2) CAMBIOS APLICADOS
   - [Cambio 1: archivo → qué se hizo]
   - [Cambio 2: archivo → qué se hizo]
   - ...

3) RESULTADO
   "OK para enseñar" / "OK para publicar"
   Notas: [observaciones opcionales para seguir mejorando]
```

---

## Manejo de errores

Si al aplicar los cambios el resultado empeora o rompe algo, volvé al paso 2, ajustá el plan y re-aplicá solo ese cambio. Si hay ambigüedad en las restricciones del usuario, preguntá antes de asumir.
