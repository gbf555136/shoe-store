const formatPrice = (price) => {
  let newPrice = Number(price).toLocaleString("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
  });
  return newPrice;
};

export default formatPrice;
