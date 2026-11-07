import type { Launch } from "../../types/Launch";
import LaunchCard from "../LaunchCard/LaunchCard";
import styles from "./LaunchList.style.module.scss";

type LaunchListProps = {
  launches: Launch[];
  onSelect: (launch: Launch) => void;
};

const LaunchList = ({ launches, onSelect }: LaunchListProps) => {
  return (
    <div className={styles.list}>
      {launches.map((launch) => (
        <LaunchCard
          key={launch.flight_number}
          launch={launch}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default LaunchList;
