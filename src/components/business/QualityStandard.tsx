'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Star, Users } from 'lucide-react';

/* ── Handshake SVG ────────────────────────────────────────── */
function HandshakeSVG() {
    return (
        <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-label="Apretón de manos — compromiso GuiArg">
            {/* Left hand */}
            <g>
                <rect x="2" y="36" width="40" height="26" rx="8" fill="#FBBF7A" />
                {/* Fingers left */}
                <rect x="8" y="18" width="8" height="24" rx="4" fill="#FBBF7A" />
                <rect x="18" y="14" width="8" height="28" rx="4" fill="#FBBF7A" />
                <rect x="28" y="16" width="8" height="26" rx="4" fill="#FBBF7A" />
                <rect x="38" y="22" width="8" height="20" rx="4" fill="#FBBF7A" />
                {/* Thumb left */}
                <rect x="2" y="42" width="10" height="14" rx="5" fill="#FBBF7A" transform="rotate(-20 2 42)" />
            </g>
            {/* Right hand */}
            <g transform="scale(-1,1) translate(-118,0)">
                <rect x="2" y="36" width="40" height="26" rx="8" fill="#C8956B" />
                <rect x="8" y="18" width="8" height="24" rx="4" fill="#C8956B" />
                <rect x="18" y="14" width="8" height="28" rx="4" fill="#C8956B" />
                <rect x="28" y="16" width="8" height="26" rx="4" fill="#C8956B" />
                <rect x="38" y="22" width="8" height="20" rx="4" fill="#C8956B" />
                <rect x="2" y="42" width="10" height="14" rx="5" fill="#C8956B" transform="rotate(-20 2 42)" />
            </g>
            {/* Clasped area center */}
            <rect x="40" y="36" width="40" height="26" rx="4" fill="url(#handGrad)" opacity="0.9" />
            {/* Glow */}
            <defs>
                <linearGradient id="handGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FBBF7A" />
                    <stop offset="50%" stopColor="#E6A817" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#C8956B" />
                </linearGradient>
            </defs>
            {/* Sparkles */}
            {[[58, 12], [75, 8], [92, 15], [50, 8]].map(([x, y], i) => (
                <g key={i}>
                    <line x1={x} y1={y - 4} x2={x} y2={y + 4} stroke="#E6A817" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                    <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#E6A817" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                </g>
            ))}
        </svg>
    );
}

const pillars = [
    { icon: ShieldCheck, title: 'Verificación Previa', desc: 'Evaluamos cada negocio antes de incluirlo en la red. Transparencia y calidad garantizadas.', color: '#2E86DE' },
    { icon: Star, title: 'Estándares de Trato', desc: 'Reclamos reiterados pueden suspender un negocio. El cliente siempre primero.', color: '#E6A817' },
    { icon: Users, title: 'Red Protegida', desc: 'Cuidamos a todos: comerciantes y consumidores. Una comunidad sana crece junta.', color: '#5B8C3E' },
];

export default function QualityStandard() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="calidad"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: '#FAFAF8' }}
            aria-label="La excelencia como bandera — estándares de calidad GuiArg"
        >
            {/* Washi-tape top */}
            <div
                className="absolute top-0 left-0 right-0 h-3 pointer-events-none"
                style={{
                    background: 'repeating-linear-gradient(90deg, #E6A817 0px, #E6A817 24px, #FDE68A 24px, #FDE68A 48px, #E6A817 48px)',
                    opacity: 0.3,
                }}
                aria-hidden="true"
            />

            <div className="max-w-4xl mx-auto text-center">
                {/* Handshake icon with pulse */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative inline-block mb-10"
                >
                    {/* Pulsing rings */}
                    {[1, 2].map((n) => (
                        <motion.div
                            key={n}
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{ border: `2px solid rgba(230,168,23,${0.3 / n})` }}
                            animate={{ scale: [1, 1.2 + n * 0.1], opacity: [0.6, 0] }}
                            transition={{ duration: 2, delay: n * 0.4, repeat: Infinity, ease: 'easeOut' }}
                        />
                    ))}
                    <div
                        className="relative w-28 h-28 rounded-full flex items-center justify-center mx-auto"
                        style={{
                            background: 'white',
                            boxShadow: '0 8px 32px rgba(230,168,23,0.2), 0 2px 8px rgba(0,0,0,0.05)',
                            border: '2px solid rgba(230,168,23,0.25)',
                            padding: '20px',
                        }}
                    >
                        <HandshakeSVG />
                    </div>
                </motion.div>

                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ background: 'rgba(230,168,23,0.12)', color: '#B8860B', border: '1px solid rgba(230,168,23,0.3)' }}
                    >
                        Excelencia como Bandera
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-4xl md:text-5xl font-black tracking-tight mb-5"
                    style={{ color: '#0F1923' }}
                >
                    La Excelencia<br />como{' '}
                    <span style={{ color: '#E6A817' }}>Bandera.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-[#3D4F63] text-lg leading-relaxed mb-6 max-w-2xl mx-auto"
                >
                    En GuiArg, el cliente es lo primero. Negocios con reclamos reiterados pueden ser pausados o eliminados de la red.
                    Realizamos evaluaciones previas para asegurarnos de que tu éxito sea sostenible y tu trato, impecable.
                </motion.p>

                {/* Highlighted quote */}
                <motion.blockquote
                    initial={{ opacity: 0, x: -12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mx-auto max-w-lg px-6 py-4 rounded-xl mb-12 text-base font-semibold text-left"
                    style={{
                        background: 'rgba(46,134,222,0.07)',
                        borderLeft: '4px solid #2E86DE',
                        color: '#1A5FAD',
                    }}
                >
                    "Cuidamos la red para cuidarte a vos."
                </motion.blockquote>

                {/* Pillars */}
                <div className="grid md:grid-cols-3 gap-5">
                    {pillars.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                                className="rounded-2xl p-6"
                                style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto"
                                    style={{ background: `${p.color}12` }}
                                >
                                    <Icon size={22} style={{ color: p.color }} />
                                </div>
                                <p className="font-black text-[#0F1923] mb-2">{p.title}</p>
                                <p className="text-sm text-[#3D4F63] leading-relaxed">{p.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
