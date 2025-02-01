import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useId } from "react";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Min 2 symbols")
    .max(50, "Max 50 symbols")
    .required("Contact name is required"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      "Phone number must be in the format 777-66-55"
    )
    .required("Contact phone number is required"),
});

const initialValues = {
  name: "",
  number: "",
};

export const ContactForm = ({ addContact }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      ...values,
    };

    addContact(newContact);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={styles.contactFormWrapper}>
        <div>
          <label className={styles.inputLabel} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={styles.inputField}
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="ex. John Snow"
          />
          <ErrorMessage name="name" component="span" />
        </div>

        <div>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={styles.inputField}
            type="tel"
            name="number"
            id={numberFieldId}
            placeholder="ex. 777-66-55"
          />
          <ErrorMessage name="number" component="span" />
        </div>

        <button className={styles.submitButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
