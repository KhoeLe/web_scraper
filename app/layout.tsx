import Sidebar from "@/components/Sidebar";
import "./globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/components/ClientProvider";

export const metadata = {
    title: "Web scraper app",
    description: "Web scraper app build with Next.js and Tailwind CSS",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex bg-[#F7FBFF] h-screen ">
                <ClientProvider >
                    <Sidebar />
                    <main className="p10 max-w-full w-full nx-auto overflow-y-auto px-4 py-8">
                        <Header />
                        {children}
                    </main>
                </ClientProvider>
            </body>
        </html>
    );
}
