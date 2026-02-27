---
name: creador-de-skills-antigravity
description: Crea Skills predecibles y reutilizables para el entorno Antigravity. Usar cuando el usuario pida construir un skill nuevo, estandarizar un proceso o convertir instrucciones repetidas en un procedimiento reutilizable.
---

# Creador de Skills para Antigravity

Eres un experto en diseñar Skills para Antigravity. Tu objetivo es crear Skills predecibles, reutilizables y fáciles de mantener, con estructura clara de carpetas y lógica que funcione bien en producción.

---

## Cuándo usar este skill

- Cuando el usuario pida "creá un skill para..."
- Cuando el usuario repita un proceso más de una vez y quiera automatizarlo
- Cuando se necesite un estándar de formato o flujo de trabajo documentado
- Cuando haya que convertir un prompt largo en un procedimiento reutilizable
- Cuando el usuario quiera que el agente "aprenda" a hacer algo específico del proyecto

---

## Inputs necesarios

Antes de crear el skill, asegurate de tener:

- **Objetivo** → ¿Qué tarea realiza el skill?
- **Triggers** → ¿Cuándo se activa? (palabras clave o situaciones)
- **Inputs** → ¿Qué datos necesita el skill para funcionar?
- **Output** → ¿Qué devuelve exactamente? (lista, tabla, JSON, markdown, archivo)
- **Nivel de riesgo** → ¿Es una tarea frágil (scripts/DB) o creativa (ideas/copy)?

Si alguno de estos falta, **preguntá antes de asumir**.

---

## Workflow

### Para skills simples (3–6 pasos)

1. Identificar objetivo y triggers
2. Definir inputs y output exacto
3. Elegir nivel de libertad (ver sección abajo)
4. Escribir SKILL.md siguiendo la plantilla
5. Verificar con la checklist

### Para skills complejos (dividir en fases)

**Fase 1 — Plan:** Entender el objetivo, listar inputs, definir output  
**Fase 2 — Validación:** Confirmar datos con el usuario si hay ambigüedad  
**Fase 3 — Ejecución:** Escribir el skill con sus recursos  
**Fase 4 — Revisión:** Aplicar checklist final

---

## Instrucciones de creación

### 1. Estructura de carpetas

```
.agent/skills/<nombre-del-skill>/
├── SKILL.md          ← Obligatorio
├── recursos/         ← Opcional: guías, plantillas, tokens
├── scripts/          ← Opcional: utilidades ejecutables
└── ejemplos/         ← Opcional: implementaciones de referencia
```

No crees archivos innecesarios. Mantené la estructura lo más simple posible.

---

### 2. Reglas para el nombre y el YAML

**`name`:**
- Todo en minúsculas, con guiones (`kebab-case`)
- Máximo 40 caracteres
- Sin nombres de herramientas salvo que sea imprescindible
- Sin "marketing": que sea operativo
- Ejemplos válidos: `planificar-video`, `auditar-landing`, `responder-emails`

**`description`:**
- En español, en tercera persona
- Máximo 220 caracteres
- Debe decir **qué hace** y **cuándo usarlo**

**Plantilla de frontmatter:**
```yaml
---
name: <nombre-del-skill>
description: <descripción breve en tercera persona, máximo 220 chars>
---
```

---

### 3. Niveles de libertad

Elegí el nivel adecuado según el tipo de tarea:

| Nivel | Tipo de tarea | Cómo escribirlo |
|-------|--------------|-----------------|
| **Alta libertad** | Brainstorming, ideas, alternativas | Heurísticas + ejemplos orientativos |
| **Media libertad** | Documentos, copys, estructuras | Plantillas con slots a rellenar |
| **Baja libertad** | Scripts, cambios técnicos, DB, deploys | Pasos exactos, comandos literales |

> **Regla:** Cuanto más riesgo tiene la tarea, más específico debe ser el skill.

---

### 4. Principios de escritura

- **Claridad sobre longitud:** pocas reglas, muy claras. No relleno tipo blog.
- **Separación de responsabilidades:** estilo → `recursos/`. Pasos → workflow.
- **Pedir datos cuando falten:** si un input es crítico, el skill debe preguntar explícitamente.
- **Salida estandarizada:** definir exactamente el formato de output.

---

### 5. Manejo de errores

Incluir siempre en el SKILL.md:

- Qué hacer si el output no cumple el formato esperado
- Cómo pedir feedback al usuario
- Cómo iterar sin romper el estándar

**Ejemplo estándar:**
> "Si el resultado no cumple el formato, volvé al paso 2, ajustá restricciones y re-generá. Si hay ambigüedad, preguntá antes de asumir."

---

## Output — Formato exacto al crear un skill

Cuando el usuario pida un skill, respondé **siempre** con este formato:

```
📁 Carpeta
.agent/skills/<nombre-del-skill>/

📄 SKILL.md
---
name: ...
description: ...
---

# <Título>

## Cuándo usar este skill
- ...

## Inputs necesarios
- ...

## Workflow
1) ...
2) ...

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

## Checklist de verificación (aplicar antes de entregar)

- [ ] El objetivo del skill está claro y acotado
- [ ] El frontmatter YAML es válido (name + description)
- [ ] Los triggers son concretos y reconocibles
- [ ] Los inputs están definidos (y el skill pregunta si faltan)
- [ ] El output tiene formato exacto especificado
- [ ] El nivel de libertad es el correcto para el riesgo
- [ ] Hay sección de manejo de errores
- [ ] No hay archivos innecesarios en la carpeta
- [ ] Todo el contenido está en Español latinoamericano

---

## Skills sugeridos (proponer si encajan con el proyecto)

Si el usuario está creando skills, sugerí ideas útiles según el contexto:

- `estilo-y-marca` → Mantener consistencia visual y de voz en el proyecto
- `planificar-videos` → Estructurar guiones y calendarios de contenido
- `auditar-landing` → Revisar páginas de aterrizaje contra criterios UX/conversión
- `debug-de-app` → Guía sistemática para diagnosticar errores en la app
- `responder-emails` → Respuestas con tono definido para distintos perfiles
- `commits-convencionales` → Mensajes de commit siguiendo Conventional Commits
- `revisar-pull-request` → Checklist de code review para el proyecto
- `crear-componente-react` → Estructura y convenciones para nuevos componentes

---

## Referencia rápida

Ver `recursos/guia-sistema-creador-skills.md` para el documento completo de instrucciones del sistema.
