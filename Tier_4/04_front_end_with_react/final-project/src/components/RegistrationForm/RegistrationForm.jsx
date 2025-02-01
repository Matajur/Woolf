import { Field, Form, Formik, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

import styles from "./RegistrationForm.module.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Min 2 symbols")
    .max(50, "Max 50 symbols")
    .required("User name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 symbols")
    .max(16, "Max 16 symbols")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+=-]*$/,
      "Password must contain letters, numbers, and special characters"
    )
    .required("Password is required"),
});

export const RegistrationForm = ({ submit }) => {
  const nameId = useId();
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
      <Form className={styles.registrationFormWrapper}>
        <div>
          <label htmlFor={nameId}>Name</label>
          <Field
            type="text"
            name="name"
            id={nameId}
            placeholder="ex. John Snow"
            className={styles.inputField}
          />
          <ErrorMessage name="name" component="span" />
        </div>
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
          Register
        </button>
      </Form>
    </Formik>
  );
};
