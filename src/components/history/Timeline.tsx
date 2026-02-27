'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────── */
/* Data                                                        */
/* ─────────────────────────────────────────────────────────── */
const COLOR_YEAR = 1980;

type Category = 'Social' | 'War' | 'Economic' | 'Technological' | 'Cultural';

interface Milestone {
    date: number;
    event: string;
    type: string;
    desc: string;
    categories: Category[];
    isColorTrigger?: boolean;
}

const MILESTONES: Milestone[] = [
    { date: 1810, event: 'Revolución de Mayo', type: 'Social', categories: ['Social'], desc: 'Nacimiento de una nación que buscaba soberanía y autodeterminación.' },
    { date: 1816, event: 'Declaración de Independencia', type: 'Social', categories: ['Social'], desc: 'Ruptura formal del dominio colonial en Tucumán.' },
    { date: 1880, event: 'Modelo Agroexportador', type: 'Económico', categories: ['Economic'], desc: 'Argentina se convierte en el "Granero del Mundo", atrayendo migración masiva.' },
    { date: 1891, event: 'Sistema Dactiloscópico', type: 'Tecnológico / Social', categories: ['Technological', 'Social'], desc: 'Juan Vucetich revoluciona la justicia global con el primer sistema de huellas dactilares en La Plata.' },
    { date: 1912, event: 'Ley Sáenz Peña', type: 'Social', categories: ['Social'], desc: 'El sufragio universal, obligatorio y secreto establece la democracia moderna.' },
    { date: 1918, event: 'Reforma Universitaria', type: 'Social / Cultural', categories: ['Social', 'Cultural'], desc: 'Un movimiento estudiantil en Córdoba que cambió la educación superior en toda América Latina.' },
    { date: 1920, event: 'Primera Transmisión Radial', type: 'Tecnológico / Cultural', categories: ['Technological', 'Cultural'], desc: 'Los "Locos de la Azotea" realizan la primera transmisión radial programada del mundo en Buenos Aires.' },
    { date: 1944, event: 'El Birome', type: 'Tecnológico', categories: ['Technological'], desc: 'László Bíró patenta el bolígrafo que conquistó el mundo desde Argentina.' },
    { date: 1947, event: 'Sufragio Femenino', type: 'Social', categories: ['Social'], desc: 'Igualdad en las urnas, un hito para los derechos civiles latinoamericanos.' },
    { date: 1951, event: 'Primera Transmisión de TV', type: 'Tecnológico / Cultural', categories: ['Technological', 'Cultural'], desc: 'Canal 7 inicia la era de la pantalla chica en Argentina.' },
    { date: 1967, event: 'Bypass Coronario', type: 'Tecnológico / Social', categories: ['Technological', 'Social'], desc: 'René Favaloro salva millones de vidas con su revolucionaria técnica quirúrgica.' },
    { date: 1980, event: '📺 TV a Color — Inicio del Color', type: 'Tecnológico / Cultural', categories: ['Technological', 'Cultural'], desc: 'La transición al color: la lógica visual de la página cambia aquí al espectro completo.', isColorTrigger: true },
    { date: 1982, event: 'Guerra de Malvinas', type: 'Bélico / Social', categories: ['War', 'Social'], desc: 'Un conflicto que marcó a una generación y aceleró el fin de la dictadura.' },
    { date: 1983, event: 'Retorno a la Democracia', type: 'Social', categories: ['Social'], desc: 'Raúl Alfonsín lidera la reconstrucción de la República.' },
    { date: 1985, event: 'Juicio a las Juntas', type: 'Social', categories: ['Social'], desc: 'Un hito mundial en materia de Derechos Humanos y Justicia.' },
    { date: 1986, event: 'México 86 — El Triunfo', type: 'Cultural / Social', categories: ['Cultural', 'Social'], desc: 'El pico de Maradona y un momento de máxima identidad nacional.' },
    { date: 1991, event: 'Plan de Convertibilidad', type: 'Económico', categories: ['Economic'], desc: 'Comienza la era del Peso = Dólar, que remodeló la economía.' },
    { date: 1999, event: 'Fondación de Mercado Libre', type: 'Económico / Tecnológico', categories: ['Economic', 'Technological'], desc: 'El primer unicornio tecnológico argentino cambia el e-commerce regional para siempre.' },
    { date: 2001, event: 'Crisis Social y Económica', type: 'Económico / Social', categories: ['Economic', 'Social'], desc: 'El colapso del modelo 1:1 y la mayor prueba de resiliencia social.' },
    { date: 2010, event: 'Ley de Matrimonio Igualitario', type: 'Social', categories: ['Social'], desc: 'Argentina se convierte en pionera en derechos civiles en América Latina.' },
    { date: 2014, event: 'Satélite ARSAT-1', type: 'Tecnológico', categories: ['Technological'], desc: 'Argentina entra al club élite de países que diseñan y construyen satélites geoestacionarios.' },
    { date: 2022, event: '🏆 Qatar — Tres Estrellas', type: 'Cultural / Social', categories: ['Cultural', 'Social'], desc: 'La tercera Copa del Mundo, símbolo de perseverancia y trabajo en equipo.' },
    { date: 2025, event: 'IA y Despliegue RIGI', type: 'Económico / Tecnológico', categories: ['Economic', 'Technological'], desc: 'El nuevo régimen para grandes inversiones y la integración de IA en el Estado.' },
    { date: 2026, event: '⭐ Fundación de GuiArg', type: 'Tecnológico / Social / Económico', categories: ['Technological', 'Social', 'Economic'], desc: 'El puente digital que conecta el esfuerzo local con el consumidor moderno.' },
];

