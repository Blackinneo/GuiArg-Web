'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Paleta argentina ─────────────────────────────────── */
const ARG_PALETTE = [
    '#1A5FAD', // azul profundo
    '#2E86DE', // azul cielo
    '#54A0FF', // celeste
    '#74B9FF', // celeste claro
    '#E6A817', // dorado sol
    '#27AE60', // verde mate
    '#F39C12', // ámbar
];

/* ─── Definición de cada avatar ────────────────────────── */
interface AvatarDef {
    size: number;
    bg: string;
    skin: string;
    hairColor: string;
    hairStyle: 'short' | 'curly' | 'long' | 'bald' | 'cap';
    expression: 'smile' | 'neutral' | 'grin';
    orbitAngle: number;   // ángulo inicial en la elipse (rad)
    orbitSpeed: number;   // duración de una vuelta completa (s)
    orbitDir: 1 | -1;     // sentido de giro
    zLayer: number;       // z-index para sensación de profundidad
}

const AVATARS: AvatarDef[] = [
    { size: 72, bg: ARG_PALETTE[0], skin: '#F5CBA7', hairColor: '#2C1810', hairStyle: 'short', expression: 'smile', orbitAngle: 0, orbitSpeed: 11, orbitDir: 1, zLayer: 30 },
    { size: 52, bg: ARG_PALETTE[4], skin: '#D4A574', hairColor: '#1A0A00', hairStyle: 'curly', expression: 'grin', orbitAngle: Math.PI * 0.4, orbitSpeed: 14, orbitDir: -1, zLayer: 20 },
    { size: 60, bg: ARG_PALETTE[2], skin: '#C68642', hairColor: '#3D1C02', hairStyle: 'long', expression: 'smile', orbitAngle: Math.PI * 0.8, orbitSpeed: 9, orbitDir: 1, zLayer: 25 },
    { size: 44, bg: ARG_PALETTE[5], skin: '#8D5524', hairColor: '#000000', hairStyle: 'bald', expression: 'neutral', orbitAngle: Math.PI * 1.2, orbitSpeed: 12, orbitDir: -1, zLayer: 20 },
    { size: 80, bg: ARG_PALETTE[1], skin: '#FDEBD0', hairColor: '#5C2E00', hairStyle: 'cap', expression: 'grin', orbitAngle: Math.PI * 1.55, orbitSpeed: 8, orbitDir: 1, zLayer: 35 },
    { size: 48, bg: ARG_PALETTE[6], skin: '#E8B89A', hairColor: '#1C0A00', hairStyle: 'curly', expression: 'smile', orbitAngle: Math.PI * 1.85, orbitSpeed: 13, orbitDir: -1, zLayer: 22 },
    { size: 56, bg: ARG_PALETTE[3], skin: '#C8956C', hairColor: '#2C1810', hairStyle: 'short', expression: 'neutral', orbitAngle: Math.PI * 0.2, orbitSpeed: 10, orbitDir: 1, zLayer: 28 },
];

