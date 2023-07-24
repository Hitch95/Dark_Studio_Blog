/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
                    "images.pexels.com", "res.cloudinary.com", 
                    "cdn.dribbble.com", "example.com", 
                    "venngage-wordpress.s3.amazonaws.com",
                    "f.hellowork.com", "plus.unsplash.com"
                ],
    },
};

module.exports = nextConfig;