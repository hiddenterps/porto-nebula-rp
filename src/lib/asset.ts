/** Prefixa caminhos de /public com o basePath (necessário no GitHub Pages em subpasta). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
