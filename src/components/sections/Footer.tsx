import { Fira_Sans } from "next/font/google";

import Container from "@/components/max-width-container";
import Link from "next/link";
import Image from "next/image";

const font = Fira_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const FOOTER_INFOS = [
  {
    title: "Information",
    links: [
      { title: "FAQ", link: "/faq" },
      { title: "Blog", link: "/blog" },
      { title: "Support", link: "/support" },
      { title: "Terms", link: "/terms" },
      { title: "Privacy Policy", link: "/privacy-policy" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { title: "About", link: "/about" },
      { title: "Contact Us", link: "/contact" },
      { title: "Your Certificates", link: "/your-certificates" },
    ],
  },
  {
    title: "Certificates",
    links: [
      { title: "Birth Certificate", link: "/birth-certificate" },
      { title: "Death Certificate", link: "/death-certificate" },
      { title: "Marriage Certificate", link: "/marriage-certificate" },
      { title: "Residential Certificate", link: "/residential-certificate" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className={font.className}>
      <div className="mt-8 bg-accent/90 text-background backdrop-blur-sm">
        <Container>
          {/* Top */}
          <div className="pt-12 mb-8 grid gap-4 grid-cols-1 min-[350px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {FOOTER_INFOS.map((section, index) => (
              <ul key={index} className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold mb-2 pb-2 pr-4 border-b border-border w-fit">
                  {section.title}
                </h2>
                {section.links.map((link, i) => (
                  <Link
                    href={link.link}
                    key={i}
                    className="flex gap-2 items-center group hover:translate-x-1 duration-300"
                  >
                    <div className="w-2 h-2 bg-background rounded-full hidden group-hover:block" />
                    <li className="text-primary group-hover:text-primary/90">
                      {link.title}
                    </li>
                  </Link>
                ))}
              </ul>
            ))}

            <div className="relative max-md:hidden">
              <Image
                src="/images/Animated-Flag-Nepal.gif"
                alt="Flag-of-Nepal"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="-mt-3"
              />
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-t-border/70 flex items-center justify-between text-center py-8 text-sm max-sm:flex-col max-sm:gap-2 md:text-sm">
            <p>
              Copyright &copy; 2024 Diwash Bhattarai | Pravakar Rijal | Manish
              Dhungana | Prakash Pandey
            </p>
            <p>All Rights Reserved. Dudhpati, Bhaktapur</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
