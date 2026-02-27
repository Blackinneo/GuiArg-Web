'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

/* ── Fileteado frame SVG ──────────────────────────────────── */
function FileteadoFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative inline-block">
            <svg
                viewBox="0 0 260 200"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
            >
                {/* Corner ornaments */}
                <path d="M8 8 L40 8 L40 16 L16 16 L16 40 L8 40Z" fill="none" stroke="#E6A817" strokeWidth="2" opacity="0.7" />
                <path d="M252 8 L220 8 L220 16 L244 16 L244 40 L252 40Z" fill="none" stroke="#E6A817" strokeWidth="2" opacity="0.7" />
                <path d="M8 192 L40 192 L40 184 L16 184 L16 160 L8 160Z" fill="none" stroke="#E6A817" strokeWidth="2" opacity="0.7" />
                <path d="M252 192 L220 192 L220 184 L244 184 L244 160 L252 160Z" fill="none" stroke="#E6A817" strokeWidth="2" opacity="0.7" />
                {/* Corner flowers */}
                {[[20, 20], [240, 20], [20, 180], [240, 180]].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="4" fill="#E6A817" opacity="0.5" />
                ))}
                {/* Thin border */}
                <rect x="4" y="4" width="252" height="192" rx="6" stroke="#E6A817" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.35" />
            </svg>
            <div className="relative z-10 p-6">{children}</div>
        </div>
    );
}

/* ── Verified Badge SVG sticker ────────────────────────────── */
function VerifiedBadge({ name, location, category, color }: {
    name: string; location: string; category: string; color: string
}) {
    return (
        <div
            className="relative rounded-2xl p-4 flex items-start gap-3 cursor-default"
            style={{
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.06)',
            }}
        >
            {/* Color dot */}
            <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}
            >
                <ShieldCheck size={18} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-bold text-[#0F1923] text-sm truncate">{name}</p>
                <p className="text-xs text-[#8DA4BF] mb-1.5">{location}</p>
                <span
                    className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-widest uppercase"
                    style={{ background: `${color}18`, color }}
                >
                    {category}
                </span>
            </div>
            {/* Verified stamp */}
            <div
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black shadow-md"
                style={{ background: '#2E86DE', border: '2px solid white' }}
                aria-label="Verificado por GuiArg"
            >
                ✓
            </div>
        </div>
    );
}

const verifiedMembers = [
    { name: 'La Repostería de Mabel', location: 'Boedo, Bs As', category: 'Gastronomía', color: '#2E86DE' },
    { name: 'Tejidos Andinos', location: 'Salta Capital', category: 'Artesanías', color: '#E6A817' },
    { name: 'Taller El Tornero', location: 'Córdoba Centro', category: 'Servicios', color: '#5B8C3E' },
    { name: 'Librería La Nación', location: 'Rosario, SF', category: 'Cultura', color: '#6C3483' },
    { name: 'Ferme San Martín', location: 'Jujuy, Juj', category: 'Almacén', color: '#C0392B' },
    { name: 'Estudio Pampa', location: 'Mendoza Ciudad', category: 'Diseño', color: '#E6A817' },
];

/* ── Hand Collage SVG ─────────────────────────────────────── */
function HandCollageSVG() {
    return (
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
            {/* Background circles representing different communities */}
            <circle cx="60" cy="80" r="50" fill="rgba(46,134,222,0.06)" />
            <circle cx="140" cy="100" r="45" fill="rgba(230,168,23,0.06)" />
            <circle cx="220" cy="75" r="50" fill="rgba(46,134,222,0.06)" />

            {/* Hand 1 - young hand (left) */}
            <g transform="translate(20,40)">
                <rect x="8" y="50" width="12" height="30" rx="6" fill="#FBBF7A" />
                <rect x="22" y="38" width="12" height="42" rx="6" fill="#FBBF7A" />
                <rect x="36" y="36" width="12" height="44" rx="6" fill="#FBBF7A" />
                <rect x="50" y="40" width="12" height="40" rx="6" fill="#FBBF7A" />
                <rect x="6" y="70" width="62" height="35" rx="8" fill="#FBBF7A" />
                {/* Product */}
                <rect x="22" y="15" width="36" height="26" rx="3" fill="white" stroke="#E6A817" strokeWidth="1.5" />
                <rect x="28" y="20" width="24" height="4" rx="2" fill="#2E86DE" opacity="0.6" />
                <rect x="28" y="27" width="16" height="3" rx="1.5" fill="#E6A817" opacity="0.6" />
            </g>

            {/* Hand 2 - older/calloused hand (center) */}
            <g transform="translate(105,30)">
                <rect x="6" y="45" width="10" height="32" rx="5" fill="#C8956B" />
                <rect x="18" y="32" width="10" height="45" rx="5" fill="#C8956B" />
                <rect x="30" y="30" width="10" height="47" rx="5" fill="#C8956B" />
                <rect x="42" y="34" width="10" height="43" rx="5" fill="#C8956B" />
                <rect x="4" y="65" width="54" height="38" rx="8" fill="#C8956B" />
                {/* Mate cup */}
                <ellipse cx="28" cy="25" rx="14" ry="12" fill="#5B8C3E" opacity="0.85" />
                <rect x="14" y="12" width="3" height="18" rx="1.5" fill="#5B8C3E" />
                <ellipse cx="28" cy="26" rx="10" ry="3" fill="#3D6B28" opacity="0.5" />
            </g>

            {/* Hand 3 - tattooed hand (right) */}
            <g transform="translate(188,45)">
                <rect x="8" y="50" width="11" height="28" rx="5.5" fill="#8B6E5A" />
                <rect x="21" y="38" width="11" height="40" rx="5.5" fill="#8B6E5A" />
                <rect x="34" y="36" width="11" height="42" rx="5.5" fill="#8B6E5A" />
                <rect x="47" y="40" width="11" height="38" rx="5.5" fill="#8B6E5A" />
                <rect x="6" y="68" width="58" height="34" rx="8" fill="#8B6E5A" />
                {/* Tattoo detail */}
                <path d="M14 80 Q20 76 26 80 Q32 84 38 80" stroke="#5A3A2A" strokeWidth="1" fill="none" opacity="0.6" />
                {/* Craft item */}
                <rect x="16" y="20" width="32" height="22" rx="4" fill="#E6A817" opacity="0.85" />
                <rect x="22" y="25" width="20" height="3" rx="1.5" fill="white" opacity="0.7" />
                <rect x="22" y="31" width="14" height="3" rx="1.5" fill="white" opacity="0.5" />
            </g>

            {/* Connection dotted lines */}
            <path d="M90 90 Q140 70 170 90" stroke="#2E86DE" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.4" />
            <path d="M70 100 Q100 120 115 105" stroke="#E6A817" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.4" />
            <path d="M185 95 Q210 110 230 97" stroke="#2E86DE" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.4" />

            {/* GuiArg QR badge center */}
            <circle cx="140" cy="150" r="20" fill="white" stroke="rgba(46,134,222,0.3)" strokeWidth="1.5" />
            <rect x="130" y="140" width="8" height="8" rx="1" fill="#1A3A6B" />
            <rect x="142" y="140" width="8" height="8" rx="1" fill="#1A3A6B" />
            <rect x="130" y="152" width="8" height="8" rx="1" fill="#1A3A6B" />
            <rect x="143" y="153" width="4" height="4" rx="0.5" fill="#E6A817" />
            <rect x="149" y="153" width="4" height="4" rx="0.5" fill="#1A3A6B" />
            <rect x="143" y="159" width="4" height="4" rx="0.5" fill="#1A3A6B" />
            <rect x="149" y="159" width="4" height="4" rx="0.5" fill="#1A3A6B" />
        </svg>
    );
}

