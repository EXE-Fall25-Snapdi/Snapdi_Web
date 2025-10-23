export function formatPrice(price: string): string {
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return 'Invalid price';
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(numericPrice);
}