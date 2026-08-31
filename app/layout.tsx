import type {Metadata} from 'next';
import './globals.css';
import { ToastProvider } from '@/components/design-system/Toast';

export const metadata: Metadata = {
  title: 'NOEVIS AI — Understand. Practice. Master.',
  description: "Noevis turns what you're learning into a focused space to understand, practice, and master it.",
  openGraph: {
    title: 'NOEVIS AI — Understand. Practice. Master.',
    description: "Noevis turns what you're learning into a focused space to understand, practice, and master it.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOEVIS AI — Understand. Practice. Master.',
    description: "Noevis turns what you're learning into a focused space to understand, practice, and master it.",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F7F8FA] text-[#111827] antialiased" suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
