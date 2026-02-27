'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { provinces, regions, type Province } from './provinceData';

const REGIONS = ['Todas', ...regions] as const;

interface ProvinceCardProps {
    province: Province;
    onOpen: (p: Province) => void;
    index: number;
}

function ProvinceCard({ province, onOpen, index }: ProvinceCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
            onClick={() => onOpen(province)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            style={{ aspectRatio: '3/4' }}
            role="button"
            aria-label={`Explorar ${province.name}`}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpen(province)}
        >
            {/* Image */}
            <Image
                src={province.images.landscape}
                alt={`Paisaje de ${province.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300" />

            {/* Color accent top border */}
            <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: province.color }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <div
                    className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80 transition-opacity group-hover:opacity-100"
                    style={{ color: province.color }}
                >
                    {province.region}
                </div>
                <h3 className="text-white font-black text-xl leading-tight mb-1">{province.name}</h3>
                <p className="text-white/60 text-xs leading-relaxed line-clamp-2 transition-all duration-300 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20">
                    {province.tagline}
                </p>
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-white/70">{province.primaryCategory}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-xs font-bold" style={{ color: province.color }}>
                        Explorar →
                    </span>
                </div>
            </div>
        </motion.article>
    );
}

export default function ProvinceExplorer({ onOpenModal }: { onOpenModal: (slug: string) => void }) {
    const [activeRegion, setActiveRegion] = useState<string>('Todas');

    const filtered = activeRegion === 'Todas'
        ? provinces
        : provinces.filter(p => p.region === activeRegion);

    const handleOpen = useCallback((p: Province) => {
        onOpenModal(p.slug);
    }, [onOpenModal]);

    return (
        <section className="py-20 px-4" style={{ backgroundColor: '#F7F3ED' }}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2
                        className="text-4xl sm:text-5xl font-black mb-4"
                        style={{ color: '#1A1008' }}
                    >
                        Explorá la{' '}
                        <span style={{ color: '#2E86DE' }}>República</span>
                    </h2>
                    <p style={{ color: '#5A4030', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                        24 provincias, 24 historias, millones de posibilidades.
                    </p>
                </motion.div>

                {/* Region filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {REGIONS.map((region) => (
                        <button
                            key={region}
                            onClick={() => setActiveRegion(region)}
                            className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer border"
                            style={{
                                backgroundColor: activeRegion === region ? '#2E86DE' : 'transparent',
                                color: activeRegion === region ? '#fff' : '#5A4030',
                                borderColor: activeRegion === region ? '#2E86DE' : 'rgba(90,64,48,0.3)',
                            }}
                        >
                            {region}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                    {filtered.map((province, i) => (
                        <ProvinceCard
                            key={province.slug}
                            province={province}
                            onOpen={handleOpen}
                            index={i}
                        />
                    ))}
                </motion.div>

                {/* Count */}
                <p className="text-center mt-8 text-sm" style={{ color: '#8B7355' }}>
                    {filtered.length} provincias {activeRegion !== 'Todas' && `en ${activeRegion}`}
                </p>
            </div>
        </section>
    );
}
