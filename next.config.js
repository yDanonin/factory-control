// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",
//         destination: "http://localhost:3001/api/v1/:path*"
//       }
//     ];
//   }
// };
// module.exports = nextConfig;

/** @type {import("next").NextConfig} */
module.exports = {
  output: "standalone"
};
