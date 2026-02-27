'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroHistory() {
    return (
        <section
            className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 px-4"
            style={{ background: '#0C0A07' }}
            aria-label="La línea del tiempo de la genialidad argentina"
        >
            {/* Sepia grain */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                    opacity: 0.07,
                    mixBlendMode: 'overlay',
                }}
                aria-hidden="true"
            />

            {/* Sepia horizontal lines (old film) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, #C8A96E 0px, #C8A96E 1px, transparent 1px, transparent 4px)',
                    backgroundSize: '100% 4px',
                }}
                aria-hidden="true"
            />

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)' }}
                aria-hidden="true"
            />

            {/* Year range badge */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative z-10 mb-6"
            >
                <span
                    className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase"
                    style={{
                        background: 'rgba(200,169,110,0.12)',
                        color: '#C8A96E',
                        border: '1px solid rgba(200,169,110,0.3)',
                        fontFamily: '"Courier New", Courier, monospace',
                    }}
                >
                    1810 — 2026
                </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="relative z-10 text-center text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4"
                style={{ color: '#F5F0E8', lineHeight: 1.05 }}
            >
                La Línea del Tiempo<br />
                de la{' '}
                <span
                    style={{
                        color: 'transparent',
                        WebkitTextStroke: '2px #C8A96E',
                    }}
                >
                    Genialidad
                </span>{' '}
                Argentina.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="relative z-10 text-center text-base md:text-lg max-w-xl leading-relaxed mb-8"
                style={{ color: 'rgba(245,240,232,0.55)', fontFamily: '"Courier New", Courier, monospace' }}
            >
                La página <strong style={{ color: '#C8A96E' }}>comienza en blanco y negro</strong>. Scrolleá hasta 1980
                para ver cómo Argentina pasó del blanco y negro al color — y descubrí cómo GuiArg se convirtió en el próximo hito.
            </motion.p>

            {/* Decorative old film sprockets */}
            <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-around" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-5 h-5 mx-auto rounded-sm" style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.12)' }} />
                ))}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col justify-around" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-5 h-5 mx-auto rounded-sm" style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.12)' }} />
                ))}
            </div>

            {/* Scroll arrow */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
                aria-hidden="true"
            >
                <ArrowDown size={20} style={{ color: '#C8A96E', opacity: 0.7 }} />
            </motion.div>

            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(transparent, #F5F0E8)' }}
                aria-hidden="true"
            />
        </section>
    );
}
