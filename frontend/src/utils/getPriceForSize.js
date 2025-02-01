export const getPriceForSize = (sizes) => {
  const prioritySizes = ["Small", "Medium", "Large", "XL"];
  const currency = "Rs.";

  for (const size of prioritySizes) {
    const foundSize = sizes.find((s) => s.size === size);
    if (foundSize) {
      return currency + foundSize.price;
    }
  }

  return "Please Contact";
};
