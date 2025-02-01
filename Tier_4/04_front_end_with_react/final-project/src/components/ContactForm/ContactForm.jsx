import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { addContact } from "reduxstore";

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

export const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();

  const addNewContact = async (newContact) => {
    const result = await dispatch(addContact(newContact));
    if (addContact.fulfilled.match(result)) {
      toast.success("Contact added successfully!");
    } else if (addContact.rejected.match(result)) {
      toast.error(result.payload || "Failed to add contact");
    }
  };

  const handleSubmit = (values, actions) => {
    addNewContact(values);
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
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="ex. John Snow"
            className={styles.inputField}
          />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            type="tel"
            name="number"
            id={numberFieldId}
            placeholder="ex. 777-66-55"
            className={styles.inputField}
          />
          <ErrorMessage name="number" component="span" />
        </div>
        <button type="submit" className={styles.submitButton}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
