'use client';

import { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useArgentinaMap } from '@/hooks/useArgentinaMap';


const heroVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useArgentinaMap(canvasRef);

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Sección principal de GuiArg"
            style={{
                background: 'linear-gradient(160deg, #080E1A 0%, #0C1220 40%, #0D1117 100%)',
            }}
        >
            {/* ── Argentina Map Canvas (full-bleed background) ── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.92 }}
                aria-hidden="true"
            />

            {/* ── Subtle vignette edges ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(8,14,26,0.65) 100%)',
                }}
                aria-hidden="true"
            />

            {/* ── Left content fade (make text readable) ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'linear-gradient(90deg, rgba(8,14,26,0.82) 0%, rgba(8,14,26,0.5) 45%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            {/* ── Grid overlay ── */}
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />

            {/* ── Content ── */}
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
                                + GuiArg
                            </Link>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-10 flex items-center gap-4"
                        >
                            <div className="flex -space-x-2">
                                {[
                                    { bg: 'hsl(210, 70%, 45%)', skin: '#F5CBA7' },
                                    { bg: 'hsl(230, 70%, 50%)', skin: '#D4A574' },
                                    { bg: 'hsl(250, 70%, 55%)', skin: '#C68642' },
                                    { bg: 'hsl(270, 70%, 50%)', skin: '#8D5524' },
                                    { bg: 'hsl(200, 70%, 48%)', skin: '#FDEBD0' },
                                ].map((avatar, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-[#0D1117] flex items-center justify-center overflow-hidden"
                                        style={{ background: avatar.bg }}
                                        aria-hidden="true"
                                    >
                                        <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                                            {/* Body */}
                                            <ellipse cx="16" cy="26" rx="9" ry="6" fill={avatar.bg} opacity="0.9" />
                                            {/* Head */}
                                            <circle cx="16" cy="13" r="6.5" fill={avatar.skin} />
                                            {/* Eyes */}
                                            <circle cx="13.5" cy="12.5" r="1" fill="#333" />
                                            <circle cx="18.5" cy="12.5" r="1" fill="#333" />
                                            {/* Smile */}
                                            <path d="M13.5 15.5 Q16 17.5 18.5 15.5" stroke="#555" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                                        </svg>
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
                        <div className="float-slow relative z-20 glass rounded-3xl p-2 w-56 h-56 flex flex-col items-center justify-center pulse-blue overflow-hidden">
                            <Image
                                src="/QRHeroSection.avif"
                                alt="QR GuiArg"
                                fill
                                sizes="(max-width: 768px) 100vw, 224px"
                                priority
                                className="object-cover rounded-2xl"
                                style={{ opacity: 0.70 }}
                            />
                        </div>

                        {/* Floating card: Todo en un Solo QR */}
                        <motion.div
                            className="float-medium absolute top-8 right-4 glass rounded-2xl px-4 py-3 z-30"
                            style={{ transformOrigin: 'center' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(46,134,222,0.2)' }}>
                                    <span className="text-lg">🔲</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Acceso simple</p>
                                    <p className="text-sm font-semibold text-white">Todo en un Solo QR</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating card: Para toda la Argentina */}
                        <motion.div
                            className="float-slow absolute bottom-16 left-0 glass rounded-2xl px-4 py-3 z-30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xl">🇦🇷</span>
                                <div>
                                    <p className="text-sm font-bold text-white">Para toda la Argentina.</p>
                                    <p className="text-xs text-gray-400">Cobertura nacional</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating card: Beneficios */}
                        <motion.div
                            className="float-medium absolute bottom-10 right-2 glass-amber rounded-2xl px-4 py-3 z-30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.3, duration: 0.5 }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-400 text-lg">★</span>
                                <div>
                                    <p className="text-sm font-bold text-white">Obtené Beneficios</p>
                                    <p className="text-xs text-gray-400">por cada compra</p>
                                </div>
                            </div>
                        </motion.div>
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
