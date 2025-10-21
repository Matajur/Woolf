import { useNavigate, useLocation } from 'react-router-dom';
import css from './TabsList.module.css';

const TabsList = ({ activeTab, isOwnProfile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const allTabs = isOwnProfile
    ? [
        { key: 'my-recipes', label: 'My Recipes' },
        { key: 'favorites', label: 'Favorites' },
        { key: 'followers', label: 'Followers' },
        { key: 'following', label: 'Following' },
      ]
    : [
        { key: 'recipes', label: 'Recipes' },
        { key: 'followers', label: 'Followers' },
      ];

  //const sortedTabs = [...allTabs.filter(tab => tab.key === activeTab), ...allTabs.filter(tab => tab.key !== activeTab)];

  const handleClick = tab => {
    if (tab !== activeTab) {
      navigate(`${location.pathname}?tab=${tab}`);
    }
  };

  return (
    <div className={css.tabsWrapper}>
      {allTabs.map(tab => (
        <button key={tab.key} type="button" className={`${css.tabButton} ${tab.key === activeTab ? css.active : ''}`} onClick={() => handleClick(tab.key)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsList;
