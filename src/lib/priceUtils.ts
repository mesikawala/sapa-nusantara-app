export const parsePrice = (priceString: string): number => {
  // Remove "Rp" and dots, then convert to number
  return parseInt(priceString.replace(/[^\d]/g, ''));
};

export const formatPrice = (price: number): string => {
  return `Rp ${price.toLocaleString('id-ID')}`;
};

export const calculateDiscount = (priceString: string, discountPercent: number): { original: string; discounted: string; savings: string } => {
  const originalPrice = parsePrice(priceString);
  const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
  const savings = originalPrice - discountedPrice;
  
  return {
    original: formatPrice(originalPrice),
    discounted: formatPrice(discountedPrice),
    savings: formatPrice(savings)
  };
};
