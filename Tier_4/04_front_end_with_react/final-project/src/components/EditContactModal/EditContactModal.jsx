import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./EditContactModal.module.css";

Modal.setAppElement("#root");

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

export const EditContactModal = ({
  isOpen,
  onRequestClose,
  contact,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "300px",
          background: "gray",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <h2 className={styles.modalTitle}>Edit Contact</h2>
      <Formik
        initialValues={{ name: contact.name, number: contact.number }}
        validationSchema={FeedbackSchema}
        onSubmit={(values) => {
          onConfirm(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.editForm}>
            <div>
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <label htmlFor="number">Number</label>
              <Field
                type="tel"
                id="number"
                name="number"
                className={styles.input}
              />
              <ErrorMessage
                name="number"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.confirmButton}
                disabled={isSubmitting}
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={onRequestClose}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
