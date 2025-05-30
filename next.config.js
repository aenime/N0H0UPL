module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  env: {
    API_URL: process.env.API_URL, // Example of using environment variables
    NEXT_PUBLIC_UPI: process.env.UPI, // Expose UPI environment variable to the client side
  },
  webpack: (config, { dev, isServer }) => {
    // Polyfills commented out for modern browser compatibility
    // Only load polyfills for the client-side bundle
    // if (!isServer) {
    //   const originalEntry = config.entry;
    //   config.entry = async () => {
    //     const entries = await originalEntry();
    //     
    //     // Add polyfills before your code
    //     if (entries['main.js'] && !entries['main.js'].includes('./src/polyfills.js')) {
    //       entries['main.js'].unshift('./src/polyfills.js');
    //     }
    //     
    //     return entries;
    //   };
    // }

    // Disable webpack cache in development to prevent serialization issues
    if (dev) {
      config.cache = false;
    }

    return config;
  }
};