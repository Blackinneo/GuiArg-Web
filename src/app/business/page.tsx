import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroEmpathy from '@/components/business/HeroEmpathy';
import MarketData from '@/components/business/MarketData';
import LoyaltyTools from '@/components/business/LoyaltyTools';
import ProjectRoadmap from '@/components/business/ProjectRoadmap';
import QualityStandard from '@/components/business/QualityStandard';
import OnboardingCTA from '@/components/business/OnboardingCTA';

export const metadata: Metadata = {
    title: 'GuiArg para Negocios | Sumá tu comercio a la red más grande del país',
    description:
        'GuiArg es tu socio tecnológico. Herramientas de fidelización, agenda digital, notificaciones por geocerca y presencia web profesional. Gratis para empezar.',
    openGraph: {
        title: 'GuiArg para Negocios — Sabemos lo que cuesta levantar la persiana',
        description:
            'Sumá tu comercio a la red GuiArg: sistema de puntos, turnos online, fidelización premium y geocerca. Sin burocracia, activación en 24hs.',
    },
};

export default function BusinessPage() {
    return (
        <div>
            <Navbar />
            <main id="main-content">
                {/* 1. Hero empático — persiana dorada */}
                <HeroEmpathy />
                {/* 2. Datos de mercado — CAME & Digital 2026 */}
                <MarketData />
                {/* 3. Herramientas de fidelización */}
                <LoyaltyTools />
                {/* 4. Roadmap de crecimiento */}
                <ProjectRoadmap />
                {/* 5. Estándar de calidad */}
                <QualityStandard />
                {/* 6. CTA de onboarding con formulario */}
                <OnboardingCTA />
            </main>
            <Footer />
        </div>
    );
}
