import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../store/auth/operations';
import { Eye, EyeOff, X } from 'lucide-react';
import css from './LoginModal.module.css';

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleOverlayClick = e => {
    if (e.target.classList.contains(css.loginModal)) {
      onClose();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      onClose();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className={css.loginModal} onClick={handleOverlayClick}>
      <form onSubmit={handleSubmit} className={css.loginForm}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={css.inputFieldsWrapper}>
          <h2>Sign in</h2>

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
          {errors.password && <div className={css.errorpassword}>{errors.password}</div>}
        </div>

        <button type="submit" className={css.signinButton} disabled={isLoading || !email || !password}>
          {isLoading ? 'Logging in...' : 'Sign in'}
        </button>

        {error && <div className={css.error}>{error}</div>}
        <button type="button" className={css.signupButton} onClick={onSwitchToRegister}>
          Don't have an account? <span>Create an account</span>
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
