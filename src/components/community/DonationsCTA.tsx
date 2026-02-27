'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, ArrowRight, Shield } from 'lucide-react';

/* ── Heart + Coffee Doodle ─────────────────────────────────── */
function HeartCoffeeDoodle() {
    return (
        <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
            {/* Coffee cup */}
            <rect x="28" y="28" width="34" height="30" rx="5" fill="white" stroke="#8DA4BF" strokeWidth="2" />
            <rect x="28" y="28" width="34" height="10" rx="5" fill="#C8956B" opacity="0.3" />
            <ellipse cx="45" cy="58" rx="17" ry="4" fill="#C8956B" opacity="0.15" />
            {/* Cup handle */}
            <path d="M62 36 Q72 36 72 44 Q72 52 62 52" stroke="#8DA4BF" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Saucer */}
            <ellipse cx="45" cy="60" rx="22" ry="4" fill="none" stroke="#8DA4BF" strokeWidth="1.5" />
            {/* Steam */}
            <path d="M38 26 Q40 20 38 14" stroke="#C8956B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M45 24 Q47 18 45 12" stroke="#C8956B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M52 26 Q54 20 52 14" stroke="#C8956B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            {/* Hand-drawn heart */}
            <path d="M6 20 Q6 14 12 14 Q18 14 18 20 Q18 26 12 32 Q6 26 6 20Z" fill="#E6A817" opacity="0.8" />
            <path d="M10 32 Q18 40 12 44" stroke="#E6A817" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* $3000 handwritten style */}
            <text x="65" y="18" fontSize="10" fill="#2E86DE" fontFamily="cursive, serif" fontWeight="bold" transform="rotate(-8, 65, 18)" opacity="0.9">$3k</text>
            {/* Dotted border top */}
            <path d="M2 72 Q25 68 50 72 Q75 76 98 72" stroke="#E6A817" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.5" />
        </svg>
    );
}

/* ── ONG beneficiary cards ──────────────────────────────────── */
const beneficiaries = [
    { emoji: '🏠', label: 'Niños sin hogar', desc: 'Apoyamos comedores y hogares de acogida en todo el país.', color: '#2E86DE' },
    { emoji: '🐾', label: 'Animales rescatados', desc: 'ONGs de bienestar animal que rescatan y rehabilitan animales.', color: '#E6A817' },
    { emoji: '📚', label: 'Formación técnica', desc: 'Capacitación digital gratuita para quienes lo perdieron todo.', color: '#5B8C3E' },
];

/* ── Heartbeat pulse keyframe via Framer Motion ────────────── */
const heartbeatVariants = {
    animate: {
        scale: [1, 1.06, 1, 1.04, 1],
        boxShadow: [
            '0 6px 24px rgba(46,134,222,0.35)',
            '0 10px 40px rgba(46,134,222,0.55)',
            '0 6px 24px rgba(46,134,222,0.35)',
            '0 8px 32px rgba(46,134,222,0.45)',
            '0 6px 24px rgba(46,134,222,0.35)',
        ],
        transition: {
            duration: 1.4,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: 'easeInOut',
        },
    },
};