/* ─── SVG de cada avatar ───────────────────────────────── */
function AvatarSVG({ def }: { def: AvatarDef }) {
    const s = def.size;
    const cx = s / 2;
    const cy = s / 2;
    const headR = s * 0.265;
    const eyeY = cy - headR * 0.12;
    const eyeOff = headR * 0.38;
    const eyeR = headR * 0.13;
    const smileY = cy + headR * 0.28;

    const smilePath =
        def.expression === 'grin'
            ? `M${cx - headR * 0.4} ${smileY} Q${cx} ${smileY + headR * 0.35} ${cx + headR * 0.4} ${smileY}`
            : def.expression === 'smile'
                ? `M${cx - headR * 0.3} ${smileY} Q${cx} ${smileY + headR * 0.22} ${cx + headR * 0.3} ${smileY}`
                : `M${cx - headR * 0.25} ${smileY + headR * 0.05} L${cx + headR * 0.25} ${smileY + headR * 0.05}`;

    return (
        <svg
            viewBox={`0 0 ${s} ${s}`}
            width={s}
            height={s}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Torso (color de fondo del círculo) */}
            <ellipse cx={cx} cy={cy + headR * 1.55} rx={headR * 0.88} ry={headR * 0.7} fill={def.bg} opacity={0.85} />

            {/* Cabeza */}
            <circle cx={cx} cy={cy - headR * 0.1} r={headR} fill={def.skin} />

            {/* Pelo */}
            {def.hairStyle === 'short' && (
                <ellipse cx={cx} cy={cy - headR * 0.78} rx={headR * 0.82} ry={headR * 0.38} fill={def.hairColor} />
            )}
            {def.hairStyle === 'curly' && (
                <>
                    <circle cx={cx - headR * 0.5} cy={cy - headR * 0.85} r={headR * 0.3} fill={def.hairColor} />
                    <circle cx={cx} cy={cy - headR * 1.0} r={headR * 0.3} fill={def.hairColor} />
                    <circle cx={cx + headR * 0.5} cy={cy - headR * 0.85} r={headR * 0.3} fill={def.hairColor} />
                </>
            )}
            {def.hairStyle === 'long' && (
                <>
                    <ellipse cx={cx} cy={cy - headR * 0.78} rx={headR * 0.82} ry={headR * 0.36} fill={def.hairColor} />
                    <rect x={cx - headR * 0.78} y={cy - headR * 0.42} width={headR * 0.22} height={headR * 0.9} rx={headR * 0.1} fill={def.hairColor} />
                    <rect x={cx + headR * 0.56} y={cy - headR * 0.42} width={headR * 0.22} height={headR * 0.9} rx={headR * 0.1} fill={def.hairColor} />
                </>
            )}
            {def.hairStyle === 'cap' && (
                <>
                    <ellipse cx={cx} cy={cy - headR * 0.78} rx={headR * 0.92} ry={headR * 0.42} fill={def.hairColor} />
                    <rect x={cx - headR * 0.92} y={cy - headR * 0.82} width={headR * 1.84} height={headR * 0.22} rx={headR * 0.1} fill={def.hairColor} />
                    <rect x={cx - headR * 0.3} y={cy - headR * 1.18} width={headR * 0.6} height={headR * 0.42} rx={headR * 0.1} fill={def.hairColor} />
                </>
            )}
            {/* bald: sin pelo */}

            {/* Ojos */}
            <circle cx={cx - eyeOff} cy={eyeY} r={eyeR} fill="#1A1A1A" />
            <circle cx={cx + eyeOff} cy={eyeY} r={eyeR} fill="#1A1A1A" />
            {/* Brillo ojo */}
            <circle cx={cx - eyeOff + eyeR * 0.35} cy={eyeY - eyeR * 0.35} r={eyeR * 0.3} fill="white" opacity={0.7} />
            <circle cx={cx + eyeOff + eyeR * 0.35} cy={eyeY - eyeR * 0.35} r={eyeR * 0.3} fill="white" opacity={0.7} />

            {/* Sonrisa / boca */}
            <path d={smilePath}
                stroke="#666"
                strokeWidth={headR * 0.1}
                fill={def.expression === 'grin' ? 'rgba(255,255,255,0.15)' : 'none'}
                strokeLinecap="round"
            />
        </svg>
    );
}

/* ─── Ripple ───────────────────────────────────────────── */
interface Ripple {
    id: number;
    x: number;
    y: number;
    color: string;
}

