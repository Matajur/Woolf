import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (value, actions) => {
    if (!value.search.trim()) {
      toast.error("Please enter a keyword to search for", {
        duration: 1500,
      });
    } else {
      onSubmit(value.search);
      actions.resetForm();
    }
  };

  return (
    <header>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <Toaster />
    </header>
  );
};
