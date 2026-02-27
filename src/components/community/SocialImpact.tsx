'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';

/* ── Sol Dorado icon ──────────────────────────────────────── */
function SolDorado({ size = 20, filled = false }: { size?: number; filled?: boolean }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="5" fill={filled ? '#E6A817' : 'none'} stroke="#E6A817" strokeWidth="1.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
                const rad = (a * Math.PI) / 180;
                return (
                    <line key={i}
                        x1={12 + 7 * Math.cos(rad)} y1={12 + 7 * Math.sin(rad)}
                        x2={12 + 9.5 * Math.cos(rad)} y2={12 + 9.5 * Math.sin(rad)}
                        stroke="#E6A817" strokeWidth={filled ? 2 : 1.5} strokeLinecap="round"
                    />
                );
            })}
        </svg>
    );
}

/* ── Progress bar with fill animation ────────────────────── */
function ProgressBar({ percent, color, label, delay }: { percent: number; color: string; label: string; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const timeout = setTimeout(() => {
            const controls = animate(0, percent, {
                duration: 1.4,
                ease: 'easeOut',
                onUpdate: (v) => setWidth(Math.round(v)),
            });
            return () => controls.stop();
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [isInView, percent, delay]);

    return (
        <div ref={ref}>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-[#3D4F63]">{label}</span>
                <span className="text-sm font-bold" style={{ color }}>{width}%</span>
            </div>
            <div
                className="h-2.5 w-full rounded-full overflow-hidden"
                style={{ background: `${color}18` }}
                role="progressbar"
                aria-valuenow={width}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={label}
            >
                <motion.div
                    className="h-full rounded-full"
                    style={{
                        width: `${width}%`,
                        background: `linear-gradient(90deg, ${color}99, ${color})`,
                        transition: 'width 0.05s linear',
                    }}
                />
            </div>
        </div>
    );
}

/* ── Glassmorphic perk card ───────────────────────────────── */
interface PerkCardProps {
    tier: string;
    label: string;
    points: number;
    maxPoints: number;
    reward: string;
    color: string;
    solFilled: number;
    delay: number;
}

function PerkCard({ tier, label, points, maxPoints, reward, color, solFilled, delay }: PerkCardProps) {
    const pct = Math.round((points / maxPoints) * 100);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `1px solid ${color}25`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.07), 0 1px 4px ${color}20`,
            }}
        >
            {/* Top band */}
            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }} aria-hidden="true" />

            <div className="p-5">
                {/* Tier badge */}
                <div className="flex items-center justify-between mb-3">
                    <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full tracking-widest uppercase"
                        style={{ background: `${color}15`, color }}
                    >
                        {tier}
                    </span>
                    {/* Sol Dorado icons */}
                    <div className="flex gap-1" aria-label={`${solFilled} soles ganados`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SolDorado key={i} size={16} filled={i < solFilled} />
                        ))}
                    </div>
                </div>

                <p className="font-bold text-[#0F1923] text-base mb-1">{label}</p>
                <p className="text-xs text-[#8DA4BF] mb-4">{reward}</p>

                {/* Progress */}
                <ProgressBar percent={pct} color={color} label={`${points.toLocaleString()} / ${maxPoints.toLocaleString()} puntos`} delay={delay + 0.2} />
            </div>
        </motion.div>
    );
}

const perkCards: PerkCardProps[] = [
    { tier: 'Bronce', label: 'Primer Escaneo', points: 320, maxPoints: 500, reward: '5% desc. en próxima compra', color: '#CD7F32', solFilled: 2, delay: 0 },
    { tier: 'Plata', label: 'Vecino Activo', points: 1200, maxPoints: 2000, reward: 'Orden de compra $2.000', color: '#8B9BA8', solFilled: 3, delay: 0.1 },
    { tier: 'Oro', label: 'Guardián del Barrio', points: 4800, maxPoints: 5000, reward: 'Sorteo mensual + Merchandising', color: '#E6A817', solFilled: 5, delay: 0.2 },
    { tier: 'Campeón', label: 'Héroe Federal', points: 9200, maxPoints: 10000, reward: 'Acceso VIP + Programa Asistente ONG', color: '#2E86DE', solFilled: 5, delay: 0.3 },
];

export default function ClientPerks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="beneficios"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #EBF4FF 0%, #FAFAF8 100%)' }}
            aria-label="Tu fidelidad es oro — puntos y beneficios GuiArg"
        >
            {/* Subtle radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(230,168,23,0.07) 0%, transparent 70%)' }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <span
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase"
                                style={{ background: 'rgba(230,168,23,0.12)', color: '#B8860B', border: '1px solid rgba(230,168,23,0.3)' }}
                            >
                                <Star size={10} />
                                Programa de Afiliados
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: '#0F1923' }}>
                                Tu Fidelidad es Oro{' '}
                                <span style={{ color: '#E6A817' }}>(Literal).</span>
                            </h2>
                        </div>
                        <p className="text-[#3D4F63] text-base max-w-sm leading-relaxed">
                            No son promesas: son órdenes de compra reales, regalos exclusivos y descuentos que duelen de lo buenos que son.
                        </p>
                    </div>
                </motion.div>

                {/* How it works: 3-step */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    {[
                        { n: '01', title: 'Escaneás', desc: 'Cada escaneo de un QR GuiArg suma puntos automáticamente.', icon: '📱' },
                        { n: '02', title: 'Acumulás', desc: 'Llegás a niveles: Bronce, Plata, Oro y Campeón Federal.', icon: '⭐' },
                        { n: '03', title: 'Cobrás', desc: 'Órdenes de compra reales, descuentos y accesos exclusivos.', icon: '🎁' },
                    ].map((step, i) => (
                        <motion.div
                            key={step.n}
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            className="relative rounded-2xl p-5 text-center"
                            style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}
                        >
                            <div className="text-3xl mb-2" aria-hidden="true">{step.icon}</div>
                            <div
                                className="inline-block text-xs font-black mb-2 px-2 py-0.5 rounded"
                                style={{ background: 'rgba(46,134,222,0.1)', color: '#2E86DE' }}
                            >
                                PASO {step.n}
                            </div>
                            <p className="font-bold text-[#0F1923] mb-1">{step.title}</p>
                            <p className="text-xs text-[#8DA4BF] leading-relaxed">{step.desc}</p>
                            {/* Arrow between cards */}
                            {i < 2 && (
                                <ChevronRight
                                    size={18}
                                    className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden md:block"
                                    style={{ color: '#2E86DE' }}
                                    aria-hidden="true"
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Perk cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {perkCards.map((card) => (
                        <PerkCard key={card.tier} {...card} />
                    ))}
                </div>

                {/* Bottom note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center text-sm text-[#8DA4BF] mt-8"
                >
                    Cada escaneo te acerca más a tu próximo beneficio.{' '}
                    <a href="#subscripcion" className="font-semibold" style={{ color: '#2E86DE' }}>
                        Empezá hoy →
                    </a>
                </motion.p>
            </div>
        </section>
    );
}
