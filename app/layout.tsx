import type {Metadata} from 'next';
import './globals.css';
import { ToastProvider } from '@/components/design-system/Toast';

export const metadata: Metadata = {
  title: 'NOEVIS AI — Design System Foundation',
  description: 'Design System Foundation for NOEVIS AI — V1 Phase 0',
  openGraph: {
    title: 'NOEVIS AI — Design System Foundation',
    description: 'Design System Foundation for NOEVIS AI — V1 Phase 0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOEVIS AI — Design System Foundation',
    description: 'Design System Foundation for NOEVIS AI — V1 Phase 0',
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
