import { useEffect, useReducer } from "react";
import { Loader } from "@mantine/core";
import type { Launch, LaunchesResponse } from "./types/Launch";
import { initialState, launchesReducer } from "./reducers/launchesReducer";
import LaunchList from "./components/LaunchList/LaunchList";
import LaunchModal from "./components/LaunchModal/LaunchModal";
import styles from "./App.style.module.scss";

const App = () => {
  const [state, dispatch] = useReducer(launchesReducer, initialState);
  const { launches, loading, error, selectedLaunch } = state;

  useEffect(() => {
    const controller = new AbortController();

    const fetchLaunches = async () => {
      try {
        const response = await fetch(
          "https://kata-spacex.onrender.com/api/launches",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Не удалось загрузить запуски");
        }

        const data: LaunchesResponse = await response.json();

        dispatch({
          type: "launches_loaded",
          payload: data.launches,
        });
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        dispatch({
          type: "request_failed",
          payload: "Не удалось загрузить запуски. Обновите страницу.",
        });
      }
    };

    fetchLaunches();

    return () => {
      controller.abort();
    };
  }, []);

  const handleSelectLaunch = (launch: Launch) => {
    dispatch({
      type: "launch_selected",
      payload: launch,
    });
  };

  const handleCloseModal = () => {
    dispatch({
      type: "modal_closed",
    });
  };

  let content;

  if (loading) {
    content = (
      <div className={styles.message} role="status">
        <Loader />
        <p>Загрузка запусков...</p>
      </div>
    );
  } else if (error) {
    content = <p role="alert">{error}</p>;
  } else if (launches.length === 0) {
    content = <p>Запуски не найдены</p>;
  } else {
    content = <LaunchList launches={launches} onSelect={handleSelectLaunch} />;
  }

  return (
    <main className={styles.app}>
      <h1>SpaceX Launches</h1>

      {content}

      {selectedLaunch && (
        <LaunchModal launch={selectedLaunch} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default App;
