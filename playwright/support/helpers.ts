export function generateOrderCode(prefix = 'VLO') {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
  
    const pick = (chars, length) =>
      Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  
    return `${prefix}-${pick(letters, 3)}${pick(digits, 3)}`;
  }
  