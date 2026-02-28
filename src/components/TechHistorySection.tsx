'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Mic, MapPin, UserPlus, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const journey = [
    {
        step: 'Entrevista',
        desc: 'Conocemos tu negocio en profundidad. Escuchamos tu historia, tus metas y los desafíos que querés superar.',
        icon: Mic,
        color: '#2E86DE',
        glow: 'rgba(46,134,222,0.18)',
    },
    {
        step: 'Posicionamiento en Google Maps',
        desc: 'Te ubicamos en el mapa. Optimizamos tu ficha para que los clientes locales te encuentren primero.',
        icon: MapPin,
        color: '#54A0FF',
        glow: 'rgba(84,160,255,0.18)',
    },
    {
        step: 'Creación de Perfil en GuiArg',
        desc: 'Armamos tu perfil digital profesional dentro de la red GuiArg con toda la información de tu emprendimiento.',
        icon: UserPlus,
        color: '#74B9FF',
        glow: 'rgba(116,185,255,0.18)',
    },
    {
        step: 'Implementación de Nuevas Tecnologías',
        desc: 'Sumamos herramientas digitales a tu negocio: QR, links de pago, reservas online y mucho más.',
        icon: Zap,
        color: '#E6A817',
        glow: 'rgba(230,168,23,0.18)',
    },
    {
        step: 'Expansión de tu Negocio',
        desc: 'Tu marca crece. Llegás a más clientes, fidelizás los que ya tenés y escalás con la comunidad GuiArg.',
        icon: TrendingUp,
        color: '#F9CA24',
        glow: 'rgba(249,202,36,0.18)',
    },
];

export default function TechHistorySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="history"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            aria-label="El camino del emprendedor con GuiArg"
        >
            {/* BG accent */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(230,168,23,0.06) 0%, transparent 70%)' }} />
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="section-label mb-5 inline-flex">
                        Tu Camino Digital
                    </span>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            Del barrio al<br />
                            <span className="gradient-text-gold">futuro digital.</span>
                        </h2>
                        <Link
                            href="/about"
                            className="btn-secondary self-start md:self-auto"
                            aria-label="Conocer más sobre GuiArg"
                        >
                            Conocer más
                            <ExternalLink size={12} />
                        </Link>
                    </div>
                </motion.div>

                {/* Journey Timeline */}
                <div className="relative">
                    {/* Desktop: horizontal connector line */}
                    <div
                        className="hidden md:block absolute top-[2.75rem] left-[calc(10%+1rem)] right-[calc(10%+1rem)] h-0.5 pointer-events-none"
                        aria-hidden="true"
                        style={{
                            background: 'linear-gradient(90deg, #2E86DE 0%, #54A0FF 25%, #74B9FF 50%, #E6A817 75%, #F9CA24 100%)',
                            opacity: 0.4,
                        }}
                    />

                    {/* Mobile: vertical connector line */}
                    <div
                        className="md:hidden absolute left-[1.15rem] top-8 bottom-8 w-0.5 pointer-events-none"
                        aria-hidden="true"
                        style={{
                            background: 'linear-gradient(180deg, #2E86DE 0%, #54A0FF 25%, #74B9FF 50%, #E6A817 75%, #F9CA24 100%)',
                            opacity: 0.4,
                        }}
                    />

                    {/* Steps */}
                    <div className="grid md:grid-cols-5 gap-6 md:gap-4">
                        {journey.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: i * 0.14 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center pl-10 md:pl-0"
                                >
                                    {/* Node */}
                                    <div
                                        className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                                                   md:mb-5 absolute-left md:static left-0"
                                        style={{
                                            background: item.glow,
                                            border: `2px solid ${item.color}60`,
                                            boxShadow: `0 0 16px ${item.color}30`,
                                        }}
                                        aria-hidden="true"
                                    >
                                        <Icon size={18} style={{ color: item.color }} />
                                    </div>

                                    {/* Card */}
                                    <div className="glass rounded-2xl p-4 w-full md:mt-5">
                                        <p
                                            className="text-sm font-bold mb-2 leading-snug"
                                            style={{ color: item.color }}
                                        >
                                            {item.step}
                                        </p>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
