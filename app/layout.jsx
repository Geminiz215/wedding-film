import './globals.css';
import { bride, groom, dates } from '@/data/wedding';

export const metadata = {
  title: `${bride.name.toUpperCase()} & ${groom.name.toUpperCase()} — A Motion Picture (${dates.pageTitle})`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <head>
        {/* Google Fonts: Cormorant Garamond, Playfair Display, Jost */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-film-bg text-film-cream antialiased selection:bg-film-gold selection:text-film-bg">
        {children}
      </body>
    </html>
  );
}
