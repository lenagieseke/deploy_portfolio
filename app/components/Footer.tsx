// components/Footer.tsx

import TextSmall from "./TextSmall";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString("de-DE", {
    year: "numeric",
    month: "short",
  });

  return (
    <footer className="site-footer">
      <div className="footer-content">
        
          <p>© {currentYear} Lena Gieseke | <a href="/impressum" className="underline">Impressum</a></p>
          <TextSmall text={`Last update: ${currentDate} | Scraping or use in AI training prohibited.`} />
          <p>Made in Babelsberg with ❤️</p>
     </div>
      
    </footer>
  );
};

export default Footer;