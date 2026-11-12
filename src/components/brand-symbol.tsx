import type { SVGProps } from "react";

export const brandSilhouette = "M2 10.5 13.5 17v3a6 6 0 0 0 12 0v-9.5L39 2v17.5a18.5 18.5 0 0 1-37 0z";

export function BrandSymbol(props: SVGProps<SVGSVGElement>) {
  return <svg width="39" height="39" viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
    <path d={brandSilhouette} fill="#9d5cf1" />
    <path d="M2 10.5 13.5 17v3a6 6 0 0 0 6 6c-1 5-5.5 8-10.5 7A18 18 0 0 1 2 19.5z" fill="#d7a5ff" />
    <path d="M25.5 10.5 39 2v17.5c-2.7 3-7.8 4.5-13.8 2.6.2-.7.3-1.4.3-2.1z" fill="#7c36e3" />
  </svg>;
}
