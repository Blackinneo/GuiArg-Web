'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const photos = [
    {
        src: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&q=80&fm=webp',
        alt: 'Iguazú, Misiones',
        label: 'Misiones',
        aspect: 'aspect-[4/5]',
        delay: 0,
    },
    {
        src: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=600&q=80&fm=webp',
        alt: 'Salta, Argentina',
        label: 'Salta',
        aspect: 'aspect-square',
        delay: 0.15,
    },
    {
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&fm=webp',
        alt: 'Patagonia Argentina',
        label: 'Patagonia',
        aspect: 'aspect-[16/9]',
        delay: 0.3,
    },
    {
        src: 'https://images.unsplash.com/photo-1474690455603-a369ec1293f9?w=600&q=80&fm=webp',
        alt: 'Mendoza, viñedos',
        label: 'Mendoza',
        aspect: 'aspect-[4/5]',
        delay: 0.1,
    },
    {
        src: 'https://images.unsplash.com/photo-1519699047748-de8e458e89cc?w=600&q=80&fm=webp',
        alt: 'Cordillera Argentina',
        label: 'Los Andes',
        aspect: 'aspect-square',
        delay: 0.25,
    },
];

const SolDeMayo = () => (
    <motion.svg
        viewBox="0 0 200 200"
        className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
    >
        {/* Sun rays */}
        {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            const isStraight = i % 2 === 0;
            const r1 = 60, r2 = isStraight ? 90 : 78;
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + r1 * Math.cos(rad);
            const y1 = 100 + r1 * Math.sin(rad);
            const x2 = 100 + r2 * Math.cos(rad);
            const y2 = 100 + r2 * Math.sin(rad);
            return (
                <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#E6A817"
                    strokeWidth={isStraight ? 2.5 : 1.5}
                    strokeLinecap="round"
                />
            );
        })}
        {/* Outer circle */}
        <circle cx="100" cy="100" r="58" fill="none" stroke="#E6A817" strokeWidth="1.5" />
        {/* Inner circle */}
        <circle cx="100" cy="100" r="44" fill="rgba(230,168,23,0.12)" stroke="#E6A817" strokeWidth="1.5" />
        {/* Center face - simple iconic */}
        <circle cx="100" cy="100" r="28" fill="#E6A817" />
        {/* Eyes */}
        <circle cx="93" cy="96" r="3" fill="#1A1008" />
        <circle cx="107" cy="96" r="3" fill="#1A1008" />
        {/* Smile */}
        <path d="M91 106 Q100 114 109 106" fill="none" stroke="#1A1008" strokeWidth="2" strokeLinecap="round" />
        {/* Eyebrows */}
        <path d="M89 90 Q93 87 97 90" fill="none" stroke="#1A1008" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M103 90 Q107 87 111 90" fill="none" stroke="#1A1008" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
);

export default function NationalCollage() {
    return (
        <section
            className="relative py-20 overflow-hidden"
            style={{ backgroundColor: '#1A1008' }}
        >
            {/* Subtle grain */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
                }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto px-4">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4"
                        style={{ color: '#F7F3ED' }}
                    >
                        Nuestra Tierra,{' '}
                        <span style={{ color: '#E6A817' }}>Tu Vitrina</span>
                    </h2>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: '#8B7355', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                        De la Puna al Canal de Beagle, cada rincón es una oportunidad de negocio.
                    </p>
                </motion.div>

                {/* Composition: Sol de Mayo + orbiting photos */}
                <div className="relative flex items-center justify-center min-h-[600px]">

                    {/* Sol de Mayo – centre */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10"
                    >
                        <SolDeMayo />
                    </motion.div>

                    {/* Orbiting photo cards */}
                    {[
                        { top: '2%', left: '3%', width: 'w-36 sm:w-48' },
                        { top: '5%', right: '3%', width: 'w-28 sm:w-40' },
                        { bottom: '2%', left: '5%', width: 'w-32 sm:w-44' },
                        { bottom: '5%', right: '3%', width: 'w-36 sm:w-48' },
                        { top: '40%', left: '0%', width: 'w-24 sm:w-36' },
                    ].map((pos, i) => {
                        const photo = photos[i];
                        return (
                            <motion.div
                                key={photo.alt}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ delay: photo.delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className={`absolute ${pos.width} hidden sm:block`}
                                style={{ top: pos.top, left: (pos as { left?: string }).left, right: (pos as { right?: string }).right, bottom: (pos as { bottom?: string }).bottom }}
                            >
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                                    className={`relative ${photo.aspect} rounded-2xl overflow-hidden shadow-2xl`}
                                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                                >
                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        fill
                                        className="object-cover"
                                        sizes="200px"
                                        style={{ filter: 'sepia(0.1) contrast(1.05)' }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                                        <span className="text-white text-xs font-bold">{photo.label}</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile: simple horizontal scroll of photos */}
                <div className="sm:hidden flex gap-4 overflow-x-auto pb-4 mt-10 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
                    {photos.map((photo) => (
                        <div
                            key={photo.alt}
                            className="relative flex-shrink-0 w-56 aspect-[4/5] rounded-xl overflow-hidden snap-center shadow-xl"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover"
                                sizes="224px"
                            />
                            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="text-white text-xs font-bold">{photo.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
