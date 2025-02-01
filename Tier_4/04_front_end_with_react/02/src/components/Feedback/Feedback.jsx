import styles from "./Feedback.module.css";

export const Feedback = ({
  good,
  neutral,
  bad,
  totalFeedback,
  positiveFeedback,
}) => {
  return (
    <ul className={styles.feedbackList}>
      <li>Good: {good}</li>
      <li>Neutral: {neutral}</li>
      <li>Bad: {bad}</li>
      <li>Total: {totalFeedback}</li>
      <li>Positive: {positiveFeedback}%</li>
    </ul>
  );
};
