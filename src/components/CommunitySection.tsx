'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, Globe2, TrendingUp, MessageCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import TribeAnimation from './TribeAnimation';

// Animated counter hook
function useCounter(target: number, duration: number, active: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration, active]);
    return count;
}

const stats = [
    { value: 650, suffix: 'k', label: 'PyMEs en Argentina', icon: Globe2, color: '#2E86DE', source: 'INDEC' },
    { value: 46, suffix: 'M', label: 'Habitantes', icon: Users, color: '#E6A817', source: 'INDEC 2025' },
    { value: 25, suffix: '%', label: 'Inflación 2026 (proyectada)', icon: TrendingUp, color: '#54A0FF', source: 'Ministerio de Economía' },
    { value: 5.5, suffix: '%', label: 'Crecimiento del PBI 2026', icon: MessageCircle, color: '#74B9FF', source: 'FMI / CEPAL' },
];

export default function CommunitySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const s0 = useCounter(stats[0].value, 1800, isInView);
    const s1 = useCounter(stats[1].value, 1800, isInView);
    const s2 = useCounter(stats[2].value, 1400, isInView);
    const s3 = useCounter(Math.round(stats[3].value * 10), 1500, isInView);
    const counters = [s0, s1, s2, s3];

    return (
        <section
            id="community"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            aria-label="Nuestra comunidad GuiArg"
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(46,134,222,0.07) 0%, transparent 70%)' }} />
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Copy + Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="section-label mb-5 inline-flex">
                            <Users size={10} />
                            Nuestra Comunidad
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
                            Donde el crecimiento<br />
                            <span className="gradient-text-blue">encuentra la tribu.</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Una red exclusiva donde emprendedores argentinos se conectan, aprenden y crecen juntos. Más que tecnología — una comunidad con propósito.
                        </p>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {stats.map((stat, i) => {
                                const Icon = stat.icon;
                                const displayValue = i === 3
                                    ? (counters[i] / 10).toFixed(1)
                                    : counters[i].toLocaleString('es-AR');
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                                        className="glass rounded-2xl p-4"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon size={14} style={{ color: stat.color }} />
                                            <span className="text-xs text-gray-400">{stat.label}</span>
                                        </div>
                                        <p className="text-2xl font-black text-white">
                                            {displayValue}
                                            <span style={{ color: stat.color }}>{stat.suffix}</span>
                                        </p>
                                        <p className="text-[10px] text-gray-600 mt-1">{stat.source}</p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <Link
                            href="/community"
                            className="btn-primary"
                            aria-label="Unirse a la comunidad GuiArg"
                        >
                            <Users size={16} />
                            Unirse a la Comunidad
                            <ChevronRight size={14} />
                        </Link>
                    </motion.div>

                    {/* Right: Tribe Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="glass rounded-3xl p-6 relative overflow-hidden" style={{ minHeight: '360px' }}>
                            {/* Decorative rings */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                                <div className="w-[320px] h-[220px] rounded-full border border-blue-500/10" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                                <div className="w-[420px] h-[300px] rounded-full border border-blue-500/5" />
                            </div>

                            {/* Animation */}
                            <TribeAnimation />

                            {/* Footer text */}
                            <p className="absolute bottom-5 left-0 right-0 text-center text-gray-300 text-sm font-semibold px-4">
                                Nuevos Negocios y Emprendimientos cada Segundo
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
