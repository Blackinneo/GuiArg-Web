import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroStars from '@/components/community/HeroManifesto';
import TrustFilter from '@/components/community/LoyaltyVouchers';
import ClientPerks from '@/components/community/SocialImpact';
import EconomicChain from '@/components/community/EntrepreneurHub';
import DonationsCTA from '@/components/community/DonationsCTA';

export const metadata: Metadata = {
    title: 'Comunidad GuiArg | Tres estrellas en la camiseta, $3.000 en el barrio',
    description:
        'Sumarte a GuiArg es la jugada colectiva para levantar la economía del que la pelea todos los días. Por $3.000 ARS apoyás negocios locales, acumulás beneficios reales y financiás donaciones a ONGs.',
    openGraph: {
        title: 'Comunidad GuiArg — La jugada colectiva',
        description:
            'Tres estrellas en la camiseta, tres mil pesos en el barrio. Sumate a la red que transforma cada escaneo QR en progreso real para Argentina.',
    },
};

export default function CommunityPage() {
    return (
        <div style={{ background: '#FAFAF8' }}>
            <Navbar />
            <main id="main-content">
                {/* 1. Hero: Tres Estrellas / $3.000 manifiesto */}
                <HeroStars />
                {/* 2. Trust: Sin importar quién esté detrás del mostrador */}
                <TrustFilter />
                {/* 3. Perks: Tu fidelidad es oro — progress bars por nivel */}
                <ClientPerks />
                {/* 4. Economic Chain: Si al negocio le va bien, a tu heladera también */}
                <EconomicChain />
                {/* 5. Donations CTA: Más que un café, una segunda oportunidad */}
                <DonationsCTA />
            </main>
            <Footer />
        </div>
    );
}
