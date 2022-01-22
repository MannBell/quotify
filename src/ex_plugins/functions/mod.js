// will use function below instead of "%", because of negative number bug
export default function mod(m, n) {
  return ((m % n) + n) % n;
}