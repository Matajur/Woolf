// import "./App.module.css";
import friends from "../friends.json";
import userData from "../userData.json";
import transactions from "../transactions.json";
import FriendList from "./FriendList/FriendList.jsx";
import Profile from "./Profile/Profile.jsx";
import TransactionHistory from "./TransactionHistory/TransactionHistory.jsx"

const App = () => {
  return (
    <>
      <Profile
        name={userData.username}
        tag={userData.tag}
        location={userData.location}
        image={userData.avatar}
        stats={userData.stats}
      />
      <FriendList friends={friends} />
      <TransactionHistory items={transactions} />
    </>
  );
};

export default App;
