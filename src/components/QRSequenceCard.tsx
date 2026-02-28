'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ── Phases (each sub-state in the 8s loop) ─────────────────
   0 → scanning (0s–2.5s)
   1 → crossfade-out (2.5s–3.5s)
   2 → stars (3.5s–5.5s)
   3 → text (5.5s–7.5s)
   4 → fade-all-out (7.5s–8s) → resets to 0
──────────────────────────────────────────────────────────── */
const PHASE_DURATIONS = [2500, 1000, 2000, 2000, 500]; // ms

/* ── SVG: Smartphone + QR ──────────────────────────────── */
function SmartphoneQR({ scanY }: { scanY: number }) {
    return (
        <svg viewBox="0 0 160 200" className="w-32 h-40 drop-shadow-xl" aria-hidden="true">
            {/* Phone body */}
            <rect x="20" y="8" width="120" height="184" rx="18" fill="rgba(15,20,30,0.92)" stroke="rgba(46,134,222,0.5)" strokeWidth="2" />
            {/* Screen */}
            <rect x="30" y="28" width="100" height="140" rx="8" fill="rgba(8,14,26,0.98)" />
            {/* Notch */}
            <rect x="60" y="12" width="40" height="8" rx="4" fill="rgba(30,40,55,0.9)" />
            {/* Home indicator */}
            <rect x="65" y="178" width="30" height="4" rx="2" fill="rgba(46,134,222,0.4)" />

            {/* QR code on screen */}
            {/* Outer squares */}
            <rect x="42" y="42" width="26" height="26" rx="3" fill="rgba(46,134,222,0.15)" stroke="rgba(46,134,222,0.7)" strokeWidth="1.5" />
            <rect x="46" y="46" width="18" height="18" rx="2" fill="rgba(8,14,26,1)" />
            <rect x="50" y="50" width="10" height="10" rx="1" fill="#2E86DE" />

            <rect x="92" y="42" width="26" height="26" rx="3" fill="rgba(46,134,222,0.15)" stroke="rgba(46,134,222,0.7)" strokeWidth="1.5" />
            <rect x="96" y="46" width="18" height="18" rx="2" fill="rgba(8,14,26,1)" />
            <rect x="100" y="50" width="10" height="10" rx="1" fill="#2E86DE" />

            <rect x="42" y="92" width="26" height="26" rx="3" fill="rgba(46,134,222,0.15)" stroke="rgba(46,134,222,0.7)" strokeWidth="1.5" />
            <rect x="46" y="96" width="18" height="18" rx="2" fill="rgba(8,14,26,1)" />
            <rect x="50" y="100" width="10" height="10" rx="1" fill="#2E86DE" />

            {/* QR data dots */}
            {[72, 80, 88, 96, 104].map((x, i) =>
                [72, 80, 88].map((y, j) => (
                    <rect key={`${i}-${j}`} x={x} y={y} width="5" height="5" rx="1"
                        fill={((i + j) % 3 === 0) ? '#54A0FF' : 'rgba(46,134,222,0.3)'} />
                ))
            )}

            {/* Corner markers */}
            <line x1="30" y1="38" x2="30" y2="52" stroke="#54A0FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="30" y1="38" x2="44" y2="38" stroke="#54A0FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="130" y1="38" x2="116" y2="38" stroke="#54A0FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="130" y1="38" x2="130" y2="52" stroke="#54A0FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="30" y1="128" x2="30" y2="114" stroke="#54A0FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="30" y1="128" x2="44" y2="128" stroke="#54A0FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="130" y1="128" x2="116" y2="128" stroke="#54A0FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="130" y1="128" x2="130" y2="114" stroke="#54A0FF" strokeWidth="2.5" strokeLinecap="round" />

            {/* Scanning line */}
            <defs>
                <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#54A0FF" stopOpacity="0" />
                    <stop offset="50%" stopColor="#54A0FF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#54A0FF" stopOpacity="0" />
                </linearGradient>
            </defs>
            <rect x="30" y={scanY} width="100" height="2" rx="1" fill="url(#scanGrad)" />
            {/* Scan line glow */}
            <rect x="30" y={scanY - 1} width="100" height="4" rx="2" fill="url(#scanGrad)" opacity="0.3" />

            {/* "Escaneando" label */}
            <rect x="35" y="140" width="90" height="16" rx="4" fill="rgba(46,134,222,0.12)" />
            <text x="80" y="151" textAnchor="middle" fontSize="7.5" fill="rgba(84,160,255,0.9)"
                fontFamily="system-ui, sans-serif" fontWeight="600">
                GuiArg · Escaneando...
            </text>
        </svg>
    );
}

