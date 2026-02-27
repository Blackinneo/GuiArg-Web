'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, CreditCard } from 'lucide-react';

/* ── Sun-over-shop doodle ─────────────────────────────────── */
function SunShopDoodle() {
    return (
        <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
            {/* Sun */}
            <circle cx="100" cy="35" r="20" fill="#E6A817" opacity="0.9" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
                const rad = (a * Math.PI) / 180;
                return <line key={i} x1={100 + 23 * Math.cos(rad)} y1={35 + 23 * Math.sin(rad)} x2={100 + 30 * Math.cos(rad)} y2={35 + 30 * Math.sin(rad)} stroke="#E6A817" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />;
            })}
            {/* Sun face */}
            <circle cx="94" cy="33" r="2.5" fill="#0F1923" opacity="0.7" />
            <circle cx="106" cy="33" r="2.5" fill="#0F1923" opacity="0.7" />
            <path d="M94 40 Q100 44 106 40" stroke="#0F1923" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />

            {/* Horizon line */}
            <line x1="0" y1="90" x2="200" y2="90" stroke="rgba(46,134,222,0.2)" strokeWidth="1" />

            {/* Ground */}
            <rect x="0" y="90" width="200" height="50" fill="rgba(46,134,222,0.04)" />

            {/* Shop building */}
            <rect x="55" y="62" width="90" height="58" rx="3" fill="white" stroke="rgba(46,134,222,0.3)" strokeWidth="1.5" />
            {/* Roof */}
            <polygon points="50,62 150,62 145,50 55,50" fill="#2E86DE" opacity="0.25" />
            {/* Door */}
            <rect x="88" y="90" width="24" height="30" rx="2" fill="#2E86DE" opacity="0.3" />
            {/* Windows */}
            <rect x="62" y="70" width="22" height="16" rx="2" fill="#2E86DE" opacity="0.2" />
            <rect x="116" y="70" width="22" height="16" rx="2" fill="#2E86DE" opacity="0.2" />
            {/* Sign */}
            <rect x="68" y="55" width="64" height="12" rx="2" fill="#E6A817" opacity="0.8" />
            <text x="100" y="65" textAnchor="middle" fontSize="7" fill="white" fontFamily="Poppins,sans-serif" fontWeight="700">GuiArg</text>

            {/* Shutter (half open) */}
            {[0, 1, 2].map(n => (
                <rect key={n} x="55" y={62 + n * 8} width="90" height="6" rx="1" fill="rgba(15,25,40,0.08)" />
            ))}

            {/* Rays from sun to shop */}
            <line x1="100" y1="56" x2="100" y2="62" stroke="#E6A817" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
            <line x1="75" y1="52" x2="70" y2="62" stroke="#E6A817" strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />
            <line x1="125" y1="52" x2="130" y2="62" stroke="#E6A817" strokeWidth="1" strokeDasharray="3 2" opacity="0.3" />

            {/* Decorative doodle marks */}
            <path d="M20 80 Q30 74 40 80" stroke="#E6A817" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
            <path d="M160 80 Q170 74 180 80" stroke="#E6A817" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
            <circle cx="25" cy="72" r="3" fill="#2E86DE" opacity="0.3" />
            <circle cx="175" cy="72" r="3" fill="#2E86DE" opacity="0.3" />
        </svg>
    );
}

