'use client';

import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play, ShieldCheck, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';

/* ── Metallic Shutter SVG ─────────────────────────────────── */
function ShutterSVG() {
    return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
            <defs>
                <linearGradient id="shutterBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A1628" />
                    <stop offset="60%" stopColor="#1A3A6B" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#2E86DE" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="goldLight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E6A817" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="slat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2A4A7A" />
                    <stop offset="50%" stopColor="#1E3A63" />
                    <stop offset="100%" stopColor="#0F2040" />
                </linearGradient>
                <radialGradient id="sunRay" cx="30%" cy="80%" r="70%">
                    <stop offset="0%" stopColor="#E6A817" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
            </defs>

            {/* Background */}
            <rect width="480" height="300" fill="url(#shutterBg)" />

            {/* Sunray from bottom-left */}
            <ellipse cx="100" cy="280" rx="350" ry="200" fill="url(#sunRay)" />

            {/* Shutter slats — closed at top, opening at bottom */}
            {Array.from({ length: 10 }).map((_, i) => {
                const y = i * 20;
                const opacity = i < 6 ? 0.95 : 0.95 - (i - 5) * 0.18;
                return (
                    <g key={i}>
                        <rect x="20" y={y} width="440" height="18" rx="1" fill="url(#slat)" opacity={opacity} />
                        <rect x="20" y={y + 16} width="440" height="2" rx="1" fill="#0A1628" opacity="0.6" />
                        {/* Shutter bolt holes */}
                        {[80, 240, 400].map(bx => (
                            <circle key={bx} cx={bx} cy={y + 9} r="2" fill="#0A1628" opacity="0.5" />
                        ))}
                    </g>
                );
            })}

            {/* Opening gap at bottom — warm light spilling in */}
            <rect x="0" y="200" width="480" height="100" fill="url(#shutterBg)" opacity="0.3" />
            <rect x="0" y="210" width="480" height="90" fill="url(#goldLight)" opacity="0.6" />

            {/* Ground reflection */}
            <rect x="0" y="260" width="480" height="40" fill="rgba(230,168,23,0.08)" />

            {/* Light leak from gap */}
            <rect x="0" y="200" width="480" height="8" fill="#E6A817" opacity="0.3" />

            {/* Street floor */}
            <rect x="0" y="268" width="480" height="32" fill="#0A1628" opacity="0.5" />

            {/* GuiArg QR sign on shutter */}
            <rect x="200" y="90" width="80" height="80" rx="6" fill="white" opacity="0.08" />
            <rect x="210" y="100" width="60" height="60" rx="3" fill="white" opacity="0.06" />

            {/* UI floating elements */}
            <g transform="translate(320,60)">
                <rect width="120" height="48" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(230,168,23,0.3)" strokeWidth="1" />
                <circle cx="20" cy="24" r="8" fill="rgba(46,134,222,0.6)" />
                <rect x="36" y="16" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
                <rect x="36" y="26" width="44" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
            </g>
            <g transform="translate(30,160)">
                <rect width="110" height="44" rx="8" fill="rgba(230,168,23,0.12)" stroke="rgba(230,168,23,0.3)" strokeWidth="1" />
                <rect x="12" y="14" width="50" height="6" rx="3" fill="rgba(230,168,23,0.6)" />
                <rect x="12" y="25" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
            </g>
        </svg>
    );
}

/* ── Floating "Negocio Verificado" badge ──────────────────── */
function VerifiedBizBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute bottom-8 right-8 flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                border: '1px solid rgba(230,168,23,0.3)',
                transform: 'rotate(3deg)',
            }}
            aria-label="Negocio Verificado por GuiArg"
        >
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(46,134,222,0.12)' }}
            >
                <ShieldCheck size={18} style={{ color: '#2E86DE' }} />
            </div>
            <div>
                <p className="text-xs text-gray-400 leading-none mb-0.5">Estado</p>
                <p className="text-sm font-black text-[#0F1923] leading-none">Negocio Verificado</p>
            </div>
            <div
                className="w-2 h-2 rounded-full bg-green-500 absolute -top-1 -right-1"
                style={{ boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
                aria-hidden="true"
            />
        </motion.div>
    );
}

const stag: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroEmpathy() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 px-4"
            style={{ background: '#0A1628' }}
            aria-label="GuiArg para negocios — la persiana como punto de partida"
        >
            {/* Parallax shutter background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: bgY }}
                aria-hidden="true"
            >
                <ShutterSVG />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(10,22,40,0.92) 40%, rgba(10,22,40,0.55) 100%)' }} />
            </motion.div>

            {/* Grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '180px 180px',
                }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto w-full relative z-10">
                <div className="max-w-2xl">
                    <motion.div variants={stag} initial="hidden" animate="visible">

                        {/* Eyebrow */}
                        <motion.div variants={fadeUp}>
                            <span
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-widest uppercase"
                                style={{ background: 'rgba(230,168,23,0.15)', color: '#E6A817', border: '1px solid rgba(230,168,23,0.3)' }}
                            >
                                Para Negocios & Emprendedores
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl md:text-6xl lg:text-[4rem] font-black leading-[1.05] tracking-tight mb-6 text-white"
                        >
                            Sabemos lo que<br />cuesta{' '}
                            <span style={{ color: '#E6A817' }}>levantar<br />la persiana.</span>
                        </motion.h1>

                        {/* Body */}
                        <motion.p
                            variants={fadeUp}
                            className="text-[#90AED2] text-lg leading-relaxed mb-4 max-w-xl"
                        >
                            Emprender en Argentina es una carrera de obstáculos. La inflación, la falta de visibilidad y la soledad del mostrador pesan.
                        </motion.p>
                        <motion.p
                            variants={fadeUp}
                            className="text-white/80 text-base leading-relaxed mb-8 max-w-xl"
                        >
                            <strong className="text-white">GuiArg no es otra carga administrativa</strong>; es tu socio tecnológico. Simplificamos tu conexión con el barrio y potenciamos tu marca para que formes parte de la{' '}
                            <span style={{ color: '#E6A817' }}>red de comercios más grande del país</span>.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                            <Link
                                href="#onboarding"
                                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                                style={{
                                    background: 'linear-gradient(135deg, #1A5FAD, #2E86DE)',
                                    boxShadow: '0 6px 28px rgba(46,134,222,0.4)',
                                    minHeight: '44px',
                                }}
                                aria-label="Sumar mi negocio a GuiArg"
                            >
                                Sumar mi Negocio
                                <ArrowRight size={15} />
                            </Link>
                            <Link
                                href="#herramientas"
                                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
                                style={{
                                    background: 'rgba(255,255,255,0.07)',
                                    color: 'white',
                                    border: '1.5px solid rgba(255,255,255,0.2)',
                                    minHeight: '44px',
                                }}
                                aria-label="Ver demo de GuiArg para negocios"
                            >
                                <Play size={13} />
                                Ver Demo
                            </Link>
                        </motion.div>

                        {/* Floating stats strip */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-wrap gap-4"
                        >
                            {[
                                { icon: ShieldCheck, label: '+500 comercios verificados', color: '#2E86DE' },
                                { icon: MapPin, label: '24 provincias', color: '#E6A817' },
                                { icon: DollarSign, label: '$0 hasta crecer', color: '#5B8C3E' },
                            ].map(({ icon: Icon, label, color }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    <Icon size={11} style={{ color }} aria-hidden="true" />
                                    {label}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Verified badge floating */}
            <VerifiedBizBadge />

            {/* Gold bottom border */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(90deg, transparent, #E6A817, transparent)' }}
                aria-hidden="true"
            />
        </section>
    );
}
