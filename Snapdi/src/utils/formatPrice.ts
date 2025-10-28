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

/**
 * Format number price for display with thousand separators (dots)
 * @param value - The numeric price value
 * @returns Formatted price string with dots as thousand separators
 * Example: 1000000 -> "1.000.000"
 */
export function formatPriceDisplay(value: number | string | undefined | null): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const numValue = typeof value === 'string' ? parseInt(value, 10) : value;

  if (isNaN(numValue)) {
    return '';
  }

  return `${numValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Parse formatted price string (with dots) back to numeric value
 * @param value - The formatted price string
 * @returns Numeric value without dots
 * Example: "1.000.000" -> "1000000"
 */
export function parsePriceDisplay(value: string | undefined | null): string {
  if (!value) {
    return '';
  }

  return value.replace(/\./g, '');
}