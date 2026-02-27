'use client';

import Image from 'next/image';
import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Users, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { getProvinceBySlug } from './provinceData';

interface ProvinceModalProps {
    slug: string | null;
    onClose: () => void;
}

const slides = [
    { key: 'landscape', label: 'Paisaje' },
    { key: 'culture', label: 'Cultura' },
    { key: 'commerce', label: 'GuiArg' },
] as const;

export default function ProvinceModal({ slug, onClose }: ProvinceModalProps) {
    const [slideIndex, setSlideIndex] = useState(0);
    const province = slug ? getProvinceBySlug(slug) : null;

    // Reset slide when province changes
    useEffect(() => { setSlideIndex(0); }, [slug]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    // Lock body scroll
    useEffect(() => {
        if (slug) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [slug]);

    const prev = useCallback(() => setSlideIndex(i => (i - 1 + slides.length) % slides.length), []);
    const next = useCallback(() => setSlideIndex(i => (i + 1) % slides.length), []);

    const currentImage = province
        ? province.images[slides[slideIndex].key as 'landscape' | 'culture' | 'commerce']
        : null;

    return (
        <AnimatePresence>
            {province && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
                    style={{ backgroundColor: 'rgba(10, 12, 16, 0.88)', backdropFilter: 'blur(12px)' }}
                    onClick={onClose}
                    aria-modal="true"
                    role="dialog"
                    aria-label={`Explorar ${province.name}`}
                >
                    <motion.div
                        initial={{ y: 80, opacity: 0, scale: 0.96 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 80, opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full sm:max-w-4xl bg-[#0D1117] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
                        style={{ maxHeight: '90vh' }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Top color bar */}
                        <div className="h-1 w-full" style={{ backgroundColor: province.color }} />

                        <div className="flex flex-col sm:flex-row h-full" style={{ maxHeight: 'calc(90vh - 4px)' }}>
                            {/* Left: Image viewer */}
                            <div className="relative w-full sm:w-3/5 bg-black overflow-hidden" style={{ minHeight: '280px', height: '50vw', maxHeight: '520px' }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={slideIndex}
                                        initial={{ x: 60, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -60, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0"
                                    >
                                        {currentImage && (
                                            <Image
                                                src={currentImage}
                                                alt={`${province.name} - ${slides[slideIndex].label}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, 60vw"
                                                priority
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Slide controls */}
                                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 z-10">
                                    <button
                                        onClick={prev}
                                        className="w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                                        aria-label="Anterior"
                                    >
                                        <ArrowLeft size={16} />
                                    </button>
                                    {slides.map((s, i) => (
                                        <button
                                            key={s.key}
                                            onClick={() => setSlideIndex(i)}
                                            className="px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer uppercase tracking-wider"
                                            style={{
                                                backgroundColor: slideIndex === i ? province.color : 'rgba(255,255,255,0.15)',
                                                color: '#fff',
                                            }}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                    <button
                                        onClick={next}
                                        className="w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
                                        aria-label="Siguiente"
                                    >
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Right: Data panel */}
                            <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
                                {/* Close */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer z-20"
                                    aria-label="Cerrar"
                                >
                                    <X size={16} />
                                </button>

                                {/* Region tag */}
                                <div
                                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest mb-3 w-fit px-3 py-1 rounded-full"
                                    style={{ backgroundColor: `${province.color}22`, color: province.color, border: `1px solid ${province.color}44` }}
                                >
                                    <MapPin size={10} />
                                    {province.region}
                                </div>

                                {/* Name */}
                                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight">
                                    {province.name}
                                </h2>
                                <p className="text-sm text-white/50 leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                                    {province.tagline}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {[
                                        { icon: <Users size={14} />, label: 'Población', value: province.population },
                                        { icon: <Layers size={14} />, label: 'Superficie', value: province.area },
                                        { icon: null, label: 'Categoría Principal', value: province.primaryCategory },
                                        { icon: null, label: 'Región', value: province.region },
                                    ].map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="rounded-xl p-3"
                                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                                        >
                                            <div className="text-xs text-white/40 mb-1 flex items-center gap-1">
                                                {stat.icon}
                                                {stat.label}
                                            </div>
                                            <div className="text-sm font-black text-white">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* GuiArg CTA */}
                                <div className="mt-auto pt-4 border-t border-white/10">
                                    <p className="text-xs text-white/40 mb-3">¿Tenés un negocio en {province.name}?</p>
                                    <a
                                        href="/business"
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-sm text-white transition-all hover:opacity-90"
                                        style={{ background: `linear-gradient(135deg, ${province.color}, ${province.color}bb)` }}
                                    >
                                        Sumá tu negocio a GuiArg →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
