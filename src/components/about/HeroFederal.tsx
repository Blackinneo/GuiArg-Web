'use client';

import { motion } from 'framer-motion';

const ArgentinaMapSVG = () => (
    <svg
        viewBox="0 0 200 400"
        className="absolute inset-0 w-full h-full object-contain opacity-[0.04] select-none pointer-events-none"
        fill="currentColor"
        aria-hidden="true"
    >
        {/* Simplified Argentina silhouette */}
        <path d="M80,10 L120,15 L140,30 L150,55 L148,80 L155,100 L160,130 L155,160 L145,185 L148,210 L140,240 L130,260 L118,280 L110,310 L100,340 L95,365 L90,380 L85,370 L80,345 L85,320 L88,295 L82,270 L70,245 L60,220 L55,195 L50,165 L45,135 L50,110 L48,85 L55,60 L65,35 Z" />
    </svg>
);

const PaperTexture = () => (
    <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" aria-hidden="true">
        <filter id="paper-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-texture)" />
    </svg>
);

const stats = [
    { value: '24', label: 'Provincias' },
    { value: '2.7M', label: 'km² de patria' },
    { value: '47M', label: 'Argentinos' },
    { value: '∞', label: 'Posibilidades' },
];

export default function HeroFederal() {
    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 px-4"
            style={{ backgroundColor: '#F7F3ED', color: '#1A1008' }}
        >
            {/* Paper texture */}
            <PaperTexture />

            {/* Argentina watermark */}
            <ArgentinaMapSVG />

            {/* Subtle horizontal lines (notebook paper feel) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 47px, rgba(26,16,8,0.06) 47px, rgba(26,16,8,0.06) 48px)',
                    backgroundPosition: '0 72px',
                }}
                aria-hidden="true"
            />

            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-10"
            >
                <span
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] px-4 py-2 rounded-full border"
                    style={{
                        backgroundColor: 'rgba(46, 134, 222, 0.08)',
                        borderColor: 'rgba(46, 134, 222, 0.3)',
                        color: '#1A5FAD',
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    República Argentina
                </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center max-w-4xl mx-auto mb-8"
            >
                <h1
                    className="font-black leading-[1.05] text-5xl sm:text-6xl lg:text-8xl tracking-tight"
                    style={{ color: '#1A1008', fontFamily: 'Poppins, sans-serif' }}
                >
                    GuiArg es de{' '}
                    <span
                        className="relative inline-block"
                        style={{ color: '#2E86DE' }}
                    >
                        Argentinos
                        {/* Underline doodle */}
                        <svg
                            className="absolute -bottom-2 left-0 w-full"
                            height="8"
                            viewBox="0 0 300 8"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path d="M2 6 C40 2, 80 7, 120 4 C160 1, 200 7, 240 4 C270 2, 290 5, 298 3" stroke="#E6A817" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                        </svg>
                    </span>
                    <br />
                    para toda la República
                </h1>
            </motion.div>

            {/* Description - Serif feel */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="relative z-10 max-w-2xl mx-auto text-center mb-16"
            >
                <p
                    className="text-lg sm:text-xl leading-relaxed"
                    style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontStyle: 'italic',
                        color: '#5A4030',
                        letterSpacing: '0.01em',
                    }}
                >
                    No somos una oficina en Buenos Aires; somos el pulso de cada persiana que se levanta en Salta,
                    el ruido del café en un bar mendocino y el laburo artesanal en el sur.
                    Unimos los{' '}
                    <strong style={{ fontStyle: 'normal', color: '#1A1008' }}>2.7 millones de km²</strong>
                    {' '}de nuestra patria en un solo ecosistema digital.
                </p>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 max-w-2xl w-full"
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        className="text-center"
                    >
                        <div
                            className="text-3xl sm:text-4xl font-black mb-1"
                            style={{ color: '#2E86DE', fontFamily: 'Poppins, sans-serif' }}
                        >
                            {stat.value}
                        </div>
                        <div
                            className="text-xs uppercase tracking-widest"
                            style={{ color: '#8B7355' }}
                        >
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#8B7355' }}>
                    Explorar
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 5v14M5 12l7 7 7-7" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
