'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroFederal from '@/components/about/HeroFederal';
import NationalCollage from '@/components/about/NationalCollage';
import ProvinceExplorer from '@/components/about/ProvinceExplorer';
import ProvinceModal from '@/components/about/ProvinceModal';

function AboutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeSlug, setActiveSlug] = useState<string | null>(null);

    // Sync modal state with URL
    useEffect(() => {
        const slug = searchParams.get('provincia');
        setActiveSlug(slug);
    }, [searchParams]);

    const handleOpenModal = useCallback((slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('provincia', slug);
        router.push(`?${params.toString()}`, { scroll: false });
    }, [router, searchParams]);

    const handleCloseModal = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('provincia');
        const qs = params.toString();
        router.push(qs ? `?${qs}` : window.location.pathname, { scroll: false });
    }, [router, searchParams]);

    return (
        <>
            <Navbar />
            <main>
                <HeroFederal />
                <NationalCollage />
                <ProvinceExplorer onOpenModal={handleOpenModal} />
            </main>
            <Footer />
            <ProvinceModal slug={activeSlug} onClose={handleCloseModal} />
        </>
    );
}

export default function AboutPage() {
    return (
        <Suspense fallback={null}>
            <AboutContent />
        </Suspense>
    );
}