export default function TrustFilter() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="confianza"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: '#FAFAF8' }}
            aria-label="Sin importar quién esté detrás del mostrador — confianza verificada"
        >
            {/* Washi tape top */}
            <div
                className="absolute top-0 left-0 right-0 h-3 pointer-events-none"
                style={{
                    background: 'repeating-linear-gradient(90deg, #2E86DE 0px, #2E86DE 20px, #54A0FF 20px, #54A0FF 40px, #74B9FF 40px, #74B9FF 60px, #2E86DE 60px)',
                    opacity: 0.3,
                }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT: Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        aria-hidden="true"
                    >
                        <FileteadoFrame>
                            <div className="h-48">
                                <HandCollageSVG />
                            </div>
                        </FileteadoFrame>

                        {/* Floating sticker badges */}
                        <div className="flex flex-wrap gap-2 mt-4 pl-2">
                            {['Verificado ✓', 'Comunidad Real', 'Sin Intermediarios'].map((label, i) => (
                                <motion.span
                                    key={label}
                                    initial={{ opacity: 0, rotate: -4, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, rotate: i % 2 === 0 ? -2 : 2, scale: 1 } : {}}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                    className="px-3 py-1.5 rounded-full text-xs font-bold"
                                    style={{
                                        background: i === 1 ? '#E6A817' : '#2E86DE',
                                        color: 'white',
                                        boxShadow: '0 3px 10px rgba(0,0,0,0.12)',
                                        transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                                    }}
                                >
                                    {label}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT: Copy + badges */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <span
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase"
                            style={{ background: 'rgba(91,140,62,0.12)', color: '#3A7D2C', border: '1px solid rgba(91,140,62,0.25)' }}
                        >
                            <ShieldCheck size={10} />
                            Confianza Verificada
                        </span>

                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5" style={{ color: '#0F1923' }}>
                            Sin importar quién{' '}
                            <span style={{ color: '#2E86DE' }}>esté detrás<br />del Mostrador.</span>
                        </h2>

                        <p className="text-[#3D4F63] text-lg leading-relaxed mb-6">
                            No importa si es un garage en Jujuy o un local en Palermo;{' '}
                            <strong className="text-[#0F1923]">si tiene el QR de GuiArg, es confianza pura</strong>.
                            Nosotros nos encargamos de que cada miembro cumpla los requisitos,
                            para que vos solo te preocupes de elegir lo que te gusta.
                        </p>

                        <p
                            className="text-base font-semibold mb-8 px-4 py-3 rounded-xl"
                            style={{ background: 'rgba(46,134,222,0.07)', color: '#1A5FAD', borderLeft: '3px solid #2E86DE' }}
                        >
                            "Comprale al país, comprale a tu par."
                        </p>

                        {/* Verified members mini list */}
                        <div className="grid sm:grid-cols-2 gap-3">
                            {verifiedMembers.map((m, i) => (
                                <motion.div
                                    key={m.name}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.07 }}
                                >
                                    <VerifiedBadge {...m} />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                            className="mt-6"
                        >
                            <a
                                href="#beneficios"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                                style={{ color: '#2E86DE' }}
                            >
                                Ver todos los miembros verificados
                                <ChevronRight size={14} />
                            </a>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
