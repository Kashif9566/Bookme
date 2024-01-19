import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../api/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordCard = ({ setShowChangePasswordForm }) => {
  const user = useSelector((state) => state.user);
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("required"),
    newPassword: Yup.string().required("required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await api.put(`/user/${user.id}/changePassword`, values);
      if (response) {
        resetForm();
        toast.success("Password changed successfully!", { autoClose: 1000 });
        setShowChangePasswordForm(false);
      }
    } catch (error) {
      console.error("Error updating password", error);
      if (error.response.status === 401) {
        toast.error("Incorrect password", { autoClose: 1000 });
      }
    } finally {
      setSubmitting(false);
    }
  };
  const handleCancel = (resetForm) => {
    setShowChangePasswordForm(false);
    resetForm();
  };

  return (
    <div className="card password-card">
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm, touched, errors }) => (
          <Form>
            <div
              className={`form-group-password${
                touched.currentPassword && errors.currentPassword
                  ? " error"
                  : ""
              }`}
            >
              <label htmlFor="currentPassword">
                Current Password<span>*</span>
              </label>
              <Field
                type="password"
                id="currentPassword"
                name="currentPassword"
              />
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group-new-password">
              <label htmlFor="newPassword">
                New Password<span>*</span>
              </label>
              <Field type="password" id="newPassword" name="newPassword" />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="error-message"
              />
            </div>
            <div className="button-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleCancel(resetForm)}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default ChangePasswordCard;
