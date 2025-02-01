import { useDispatch, useSelector } from "react-redux";
import { RegistrationForm, Notification } from "components";
import { register } from "reduxstore";
import { selectCredentialsError } from "reduxstore";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectCredentialsError);

  const registerUser = async (userData) => {
    await dispatch(register(userData));
  };

  return (
    <div>
      <RegistrationForm submit={registerUser} />
      {error && (
        <Notification message="Failed to sign up, check the credentials provided" />
      )}
    </div>
  );
};
