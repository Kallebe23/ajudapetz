import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueCode() {
  const digits = "0123456789";
  let code = "";
  while (code.length < 6) {
    const randomDigit = digits[Math.floor(Math.random() * digits.length)];
    if (!code.includes(randomDigit)) {
      code += randomDigit;
    }
  }
  return Number(code);
}
