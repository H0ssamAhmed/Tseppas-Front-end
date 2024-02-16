/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'media.strapiapp.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'active-charity-b4689a9b21.media.strapiapp.com',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
