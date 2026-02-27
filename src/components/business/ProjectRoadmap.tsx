'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

const steps = [
    { step: '01', label: 'Arranque', detail: 'SEO en Google Maps, fotos profesionales y entrevista de apertura.', color: '#2E86DE' },
    { step: '02', label: 'Presencia', detail: 'Publicación de tu Perfil Público dinámico en la App GuiArg.', color: '#54A0FF' },
    { step: '03', label: 'Consolidación', detail: 'Segunda entrevista de recomendación y presentación oficial a la red.', color: '#E6A817' },
    { step: '04', label: 'Expansión', detail: 'Lanzamiento de Sorteos de Órdenes de Compra financiados por la red.', color: '#E6A817' },
    { step: '05', label: 'Futuro', detail: 'Nuevas herramientas de pago y gestión automatizada con IA.', color: '#F9CA24' },
];

export default function ProjectRoadmap() {
    const ref = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    useEffect(() => {
        if (isInView) controls.start('visible');
    }, [isInView, controls]);

    return (
        <section
            id="roadmap"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: '#0A1628' }}
            aria-label="Tu crecimiento es nuestro mapa — hoja de ruta GuiArg"
        >
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(46,134,222,1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,134,222,1) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ background: 'rgba(230,168,23,0.15)', color: '#E6A817', border: '1px solid rgba(230,168,23,0.3)' }}
                    >
                        Hoja de Ruta
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                        Tu Crecimiento es{' '}
                        <span style={{ color: '#E6A817' }}>nuestro Mapa.</span>
                    </h2>
                    <p className="text-[#90AED2] text-lg max-w-lg mx-auto">
                        Un proceso claro, sin letra chica. Desde el primer día hasta tu despegue definitivo.
                    </p>
                </motion.div>

                {/* ── Desktop: horizontal ── */}
                <div className="hidden md:block relative">
                    {/* SVG connecting line */}
                    <svg
                        viewBox="0 0 960 20"
                        className="absolute top-[52px] left-0 w-full pointer-events-none"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <motion.line
                            x1="96" y1="10" x2="864" y2="10"
                            stroke="url(#roadGrad)"
                            strokeWidth="2"
                            strokeDasharray="800"
                            initial={{ strokeDashoffset: 800, opacity: 0 }}
                            animate={isInView ? { strokeDashoffset: 0, opacity: 1 } : {}}
                            transition={{ duration: 1.6, delay: 0.3, ease: 'easeInOut' }}
                        />
                        <defs>
                            <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                                {steps.map((s, i) => (
                                    <stop key={i} offset={`${i * 25}%`} stopColor={s.color} />
                                ))}
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Nodes row */}
                    <div className="grid grid-cols-5 gap-4">
                        {steps.map((s, i) => (
                            <motion.div
                                key={s.step}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center text-center"
                            >
                                {/* Node circle */}
                                <motion.div
                                    className="relative w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10"
                                    style={{
                                        background: `${s.color}20`,
                                        border: `2px solid ${s.color}`,
                                    }}
                                    animate={isInView ? {
                                        boxShadow: [`0 0 0px ${s.color}00`, `0 0 20px ${s.color}70`, `0 0 0px ${s.color}00`],
                                    } : {}}
                                    transition={{ delay: 0.6 + i * 0.2, duration: 1.8, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    <span className="text-xl font-black" style={{ color: s.color }}>{s.step}</span>
                                </motion.div>

                                <p className="font-black text-white text-sm mb-2">{s.label}</p>
                                <p className="text-xs text-[#5A7FA8] leading-relaxed">{s.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Mobile: vertical ── */}
                <div className="md:hidden relative pl-10">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-3 bottom-3 w-0.5" style={{ background: 'rgba(46,134,222,0.3)' }} aria-hidden="true">
                        <motion.div
                            className="w-full rounded-full"
                            style={{ background: 'linear-gradient(180deg, #2E86DE, #E6A817)' }}
                            initial={{ height: '0%' }}
                            animate={isInView ? { height: '100%' } : { height: '0%' }}
                            transition={{ duration: 1.5, delay: 0.3 }}
                        />
                    </div>

                    <div className="space-y-8">
                        {steps.map((s, i) => (
                            <motion.div
                                key={s.step}
                                initial={{ opacity: 0, x: -16 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.14, duration: 0.5 }}
                                className="relative flex items-start gap-5"
                            >
                                {/* Node dot */}
                                <div
                                    className="absolute -left-[34px] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${s.color}20`, border: `2px solid ${s.color}` }}
                                >
                                    <span className="text-[10px] font-black" style={{ color: s.color }}>{s.step}</span>
                                </div>
                                <div>
                                    <p className="font-black text-white mb-1">{s.label}</p>
                                    <p className="text-sm text-[#5A7FA8] leading-relaxed">{s.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
