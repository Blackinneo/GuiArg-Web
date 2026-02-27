'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Trophy, Calendar, Gem, Locate, ArrowRight } from 'lucide-react';

const tools = [
    {
        icon: Trophy,
        title: 'Sistema de Puntos',
        desc: 'Convertí cada compra en una razón para volver. Ideal para retail, gastronomía y servicios de frecuencia.',
        tags: ['Retail', 'Gastronomía'],
        color: '#E6A817',
        bg: 'rgba(230,168,23,0.08)',
        border: 'rgba(230,168,23,0.2)',
    },
    {
        icon: Calendar,
        title: 'Turnos & Agenda',
        desc: 'Gestión total para peluquerías, canchas y centros de estética. Sin solapamientos, sin llamadas perdidas.',
        tags: ['Peluquería', 'Canchas', 'Estética'],
        color: '#2E86DE',
        bg: 'rgba(46,134,222,0.08)',
        border: 'rgba(46,134,222,0.2)',
    },
    {
        icon: Gem,
        title: 'Fidelización Premium',
        desc: 'Descuentos por frecuencia, beneficios exclusivos y comunicación directa con tus clientas más leales.',
        tags: ['Manicura', 'Spa', 'Belleza'],
        color: '#6C3483',
        bg: 'rgba(108,52,131,0.08)',
        border: 'rgba(108,52,131,0.2)',
    },
    {
        icon: Locate,
        title: 'Notificaciones GeoCerca',
        desc: 'Avisá a los vecinos que caminan por tu cuadra sobre tus ofertas del día, cambios de horario o novedades.',
        tags: ['Todos los rubros'],
        color: '#5B8C3E',
        bg: 'rgba(91,140,62,0.08)',
        border: 'rgba(91,140,62,0.2)',
    },
];

/* ── Mini Dashboard preview ───────────────────────────────── */
function ToolDashboard({ tool }: { tool: typeof tools[0] }) {
    const Icon = tool.icon;
    return (
        <div
            className="rounded-xl p-4 h-24 flex items-center gap-3"
            style={{ background: tool.bg, border: `1px dashed ${tool.border}` }}
            aria-hidden="true"
        >
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${tool.color}20` }}
            >
                <Icon size={18} style={{ color: tool.color }} />
            </div>
            <div className="flex-1">
                <div className="h-2 w-24 rounded mb-1.5" style={{ background: tool.color, opacity: 0.5 }} />
                <div className="h-1.5 w-32 rounded mb-1" style={{ background: 'rgba(0,0,0,0.08)' }} />
                <div className="h-1.5 w-20 rounded" style={{ background: 'rgba(0,0,0,0.05)' }} />
            </div>
            <div
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: tool.color, color: 'white', fontSize: '10px' }}
            >
                Activo
            </div>
        </div>
    );
}

export default function LoyaltyTools() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [activeCard, setActiveCard] = useState<number | null>(null);

    return (
        <section
            id="herramientas"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #F4F6F8 0%, #FAFAF8 100%)' }}
            aria-label="Herramientas GuiArg que traen al cliente de vuelta"
        >
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ background: 'rgba(46,134,222,0.1)', color: '#1A5FAD', border: '1px solid rgba(46,134,222,0.2)' }}
                    >
                        Herramientas GuiArg
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#0F1923' }}>
                        Herramientas que traen<br />al Cliente de{' '}
                        <span style={{ color: '#2E86DE' }}>vuelta.</span>
                    </h2>
                    <p className="text-[#3D4F63] text-lg max-w-lg mx-auto">
                        Cada herramienta diseñada para la realidad argentina: simple, directa y sin tecnicismos innecesarios.
                    </p>
                </motion.div>

                {/* Tool cards grid */}
                <div className="grid md:grid-cols-2 gap-5">
                    {tools.map((tool, i) => {
                        const Icon = tool.icon;
                        const isActive = activeCard === i;
                        return (
                            <motion.div
                                key={tool.title}
                                initial={{ opacity: 0, y: 24 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                onHoverStart={() => setActiveCard(i)}
                                onHoverEnd={() => setActiveCard(null)}
                                className="group rounded-2xl p-6 cursor-default transition-all duration-300"
                                style={{
                                    background: 'white',
                                    border: isActive ? `1.5px solid ${tool.color}` : '1.5px solid rgba(0,0,0,0.07)',
                                    boxShadow: isActive
                                        ? `0 16px 48px ${tool.color}20, 0 4px 16px rgba(0,0,0,0.06)`
                                        : '0 4px 16px rgba(0,0,0,0.05)',
                                    transform: isActive ? 'translateY(-3px)' : 'none',
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                {/* Top row */}
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{
                                            background: isActive ? `${tool.color}20` : 'rgba(0,0,0,0.04)',
                                            transition: 'background 0.25s',
                                        }}
                                    >
                                        <Icon
                                            size={22}
                                            style={{ color: isActive ? tool.color : '#8DA4BF', transition: 'color 0.25s' }}
                                        />
                                    </div>
                                    <div className="flex gap-1.5 flex-wrap justify-end">
                                        {tool.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
                                                style={{
                                                    background: isActive ? `${tool.color}15` : 'rgba(0,0,0,0.05)',
                                                    color: isActive ? tool.color : '#8DA4BF',
                                                    transition: 'all 0.25s',
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="font-black text-[#0F1923] text-lg mb-2">{tool.title}</h3>
                                <p className="text-sm text-[#3D4F63] leading-relaxed mb-4">{tool.desc}</p>

                                {/* Mini dashboard preview */}
                                <ToolDashboard tool={tool} />

                                <div className="mt-4">
                                    <a
                                        href="#onboarding"
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
                                        style={{ color: isActive ? tool.color : '#8DA4BF' }}
                                        aria-label={`Activar ${tool.title} para mi negocio`}
                                    >
                                        Activar para mi negocio
                                        <ArrowRight size={11} />
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