/* ── SVG: Star ─────────────────────────────────────────── */
function StarSVG({ color = '#E6A817', size = 48 }: { color?: string; size?: number }) {
    return (
        <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
            <defs>
                <filter id="starGlow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            <polygon
                points="24,4 29.5,18 44,18 32.5,27 37,41 24,32 11,41 15.5,27 4,18 18.5,18"
                fill={color}
                filter="url(#starGlow)"
                opacity="0.92"
            />
            <polygon
                points="24,9 28.5,20 40,20 31,27.5 34.5,39 24,32.5 13.5,39 17,27.5 8,20 19.5,20"
                fill="white"
                opacity="0.18"
            />
        </svg>
    );
}

/* ── Main Component ─────────────────────────────────────── */
export default function QRSequenceCard() {
    const [phase, setPhase] = useState(0);
    const [scanY, setScanY] = useState(38);
    const scanRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const phaseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    /* Detect reduced-motion */
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    /* Scanning line animation (runs during phase 0) */
    useEffect(() => {
        if (reducedMotion) return;
        if (phase === 0) {
            let dir = 1;
            let y = 38;
            scanRef.current = setInterval(() => {
                y += dir * 2.2;
                if (y >= 126) dir = -1;
                if (y <= 38) dir = 1;
                setScanY(y);
            }, 16);
        } else {
            if (scanRef.current) clearInterval(scanRef.current);
        }
        return () => { if (scanRef.current) clearInterval(scanRef.current); };
    }, [phase, reducedMotion]);

    /* Phase sequencer */
    useEffect(() => {
        if (reducedMotion) return;
        const advance = (currentPhase: number) => {
            const duration = PHASE_DURATIONS[currentPhase] ?? 500;
            phaseRef.current = setTimeout(() => {
                const next = (currentPhase + 1) % PHASE_DURATIONS.length;
                setPhase(next);
                advance(next);
            }, duration);
        };
        advance(phase);
        return () => { if (phaseRef.current) clearTimeout(phaseRef.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reducedMotion]);

    const showScanning = phase === 0;
    const showStars = phase === 2 || phase === 3;
    const showText = phase === 3;
    const allVisible = phase !== 4;

    const STAR_COLORS = ['#E6A817', '#F9CA24', '#FFD700'];
    const STAR_DELAYS = [0, 0.22, 0.44];

    return (
        <div className="relative overflow-hidden rounded-3xl min-h-[320px] flex flex-col justify-between">
            {/* Background image */}
            <Image
                src="/QRHeroSection.avif"
                alt="QR GuiArg background"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority
            />

            {/* Dark overlay — 72% opacity for readability */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.80) 100%)' }}
                aria-hidden="true"
            />

            {/* Blue accent glow at bottom */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(46,134,222,0.12), transparent)' }}
                aria-hidden="true"
            />

            {/* ── Content ── */}
            <div className="relative z-10 p-8 flex flex-col h-full min-h-[320px]">
                {/* Static header text */}
                <div className="mb-4">
                    <p className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
                        Escaneá. Descubrí.{' '}
                        <span className="gradient-text-blue">Sostené.</span>
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                        Busca el QR fijado en tu barrio y transformá cada compra en un acto comunitario.
                    </p>
                </div>

                {/* Animation stage */}
                <div className="flex-1 flex items-center justify-center relative">
                    <AnimatePresence mode="sync">
                        {/* Phase 0–1: Smartphone scanning */}
                        {(showScanning || phase === 1) && (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0, scale: 0.88 }}
                                animate={showScanning
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0, scale: 0.84 }}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute flex flex-col items-center gap-3"
                            >
                                <SmartphoneQR scanY={reducedMotion ? 82 : scanY} />
                                <span className="text-[11px] text-blue-400/80 font-medium tracking-widest uppercase">
                                    Escaneando QR…
                                </span>
                            </motion.div>
                        )}

                        {/* Phase 2–3: Stars */}
                        {showStars && allVisible && (
                            <motion.div
                                key="stars"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute flex flex-col items-center gap-4"
                            >
                                <div className="flex items-end gap-3">
                                    {STAR_COLORS.map((color, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.5, y: 12 }}
                                            animate={{ opacity: 1, scale: i === 1 ? 1.25 : 1, y: 0 }}
                                            transition={{
                                                delay: STAR_DELAYS[i],
                                                duration: 0.55,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        >
                                            <StarSVG color={color} size={i === 1 ? 58 : 44} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Phase 3: Benefit text */}
                                <AnimatePresence>
                                    {showText && (
                                        <motion.div
                                            key="benefit-text"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 6 }}
                                            transition={{ duration: 0.6, ease: 'easeOut' }}
                                            className="text-center"
                                        >
                                            <p className="text-white font-black text-lg leading-tight drop-shadow-lg">
                                                Menos Esfuerzo,
                                            </p>
                                            <p className="font-black text-lg leading-tight"
                                                style={{ background: 'linear-gradient(90deg, #E6A817, #F9CA24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                                Más Beneficios
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {/* Phase 4: global fade-out (empty) */}
                        {phase === 4 && (
                            <motion.div
                                key="fadeout"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 0.45 }}
                                className="absolute inset-0"
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
