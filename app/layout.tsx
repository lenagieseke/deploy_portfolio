import localFont from "next/font/local";

import Footer from "./components/Footer";
import Header from "./components/Header";

import "./globals.css";



const soehne = localFont({
  variable: "--font-soehne",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  src: [
    // // 200 – Extraleicht
    // { path: "./font/soehne/soehne-extraleicht.woff2",        weight: "200", style: "normal" },
    // { path: "./font/soehne/soehne-extraleicht-kursiv.woff2", weight: "200", style: "italic" },

    // 300 – Leicht
    { path: "./font/soehne/soehne-leicht.woff2",             weight: "300", style: "normal" },
    { path: "./font/soehne/soehne-leicht-kursiv.woff2",      weight: "300", style: "italic" },

    // 400 – Buch
    { path: "./font/soehne/soehne-buch.woff2",               weight: "400", style: "normal" },
    { path: "./font/soehne/soehne-buch-kursiv.woff2",        weight: "400", style: "italic" },

    // 600 – Halbfett
    { path: "./font/soehne/soehne-halbfett.woff2",           weight: "600", style: "normal" },
    { path: "./font/soehne/soehne-halbfett-kursiv.woff2",    weight: "600", style: "italic" },

    // // 700 – Dreiviertelfett
    // { path: "./font/soehne/soehne-dreiviertelfett.woff2",        weight: "700", style: "normal" },
    // { path: "./font/soehne/soehne-dreiviertelfett-kursiv.woff2", weight: "700", style: "italic" },

    // 800 – Fett
    { path: "./font/soehne/soehne-fett.woff2",               weight: "800", style: "normal" },
    { path: "./font/soehne/soehne-fett-kursiv.woff2",        weight: "800", style: "italic" },

    // // 900 – Extrafett
    // { path: "./font/soehne/soehne-extrafett.woff2",          weight: "900", style: "normal" },
    // { path: "./font/soehne/soehne-extrafett-kursiv.woff2",   weight: "900", style: "italic" },

    // // 950 – Kräftig
    // { path: "./font/soehne/soehne-kraftig.woff2",            weight: "950", style: "normal" },
    // { path: "./font/soehne/soehne-kraftig-kursiv.woff2",     weight: "950", style: "italic" },
  ],
});



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={soehne.variable}>
        <head>
            <meta name="ai-model-training" content="no" />
        </head>


        {/* Turns the whole page into a 
            vertical flexbox that spans 
            the full viewport height.
            • The header sits at the top.
            • The footer sticks to the bottom (if content is short).
            • The <main> expands (flex-grow) to fill everything in between.
        */}
        <body className="flex flex-col min-h-screen">
            <Header />
            {/* Make the main area take up all available space 
                and fill the screen width. 
            */}
            <main className="flex-grow w-full">
                {/* 
                • Centers the content (mx-auto),
                • Gives horizontal breathing room (px-* responsive padding),
                • Caps the maximum width (max-w-[min(90vw,1600px)] 
                    → no ultra-wide text lines on big monitors).
                */}
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[min(90vw,1600px)]">
                    {children}
                </div>
            </main>
                
            <Footer />
        </body>
        </html>
    );
}