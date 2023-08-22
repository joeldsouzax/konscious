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
      <Container className="py-8 lg:py-12"></Container>
    </footer>
  );
}
