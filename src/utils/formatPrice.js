// Formats a number as XAF, e.g. 25000 -> "25 000 XAF"
export default function formatPrice(amount) {
  return `${new Intl.NumberFormat('fr-FR').format(amount)} XAF`;
}