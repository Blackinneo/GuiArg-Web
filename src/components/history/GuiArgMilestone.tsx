'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Shield, Link2, QrCode } from 'lucide-react';

const techPillars = [
    {
        icon: QrCode,
        title: 'QR Phygital Seguro',
        desc: 'Cada negocio recibe un ID único enmarcado en Fileteado Porteño dorado. Al escanearlo accedés a un perfil verificado y seguro, sin redireccionamientos maliciosos.',
        color: '#2E86DE',
        tag: 'Phygital Security',
    },
    {
        icon: Link2,
        title: 'Hub Centralizado',
        desc: 'Desde previews de YouTube hasta alias de pago directo, centralizamos todo en tu perfil de alta performance. Un link que lo tiene todo: horarios, fotos, redes, y más.',
        color: '#E6A817',
        tag: 'All-in-One Profile',
    },
    {
        icon: Shield,
        title: '100% Legal & Encriptado',
        desc: 'Cumplimos con los estándares de ARCA (ex-AFIP) y protegemos los datos con la encriptación militar de Supabase. Transparencia total, sin letra chica.',
        color: '#5B8C3E',
        tag: 'Legal & Secure',
    },
];

const techStack = [
    { name: 'Next.js 15', role: 'Web Framework', color: '#0F1923' },
    { name: 'Supabase', role: 'DB & Auth', color: '#3ECF8E' },
    { name: 'Gemini AI', role: 'Intelligence', color: '#2E86DE' },
    { name: 'Vercel', role: 'Deploy', color: '#000000' },
];

export default function GuiArgMilestone() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="guiarg-tech"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: '#0A1628' }}
            aria-label="GuiArg: el próximo hito de la innovación argentina"
        >
            {/* Grid pattern */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(46,134,222,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(46,134,222,0.06) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
                aria-hidden="true"
            />

            {/* Gold ambient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(230,168,23,0.08) 0%, transparent 60%)' }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    {/* Year badge */}
                    <span
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black mb-5 tracking-widest uppercase"
                        style={{ background: 'rgba(230,168,23,0.15)', color: '#E6A817', border: '1px solid rgba(230,168,23,0.35)' }}
                    >
                        ⭐ 2026
                    </span>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
                        GuiArg:{' '}
                        <span style={{ color: '#E6A817' }}>El Próximo Hito.</span>
                    </h2>

                    <p className="text-[#90AED2] text-lg max-w-2xl mx-auto leading-relaxed">
                        GuiArg se para en los hombros de estos gigantes. Usamos{' '}
                        <strong className="text-white">Next.js 15, Supabase y Gemini AI</strong>
                        {' '}para crear un ecosistema hiper-local que ayuda a la República digitalizando la vereda y formalizando la confianza del barrio.
                    </p>
                </motion.div>

                {/* ── Tech stack pills ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-3 mb-14"
                >
                    {techStack.map((t) => (
                        <div
                            key={t.name}
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.color || '#fff' }} aria-hidden="true" />
                            <span className="text-white font-bold text-xs">{t.name}</span>
                            <span className="text-[#5A7FA8] text-xs">{t.role}</span>
                        </div>
                    ))}
                </motion.div>

                {/* ── Tech pillars ── */}
                <div className="grid md:grid-cols-3 gap-5 mb-14">
                    {techPillars.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                                className="relative rounded-2xl p-6 overflow-hidden"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: `1.5px solid ${p.color}30`,
                                    backdropFilter: 'blur(8px)',
                                }}
                            >
                                {/* Color left bar */}
                                <div
                                    className="absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl"
                                    style={{ background: p.color }}
                                    aria-hidden="true"
                                />

                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                    style={{ background: `${p.color}20` }}
                                >
                                    <Icon size={22} style={{ color: p.color }} />
                                </div>

                                {/* Tag */}
                                <span
                                    className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 tracking-widest uppercase"
                                    style={{ background: `${p.color}20`, color: p.color }}
                                >
                                    {p.tag}
                                </span>

                                <p className="font-black text-white text-base mb-2">{p.title}</p>
                                <p className="text-sm text-[#5A7FA8] leading-relaxed">{p.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Fileteado ornament + CTA ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="relative rounded-3xl p-8 md:p-12 text-center overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(46,134,222,0.12), rgba(230,168,23,0.08))',
                        border: '1.5px solid rgba(230,168,23,0.2)',
                    }}
                >
                    {/* Corner Fileteado accents */}
                    {[
                        { top: 0, left: 0, rotate: '0deg' },
                        { top: 0, right: 0, rotate: '90deg' },
                        { bottom: 0, right: 0, rotate: '180deg' },
                        { bottom: 0, left: 0, rotate: '270deg' },
                    ].map((pos, i) => (
                        <svg
                            key={i}
                            width="40" height="40"
                            viewBox="0 0 40 40"
                            className="absolute pointer-events-none"
                            style={{ ...pos as any, transform: `rotate(${(pos as any).rotate})`, opacity: 0.4 }}
                            aria-hidden="true"
                        >
                            <path d="M0 0 Q20 0 20 20" stroke="#E6A817" strokeWidth="2" fill="none" />
                            <path d="M0 0 Q0 20 20 20" stroke="#E6A817" strokeWidth="1" fill="none" opacity="0.5" />
                            <circle cx="20" cy="20" r="3" fill="#E6A817" />
                        </svg>
                    ))}

                    <p className="text-[#90AED2] text-sm mb-2 font-semibold tracking-widest uppercase">Sé parte de la historia</p>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                        Sumate a la{' '}
                        <span style={{ color: '#E6A817' }}>Historia.</span>
                    </h3>
                    <p className="text-[#90AED2] mb-8 max-w-md mx-auto">
                        Cada barrio que digitalizamos, cada comercio que verificamos, es un eslabón más en la cadena de la genialidad argentina.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        <a
                            href="/business"
                            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-black text-sm text-white"
                            style={{
                                background: 'linear-gradient(135deg, #1A5FAD, #2E86DE)',
                                boxShadow: '0 6px 28px rgba(46,134,222,0.4)',
                                minHeight: '48px',
                            }}
                            aria-label="Sumar mi negocio a GuiArg"
                        >
                            Sumar mi Negocio
                            <ArrowRight size={14} />
                        </a>
                        <a
                            href="/community"
                            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm"
                            style={{
                                background: 'rgba(255,255,255,0.07)',
                                color: 'white',
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                minHeight: '48px',
                            }}
                            aria-label="Conocer la comunidad GuiArg"
                        >
                            Conocer la Comunidad
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
