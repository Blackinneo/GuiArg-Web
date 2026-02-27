import type { Metadata } from "next";
import "./globals.css";

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
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}
