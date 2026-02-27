# Reglas Técnicas GuiArg — Protocolo Phygital 2026

**Objetivo:** Mantener una arquitectura escalable, segura y mobile-first.

---

## Stack Oficial

| Capa | Tecnología | Regla |
|------|-----------|-------|
| **Frontend** | Next.js 16 | App Router obligatorio + TypeScript |
| **Estilos** | Tailwind CSS | Basado en el sistema visual de GuiArg (`sistema-visual.json`) |
| **Backend / Datos** | Supabase | Auth + PostgreSQL con JSONB para configuraciones dinámicas |
| **Mobile Transition** | Capacitor 8 | Web to Native |
| **Imágenes** | AVIF | Formato obligatorio para optimizar LCP en móviles |
| **UX Optimista** | — | Mostrar cambios instantáneos antes de la respuesta del servidor |

---

## Reglas de Implementación

### Frontend
- Usar **App Router** de Next.js 16. Prohibido el Pages Router en código nuevo.
- Todos los componentes nuevos en TypeScript estricto (`strict: true`).
- Tailwind: solo usar las clases definidas en la paleta de `sistema-visual.json`. Sin colores ad-hoc.

### Imágenes y Assets
- Formato **AVIF** para todas las imágenes de contenido (previamente JPEG/PNG).
- El logo circular "GA" y el fileteado fino deben estar referenciados como activos estáticos en `/public/assets/`.
- Los Códigos QR deben generarse con su marco ornamental incluido.

### Base de Datos (Supabase)
- Configuraciones dinámicas de comercios → columna `JSONB`.
- RLS (Row Level Security) activado en todas las tablas con datos de usuarios.
- Nunca exponer claves de servicio en el frontend.

### UX y Performance
- **UI Optimista:** aplicar `optimistic updates` en acciones frecuentes (favoritos, puntos, estado de pedido).
- **LCP objetivo:** < 2.5s en conexión 4G móvil (AVIF + lazy loading).
- **Feedback de click:** animación `scale(0.98)` en botones interactivos (definido en `sistema-visual.json`).

---

## Checklist Técnica

- [ ] ¿El componente usa tipos TypeScript correctos?
- [ ] ¿Las imágenes están en AVIF?
- [ ] ¿Tailwind usa solo colores de la paleta GuiArg?
- [ ] ¿La tabla tiene RLS activo en Supabase?
- [ ] ¿El flujo tiene UI optimista donde corresponde?
