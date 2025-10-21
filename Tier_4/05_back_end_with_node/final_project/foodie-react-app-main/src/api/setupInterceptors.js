import { api } from './configApi';
import { forceLogout } from '../store/auth/slice';
import toast from 'react-hot-toast';

export const setupInterceptors = store => {
  api.interceptors.response.use(
    response => response,
    error => {
      const hasToken = !!api.defaults.headers.common['Authorization'];

      if (error.response?.status === 401 && hasToken) {
        store.dispatch(forceLogout());
        toast.error('Session expired');
      }

      return Promise.reject(error);
    }
  );
};
