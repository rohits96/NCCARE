export function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded-xl border border-neutral-300 dark:border-neutral-700 
      bg-neutral-50 dark:bg-neutral-800
      hover:bg-neutral-100 dark:hover:bg-neutral-700
      transition-all duration-200 p-5 ${className}`}
      {...props}
    />
  );
}
