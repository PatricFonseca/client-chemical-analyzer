/** @type {import('next').NextConfig} */
const nextConfig = {
       async redirects() {
        return [
          {
            source: '/analyze',
            destination: '/pages/analyze',
            permanent: true,
          },
          {
            source: '/pricing',
            destination: '/pages/pricing',
            permanent: true,
          },

        ];
    },
    images: {
        domains: [''],
        
      },
    
};

export default nextConfig;
