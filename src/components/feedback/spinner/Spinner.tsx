import styles from "./Spinner.module.css";

type SpinnerProps = {
  label?: string;
};

export function Spinner({ label = "Loading" }: SpinnerProps) {
  return (
    <span className={styles.wrapper} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

