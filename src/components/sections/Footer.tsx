import { Fira_Sans } from "next/font/google";

import Container from "@/components/max-width-container";

const font = Fira_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const Footer = () => {
  return (
    <footer className={font.className}>
      <div className="mt-8 border-t shadow-sm border-t-border">
        <Container className="flex items-center justify-between py-12 text-xs max-sm:flex-col max-sm:gap-2 md:text-sm">
          <p>All Rights Reserved &copy; 2024</p>
          <p>
            Developed By <span className="text-accent">Diwash Bhattarai</span>
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
