'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
    Menu, X, MapPin, ChevronRight, Compass, ChevronDown,
    Globe, Instagram, Youtube, Music2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Comunidad', href: '/community' },
    { label: 'Negocios', href: '/business' },
    { label: 'Tecnología Arg', href: '/history' },
    { label: 'Conocé GuiArg', href: '/about' },
];

const languages = [
    { code: 'ARG', label: 'Castellano', flag: '🇦🇷' },
    { code: 'EEUU', label: 'English', flag: '🇺🇸' },
    { code: 'BRA', label: 'Português', flag: '🇧🇷' },
];

const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
    { icon: Music2, href: '#', label: 'TikTok' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(languages[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isAlwaysSolid = pathname === '/community';

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler, { passive: true });

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handler);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-4 left-4 right-4 z-50 transition-all duration-300"
            >
                <div
                    className={`mx-auto max-w-6xl rounded-2xl px-4 py-3 flex items-center justify-between transition-all duration-300 ${scrolled || isAlwaysSolid
                        ? 'glass shadow-xl'
                        : 'bg-transparent'
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" aria-label="GuiArg - Inicio" className="flex items-center gap-2">
                        <div className="relative h-10 flex items-center">
                            <img
                                src="/4.png"
                                alt="GuiArg logo"
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Dropdown Menu (Replacment of CTA) */}
                    <div className="hidden md:flex items-center gap-3 relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold text-white/90 glass border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                        >
                            <Menu size={16} className="text-blue-400" />
                            <span>Menu</span>
                            <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-full right-0 mt-3 w-72 rounded-2xl p-4 shadow-2xl border border-white/10 backdrop-blur-3xl overflow-hidden"
                                    style={{ background: 'rgba(10, 22, 40, 0.6)' }}
                                >
                                    {/* Language Switcher */}
                                    <div className="mb-4">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                            <Globe size={10} /> Idioma
                                        </p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => setSelectedLang(lang)}
                                                    className={`p-2 rounded-lg text-[10px] font-bold transition-all border ${selectedLang.code === lang.code
                                                        ? 'bg-blue-500/20 border-blue-400/50 text-white'
                                                        : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <span className="text-sm block mb-0.5">{lang.flag}</span>
                                                    {lang.code}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Navigation & Action */}
                                    <div className="space-y-2 mb-4">
                                        <Link
                                            href="/explore"
                                            className="flex items-center justify-between group w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-sm text-white/80"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Compass size={18} className="text-blue-400 group-hover:rotate-45 transition-transform" />
                                                <span className="font-bold">Navegar</span>
                                            </div>
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>

                                        <Link
                                            href="/auth/register"
                                            className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all text-white text-sm font-black"
                                        >
                                            Registrarse
                                        </Link>
                                    </div>

                                    {/* Socials */}
                                    <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-5">
                                        {socials.map((social) => (
                                            <Link
                                                key={social.label}
                                                href={social.href}
                                                className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                                                aria-label={social.label}
                                            >
                                                <social.icon size={18} />
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-x-4 top-24 z-40 rounded-2xl p-6 md:hidden border border-white/10 backdrop-blur-3xl overflow-y-auto shadow-2xl max-h-[calc(100vh-8rem)]"
                        style={{ background: 'rgba(10, 22, 40, 0.9)' }}
                    >
                        <nav className="flex flex-col">
                            {/* Nav Links */}
                            <div className="flex flex-col gap-1 mb-2">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                                        >
                                            <MapPin size={16} className="text-blue-400 opacity-70" />
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Language Switcher */}
                            <div className="mt-2 pt-4 border-t border-white/10">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                    <Globe size={12} /> Idioma
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setSelectedLang(lang)}
                                            className={`p-2.5 rounded-lg text-xs font-bold transition-all border ${selectedLang.code === lang.code
                                                ? 'bg-blue-500/20 border-blue-400/50 text-white'
                                                : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10'
                                                }`}
                                        >
                                            <span className="text-base block mb-0.5">{lang.flag}</span>
                                            {lang.code}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-5 pt-5 border-t border-white/10 flex flex-col gap-3">
                                <Link
                                    href="/explore"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center justify-between group w-full px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-sm text-white/80"
                                >
                                    <div className="flex items-center gap-3">
                                        <Compass size={18} className="text-blue-400 group-hover:rotate-45 transition-transform" />
                                        <span className="font-bold">Navegar</span>
                                    </div>
                                    <ChevronRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                </Link>

                                <Link
                                    href="/auth/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all text-white text-base font-black"
                                >
                                    Registrarse
                                </Link>
                            </div>

                            {/* Socials */}
                            <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-center gap-6">
                                {socials.map((social) => (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        className="p-3 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={22} />
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
