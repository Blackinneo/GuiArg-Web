'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BarChart2, MapPin, CreditCard, Star, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';

// Dashboard mockup SVG-based
function DashboardMockup() {
    return (
        <div className="relative w-full h-full" aria-hidden="true">
            {/* Main card */}
            <div className="glass rounded-2xl p-5 h-full flex flex-col gap-4">
                {/* Header bar */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Panel de Negocio</p>
                        <p className="text-sm font-bold text-white">Café del Sol</p>
                    </div>
                    <div className="flex items-center gap-1.5 glass-light rounded-full px-3 py-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-green-400 font-medium">Activo</span>
                    </div>
                </div>

                {/* Mini chart */}
                <div className="rounded-xl bg-white/4 p-3 border border-white/8">
                    <div className="flex items-end gap-1 h-16 mb-2">
                        {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                                className="flex-1 rounded-t-sm"
                                style={{
                                    height: `${h}%`,
                                    background: i === 5 ? 'linear-gradient(180deg, #54A0FF, #2E86DE)' : 'rgba(46,134,222,0.25)',
                                    transformOrigin: 'bottom',
                                }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs text-gray-500">L</span>
                        <span className="text-xs text-gray-500">M</span>
                        <span className="text-xs text-gray-500">X</span>
                        <span className="text-xs text-gray-500">J</span>
                        <span className="text-xs text-gray-500">V</span>
                        <span className="text-xs text-blue-400 font-semibold">S</span>
                        <span className="text-xs text-gray-500">D</span>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="glass-light rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                            <BarChart2 size={10} className="text-blue-400" />
                            <span className="text-xs text-gray-400">Scans</span>
                        </div>
                        <p className="text-lg font-black text-white">5,240</p>
                        <p className="text-xs text-green-400">+12.4% ↑</p>
                    </div>
                    <div className="glass-amber rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Star size={10} className="text-amber-400" />
                            <span className="text-xs text-gray-400">Rating</span>
                        </div>
                        <p className="text-lg font-black text-white">4.9</p>
                        <p className="text-xs text-amber-400">12 reseñas</p>
                    </div>
                </div>

                {/* Payment info preview */}
                <div className="glass rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(46,134,222,0.2)' }}>
                        <CreditCard size={14} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-400">Medios de pago</p>
                        <p className="text-sm font-semibold text-white">Efectivo · QR · Tarjeta</p>
                    </div>
                    <div className="text-green-400">
                        <Zap size={12} />
                    </div>
                </div>

                {/* Map stub */}
                <div className="rounded-xl overflow-hidden border border-white/10 relative h-16">
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,17,23,0.9), rgba(22,27,34,0.8))' }} />
                    <div className="absolute inset-0 grid-pattern opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                        <MapPin size={12} className="text-blue-400" />
                        <span className="text-xs text-gray-300 font-medium">Palermo, Buenos Aires</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const features = [
    { icon: BarChart2, label: 'Analítica en tiempo real', color: '#2E86DE' },
    { icon: MapPin, label: 'Integración con mapas', color: '#E6A817' },
    { icon: CreditCard, label: 'Gestión de pagos', color: '#54A0FF' },
    { icon: Star, label: 'Sistema de reseñas', color: '#74B9FF' },
];

export default function BusinessSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="business"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            aria-label="Impulsa tu negocio con GuiArg"
        >
            {/* BG */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 60%, rgba(46,134,222,0.07) 0%, transparent 70%)' }} />

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="h-[380px] lg:h-[420px]"
                        aria-hidden="true"
                    >
                        <DashboardMockup />
                    </motion.div>

                    {/* Right: Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <span className="section-label mb-5 inline-flex">
                            <Zap size={10} />
                            Para dueños de negocios
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
                            Impulsá tu negocio{' '}
                            <span className="gradient-text-gold">desde el primer escaneo.</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Perfiles digitales que convierten escaneos físicos en clientes leales. Panel intuitivo con analítica que realmente entendés.
                        </p>

                        {/* Feature list */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {features.map((feat, i) => {
                                const Icon = feat.icon;
                                return (
                                    <motion.div
                                        key={feat.label}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.3 + i * 0.08 }}
                                        className="flex items-center gap-3 glass rounded-xl p-3 cursor-default hover:border-blue-500/30 transition-colors"
                                    >
                                        <Icon size={16} style={{ color: feat.color }} className="flex-shrink-0" />
                                        <span className="text-sm text-gray-300">{feat.label}</span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Scalability badge */}
                        <div className="glass-light rounded-2xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(46,134,222,0.2)' }}>
                                    <Zap size={14} className="text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white mb-1">Escalabilidad Federal</p>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Desde un kiosco barrial hasta una red de sucursales en todo el país. GuiArg crece con vos.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/business"
                            className="btn-primary"
                            aria-label="Comenzar con GuiArg para negocios"
                        >
                            Comenzar Hoy
                            <ChevronRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