export default function DonationsCTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="subscripcion"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            aria-label="Más que un café, una segunda oportunidad — subscripción GuiArg"
        >
            {/* Soft warm background */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(160deg, #F8FAFF 0%, #EBF4FF 40%, #FAFAF8 100%)' }}
                aria-hidden="true"
            />

            {/* Torn paper edge top */}
            <div
                className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
                style={{
                    background: '#FAFAF8',
                    clipPath: 'polygon(0 0, 1% 100%, 4% 15%, 7% 85%, 11% 8%, 14% 92%, 18% 25%, 22% 68%, 26% 12%, 30% 88%, 34% 22%, 38% 78%, 42% 8%, 46% 92%, 50% 18%, 54% 82%, 58% 12%, 62% 85%, 66% 20%, 70% 80%, 74% 10%, 78% 88%, 82% 22%, 86% 75%, 90% 12%, 94% 80%, 97% 30%, 100% 0)',
                }}
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Main CTA card */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-3xl overflow-hidden mb-14"
                    style={{
                        background: 'white',
                        boxShadow: '0 24px 72px rgba(46,134,222,0.13), 0 4px 20px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(46,134,222,0.1)',
                    }}
                >
                    {/* Top band — celeste + white flag */}
                    <div
                        className="h-3 w-full"
                        style={{
                            background: 'repeating-linear-gradient(90deg, #2E86DE 0px, #2E86DE 33%, white 33%, white 66%, #2E86DE 66%)',
                        }}
                        aria-hidden="true"
                    />

                    <div className="grid md:grid-cols-2 gap-0">
                        {/* LEFT: Copy */}
                        <div className="p-8 md:p-12">
                            <div className="flex items-center gap-2 mb-5">
                                <Heart size={16} className="text-red-400" strokeWidth={2.5} aria-hidden="true" />
                                <span
                                    className="text-xs font-bold tracking-widest uppercase"
                                    style={{ color: '#E6A817' }}
                                >
                                    Más que un café
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: '#0F1923' }}>
                                Más que un Café,<br />
                                <span style={{ color: '#2E86DE' }}>una Segunda<br />Oportunidad.</span>
                            </h2>

                            <p className="text-[#3D4F63] text-base leading-relaxed mb-4">
                                Hay quienes lo perdieron todo, chicos que esperan un hogar y animales rescatados que necesitan una mano.
                                Por menos de lo que vale un café de paso,{' '}
                                <strong className="text-[#0F1923]">tu subscripción financia donaciones directas a ONGs apolíticas</strong>.
                            </p>
                            <p className="text-[#3D4F63] text-base leading-relaxed mb-8">
                                Ayudanos a que nadie se quede afuera de la cancha.
                            </p>

                            {/* Price anchor */}
                            <div
                                className="inline-flex items-baseline gap-2 px-5 py-3 rounded-2xl mb-6"
                                style={{ background: 'rgba(46,134,222,0.07)', border: '1px dashed rgba(46,134,222,0.3)' }}
                            >
                                <span className="text-3xl font-black" style={{ color: '#0F1923' }}>$3.000</span>
                                <span className="text-sm text-[#8DA4BF]">ARS / mes</span>
                                <span
                                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                    style={{ background: '#E6A817', color: 'white' }}
                                >
                                    = 1 café
                                </span>
                            </div>

                            {/* CTA button with heartbeat */}
                            <div>
                                <motion.a
                                    href="/subscribe"
                                    variants={heartbeatVariants}
                                    animate="animate"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-base text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #1A5FAD, #2E86DE)',
                                        minHeight: '52px',
                                        letterSpacing: '0.02em',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                    }}
                                    aria-label="Sumarme a GuiArg por 3.000 pesos argentinos por mes"
                                >
                                    <Heart size={18} strokeWidth={2.5} aria-hidden="true" />
                                    Sumarme por $3.000
                                    <ArrowRight size={16} aria-hidden="true" />
                                </motion.a>
                                <p className="text-xs text-[#8DA4BF] mt-3 flex items-center gap-1.5">
                                    <Shield size={11} aria-hidden="true" />
                                    Pago seguro · Cancelás cuando querés
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Doodle + warm visual */}
                        <div
                            className="relative flex flex-col items-center justify-center p-8 overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, #EBF4FF 0%, #F8FAFF 100%)' }}
                        >
                            {/* Paper grain */}
                            <div
                                className="absolute inset-0 opacity-[0.05]"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                }}
                                aria-hidden="true"
                            />

                            {/* Doodle */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.4, duration: 0.7 }}
                                className="w-36 h-28 mb-6 relative z-10"
                            >
                                <HeartCoffeeDoodle />
                            </motion.div>

                            {/* Stats */}
                            <div className="relative z-10 text-center">
                                <p
                                    className="text-5xl font-black mb-1"
                                    style={{ color: '#2E86DE' }}
                                >
                                    = $3.000
                                </p>
                                <p className="text-sm text-[#3D4F63] font-semibold mb-4">Una microinversión. Un impacto real.</p>
                                <div className="flex gap-4 justify-center">
                                    {[{ v: '60+', l: 'ONGs' }, { v: '100%', l: 'Apolítico' }, { v: '0%', l: 'Comisión' }].map(s => (
                                        <div key={s.l} className="text-center">
                                            <p className="text-lg font-black" style={{ color: '#0F1923' }}>{s.v}</p>
                                            <p className="text-xs text-[#8DA4BF]">{s.l}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Beneficiary cards */}
                <div className="grid md:grid-cols-3 gap-4">
                    {beneficiaries.map((b, i) => (
                        <motion.div
                            key={b.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                            className="rounded-2xl p-5 text-center"
                            style={{
                                background: 'white',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                                border: '1px solid rgba(0,0,0,0.06)',
                            }}
                        >
                            <div className="text-4xl mb-3" aria-hidden="true">{b.emoji}</div>
                            <p className="font-bold text-[#0F1923] mb-1">{b.label}</p>
                            <p className="text-xs text-[#8DA4BF] leading-relaxed">{b.desc}</p>
                            <div
                                className="mt-3 h-1 w-12 mx-auto rounded-full"
                                style={{ background: b.color }}
                                aria-hidden="true"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Footer disclaimer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 }}
                    className="text-center text-xs text-[#8DA4BF] mt-8 max-w-lg mx-auto leading-relaxed"
                >
                    GuiArg es una plataforma apolítica y sin interés partidario. Las ONGs beneficiarias son seleccionadas
                    por criterios de impacto y transparencia. Podés ver el reporte completo de donaciones en nuestro sitio.
                </motion.p>
            </div>
        </section>
    );
}
