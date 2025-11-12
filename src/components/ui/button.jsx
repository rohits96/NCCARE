export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
