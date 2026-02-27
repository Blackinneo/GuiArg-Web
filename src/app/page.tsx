import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import CommunitySection from '@/components/CommunitySection';
import BusinessSection from '@/components/BusinessSection';
import TechHistorySection from '@/components/TechHistorySection';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                <Hero />
                <AboutSection />
                <CommunitySection />
                <BusinessSection />
                <TechHistorySection />
            </main>
            <Footer />
        </>
    );
}
