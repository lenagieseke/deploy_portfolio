import createMDX from "@next/mdx";

const withMDX = createMDX({
  // remarkPlugins: [],
  // rehypePlugins: [],
});

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noai, noimageai",
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);