import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'SAIDEV Truly Vegetarian | Restaurant & Online Food Ordering | JB Nagar',
  description: 'Order delicious vegetarian food from SAIDEV in JB Nagar, Andheri East. Explore our South Indian, Punjabi, Chinese and vegetarian specialities.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
