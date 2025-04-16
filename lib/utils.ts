import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getInitials = (fullName?: string) => {
  if (!fullName) return;
  let initial = "";

  const names = fullName.split(" ");

  if (names.length === 1) {
    return names[0][0];
  }

  initial += names.map((name) => {
    return name[0];
  });

  return initial;
};

const formatCurrency = (
  amount = 0,
  options?: { currency?: string; mfm?: number }
) => {
  if (!options?.currency) {
    options = {
      ...options,
      currency: options?.currency ?? "NGN",
    };
  }
  return new Intl.NumberFormat(
    options?.currency === "NGN" ? "en-NG" : "en-US",
    {
      style: "currency",
      currency: options?.currency || "NGN",
      minimumFractionDigits: options?.mfm || 2,
    }
  ).format(amount);
};

export { formatCurrency, getInitials, cn };
