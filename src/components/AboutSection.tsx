'use client';

import { motion, type Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Scan, ShieldCheck, TrendingUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Animated QR connecting phone to shop
function QRConnectionSVG() {
    return (
        <svg viewBox="0 0 320 240" className="w-full h-full" aria-hidden="true">
            {/* Phone left */}
            <rect x="10" y="30" width="80" height="140" rx="10" fill="rgba(22,27,34,0.95)" stroke="rgba(46,134,222,0.4)" strokeWidth="1.5" />
            <rect x="16" y="42" width="68" height="100" rx="5" fill="rgba(13,17,23,0.9)" />
            {/* QR on phone */}
            <rect x="22" y="50" width="56" height="56" rx="4" fill="rgba(22,27,34,1)" />
            <rect x="26" y="54" width="14" height="14" rx="2" fill="rgba(46,134,222,0.7)" />
            <rect x="44" y="54" width="14" height="14" rx="2" fill="rgba(46,134,222,0.7)" />
            <rect x="26" y="72" width="14" height="14" rx="2" fill="rgba(46,134,222,0.7)" />
            <rect x="44" y="72" width="6" height="6" rx="1" fill="rgba(230,168,23,0.9)" />
            <rect x="52" y="72" width="6" height="6" rx="1" fill="rgba(46,134,222,0.6)" />
            <rect x="44" y="80" width="6" height="6" rx="1" fill="rgba(46,134,222,0.6)" />
            <rect x="52" y="80" width="6" height="6" rx="1" fill="rgba(46,134,222,0.6)" />
            <rect x="62" y="54" width="14" height="14" rx="2" fill="rgba(46,134,222,0.7)" />
            {/* inner qr marks */}
            <rect x="28" y="56" width="10" height="10" fill="rgba(13,17,23,1)" rx="1" />
            <rect x="30" y="58" width="6" height="6" fill="rgba(46,134,222,0.9)" rx="0.5" />
            <rect x="46" y="56" width="10" height="10" fill="rgba(13,17,23,1)" rx="1" />
            <rect x="48" y="58" width="6" height="6" fill="rgba(46,134,222,0.9)" rx="0.5" />
            <rect x="28" y="74" width="10" height="10" fill="rgba(13,17,23,1)" rx="1" />
            <rect x="30" y="76" width="6" height="6" fill="rgba(46,134,222,0.9)" rx="0.5" />
            <rect x="64" y="56" width="10" height="10" fill="rgba(13,17,23,1)" rx="1" />
            <rect x="66" y="58" width="6" height="6" fill="rgba(46,134,222,0.9)" rx="0.5" />
            {/* Scan indicator */}
            <rect x="22" y="116" width="56" height="1.5" fill="url(#qrScan)" rx="1" />
            <defs>
                <linearGradient id="qrScan" x1="22" y1="0" x2="78" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2E86DE" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#54A0FF" />
                    <stop offset="1" stopColor="#2E86DE" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="connLine" x1="90" y1="100" x2="230" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2E86DE" />
                    <stop offset="1" stopColor="#E6A817" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Phone status bar */}
            <rect x="16" y="148" width="68" height="14" rx="3" fill="rgba(46,134,222,0.15)" />
            <text x="50" y="158" textAnchor="middle" fontSize="7" fill="rgba(46,134,222,0.8)" fontFamily="Poppins, sans-serif">Escaneando...</text>

            {/* Connection line with dots */}
            <path d="M90 100 C130 100, 190 100, 230 100" stroke="url(#connLine)" strokeWidth="2" strokeDasharray="6 4" filter="url(#glow)" opacity="0.8" />
            {/* Moving dot */}
            <circle cx="160" cy="100" r="5" fill="#2E86DE" filter="url(#glow)" opacity="0.9" />
            <circle cx="160" cy="100" r="9" fill="transparent" stroke="rgba(46,134,222,0.3)" strokeWidth="1" />
            {/* Data packets */}
            <circle cx="115" cy="100" r="3" fill="rgba(46,134,222,0.6)" />
            <circle cx="205" cy="100" r="3" fill="rgba(230,168,23,0.6)" />

            {/* Shop right */}
            <rect x="230" y="40" width="80" height="120" rx="8" fill="rgba(22,27,34,0.95)" stroke="rgba(230,168,23,0.4)" strokeWidth="1.5" />
            {/* Storefront */}
            <rect x="235" y="72" width="70" height="60" rx="4" fill="rgba(13,17,23,0.6)" />
            {/* Awning */}
            <rect x="235" y="62" width="70" height="14" rx="4" fill="rgba(46,134,222,0.5)" />
            <rect x="235" y="40" width="70" height="24" rx="6" fill="rgba(230,168,23,0.12)" />
            {/* Shop sign */}
            <text x="270" y="56" textAnchor="middle" fontSize="8" fill="rgba(230,168,23,0.9)" fontFamily="Poppins, sans-serif" fontWeight="700">Café del Sol</text>
            {/* Door */}
            <rect x="258" y="100" width="24" height="32" rx="3" fill="rgba(46,134,222,0.2)" stroke="rgba(46,134,222,0.3)" strokeWidth="1" />
            {/* Window */}
            <rect x="238" y="82" width="18" height="16" rx="2" fill="rgba(46,134,222,0.1)" stroke="rgba(46,134,222,0.2)" strokeWidth="1" />
            <rect x="260" y="82" width="18" height="16" rx="2" fill="rgba(46,134,222,0.1)" stroke="rgba(46,134,222,0.2)" strokeWidth="1" />
            {/* Star badge */}
            <circle cx="300" cy="52" r="10" fill="rgba(230,168,23,0.2)" stroke="rgba(230,168,23,0.5)" strokeWidth="1" />
            <text x="300" y="56" textAnchor="middle" fontSize="10" fill="#E6A817">★</text>

            {/* Success badge */}
            <circle cx="160" cy="60" r="18" fill="rgba(46,134,222,0.12)" stroke="rgba(46,134,222,0.3)" strokeWidth="1.2" />
            <circle cx="160" cy="60" r="12" fill="rgba(46,134,222,0.2)" />
            <path d="M154 60 L158 64 L167 55" stroke="#54A0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const featureItems = [
    {
        icon: Scan,
        label: 'QR Inteligente',
        desc: 'Cada escaneo conecta a tu cliente directamente con tu negocio digital,',
        color: 'rgba(46,134,222,0.15)',
        borderColor: 'rgba(46,134,222,0.25)',
        iconColor: '#54A0FF',
    },
    {
        icon: ShieldCheck,
        label: 'Negocios Verificados',
        desc: 'Sello de autenticidad y transparencia para cada comercio de la red.',
        color: 'rgba(230,168,23,0.1)',
        borderColor: 'rgba(230,168,23,0.25)',
        iconColor: '#E6A817',
    },
    {
        icon: TrendingUp,
        label: 'Impacto Real',
        desc: 'Métricas en tiempo real para medir el verdadero impacto de tu negocio.',
        color: 'rgba(46,134,222,0.08)',
        borderColor: 'rgba(46,134,222,0.2)',
        iconColor: '#74B9FF',
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="about"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            aria-label="¿Qué es GuiArg?"
        >
            {/* background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(46,134,222,0.06) 0%, transparent 70%)' }} />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="section-label mb-5 inline-flex">¿Qué es GuiArg?</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                        Donde el barrio <span className="gradient-text-blue">se hace red</span>
                    </h2>
                    <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
                        Conectando historias auténticas con tecnología simple. Un puente entre los emprendedores argentinos y sus clientes locales.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left: SVG Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="glass rounded-3xl p-8 relative overflow-hidden min-h-[320px] flex flex-col justify-between"
                    >
                        <div>
                            <p className="text-2xl font-bold mb-2">Escaneá. Descubrí. <span className="gradient-text-blue">Sostené.</span></p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Busca el QR fijado en tu barrio y transformá cada compra en un acto comunitario.
                            </p>
                        </div>
                        <div className="h-40 mt-4">
                            <QRConnectionSVG />
                        </div>
                        {/* decorative blobs */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-blue-500/5 blur-2xl" />
                    </motion.div>

                    {/* Right: Feature cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="flex flex-col gap-4"
                    >
                        {featureItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.label}
                                    variants={cardVariants}
                                    className="glass rounded-2xl p-5 flex items-start gap-4 group cursor-default hover:border-blue-500/30 transition-colors duration-200"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                                        style={{ background: item.color, border: `1px solid ${item.borderColor}` }}
                                    >
                                        <Icon size={18} style={{ color: item.iconColor }} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white mb-1">{item.label}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                        <motion.div variants={cardVariants}>
                            <Link
                                href="/about"
                                className="btn-secondary inline-flex w-full justify-center mt-1"
                                aria-label="Conocer más sobre GuiArg"
                            >
                                Conocer más
                                <ChevronRight size={14} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
