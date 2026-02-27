'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, MessageCircle, Globe2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

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

// Avatar cluster
const avatarColors = [
    '#1A5FAD', '#2E86DE', '#54A0FF', '#74B9FF',
    '#E6A817', '#F9CA24', '#1A5FAD', '#2E86DE',
];
const avatarLetters = ['M', 'J', 'A', 'R', 'L', 'F', 'V', 'G'];

function AvatarCluster() {
    const positions = [
        { x: 50, y: 50, size: 52, delay: 0 },
        { x: 120, y: 20, size: 40, delay: 0.1 },
        { x: -10, y: 20, size: 36, delay: 0.15 },
        { x: 160, y: 70, size: 44, delay: 0.2 },
        { x: -40, y: 80, size: 38, delay: 0.25 },
        { x: 80, y: 110, size: 34, delay: 0.3 },
        { x: 130, y: 110, size: 30, delay: 0.35 },
        { x: 20, y: 115, size: 30, delay: 0.4 },
    ];

    return (
        <div className="relative w-64 h-52 mx-auto" aria-hidden="true">
            {positions.map((pos, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + pos.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute flex items-center justify-center rounded-full border-2 border-[#0D1117] font-bold text-white shadow-lg"
                    style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        width: `${pos.size}px`,
                        height: `${pos.size}px`,
                        background: avatarColors[i],
                        fontSize: `${Math.max(10, pos.size * 0.32)}px`,
                    }}
                >
                    {avatarLetters[i]}
                </motion.div>
            ))}
            {/* Live badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute top-0 right-0 glass-light rounded-full px-3 py-1.5 flex items-center gap-1.5"
            >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-semibold">En vivo</span>
            </motion.div>
        </div>
    );
}

const stats = [
    { value: 500, suffix: '+', label: 'Negocios activos', icon: Globe2, color: '#2E86DE' },
    { value: 12, suffix: 'k+', label: 'Miembros activos', icon: Users, color: '#E6A817' },
    { value: 24, suffix: '', label: 'Provincias', icon: MessageCircle, color: '#54A0FF' },
    { value: 15, suffix: '%', label: 'Crecimiento mensual', icon: ChevronRight, color: '#74B9FF' },
];

export default function CommunitySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const s0 = useCounter(stats[0].value, 1800, isInView);
    const s1 = useCounter(stats[1].value, 1800, isInView);
    const s2 = useCounter(stats[2].value, 1400, isInView);
    const s3 = useCounter(stats[3].value, 1500, isInView);
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
                                            {counters[i].toLocaleString('es-AR')}
                                            <span style={{ color: stat.color }}>{stat.suffix}</span>
                                        </p>
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

                    {/* Right: Avatar cluster */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                        aria-hidden="true"
                    >
                        <div className="glass rounded-3xl p-10 relative overflow-hidden">
                            <p className="text-center text-sm text-gray-400 mb-6 tracking-wide">
                                Se unieron recientemente
                            </p>
                            <AvatarCluster />
                            <p className="text-center text-gray-300 text-sm mt-6 font-medium">
                                +500 emprendedores conectados
                            </p>
                            {/* Decorative rings */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[320px] h-[320px] rounded-full border border-blue-500/10" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[420px] h-[420px] rounded-full border border-blue-500/5" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