/* ── Simple onboarding mini-form ──────────────────────────── */
function QuickForm() {
    const [email, setEmail] = useState('');
    const [rubro, setRubro] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setSent(true);
    };

    if (sent) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
            >
                <div className="text-5xl mb-3" aria-hidden="true">🎉</div>
                <p className="font-black text-[#0F1923] text-lg mb-1">¡Recibimos tu solicitud!</p>
                <p className="text-sm text-[#3D4F63]">Te contactamos en menos de 24 hs para activar tu perfil.</p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} aria-label="Formulario para sumar tu negocio a GuiArg" className="space-y-3">
            <div>
                <label htmlFor="biz-email" className="text-xs font-semibold text-[#3D4F63] mb-1 block">
                    Email del negocio
                </label>
                <input
                    id="biz-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="hola@micomercio.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#0F1923] placeholder-gray-400 outline-none transition-all duration-200"
                    style={{
                        background: '#F4F6F8',
                        border: '1.5px solid rgba(0,0,0,0.1)',
                        minHeight: '44px',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#2E86DE')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
                />
            </div>
            <div>
                <label htmlFor="biz-rubro" className="text-xs font-semibold text-[#3D4F63] mb-1 block">
                    Rubro
                </label>
                <select
                    id="biz-rubro"
                    value={rubro}
                    onChange={e => setRubro(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#0F1923] outline-none transition-all duration-200"
                    style={{
                        background: '#F4F6F8',
                        border: '1.5px solid rgba(0,0,0,0.1)',
                        minHeight: '44px',
                    }}
                >
                    <option value="">Seleccioná tu rubro</option>
                    <option>Gastronomía</option>
                    <option>Indumentaria</option>
                    <option>Servicios</option>
                    <option>Salud & Estética</option>
                    <option>Artesanías</option>
                    <option>Tecnología</option>
                    <option>Otro</option>
                </select>
            </div>
            <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-sm text-white cursor-pointer"
                style={{
                    background: 'linear-gradient(135deg, #1A5FAD, #2E86DE)',
                    boxShadow: '0 8px 28px rgba(46,134,222,0.4)',
                    minHeight: '52px',
                }}
                aria-label="Sumar mi negocio a GuiArg ahora"
            >
                Sumar mi Negocio ahora
                <ArrowRight size={15} />
            </motion.button>
        </form>
    );
}

const trustSignals = [
    { icon: Zap, label: 'Gratis para empezar' },
    { icon: CreditCard, label: 'Sin tarjeta de crédito' },
    { icon: ShieldCheck, label: 'Activación en 24hs' },
];

export default function OnboardingCTA() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="onboarding"
            ref={ref}
            className="py-24 px-4 relative overflow-hidden"
            style={{ background: '#FAFAF8' }}
            aria-label="¿Listo para que tu negocio sea grande? Sumate a GuiArg"
        >
            {/* Paper grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '180px 180px',
                }}
                aria-hidden="true"
            />
            {/* Blue gradient ambient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 80% 50%, rgba(46,134,222,0.07) 0%, transparent 70%)' }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT: Doodle */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        {/* Scrapbook frame */}
                        <div
                            className="relative rounded-3xl p-8 overflow-hidden"
                            style={{
                                background: 'white',
                                boxShadow: '0 16px 48px rgba(46,134,222,0.1), 0 4px 16px rgba(0,0,0,0.05)',
                                border: '1px solid rgba(46,134,222,0.1)',
                            }}
                        >
                            {/* Paper stripe bg */}
                            <div
                                className="absolute inset-0 opacity-[0.04]"
                                style={{ backgroundImage: 'repeating-linear-gradient(0deg, #2E86DE 0px, #2E86DE 30px, transparent 30px, transparent 60px)' }}
                                aria-hidden="true"
                            />
                            <div className="relative z-10">
                                <p className="text-xs font-bold tracking-widest uppercase text-center mb-4" style={{ color: '#8DA4BF' }}>
                                    Tu negocio en la red más grande
                                </p>
                                <div className="h-48">
                                    <SunShopDoodle />
                                </div>
                            </div>
                            {/* Corners washi */}
                            {[
                                { top: '-6px', left: '24px', rotate: '-7deg' },
                                { top: '-6px', right: '24px', rotate: '7deg' },
                                { bottom: '-6px', left: '24px', rotate: '5deg' },
                                { bottom: '-6px', right: '24px', rotate: '-5deg' },
                            ].map((t, i) => (
                                <div
                                    key={i}
                                    className="absolute w-14 h-3.5 rounded-sm pointer-events-none"
                                    style={{ ...t as any, background: i % 2 === 0 ? '#2E86DE' : '#E6A817', opacity: 0.35, transform: `rotate(${(t as any).rotate})` }}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        <span
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase"
                            style={{ background: 'rgba(46,134,222,0.1)', color: '#1A5FAD', border: '1px solid rgba(46,134,222,0.2)' }}
                        >
                            Empezá Ahora
                        </span>

                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#0F1923' }}>
                            ¿Listo para que tu<br />
                            Negocio sea{' '}
                            <span style={{ color: '#2E86DE' }}>Grande?</span>
                        </h2>

                        <p className="text-[#3D4F63] text-base leading-relaxed mb-8">
                            Completá este formulario express y nuestro equipo lo activa en menos de{' '}
                            <strong className="text-[#0F1923]">24 horas</strong>. Sin burocracia, sin letra chica.
                        </p>

                        {/* Form */}
                        <div
                            className="rounded-2xl p-6 mb-6"
                            style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.07)' }}
                        >
                            <QuickForm />
                        </div>

                        {/* Trust signals */}
                        <div className="flex flex-wrap gap-3">
                            {trustSignals.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                                    style={{ background: 'rgba(91,140,62,0.1)', color: '#3A7D2C', border: '1px solid rgba(91,140,62,0.2)' }}
                                >
                                    <Icon size={11} aria-hidden="true" />
                                    {label}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
