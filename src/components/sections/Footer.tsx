import { Fira_Sans } from "next/font/google";

import Container from "@/components/max-width-container";

const font = Fira_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const Footer = () => {
  return (
    <footer className={font.className}>
      <div className="mt-8 border-t shadow-sm border-t-border">
        <div className="bg-muted">
          <Container className="flex items-center justify-between text-center py-8 text-sm max-sm:flex-col max-sm:gap-2 md:text-sm">
            <p>
              Copyright &copy; 2024 Government of Nepal, National Information
              Technology Center (NITC).
            </p>
            <p>All Rights Reserved. Dudhpati, Bhaktapur</p>
          </Container>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