/* ─── Componente principal ─────────────────────────────── */
export default function TribeAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pulseIdx, setPulseIdx] = useState<number | null>(null);
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const rippleId = useRef(0);

    /* Detect mobile & reduced-motion */
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsMobile(mq.matches);
        setReducedMotion(rm.matches);
        const onMQ = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        const onRM = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener('change', onMQ);
        rm.addEventListener('change', onRM);
        return () => { mq.removeEventListener('change', onMQ); rm.removeEventListener('change', onRM); };
    }, []);

    const activeAvatars = isMobile ? AVATARS.slice(0, 4) : AVATARS;

    /* Pulse + Ripple cada 2.5 s */
    const triggerPulse = useCallback(() => {
        const idx = Math.floor(Math.random() * activeAvatars.length);
        setPulseIdx(idx);

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const containerW = rect.width;
            const containerH = rect.height;
            const a = containerW * 0.36;
            const b = containerH * 0.28;
            const def = activeAvatars[idx];
            const t = def.orbitAngle;
            const x = containerW / 2 + a * Math.cos(t);
            const y = containerH / 2 + b * Math.sin(t);

            const id = rippleId.current++;
            setRipples(prev => [...prev, { id, x, y, color: def.bg }]);
            setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1400);
        }

        setTimeout(() => setPulseIdx(null), 500);
    }, [activeAvatars]);

    useEffect(() => {
        if (reducedMotion) return;
        const interval = setInterval(triggerPulse, 2500);
        return () => clearInterval(interval);
    }, [triggerPulse, reducedMotion]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full min-h-[320px] overflow-hidden flex items-center justify-center"
            aria-hidden="true"
        >
            {/* Ripples */}
            {ripples.map(r => (
                <div
                    key={r.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: r.x,
                        top: r.y,
                        width: 8,
                        height: 8,
                        marginLeft: -4,
                        marginTop: -4,
                        background: 'transparent',
                        border: `2px solid ${r.color}`,
                        animation: 'tribeRipple 1.3s ease-out forwards',
                    }}
                />
            ))}

            {/* Avatars */}
            {activeAvatars.map((def, i) => (
                <div
                    key={i}
                    className="absolute rounded-full border-2 border-white/10 overflow-hidden shadow-lg"
                    style={{
                        width: def.size,
                        height: def.size,
                        zIndex: def.zLayer,
                        background: def.bg,
                        boxShadow: `0 4px 20px ${def.bg}55`,
                        // Órbita: se define con animación CSS; --ox, --oy son los semiejes
                        animation: reducedMotion
                            ? `tribeFloat${i % 3} ${6 + i}s ease-in-out infinite alternate`
                            : `tribeOrbit${i} ${def.orbitSpeed}s linear infinite`,
                        transform: `rotate(0deg)`,
                        transition: pulseIdx === i ? 'transform 0.15s ease-out' : 'transform 0.3s ease-in',
                        ...(pulseIdx === i ? { transform: 'scale(1.38)', zIndex: 50 } : {}),
                    }}
                >
                    <AvatarSVG def={def} />
                </div>
            ))}

            {/* CSS keyframes inyectadas en el DOM */}
            <style>{generateKeyframes(activeAvatars)}</style>
        </div>
    );
}

/* ─── Genera @keyframes para cada avatar ───────────────── */
function generateKeyframes(avatars: AvatarDef[]): string {
    // Semiejes de la elipse —  ajustamos en el render
    // Usamos valores relativos en % y los calculamos fijos
    const a = 130; // semi-eje horizontal (px, valor base para 400px de contenedor)
    const b = 90;  // semi-eje vertical

    const steps = 36; // 36 puntos = curva suave
    let css = '';

    avatars.forEach((def, i) => {
        let frames = '';
        for (let s = 0; s <= steps; s++) {
            const pct = (s / steps) * 100;
            const t = def.orbitAngle + def.orbitDir * (s / steps) * Math.PI * 2;
            const x = a * Math.cos(t);
            const y = b * Math.sin(t);
            frames += `${pct.toFixed(1)}% { transform: translate(${x.toFixed(1)}px, ${y.toFixed(1)}px); }\n`;
        }
        css += `@keyframes tribeOrbit${i} {\n${frames}}\n`;
    });

    // Float suave (reduced-motion)
    for (let j = 0; j < 3; j++) {
        const dy = 8 + j * 5;
        const dx = 5 + j * 4;
        css += `@keyframes tribeFloat${j} { from { transform: translate(0, 0); } to { transform: translate(${dx}px, ${dy}px); } }\n`;
    }

    // Ripple expansion
    css += `
@keyframes tribeRipple {
  0%   { transform: scale(1);  opacity: 0.85; }
  100% { transform: scale(28); opacity: 0; }
}
`;

    return css;
}
