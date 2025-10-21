import React, { useState, useRef, useEffect } from 'react';
import css from './Dropdown.module.css';
import clsx from 'clsx';
import { Icon } from 'components/UI';

const Dropdown = ({ options = [],value, onChange, placeholder = 'Select...', clearable, className = '', isAddRecipeForm = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSelect = option => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = e => {
    e.stopPropagation();
    onChange(null);
    setIsOpen(false);
  };

  const handleClickOutside = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={clsx(css.dropdown, className)} ref={dropdownRef}>
      <div className={clsx(css.trigger, { [css.open]: isOpen })} onClick={() => setIsOpen(prev => !prev)}>
        <span className={clsx(!value && isAddRecipeForm && css.placeholderText)}>{value ? value.label : placeholder}</span>

        {clearable && value && <Icon name="icon-close" className={css.clearBtn} onClick={handleClear} />}

        <Icon name="icon-chevron-down" className={clsx(css.arrow, { [css.arrowRotated]: isOpen })} />
      </div>
      {isOpen && (
        <ul className={css.menu}>
          {options.map(option => (
            <li
              key={option.value}
              className={clsx(css.item, {
                [css.selected]: option.value === value?.value,
              })}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
