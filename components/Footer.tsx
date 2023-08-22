/** @format */

import Link from "next/link";

import Container from "./Container";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const menuLinks = [
    {
      title: "FAQs",
      href: "/about/faqs",
    },
    {
      title: "Acknowledgements",
      href: "/about/acknowledgements",
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container className="py-8 lg:py-12">
        <BrandLogo className="text-lg" />

        <div className="mt-6">
          <p className="max-w-md leading-relaxed text-gray-600">
            Free open source Tailwind CSS components for marketing and eCommerce
            websites, as well as application UI.
          </p>

          <div className="mt-4 lg:flex lg:items-end lg:justify-between">
            <ul className="flex gap-4">
              {menuLinks.map((menuLink) => (
                <li key={menuLink.href}>
                  <Link href={menuLink.href}>
                    <div className="block text-sm font-medium text-gray-900 hover:opacity-75">
                      {menuLink.title}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-gray-600 lg:mt-0">
              Created by{" "}
              <a
                href="https://github.com/joeldsouzax"
                rel="noreferrer"
                target="_blank"
                className="inline-block font-medium text-gray-700 hover:text-gray-900"
              >
                Joel DSouza
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
