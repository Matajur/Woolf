import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../../store/auth/operations';
import { Eye, EyeOff, X } from 'lucide-react';
import css from './SignupModal.module.css';

const SignUpModal = ({ onClose, onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const validateInputs = () => {
    let newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      newErrors.password = 'Password must contain letters and numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleOverlayClick = e => {
    if (e.target.classList.contains(css.signUpModal)) {
      onClose();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      await dispatch(registerThunk({ name: username, email, password })).unwrap();
      onClose();
    } catch (err) {
      setErrorMessage(err.response?.data?.message);
    }
  };

  return (
    <div className={css.signUpModal} onClick={handleOverlayClick}>
      <form onSubmit={handleSubmit} className={css.signUpForm}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        <h2>Sign Up</h2>
        {(errorMessage || error) && <div className={css.errorServer}>{errorMessage || error}</div>}

        <div className={css.inputFieldsWrapper}>
          <label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username*"
              className={`${css.inputField} ${errors.username ? css.inputError : ''}`}
            />
            {errors.username && <div className={css.error}>{errors.username}</div>}
          </label>

          <label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email*"
              className={`${css.inputField} ${errors.email ? css.inputError : ''}`}
            />
            {errors.email && <div className={css.error}>{errors.email}</div>}
          </label>

          <label className={css.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className={`${css.inputField} ${errors.password ? css.inputError : ''}`}
              required
            />
            <button type="button" className={css.eyeButton} onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>
          {errors.password && <div className={css.error}>{errors.password}</div>}
        </div>

        <button type="submit" className={css.signUpButton} disabled={isLoading || !username || !email || !password}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <button type="button" className={css.signinButton} onClick={onSwitchToLogin}>
          I already have an account? <span>Sign in</span>
        </button>
      </form>
    </div>
  );
};

export default SignUpModal;
