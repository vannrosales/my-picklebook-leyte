export function formatCurrency(amount) {
    if (!amount && amount !== 0) return '₱0.00';
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(amount);
}