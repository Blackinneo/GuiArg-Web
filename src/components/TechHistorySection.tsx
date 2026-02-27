'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const milestones = [
    {
        year: '2020',
        event: 'La Idea',
        desc: 'Nace la visión de conectar comercios locales con tecnología accesible.',
        icon: '💡',
        color: '#2E86DE',
    },
    {
        year: '2022',
        event: 'Primer QR',
        desc: 'Lanzamos el primer código QR en un comercio de Buenos Aires.',
        icon: '📱',
        color: '#54A0FF',
    },
    {
        year: '2023',
        event: 'Next.js & Supabase',
        desc: 'Migramos a stack moderno: Next.js 15, Supabase y Cloudflare Workers.',
        icon: '⚡',
        color: '#74B9FF',
    },
    {
        year: '2024',
        event: 'Gemini AI',
        desc: 'Integramos Google Gemini para sugerencias inteligentes y categorización automática.',
        icon: '🤖',
        color: '#E6A817',
    },
    {
        year: '2025',
        event: 'Antigravity',
        desc: 'Desarrollado con Antigravity AI — el futuro de la experiencia de producto.',
        icon: '🚀',
        color: '#F9CA24',
    },
];

const techStack = [
    { name: 'Next.js 15', badge: 'Frontend', color: '#2E86DE' },
    { name: 'Supabase', badge: 'Backend', color: '#3ECF8E' },
    { name: 'Cloudflare', badge: 'Edge', color: '#F38020' },
    { name: 'Gemini AI', badge: 'IA', color: '#4285F4' },
    { name: 'Antigravity', badge: 'Dev', color: '#E6A817' },
    { name: 'TypeScript', badge: 'Lenguaje', color: '#3178C6' },
];

export default function TechHistorySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="history"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            aria-label="Historia y tecnología de GuiArg"
        >
            {/* BG accent */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(230,168,23,0.06) 0%, transparent 70%)' }} />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="section-label mb-5 inline-flex">
                        Historia & Tech
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            Del barrio al<br />
                            <span className="gradient-text-gold">futuro digital.</span>
                        </h2>
                        <Link
                            href="/history"
                            className="btn-secondary self-start md:self-auto"
                            aria-label="Explorar historia técnica de GuiArg"
                        >
                            Explorar Historia Tech
                            <ExternalLink size={12} />
                        </Link>
                    </div>
                </motion.div>

                {/* Timeline — horizontal desktop / vertical mobile */}
                <div className="relative mb-16">
                    {/* Desktop: horizontal line */}
                    <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" aria-hidden="true" />

                    <div className="grid md:grid-cols-5 gap-6">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={m.year}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.12 + 0.2, duration: 0.6 }}
                                className="relative flex flex-col items-center text-center md:items-center"
                            >
                                {/* Node dot */}
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs mb-4 relative z-10"
                                    style={{ background: `${m.color}22`, border: `2px solid ${m.color}60` }}
                                >
                                    <div className="w-3 h-3 rounded-full" style={{ background: m.color }} />
                                </div>

                                {/* Mobile: vertical line */}
                                {i < milestones.length - 1 && (
                                    <div className="md:hidden w-px h-4 bg-blue-500/20 mb-1" aria-hidden="true" />
                                )}

                                <div className="glass rounded-2xl p-4 w-full text-left">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg" aria-hidden="true">{m.icon}</span>
                                        <span
                                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                                            style={{ background: `${m.color}20`, color: m.color }}
                                        >
                                            {m.year}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-white mb-1">{m.event}</p>
                                    <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Tech stack pills */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <p className="text-sm text-gray-400 mb-4 font-medium">Tecnologías que potencian GuiArg:</p>
                    <div className="flex flex-wrap gap-3">
                        {techStack.map((tech) => (
                            <div
                                key={tech.name}
                                className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 cursor-default hover:border-white/20 transition-colors"
                            >
                                <div className="w-2 h-2 rounded-full" style={{ background: tech.color }} aria-hidden="true" />
                                <span className="text-sm font-semibold text-white">{tech.name}</span>
                                <span
                                    className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                                    style={{ background: `${tech.color}18`, color: tech.color }}
                                >
                                    {tech.badge}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
