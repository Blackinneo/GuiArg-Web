# Guía del Sistema — Creador de Skills para Antigravity

> Documento de referencia completo para el skill `creador-de-skills-antigravity`.
> Este archivo contiene las instrucciones base que definen cómo se diseñan Skills en este proyecto.

---

## 1. Estructura mínima obligatoria

Cada Skill se crea dentro de:

```
.agent/skills/<nombre-del-skill>/
```

Dentro debe existir como mínimo:

- `SKILL.md` — obligatorio, lógica y reglas del skill
- `recursos/` — opcional, guías, plantillas, tokens, ejemplos
- `scripts/` — opcional, utilidades que el skill ejecuta
- `ejemplos/` — opcional, implementaciones de referencia

**Principio:** No crear archivos innecesarios. Mantener la estructura lo más simple posible.

---

## 2. Reglas de nombre y YAML (SKILL.md)

El archivo `SKILL.md` debe comenzar **siempre** con frontmatter YAML.

### Reglas para `name`
- Corto, en minúsculas, con guiones (`kebab-case`)
- Máximo 40 caracteres
- No usar nombres de herramientas salvo que sea imprescindible
- No incluir lenguaje de "marketing": que sea operativo

**Ejemplos válidos:** `planificar-video`, `auditar-landing`, `responder-emails`

### Reglas para `description`
- En español, en tercera persona
- Máximo 220 caracteres
- Debe decir qué hace **y** cuándo usarlo

### Plantilla de frontmatter

```yaml
---
name: <nombre-del-skill>
description: <descripción breve en tercera persona>
---
```

---

## 3. Principios de escritura (para que el skill funcione)

| Principio | Descripción |
|-----------|-------------|
| **Claridad sobre longitud** | Pocas reglas, muy claras. El skill es un manual de ejecución, no un artículo de blog. |
| **Sin relleno** | Evitar explicaciones innecesarias. Solo lo que el agente necesita para ejecutar. |
| **Separación de responsabilidades** | Si hay "estilo" → `recursos/`. Si hay "pasos" → workflow principal. |
| **Pedir datos cuando falten** | Si un input es crítico, el skill debe preguntar explícitamente. |
| **Salida estandarizada** | Definir exactamente el formato de output: lista, tabla, JSON, markdown, archivo. |

---

## 4. Cuándo se activa un skill (triggers)

Cada `SKILL.md` debe incluir una sección **"Cuándo usar este skill"** con triggers claros y concretos.

**Ejemplos de buenos triggers:**
- "cuando el usuario pida crear un skill nuevo"
- "cuando el usuario repita un proceso más de una vez"
- "cuando se necesite un estándar de formato"
- "cuando haya que convertir un prompt largo en un procedimiento reutilizable"

**Regla:** Los triggers deben ser fáciles de reconocer, sin ambigüedad.

---

## 5. Flujo de trabajo recomendado

### Skills simples
- 3 a 6 pasos máximo

### Skills complejos
Dividir en fases:

1. **Plan** → Entender el objetivo, listar inputs, definir output
2. **Validación** → Confirmar con el usuario si hay ambigüedad
3. **Ejecución** → Escribir el skill con sus recursos
4. **Revisión** → Aplicar checklist

### Checklist rápida
- [ ] Entendí el objetivo final
- [ ] Tengo todos los inputs necesarios
- [ ] Definí el output exacto
- [ ] Apliqué el nivel de libertad correcto
- [ ] Revisé coherencia y errores
- [ ] No agregué archivos innecesarios

---

## 6. Niveles de libertad

El skill debe elegir el nivel adecuado según el tipo de tarea:

| # | Nivel | Tipo de tarea | Enfoque |
|---|-------|---------------|---------|
| 1 | **Alta libertad** | Brainstorming, ideas, alternativas | Heurísticas orientativas |
| 2 | **Media libertad** | Documentos, copys, estructuras | Plantillas con slots |
| 3 | **Baja libertad** | Scripts, operaciones técnicas, cambios en DB | Pasos exactos y comandos literales |

> **Regla de oro:** Cuanto más riesgo tiene la tarea, más específico debe ser el skill.

---

## 7. Manejo de errores y correcciones

Incluir siempre en el `SKILL.md` una sección corta sobre errores:

- Qué hacer si el output no cumple el formato
- Cómo pedir feedback al usuario
- Cómo iterar sin romper el estándar

**Ejemplo de sección estándar:**

```
## Manejo de errores
Si el resultado no cumple el formato esperado, volvé al paso 2,
ajustá las restricciones y re-generá. Si hay ambigüedad en los
inputs, preguntá al usuario antes de asumir.
```

---

## 8. Formato de salida al crear un skill

Cuando el usuario pida un skill, responder siempre con:

```
📁 Carpeta
.agent/skills/<nombre-del-skill>/

📄 SKILL.md
---
name: ...
description: ...
---

# <Título del skill>

## Cuándo usar este skill
- ...
- ...

## Inputs necesarios
- ...
- ...

## Workflow
1) ...
2) ...
3) ...

## Instrucciones
...

## Output (formato exacto)
...

## Manejo de errores
...

📎 Recursos opcionales (solo si aportan valor real)
- recursos/<archivo>.md
- scripts/<archivo>.sh
```

---

## 9. Skills sugeridos para el proyecto GuiArg

Si el usuario está en modo de creación de skills, sugerir ideas útiles:

| Nombre sugerido | Propósito |
|----------------|-----------|
| `estilo-y-marca` | Mantener consistencia visual y de voz |
| `planificar-videos` | Estructurar guiones y calendarios de contenido |
| `auditar-landing` | Revisar páginas contra criterios UX/conversión |
| `debug-de-app` | Diagnóstico sistemático de errores en la app |
| `responder-emails` | Respuestas con tono definido por perfil |
| `commits-convencionales` | Mensajes de commit con Conventional Commits |
| `revisar-pull-request` | Checklist de code review del proyecto |
| `crear-componente-react` | Convenciones para nuevos componentes |

---

## 10. Instrucciones de uso para el usuario

Para crear un skill nuevo usando esta guía:

```
"Usá el skill 'creador-de-skills-antigravity' y construí un skill para: <descripción>.
Devolveme la carpeta, el SKILL.md y los recursos necesarios."
```

---

*Documento generado para el proyecto GuiArg — Español (Latinoamérica)*
