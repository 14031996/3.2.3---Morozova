import { Button, Card } from "@mantine/core";
import type { Launch } from "../../types/Launch";
import styles from "./LaunchCard.style.module.scss";

type LaunchCardProps = {
  launch: Launch;
  onSelect: (launch: Launch) => void;
};

const LaunchCard = ({ launch, onSelect }: LaunchCardProps) => {
  const handleSeeMore = () => {
    onSelect(launch);
  };

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        {launch.links?.mission_patch_small ? (
          <img
            className={styles.image}
            src={launch.links.mission_patch_small}
            alt={launch.mission_name}
          />
        ) : (
          <span>Нет изображения</span>
        )}
      </div>

      <h2 className={styles.name} title={launch.mission_name}>
        {launch.mission_name}
      </h2>

      <p className={styles.rocket}>
        {launch.rocket?.rocket_name ?? "Ракета не указана"}
      </p>

      <Button fullWidth onClick={handleSeeMore}>
        See more
      </Button>
    </Card>
  );
};

export default LaunchCard;
