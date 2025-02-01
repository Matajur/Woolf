import { useState, useEffect } from "react";
import { Description, Feedback, Notification, Options } from "components";
// components instead of ./components because of alias in vite.config.js

const zeroCounter = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const initialCounter = () => {
  const localCounter = localStorage.getItem("curCounter");
  if (localCounter !== null) {
    return JSON.parse(localCounter);
  }
  return zeroCounter;
};

function App() {
  const [counter, setCounter] = useState(initialCounter);

  useEffect(() => {
    localStorage.setItem("curCounter", JSON.stringify(counter));
  }, [counter]);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      setCounter(zeroCounter);
    } else {
      setCounter({
        ...counter,
        [feedbackType]: counter[feedbackType] + 1,
      });
    }
  };

  const totalFeedback = counter.good + counter.neutral + counter.bad;
  const positiveFeedback = Math.round((counter.good / totalFeedback) * 100)

  return (
    <>
      <Description></Description>
      <Options
        handleFeedback={updateFeedback}
        totalFeedback={totalFeedback}
      ></Options>
      {totalFeedback ? (
        <Feedback
          good={counter.good}
          neutral={counter.neutral}
          bad={counter.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        ></Feedback>
      ) : (
        <Notification></Notification>
      )}
    </>
  );
}

export default App;
