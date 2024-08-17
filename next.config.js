/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	rewrites: async () => {
		return [
			{
				source: '/api/:path*',
				destination:
					process.env.NODE_ENV === 'development'
						? 'http://127.0.0.1:5000/api/:path*'
						: '/api/',
			},
		]
	},
	sassOptions: {
		includePaths: [path.resolve(__dirname, 'src/styles')],
		prependData: `@import '__importable.scss';`,
	},
};

module.exports = nextConfig
