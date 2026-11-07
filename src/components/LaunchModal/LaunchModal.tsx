import { createPortal } from "react-dom";
import type { MouseEvent } from "react";
import type { Launch } from "../../types/Launch";
import styles from "./LaunchModal.style.module.scss";

type LaunchModalProps = {
  launch: Launch;
  onClose: () => void;
};

const LaunchModal = ({ launch, onClose }: LaunchModalProps) => {
  const handleModalClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="launch-modal-title"
        onClick={handleModalClick}
      >
        <div className={styles.header}>
          <h2 id="launch-modal-title">{launch.mission_name}</h2>

          <button type="button" onClick={onClose} aria-label="Закрыть окно">
            ×
          </button>
        </div>

        {launch.links?.mission_patch ? (
          <img
            className={styles.image}
            src={launch.links.mission_patch}
            alt={launch.mission_name}
          />
        ) : (
          <p>Нет изображения</p>
        )}

        <div className={styles.info}>
          <div>
            <h3>Mission name:</h3>
            <p>{launch.mission_name}</p>
          </div>

          <div>
            <h3>Rocket name:</h3>
            <p>{launch.rocket?.rocket_name ?? "Ракета не указана"}</p>
          </div>

          <div>
            <h3>Details:</h3>
            <p>{launch.details || "Описание отсутствует"}</p>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
};

export default LaunchModal;
