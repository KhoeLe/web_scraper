import Sidebar from "@/components/Sidebar";
import "./globals.css";

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
            <body className="flex bg-[#F7FBFF] h-screen">
                <Sidebar />
                <main className="p10 max-w-7xl w-full  nx-auto overflow-y-auto ">{children}</main>
            </body>
        </html>
    );
}
