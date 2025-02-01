import styles from "./Options.module.css";

export const Options = ({ handleFeedback, totalFeedback }) => {
  return (
    <ul className={styles.buttonsList}>
      <li>
        <button onClick={() => handleFeedback("good")}>Good</button>
      </li>
      <li>
        <button onClick={() => handleFeedback("neutral")}>Neutral</button>
      </li>
      <li>
        <button onClick={() => handleFeedback("bad")}>Bad</button>
      </li>
      {totalFeedback > 0 && (
        <li>
          <button onClick={() => handleFeedback("reset")}>Reset</button>
        </li>
      )}
    </ul>
  );
};
