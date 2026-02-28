'use client';

import { motion, type Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Scan, ShieldCheck, TrendingUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import QRSequenceCard from './QRSequenceCard';



const featureItems = [
    {
        icon: Scan,
        label: 'QR Inteligente',
        desc: 'Cada escaneo conecta a tu cliente directamente con tu negocio digital,',
        color: 'rgba(46,134,222,0.15)',
        borderColor: 'rgba(46,134,222,0.25)',
        iconColor: '#54A0FF',
    },
    {
        icon: ShieldCheck,
        label: 'Negocios Verificados',
        desc: 'Sello de autenticidad y transparencia para cada comercio de la red.',
        color: 'rgba(230,168,23,0.1)',
        borderColor: 'rgba(230,168,23,0.25)',
        iconColor: '#E6A817',
    },
    {
        icon: TrendingUp,
        label: 'Impacto Real',
        desc: 'Métricas en tiempo real para medir el verdadero impacto de tu negocio.',
        color: 'rgba(46,134,222,0.08)',
        borderColor: 'rgba(46,134,222,0.2)',
        iconColor: '#74B9FF',
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="about"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            aria-label="¿Qué es GuiArg?"
        >
            {/* background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(46,134,222,0.06) 0%, transparent 70%)' }} />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="section-label mb-5 inline-flex">¿Qué es GuiArg?</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                        Donde el barrio <span className="gradient-text-blue">se hace red</span>
                    </h2>
                    <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
                        Conectando historias auténticas con tecnología simple. Un puente entre los emprendedores argentinos y sus clientes locales.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left: QR Sequence Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <QRSequenceCard />
                    </motion.div>

                    {/* Right: Feature cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="flex flex-col gap-4"
                    >
                        {featureItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.label}
                                    variants={cardVariants}
                                    className="glass rounded-2xl p-5 flex items-start gap-4 group cursor-default hover:border-blue-500/30 transition-colors duration-200"
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                                        style={{ background: item.color, border: `1px solid ${item.borderColor}` }}
                                    >
                                        <Icon size={18} style={{ color: item.iconColor }} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white mb-1">{item.label}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                        <motion.div variants={cardVariants}>
                            <Link
                                href="/about"
                                className="btn-secondary inline-flex w-full justify-center mt-1"
                                aria-label="Conocer más sobre GuiArg"
                            >
                                Conocer más
                                <ChevronRight size={14} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
