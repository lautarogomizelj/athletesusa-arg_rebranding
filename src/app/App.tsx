import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Spinner } from "../components/feedback/spinner/Spinner";
import styles from "./App.module.css";

const AthletesUsa = lazy(() => import("../athletesusa-arg/AthletesUsa"));

const AthletesDetail = lazy(
  () => import("../athletesusa-arg/AthletesDetail"),
);

export function App() {
  return (
    <Suspense
      fallback={
        <div className={styles.loadingPage}>
          <Spinner label="Cargando" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<AthletesUsa />} />
        <Route path="/:detail" element={<AthletesDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
