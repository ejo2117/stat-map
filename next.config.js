/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.resolve(__dirname, 'src/styles')],
		prependData: `@import '__importable.scss';`,
	},
};

module.exports = nextConfig
