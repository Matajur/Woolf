import { useDispatch, useSelector } from "react-redux";
import { LoginForm, Notification } from "components";
import { login } from "reduxstore";
import { selectCredentialsError } from "reduxstore";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectCredentialsError);

  const loginUser = async (userData) => {
    await dispatch(login(userData));
  };

  return (
    <div>
      <LoginForm submit={loginUser} />
      {error && (
        <Notification message="Failed to log in, check your credentials" />
      )}
    </div>
  );
};
