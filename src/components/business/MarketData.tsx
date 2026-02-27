'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

/* ── Count-up hook ────────────────────────────────────────── */
function useCountUp(target: number, duration: number, start: boolean) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        const controls = animate(0, target, {
            duration,
            ease: 'easeOut',
            onUpdate: (v) => setValue(Math.round(v)),
        });
        return () => controls.stop();
    }, [start, target, duration]);
    return value;
}

/* ── Stat card with count-up ──────────────────────────────── */
function StatCard({
    value, suffix, label, source, color, delay, isInView,
}: {
    value: number; suffix: string; label: string; source: string; color: string; delay: number; isInView: boolean;
}) {
    const [started, setStarted] = useState(false);
    const count = useCountUp(value, 1.6, started);

    useEffect(() => {
        if (isInView) {
            const t = setTimeout(() => setStarted(true), delay * 1000);
            return () => clearTimeout(t);
        }
    }, [isInView, delay]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.6 }}
            className="relative rounded-2xl p-6 text-center overflow-hidden"
            style={{
                background: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
                border: '1px solid rgba(0,0,0,0.06)',
            }}
        >
            {/* Color top band */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: color }} aria-hidden="true" />
            <p
                className="text-5xl font-black mb-2 leading-none"
                style={{ color }}
            >
                {count}{suffix}
            </p>
            <p className="font-semibold text-[#0F1923] text-sm mb-1">{label}</p>
            <p className="text-[10px] text-[#8DA4BF] tracking-wide">{source}</p>
        </motion.div>
    );
}

/* ── Bar Chart — Trad. vs GuiArg ──────────────────────────── */
function SalesBarChart({ isInView }: { isInView: boolean }) {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    const tradData = [55, 48, 52, 46, 50, 44];
    const guiargData = [55, 65, 78, 88, 95, 110];
    const maxVal = 120;

    return (
        <div
            className="rounded-2xl p-6"
            style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)' }}
        >
            <div className="flex items-center justify-between mb-5">
                <div>
                    <p className="font-bold text-[#0F1923] text-sm">Ventas Mensuales Indexadas</p>
                    <p className="text-xs text-[#8DA4BF]">Base 100 = Enero · Proyección GuiArg</p>
                </div>
                <div className="flex gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5" style={{ color: '#8DA4BF' }}>
                        <span className="w-3 h-1.5 rounded inline-block" style={{ background: '#8DA4BF' }} aria-hidden="true" />
                        Tradicional
                    </span>
                    <span className="flex items-center gap-1.5" style={{ color: '#2E86DE' }}>
                        <span className="w-3 h-1.5 rounded inline-block" style={{ background: '#2E86DE' }} aria-hidden="true" />
                        Con GuiArg
                    </span>
                </div>
            </div>

            <div className="flex items-end gap-3 h-40">
                {months.map((m, i) => (
                    <div key={m} className="flex-1 flex items-end gap-1">
                        {/* Traditional bar */}
                        <motion.div
                            className="flex-1 rounded-t-sm"
                            style={{ background: 'rgba(141,164,191,0.3)' }}
                            initial={{ height: 0 }}
                            animate={isInView ? { height: `${(tradData[i] / maxVal) * 100}%` } : { height: 0 }}
                            transition={{ delay: 0.05 * i + 0.2, duration: 0.7, ease: 'easeOut' }}
                        />
                        {/* GuiArg bar */}
                        <motion.div
                            className="flex-1 rounded-t-sm"
                            style={{ background: 'linear-gradient(180deg, #54A0FF, #2E86DE)' }}
                            initial={{ height: 0 }}
                            animate={isInView ? { height: `${(guiargData[i] / maxVal) * 100}%` } : { height: 0 }}
                            transition={{ delay: 0.05 * i + 0.35, duration: 0.7, ease: 'easeOut' }}
                        />
                    </div>
                ))}
            </div>

            {/* X axis labels */}
            <div className="flex gap-3 mt-2">
                {months.map(m => (
                    <p key={m} className="flex-1 text-center text-[10px] text-[#8DA4BF]">{m}</p>
                ))}
            </div>

            {/* Delta label */}
            <div
                className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: 'rgba(91,140,62,0.1)', color: '#3A7D2C' }}
            >
                <TrendingUp size={13} aria-hidden="true" />
                +150% de crecimiento proyectado a 6 meses con el ecosistema GuiArg
            </div>
        </div>
    );
}

const stats = [
    { value: 40, suffix: '%', label: 'más retención de clientes en recesión con fidelización activa', source: 'CAME — Informe Comercio Minorista 2024', color: '#2E86DE', delay: 0 },
    { value: 90, suffix: '%', label: 'de los argentinos decide qué comprar usando el celular antes de salir', source: 'Digital 2026 Argentina — We Are Social', color: '#E6A817', delay: 0.1 },
    { value: 3, suffix: '×', label: 'más visitas orgánicas en negocios con presencia digital activa vs. sin ella', source: 'Google My Business Argentina Q4 2024', color: '#5B8C3E', delay: 0.2 },
];

export default function MarketData() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="datos"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: '#FAFAF8' }}
            aria-label="Datos de mercado — la transformación digital en Argentina"
        >
            {/* Top gold border */}
            <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(90deg, transparent, #E6A817 30%, #2E86DE 70%, transparent)' }}
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
                    <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase"
                        style={{ background: 'rgba(46,134,222,0.1)', color: '#1A5FAD', border: '1px solid rgba(46,134,222,0.2)' }}
                    >
                        <TrendingUp size={10} />
                        Datos del Mercado
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#0F1923' }}>
                        La Transformación no es{' '}
                        <span style={{ color: '#2E86DE' }}>una Opción,</span>
                        <br />
                        es el Negocio.
                    </h2>
                    <p className="text-[#3D4F63] text-lg max-w-2xl leading-relaxed">
                        Según <strong className="text-[#0F1923]">CAME</strong>, los negocios con presencia digital activa y sistemas de
                        fidelización retienen un 40% más de clientes en épocas de recesión. ¿Estás en ese mapa?
                    </p>
                </motion.div>

                {/* Stat cards row */}
                <div className="grid md:grid-cols-3 gap-5 mb-8">
                    {stats.map((s) => (
                        <StatCard key={s.label} {...s} isInView={isInView} />
                    ))}
                </div>

                {/* Bar chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <SalesBarChart isInView={isInView} />
                </motion.div>

                {/* Source note */}
                <p className="text-xs text-[#8DA4BF] mt-4 text-center">
                    * Proyección basada en datos de CAME 2024 y comportamientos observados en la red GuiArg Beta.
                </p>
            </div>
        </section>
    );
}