/* ─────────────────────────────────────────────────────────── */
/* Category config                                             */
/* ─────────────────────────────────────────────────────────── */
const CAT_CONFIG: Record<Category, { icon: string; color: string }> = {
    Social: { icon: '🏛️', color: '#2E86DE' },
    War: { icon: '⚔️', color: '#E74C3C' },
    Economic: { icon: '💰', color: '#E6A817' },
    Technological: { icon: '🔬', color: '#5B8C3E' },
    Cultural: { icon: '🎭', color: '#8B4513' },
};

function prevColor(cats: Category[]): string {
    return CAT_CONFIG[cats[0]]?.color ?? '#888';
}

/* ─────────────────────────────────────────────────────────── */
/* Single milestone card                                       */
/* ─────────────────────────────────────────────────────────── */
function MilestoneCard({
    m, index, isColorMode, isRight,
}: {
    m: Milestone; index: number; isColorMode: boolean; isRight: boolean;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const isPost = m.date >= COLOR_YEAR;
    const color = prevColor(m.categories);

    const cardStyle: React.CSSProperties = isPost && isColorMode
        ? {
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1.5px solid ${color}30`,
            boxShadow: `0 8px 32px ${color}15, 0 2px 8px rgba(0,0,0,0.06)`,
        }
        : {
            background: '#F5F0E8',
            border: '1.5px solid rgba(0,0,0,0.1)',
            boxShadow: '2px 4px 12px rgba(0,0,0,0.1)',
        };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isRight ? 36 : -36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl p-5 max-w-sm"
            style={cardStyle}
        >
            {/* Color top stripe — only in color mode for post-1980 */}
            {isPost && isColorMode && (
                <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }}
                    aria-hidden="true"
                />
            )}

            {/* Date */}
            <p
                className="font-black text-2xl mb-1"
                style={{
                    color: isPost && isColorMode ? color : '#1A1208',
                    fontFamily: isPost && isColorMode ? '"Poppins", sans-serif' : '"Courier New", Courier, monospace',
                    letterSpacing: isPost && isColorMode ? '-0.02em' : '0.08em',
                }}
            >
                {m.date}
            </p>

            {/* Event name */}
            <p
                className="font-bold text-sm mb-2 leading-tight"
                style={{
                    color: isPost && isColorMode ? '#0F1923' : '#2A1F0A',
                    fontFamily: isPost && isColorMode ? '"Poppins", sans-serif' : '"Courier New", Courier, monospace',
                }}
            >
                {m.event}
            </p>

            {/* Category tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
                {m.categories.map(cat => {
                    const cfg = CAT_CONFIG[cat];
                    return (
                        <span
                            key={cat}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={
                                isPost && isColorMode
                                    ? { background: `${cfg.color}15`, color: cfg.color }
                                    : { background: 'rgba(0,0,0,0.06)', color: '#5A4A2A' }
                            }
                        >
                            {cfg.icon} {cat}
                        </span>
                    );
                })}
            </div>

            {/* Description */}
            <p
                className="text-xs leading-relaxed"
                style={{
                    color: isPost && isColorMode ? '#3D4F63' : '#5A4A2A',
                    fontFamily: isPost && isColorMode ? '"Poppins", sans-serif' : '"Courier New", Courier, monospace',
                }}
            >
                {m.desc}
            </p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────── */
/* Color Trigger Node (1980)                                  */
/* ─────────────────────────────────────────────────────────── */
function ColorTriggerNode({ onTrigger }: { onTrigger: () => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const triggered = useRef(false);

    useEffect(() => {
        if (isInView && !triggered.current) {
            triggered.current = true;
            onTrigger();
        }
    }, [isInView, onTrigger]);

    return (
        <div ref={ref} className="flex flex-col items-center my-6">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center"
            >
                {/* Glow rings */}
                {[1, 2].map(n => (
                    <motion.div
                        key={n}
                        className="absolute rounded-full"
                        style={{
                            width: `${80 + n * 40}px`,
                            height: `${80 + n * 40}px`,
                            border: `2px solid rgba(46,134,222,${0.4 / n})`,
                            top: `${-n * 20}px`,
                            left: `${-n * 20}px`,
                        }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.5, delay: n * 0.4, repeat: Infinity }}
                    />
                ))}

                <div
                    className="w-20 h-20 rounded-full flex flex-col items-center justify-center z-10 relative"
                    style={{
                        background: 'linear-gradient(135deg, #1A5FAD, #2E86DE)',
                        boxShadow: '0 0 40px rgba(46,134,222,0.6)',
                    }}
                >
                    <span className="text-2xl leading-none">📺</span>
                    <span className="text-white font-black text-xs mt-0.5">1980</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="mt-4 px-5 py-2.5 rounded-2xl text-center max-w-xs"
                    style={{
                        background: 'linear-gradient(135deg, rgba(46,134,222,0.15), rgba(230,168,23,0.1))',
                        border: '1.5px solid rgba(46,134,222,0.4)',
                    }}
                >
                    <p className="font-black text-sm" style={{ color: '#0F1923' }}>📺 TV a Color — El Mundo Cambia</p>
                    <p className="text-xs mt-1" style={{ color: '#3D4F63' }}>
                        Lanzamiento oficial de la televisión a color en Argentina. La página cambia de escala de grises al espectro completo.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────── */
/* Progress bar                                               */
/* ─────────────────────────────────────────────────────────── */
function TimelineProgressBar({ isColor }: { isColor: boolean }) {
    return (
        <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 pointer-events-none"
            style={{ zIndex: 1 }}
            aria-hidden="true"
        >
            {/* Pre-color segment: rough ink */}
            <div
                className="absolute top-0 left-0 right-0"
                style={{
                    height: isColor ? '50%' : '100%',
                    background: isColor
                        ? 'repeating-linear-gradient(180deg, #5A4A2A 0px, #5A4A2A 6px, transparent 6px, transparent 10px)'
                        : 'repeating-linear-gradient(180deg, #5A4A2A 0px, #5A4A2A 6px, transparent 6px, transparent 10px)',
                    transition: 'height 1.5s ease',
                }}
            />
            {/* Post-color segment: neon glow */}
            {isColor && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0"
                    initial={{ height: 0 }}
                    animate={{ height: '50%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                        background: 'linear-gradient(180deg, #2E86DE, #E6A817)',
                        boxShadow: '0 0 8px #2E86DE',
                    }}
                />
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────── */
/* Main Timeline                                              */
/* ─────────────────────────────────────────────────────────── */
export default function Timeline() {
    const [isColor, setIsColor] = useState(false);
    const handleColorTrigger = useCallback(() => setIsColor(true), []);

    const preColor = MILESTONES.filter(m => m.date < COLOR_YEAR);
    const trigger = MILESTONES.find(m => m.isColorTrigger)!;
    const postColor = MILESTONES.filter(m => m.date > COLOR_YEAR);

    return (
        <section
            className="relative px-4 py-16 overflow-hidden"
            style={{
                background: '#F5F0E8',
                filter: isColor ? 'none' : 'grayscale(0.88) sepia(0.3)',
                willChange: 'filter',
                transition: 'filter 1.5s cubic-bezier(0.22,1,0.36,1)',
            }}
            aria-label="Línea de tiempo histórica argentina"
        >
            {/* Grain overlay — fades out in color mode */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '160px 160px',
                    opacity: isColor ? 0.02 : 0.06,
                    transition: 'opacity 1.5s ease',
                }}
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto relative">
                <TimelineProgressBar isColor={isColor} />

                {/* ── PRE-COLOR MILESTONES ── */}
                <div className="space-y-10">
                    {preColor.map((m, i) => {
                        const isRight = i % 2 === 1;
                        return (
                            <div key={m.date} className="relative flex items-start lg:items-center gap-4 lg:gap-0">
                                {/* Desktop: alternating layout */}
                                <div className="hidden lg:flex w-full items-center">
                                    {/* Left slot */}
                                    <div className="flex-1 flex justify-end pr-10">
                                        {!isRight && <MilestoneCard m={m} index={i} isColorMode={isColor} isRight={false} />}
                                    </div>

                                    {/* Center node */}
                                    <div
                                        className="relative z-10 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                                        style={{
                                            background: '#5A4A2A',
                                            border: '3px solid #F5F0E8',
                                            boxShadow: '0 0 0 2px #5A4A2A',
                                        }}
                                    >
                                        <span className="text-[8px]">{CAT_CONFIG[m.categories[0]]?.icon}</span>
                                    </div>

                                    {/* Right slot */}
                                    <div className="flex-1 pl-10">
                                        {isRight && <MilestoneCard m={m} index={i} isColorMode={isColor} isRight={true} />}
                                    </div>
                                </div>

                                {/* Mobile: vertical */}
                                <div className="flex lg:hidden items-start gap-3 w-full">
                                    <div
                                        className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                                        style={{ background: '#5A4A2A', border: '2px solid #F5F0E8', boxShadow: '0 0 0 1.5px #5A4A2A' }}
                                    />
                                    <MilestoneCard m={m} index={i} isColorMode={isColor} isRight={false} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── COLOR TRIGGER (1980) ── */}
                <ColorTriggerNode onTrigger={handleColorTrigger} />

                {/* ── POST-COLOR MILESTONES ── */}
                <div className="space-y-10">
                    {postColor.map((m, i) => {
                        const isRight = i % 2 === 0;
                        const color = prevColor(m.categories);
                        return (
                            <div key={m.date} className="relative flex items-start lg:items-center gap-4 lg:gap-0">
                                {/* Desktop */}
                                <div className="hidden lg:flex w-full items-center">
                                    <div className="flex-1 flex justify-end pr-10">
                                        {!isRight && <MilestoneCard m={m} index={i} isColorMode={isColor} isRight={false} />}
                                    </div>

                                    {/* center node — neon when color */}
                                    <div
                                        className="relative z-10 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-700"
                                        style={{
                                            background: isColor ? color : '#5A4A2A',
                                            border: `3px solid #F5F0E8`,
                                            boxShadow: isColor ? `0 0 0 2px ${color}, 0 0 12px ${color}60` : `0 0 0 2px #5A4A2A`,
                                        }}
                                    >
                                        <span className="text-[9px]">{CAT_CONFIG[m.categories[0]]?.icon}</span>
                                    </div>

                                    <div className="flex-1 pl-10">
                                        {isRight && <MilestoneCard m={m} index={i} isColorMode={isColor} isRight={true} />}
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="flex lg:hidden items-start gap-3 w-full">
                                    <div
                                        className="w-4 h-4 rounded-full flex-shrink-0 mt-1 transition-all duration-700"
                                        style={{
                                            background: isColor ? color : '#5A4A2A',
                                            border: '2px solid #F5F0E8',
                                            boxShadow: isColor ? `0 0 0 1.5px ${color}, 0 0 8px ${color}60` : '0 0 0 1.5px #5A4A2A',
                                        }}
                                    />
                                    <MilestoneCard m={m} index={i} isColorMode={isColor} isRight={false} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
