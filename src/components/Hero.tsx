'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Play, Users } from 'lucide-react';
import Link from 'next/link';

// QR SVG Illustration
function QRIllustration() {
    return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Outer ring */}
            <circle cx="100" cy="100" r="90" stroke="rgba(46,134,222,0.15)" strokeWidth="1" strokeDasharray="4 4" />
            {/* Phone mockup */}
            <rect x="70" y="55" width="60" height="95" rx="8" fill="rgba(22,27,34,0.9)" stroke="rgba(46,134,222,0.4)" strokeWidth="1.5" />
            {/* Phone screen */}
            <rect x="74" y="65" width="52" height="75" rx="4" fill="rgba(13,17,23,0.8)" />
            {/* QR pattern simplified */}
            <rect x="80" y="72" width="18" height="18" rx="2" fill="rgba(46,134,222,0.6)" />
            <rect x="102" y="72" width="18" height="18" rx="2" fill="rgba(46,134,222,0.6)" />
            <rect x="80" y="94" width="18" height="18" rx="2" fill="rgba(46,134,222,0.6)" />
            <rect x="102" y="94" width="8" height="8" rx="1" fill="rgba(230,168,23,0.8)" />
            <rect x="112" y="94" width="8" height="8" rx="1" fill="rgba(46,134,222,0.6)" />
            <rect x="102" y="104" width="8" height="8" rx="1" fill="rgba(46,134,222,0.6)" />
            <rect x="112" y="104" width="8" height="8" rx="1" fill="rgba(46,134,222,0.6)" />
            {/* Inner squares */}
            <rect x="83" y="75" width="12" height="12" rx="1" fill="rgba(13,17,23,1)" />
            <rect x="85" y="77" width="8" height="8" rx="0.5" fill="rgba(46,134,222,0.9)" />
            <rect x="105" y="75" width="12" height="12" rx="1" fill="rgba(13,17,23,1)" />
            <rect x="107" y="77" width="8" height="8" rx="0.5" fill="rgba(46,134,222,0.9)" />
            <rect x="83" y="97" width="12" height="12" rx="1" fill="rgba(13,17,23,1)" />
            <rect x="85" y="99" width="8" height="8" rx="0.5" fill="rgba(46,134,222,0.9)" />
            {/* Scan beam */}
            <rect x="74" y="120" width="52" height="2" rx="1" fill="rgba(46,134,222,0.7)" />
            <rect x="74" y="120" width="52" height="2" rx="1" fill="url(#scanGrad)" />
            <defs>
                <linearGradient id="scanGrad" x1="74" y1="121" x2="126" y2="121" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2E86DE" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#54A0FF" />
                    <stop offset="1" stopColor="#2E86DE" stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* Label */}
            <rect x="76" y="132" width="48" height="6" rx="3" fill="rgba(46,134,222,0.2)" />
            {/* Connection lines */}
            <path d="M40 80 Q55 80 65 90" stroke="rgba(46,134,222,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M160 80 Q145 80 135 90" stroke="rgba(230,168,23,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Store icons */}
            <circle cx="35" cy="75" r="14" fill="rgba(46,134,222,0.15)" stroke="rgba(46,134,222,0.3)" strokeWidth="1" />
            <text x="35" y="80" textAnchor="middle" fontSize="12" fill="rgba(46,134,222,0.8)">🏪</text>
            <circle cx="165" cy="75" r="14" fill="rgba(230,168,23,0.1)" stroke="rgba(230,168,23,0.3)" strokeWidth="1" />
            <text x="165" y="80" textAnchor="middle" fontSize="12" fill="rgba(230,168,23,0.8)">⭐</text>
        </svg>
    );
}

const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg"
            aria-label="Sección principal de GuiArg"
        >
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />

            {/* Blue glow orb */}
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(46,134,222,0.12) 0%, transparent 70%)' }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-16">
                <motion.div
                    variants={heroVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Left: Copy */}
                    <div>
                        <motion.div variants={itemVariants}>
                            <span className="section-label mb-6 inline-flex">
                                <MapPin size={10} className="text-blue-400" />
                                Tecnología con acento argentino
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
                        >
                            El puente entre{' '}
                            <span className="gradient-text-blue">nuestras raíces</span>{' '}
                            y el futuro.
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
                        >
                            Tecnología diseñada para potenciar el comercio local, la identidad y el impacto social genuino de cada argentino.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                            <Link
                                href="/community"
                                className="btn-primary"
                                aria-label="Unirse a la comunidad GuiArg"
                            >
                                <Users size={16} />
                                Unirse a la Comunidad
                            </Link>
                            <Link
                                href="/about"
                                className="btn-secondary"
                                aria-label="Ver cómo funciona GuiArg"
                            >
                                <Play size={14} className="text-blue-400" />
                                Ver Manifiesto
                            </Link>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-10 flex items-center gap-4"
                        >
                            <div className="flex -space-x-2">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-[#0D1117] flex items-center justify-center text-xs font-bold"
                                        style={{
                                            background: `hsl(${210 + i * 20}, 70%, ${45 + i * 5}%)`,
                                        }}
                                        aria-hidden="true"
                                    >
                                        {['M', 'J', 'L', 'F', 'A'][i]}
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-400">
                                <span className="text-white font-semibold">+500</span> negocios ya confían en GuiArg
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: Floating cards + illustration */}
                    <motion.div
                        variants={itemVariants}
                        className="relative flex items-center justify-center h-[420px] lg:h-[500px]"
                        aria-hidden="true"
                    >
                        {/* Main QR card */}
                        <div className="float-slow relative z-20 glass rounded-3xl p-6 w-52 h-52 flex flex-col items-center justify-center pulse-blue">
                            <div className="w-full h-full">
                                <QRIllustration />
                            </div>
                        </div>

                        {/* Floating card: Business */}
                        <motion.div
                            className="float-medium absolute top-8 right-4 glass rounded-2xl px-4 py-3 z-30"
                            style={{ transformOrigin: 'center' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(46,134,222,0.2)' }}>
                                    <MapPin size={16} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Escaneado ahora</p>
                                    <p className="text-sm font-semibold text-white">Café del Sol</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating card: Stats */}
                        <motion.div
                            className="float-slow absolute bottom-16 left-0 glass rounded-2xl px-4 py-3 z-30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            <p className="text-xs text-gray-400 mb-1">Impacto hoy</p>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-black gradient-text-gold">+1.2k</span>
                            </div>
                            <p className="text-xs text-gray-500">conexiones locales</p>
                        </motion.div>

                        {/* Floating card: Rating */}
                        <motion.div
                            className="float-medium absolute bottom-10 right-2 glass-amber rounded-2xl px-4 py-3 z-30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.3, duration: 0.5 }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400 text-lg">★</span>
                                <div>
                                    <p className="text-sm font-bold text-white">4.9</p>
                                    <p className="text-xs text-gray-400">Valoración promedio</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Background glow */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{ background: 'radial-gradient(ellipse at center, rgba(46,134,222,0.08) 0%, transparent 70%)' }}
                        />
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center mt-16"
                    aria-hidden="true"
                >
                    <div className="flex flex-col items-center gap-2 opacity-40">
                        <p className="text-xs text-gray-500 tracking-widest uppercase">Descubrí más</p>
                        <div className="w-px h-8 bg-gradient-to-b from-transparent to-blue-400 animate-pulse" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
