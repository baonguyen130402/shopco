import { Lato, Playfair_Display } from "next/font/google";

// Font cho tiêu đề - Playfair Display (elegant, luxury, perfect for furniture & tiles)
const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  fallback: ["Georgia", "serif"],
  display: "swap",
});

// Font cho nội dung - Lato (clean, readable, great for Vietnamese)
const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  fallback: ["system-ui", "Arial", "sans-serif"],
  display: "swap",
});

export { playfairDisplay, lato };

// Main exports with semantic names
export const displayFont = playfairDisplay;
export const bodyFont = lato;

// Backward compatibility
export const integralCF = playfairDisplay;
export const satoshi = lato;
export const inter = lato;
export const poppins = lato;
export const roboto = lato;
