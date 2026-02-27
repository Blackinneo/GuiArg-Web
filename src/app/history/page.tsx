import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroHistory from '@/components/history/HeroHistory';
import Timeline from '@/components/history/Timeline';
import GuiArgMilestone from '@/components/history/GuiArgMilestone';

export const metadata: Metadata = {
    title: 'Tecnología Arg | 200 años de genialidad argentina — GuiArg',
    description:
        'Recorré la línea del tiempo de la innovación argentina: desde la Revolución de Mayo hasta el primer satélite geoestacionario y más. Descubrí cómo GuiArg es el próximo hito.',
    openGraph: {
        title: 'Tecnología Arg — 200 años de genialidad argentina',
        description:
            'La historia de Argentina en tecnología, ciencia y cultura. La página pasa del blanco y negro al color en el momento exacto en que llegó la TV a color a Argentina (1980).',
    },
};

export default function HistoryPage() {
    return (
        <div>
            <Navbar />
            <main id="main-content">
                {/* Hero: intro oscuro sepia */}
                <HeroHistory />
                {/* Timeline: B&N → Color en 1980 */}
                <Timeline />
                {/* GuiArg como el próximo hito */}
                <GuiArgMilestone />
            </main>
            <Footer />
        </div>
    );
}
