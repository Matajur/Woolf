import css from './ListItems.module.css';
import { RecipePreview, UserCard } from 'components/User';

const ListItems = ({ tab, items, onDelete = () => {} }) => {
  const getEmptyMessage = () => {
    switch (tab) {
      case 'my-recipes':
        return 'Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.';
      case 'favorites':
        return 'Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.';
      case 'followers':
        return 'There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.';
      case 'following':
        return 'Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.';
      default:
        return 'No items to display.';
    }
  };

  if (!items || items.length === 0) {
    return <div className={css.empty}>{getEmptyMessage()}</div>;
  }

  const renderContent = () => {
    if (['my-recipes', 'favorites', 'recipes'].includes(tab)) {
      return items.map(recipe => <RecipePreview key={recipe.id} data={recipe} tab={tab} onDelete={onDelete} />);
    }

    if (['followers', 'following'].includes(tab)) {
      return items.map(user => <UserCard key={user.id} user={user} tab={tab} />);
    }

    return null;
  };

  return <div className={css.itemsGrid}>{renderContent()}</div>;
};

export default ListItems;
