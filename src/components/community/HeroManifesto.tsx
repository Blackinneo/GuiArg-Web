'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

/* ── Three Stars SVG ──────────────────────────────────────── */
function ThreeStar({ delay, size = 40 }: { delay: number; size?: number }) {
    return (
        <motion.svg
            viewBox="0 0 40 40"
            width={size}
            height={size}
            initial={{ scale: 0.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
        >
            <defs>
                <radialGradient id={`sg${delay}`} cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="60%" stopColor="#E6A817" />
                    <stop offset="100%" stopColor="#B7791F" />
                </radialGradient>
                <filter id={`glow${delay}`}>
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            <path
                d="M20 3 L24.1 15.1 H37 L26.5 22.5 L30.6 34.6 L20 27.2 L9.4 34.6 L13.5 22.5 L3 15.1 H15.9Z"
                fill={`url(#sg${delay})`}
                filter={`url(#glow${delay})`}
            />
        </motion.svg>
    );
}

/* ── Price Tag SVG ────────────────────────────────────────── */
function PriceTag() {
    return (
        <motion.div
            initial={{ rotate: -8, opacity: 0, scale: 0.8 }}
            whileInView={{ rotate: -5, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-block"
            aria-label="Precio: 3.000 pesos argentinos"
        >
            <svg viewBox="0 0 160 72" className="w-40" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="148" height="68" rx="8" fill="white" stroke="#E6A817" strokeWidth="2" strokeDasharray="5 3" />
                <circle cx="16" cy="36" r="5" fill="#E6A817" opacity="0.6" />
                <line x1="16" y1="2" x2="16" y2="31" stroke="#E6A817" strokeWidth="1.5" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-1">
                <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400">solo</p>
                <p
                    className="text-2xl font-black leading-none"
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: '#0F1923',
                        WebkitTextStroke: '0.5px rgba(230,168,23,0.4)',
                    }}
                >
                    $3.000
                </p>
                <p className="text-[9px] text-gray-400 tracking-widest">ARS / mes</p>
            </div>
        </motion.div>
    );
}

/* ── Jersey texture pseudo-flag ────────────────────────────── */
function JerseyBg() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* Celeste stripes like jersey */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #2E86DE 0px, #2E86DE 32px, transparent 32px, transparent 64px)',
                }}
            />
            {/* Grain */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '180px 180px',
                }}
            />
            {/* Blue orb top-right */}
            <div
                className="absolute -top-1/4 right-0 w-[500px] h-[500px] rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(46,134,222,0.14) 0%, transparent 70%)' }}
            />
        </div>
    );
}

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroStars() {
    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 px-4"
            style={{ background: 'linear-gradient(160deg, #F8FAFF 55%, #EBF4FF 100%)' }}
            aria-label="Tres estrellas, tres mil pesos. El manifiesto de GuiArg."
        >
            <JerseyBg />

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* ── LEFT: Copy ── */}
                    <motion.div variants={stagger} initial="hidden" animate="visible">
                        {/* Label */}
                        <motion.div variants={fadeUp}>
                            <span
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-widest uppercase"
                                style={{ background: 'rgba(46,134,222,0.1)', color: '#1A5FAD', border: '1px solid rgba(46,134,222,0.2)' }}
                            >
                                <Users size={10} />
                                Comunidad GuiArg
                            </span>
                        </motion.div>

                        {/* Stars row */}
                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5" aria-label="Tres estrellas del campeonato mundial">
                            <ThreeStar delay={0.2} size={44} />
                            <ThreeStar delay={0.4} size={52} />
                            <ThreeStar delay={0.6} size={44} />
                            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(230,168,23,0.5), transparent)' }} aria-hidden="true" />
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl md:text-5xl lg:text-[3.75rem] font-black leading-[1.06] tracking-tight mb-5"
                            style={{ color: '#0F1923' }}
                        >
                            Tres Estrellas<br />
                            en la{' '}
                            <span style={{ color: '#2E86DE' }}>Camiseta,</span>
                            <br />
                            <span
                                className="relative"
                                style={{ color: '#E6A817' }}
                            >
                                Tres Mil Pesos
                                <motion.svg
                                    viewBox="0 0 220 10"
                                    className="absolute -bottom-1 left-0 w-full"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.8 }}
                                    aria-hidden="true"
                                >
                                    <path d="M2 7 Q55 2 110 6 Q165 10 218 5" stroke="#E6A817" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                </motion.svg>
                            </span>
                            {' '}en el Barrio.
                        </motion.h1>

                        {/* Body */}
                        <motion.p
                            variants={fadeUp}
                            className="text-[#3D4F63] text-lg leading-relaxed mb-6 max-w-lg"
                        >
                            Gritamos los goles, lloramos las finales y sabemos lo que pesa la gloria. Ahora imaginá esto:{' '}
                            <strong className="text-[#0F1923]">cada estrella de nuestra historia vale $1.000</strong>.
                            Si con $3.000 pudieras hacer algo tan significativo como ganar tres mundiales… ¿lo harías?
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            className="text-[#3D4F63] text-base leading-relaxed mb-8 max-w-lg"
                        >
                            GuiArg es la jugada colectiva para levantar la economía de los que la pelean todos los días.
                        </motion.p>

                        {/* Wavy separator */}
                        <motion.div variants={fadeUp} className="mb-8">
                            <svg viewBox="0 0 180 10" className="w-44" fill="none" aria-hidden="true">
                                <path d="M2 5 Q22 1 42 5 Q62 9 82 5 Q102 1 122 5 Q142 9 162 5 Q170 3 178 5" stroke="#2E86DE" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
                            </svg>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                            <Link
                                href="#subscripcion"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                                style={{
                                    background: 'linear-gradient(135deg, #1A5FAD, #2E86DE)',
                                    boxShadow: '0 6px 24px rgba(46,134,222,0.35)',
                                    minHeight: '44px',
                                }}
                                aria-label="Sumarme a GuiArg por 3.000 pesos"
                            >
                                Sumarme por $3.000
                                <ArrowRight size={14} />
                            </Link>
                            <Link
                                href="#beneficios"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                                style={{
                                    background: 'white',
                                    color: '#1A5FAD',
                                    border: '1.5px solid rgba(46,134,222,0.25)',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    minHeight: '44px',
                                }}
                                aria-label="Ver beneficios de ser miembro"
                            >
                                Ver Beneficios
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT: Visual card ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-6"
                        aria-hidden="true"
                    >
                        {/* Jersey card */}
                        <div
                            className="relative w-full max-w-sm rounded-3xl overflow-hidden p-8 text-center"
                            style={{
                                background: 'white',
                                boxShadow: '0 24px 64px rgba(46,134,222,0.14), 0 4px 16px rgba(0,0,0,0.06)',
                                border: '1px solid rgba(46,134,222,0.1)',
                            }}
                        >
                            {/* Jersey stripes bg inside card */}
                            <div
                                className="absolute inset-0 opacity-[0.04]"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(0deg, #2E86DE 0px, #2E86DE 28px, white 28px, white 56px)',
                                }}
                            />
                            <div className="relative z-10">
                                {/* # 10 */}
                                <div
                                    className="text-[6rem] font-black leading-none mb-2"
                                    style={{
                                        color: 'transparent',
                                        WebkitTextStroke: '3px rgba(46,134,222,0.15)',
                                        fontVariantNumeric: 'lining-nums',
                                    }}
                                >
                                    10
                                </div>
                                {/* Stars large */}
                                <div className="flex justify-center gap-3 mb-4">
                                    {[0.1, 0.3, 0.5].map((d, i) => (
                                        <ThreeStar key={i} delay={d + 0.7} size={36} />
                                    ))}
                                </div>
                                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300 mb-4">Argentina</p>
                                {/* Price tag */}
                                <PriceTag />
                                <p className="text-xs text-gray-400 mt-3">El precio de un café de paso</p>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                            className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                            style={{
                                background: 'white',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(230,168,23,0.2)',
                            }}
                        >
                            <div className="text-2xl" aria-hidden="true">🇦🇷</div>
                            <div>
                                <p className="text-xs text-gray-400">Hecho en Argentina</p>
                                <p className="text-sm font-bold text-[#0F1923]">Para los que la pelean</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
