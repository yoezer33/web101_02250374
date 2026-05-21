import './globals.css';
import QueryProvider from '../providers/QueryProvider';

export const metadata = {
  title: 'TikTok Clone',
  description: 'TikTok clone with infinite scroll',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
         <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}