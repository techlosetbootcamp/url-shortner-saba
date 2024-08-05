// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     env: {
//       DATABASE_URL: process.env.DATABASE_URL,
//       NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
//       // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//       EMAIL_USERNAME: process.env.EMAIL_USERNAME,
//       EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
//     },


//     images: {
//       domains: ['www.google.com'],
//     },
//   };
  
//   export default  nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

  