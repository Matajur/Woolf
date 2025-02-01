import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

import styles from "./LoginForm.module.css";

const FeedbackSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = ({ submit }) => {
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = (values, actions) => {
    submit(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={styles.loginFormWrapper}>
        <div>
          <label htmlFor={emailId}>Email</label>
          <Field
            type="email"
            name="email"
            id={emailId}
            placeholder="example@email.com"
            className={styles.inputField}
          />
          <ErrorMessage name="email" component="span" />
        </div>
        <div>
          <label htmlFor={passwordId}>Password</label>
          <Field
            type="password"
            name="password"
            id={passwordId}
            className={styles.inputField}
          />
          <ErrorMessage name="password" component="span" />
        </div>
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </Form>
    </Formik>
  );
};
