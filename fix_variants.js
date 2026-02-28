const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/GuiArg-Web/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;

    // Find all variables used in variants={variableName}
    const variantsUsagesRegex = /variants={([A-Za-z0-9_]+)}/g;
    let match;
    const variantsNames = new Set();
    while ((match = variantsUsagesRegex.exec(content)) !== null) {
        variantsNames.add(match[1]);
    }

    variantsNames.forEach(varName => {
        // e.g., const fadeUp = { or const fadeUp = {
        const defRegexStr = `const\\s+${varName}\\s*=\\s*({|\\[)`;
        const defRegex = new RegExp(defRegexStr, 'g');
        if (defRegex.test(content)) {
            // Check if it already has type annotations
            const typedDefStr = `const\\s+${varName}\\s*:`;
            if (!new RegExp(typedDefStr).test(content)) {
                content = content.replace(defRegex, (m, p1) => {
                    return `const ${varName}: Variants = ${p1}`;
                });
                hasChanges = true;
            }
        }
    });

    if (hasChanges) {
        // Ensure Variants is imported
        if (!content.includes('type Variants')) {
            const importMatch = content.match(/import\s+{([^}]+)}\s+from\s+['"]framer-motion['"]/);
            if (importMatch && !importMatch[1].includes('Variants')) {
                content = content.replace(importMatch[0], `import { ${importMatch[1].trim()}, type Variants } from 'framer-motion'`);
            } else if (!importMatch) {
                content = `import { type Variants } from 'framer-motion';\n` + content;
            }
        }
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated types in ${file}`);
    }
});
