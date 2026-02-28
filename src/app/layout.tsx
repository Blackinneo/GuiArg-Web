import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://guiarg.com"),
    title: "GuiArg | El puente entre nuestras raíces y el futuro",
    description:
        "GuiArg conecta a los emprendedores argentinos con sus clientes locales mediante tecnología QR inteligente, comunidad verificada y perfiles de negocios digitales.",
    keywords: ["GuiArg", "comercio local", "Argentina", "QR", "emprendedores", "comunidad"],
    openGraph: {
        title: "GuiArg | Tecnología con acento argentino",
        description: "La plataforma que conecta negocios locales con sus comunidades.",
        locale: "es_AR",
        type: "website",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es-AR">
            <body className={`${poppins.variable} font-sans antialiased`}>{children}</body>
        </html>
    );
}
