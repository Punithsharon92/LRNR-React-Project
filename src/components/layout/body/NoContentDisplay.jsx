import styles from "./NoContentDisplay.module.css";

const NoContentDisplay = () => {
  return (
    <div className={styles["no-content"]}>
      Click On a <strong>Leaf</strong> on the <strong>All</strong> tab to Show
      Content
      <p>
        <small>
          If there is no leaf, You can Create one by creating a container ➟
          sub-container ➟ leaf.
        </small>
      </p>
    </div>
  );
};

export default NoContentDisplay;
