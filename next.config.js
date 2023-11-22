/** @type {import('next').NextConfig} */
const path = require('path')
const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: "\\.(less|css|scss|sass|styl)$"
})

module.exports = removeImports({

  webpack(config, options) {

    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // API_URL: "https://newbiedev-pqvws.appengine.bfcplatform.vn",
    API_URL: "http://localhost:8080",
    CLOUDINARY_API_SECRET:"OIWHGrV7hie39xOFzyXEEGRK1_U",
    CLOUDINARY_API_KEY:"821581197431544",
    CLOUDINARY_NAME:"dtwezwufx",
    CLOUDINARY_API_EV:"CLOUDINARY_URL=cloudinary://821581197431544:OIWHGrV7hie39xOFzyXEEGRK1_U@dtwezwufx"
  },
  images: {
    loader: 'imgix',
    path: '',
  }
})
