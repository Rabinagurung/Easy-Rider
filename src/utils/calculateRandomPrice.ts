export const calculateRandomPrice = (minPrice = 3, maxPrice = 10): number => {
  return Math.random() * (maxPrice - minPrice) + minPrice;
};
