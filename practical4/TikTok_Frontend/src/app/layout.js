import './globals.css';
import MainLayout from '../components/layout/MainLayout';
import Providers from '../components/Providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
