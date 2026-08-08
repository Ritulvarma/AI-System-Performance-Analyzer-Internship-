import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI System Performance Analyzer & Intelligent Optimization Assistant',
  description: 'Continuous browser & device performance telemetry analyzer, interactive dependency graph, and AI optimization recommendations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050816] text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
