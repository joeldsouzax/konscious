/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["rqxsrptgvsncrqiosxdg.supabase.co"],
  },
};

module.exports = nextConfig;
