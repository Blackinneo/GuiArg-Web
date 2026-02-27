'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const footerLinks = {
    plataforma: [
        { label: 'Explorar comercios', href: '/explore' },
        { label: 'Cómo funciona', href: '/how-it-works' },
        { label: 'Precios', href: '/pricing' },
        { label: 'Soporte', href: '/support' },
    ],
    comunidad: [
        { label: 'Blog', href: '/blog' },
        { label: 'Historias', href: '/stories' },
        { label: 'Eventos', href: '/events' },
        { label: 'Contacto', href: '/contact' },
    ],
    legal: [
        { label: 'Privacidad', href: '/privacy' },
        { label: 'Términos', href: '/terms' },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-white/8 bg-[#0a0d12]" role="contentinfo">
            {/* CTA banner */}
            <div className="relative overflow-hidden">
                <div
                    className="max-w-6xl mx-auto px-4 py-16 text-center relative z-10"
                >
                    <div
                        className="absolute inset-0 opacity-30 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(46,134,222,0.15) 0%, transparent 70%)' }}
                        aria-hidden="true"
                    />
                    <MapPin size={24} className="text-blue-400 mx-auto mb-4" aria-hidden="true" />
                    <h3 className="text-3xl md:text-4xl font-black mb-4">
                        Tu negocio merece <span className="gradient-text-blue">estar en el mapa.</span>
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Sumate a la red que está transformando el comercio local en Argentina.
                    </p>
                    <Link
                        href="/community"
                        className="btn-primary mx-auto"
                        aria-label="Comenzar con GuiArg gratuitamente"
                    >
                        Comenzar Gratis
                    </Link>
                </div>
            </div>

            {/* Links */}
            <div className="max-w-6xl mx-auto px-4 py-12 border-t border-white/8">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4" aria-label="GuiArg inicio">
                            <Image src="/logo.png" alt="GuiArg logo" width={28} height={28} className="w-7 h-7 object-contain" />
                            <span className="font-bold text-white">GuiArg</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Tecnología argentina con acento, construyendo una economía más inclusiva y transparente.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                                { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter/X' },
                                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={`Seguinos en ${label}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200 cursor-pointer"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Plataforma */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Plataforma</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.plataforma.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Comunidad */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Comunidad</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.comunidad.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Legal</h4>
                        <ul className="space-y-2.5">
                            {footerLinks.legal.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/8 py-5 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-600">
                        © 2026 GuiArg. Hecho con ❤️ en Argentina.
                    </p>
                    <p className="text-xs text-gray-600">
                        Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
