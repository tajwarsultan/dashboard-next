import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Company Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <TopBar />
        <div className="flex lg:gap-10 p-4">
          <div>
            <Sidebar />
          </div>
          <div className="pt-24 mt-10 lg:p-4 max-w-full mx-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
