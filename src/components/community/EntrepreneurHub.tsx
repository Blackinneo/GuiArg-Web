'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

/* ── Economic Chain SVG animation ─────────────────────────── */
function EconomicChainSVG() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    const nodes = [
        { x: 40, y: 120, label: 'Tu negocio', icon: '🏪', color: '#2E86DE', size: 32 },
        { x: 120, y: 70, label: 'Vecinos', icon: '👥', color: '#54A0FF', size: 28 },
        { x: 200, y: 120, label: 'Proveedores', icon: '📦', color: '#E6A817', size: 28 },
        { x: 120, y: 170, label: 'Familia', icon: '🍽️', color: '#5B8C3E', size: 30 },
    ];

    const connections = [
        { from: 0, to: 1 }, { from: 0, to: 3 },
        { from: 1, to: 2 }, { from: 2, to: 3 },
        { from: 1, to: 3 },
    ];

    return (
        <div ref={ref} className="w-full" aria-label="Cadena económica: del negocio a la mesa familiar">
            <svg viewBox="0 0 240 210" className="w-full h-auto">
                {/* Connection lines */}
                {connections.map(({ from, to }, i) => {
                    const a = nodes[from], b = nodes[to];
                    return (
                        <motion.line
                            key={i}
                            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                            stroke="url(#chainGrad)"
                            strokeWidth="2"
                            strokeDasharray="200"
                            strokeDashoffset={isInView ? 0 : 200}
                            initial={{ strokeDashoffset: 200, opacity: 0 }}
                            animate={isInView ? { strokeDashoffset: 0, opacity: 0.5 } : {}}
                            transition={{ duration: 1, delay: i * 0.18 + 0.2, ease: 'easeInOut' }}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((n, i) => (
                    <motion.g
                        key={n.label}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                    >
                        <circle cx={n.x} cy={n.y} r={n.size * 0.72} fill={`${n.color}15`} />
                        <circle cx={n.x} cy={n.y} r={n.size * 0.5} fill="white" stroke={n.color} strokeWidth="1.5" />
                        {/* Emoji as foreign object text */}
                        <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14">{n.icon}</text>
                        {/* Label */}
                        <text x={n.x} y={n.y + n.size * 0.72 + 14} textAnchor="middle" fontSize="8" fill="#3D4F63" fontFamily="Poppins,sans-serif" fontWeight="600">
                            {n.label}
                        </text>
                    </motion.g>
                ))}

                {/* Center sun glow */}
                <motion.circle
                    cx="120" cy="120"
                    r="15"
                    fill="rgba(230,168,23,0.12)"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: [0, 1.4, 1] } : {}}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    style={{ transformOrigin: '120px 120px' }}
                />
                <motion.circle
                    cx="120" cy="120"
                    r="8"
                    fill="rgba(230,168,23,0.6)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 1.3, duration: 0.4 }}
                    style={{ transformOrigin: '120px 120px' }}
                />

                <defs>
                    <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2E86DE" />
                        <stop offset="100%" stopColor="#E6A817" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

const chainBenefits = [
    { emoji: '💰', title: 'Circulación local', desc: 'El dinero que gastás en tu barrio vuelve a vos como trabajo y empleo.' },
    { emoji: '📉', title: 'Precios por volumen', desc: 'Comprando juntos en la red, bajamos costos para todos.' },
    { emoji: '🌱', title: 'Empleo genuino', desc: 'Cada compra sostiene sueldos reales en tu comunidad.' },
    { emoji: '🍽️', title: 'La mesa se llena', desc: 'Un negocio que crece = un vecino que puede llevar el pan a casa.' },
];

export default function EconomicChain() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="cadena"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: '#FAFAF8' }}
            aria-label="Si al negocio le va bien, a tu heladera también"
        >
            {/* Left ambient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 50% 60% at 10% 50%, rgba(46,134,222,0.06) 0%, transparent 70%)' }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT: Chain SVG */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div
                            className="rounded-3xl p-8 relative overflow-hidden"
                            style={{
                                background: 'white',
                                boxShadow: '0 16px 48px rgba(46,134,222,0.1), 0 4px 16px rgba(0,0,0,0.05)',
                                border: '1px solid rgba(46,134,222,0.08)',
                            }}
                        >
                            {/* Paper texture inside card */}
                            <div
                                className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.035]"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                    backgroundSize: '180px 180px',
                                }}
                                aria-hidden="true"
                            />
                            <p className="text-xs font-semibold tracking-widest uppercase text-center mb-4" style={{ color: '#8DA4BF' }}>
                                Cómo funciona la cadena
                            </p>
                            <EconomicChainSVG />
                        </div>
                    </motion.div>

                    {/* RIGHT: Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <span
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase"
                            style={{ background: 'rgba(91,140,62,0.12)', color: '#3A7D2C', border: '1px solid rgba(91,140,62,0.25)' }}
                        >
                            💡 Economía Circular
                        </span>

                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5" style={{ color: '#0F1923' }}>
                            Si al Negocio le va bien,{' '}
                            <span style={{ color: '#2E86DE' }}>a tu Heladera</span>{' '}
                            también.
                        </h2>

                        <p className="text-[#3D4F63] text-lg leading-relaxed mb-8">
                            Queremos que vivir de lo que amás deje de ser un sueño imposible.
                            Creamos una cadena donde <strong className="text-[#0F1923]">con menos hacés más</strong>:
                            si ellos crecen, la heladera se agranda y la mesa se llena.
                        </p>

                        {/* Benefit items with scrapbook-style separators */}
                        <div className="space-y-0">
                            {chainBenefits.map((b, i) => (
                                <motion.div
                                    key={b.title}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                    className="flex items-start gap-4 py-4"
                                    style={{ borderBottom: i < chainBenefits.length - 1 ? '1px dashed rgba(46,134,222,0.15)' : 'none' }}
                                >
                                    <span className="text-2xl flex-shrink-0 leading-none mt-0.5" aria-hidden="true">{b.emoji}</span>
                                    <div>
                                        <p className="font-bold text-[#0F1923] mb-0.5">{b.title}</p>
                                        <p className="text-sm text-[#3D4F63] leading-relaxed">{b.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7 }}
                            className="mt-8"
                        >
                            <a
                                href="#subscripcion"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                                style={{
                                    background: 'linear-gradient(135deg, #1A5FAD, #2E86DE)',
                                    boxShadow: '0 4px 20px rgba(46,134,222,0.25)',
                                    minHeight: '44px',
                                }}
                                aria-label="Comenzar a construir la cadena económica"
                            >
                                Ser parte de la Cadena
                                <ArrowRight size={14} />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
