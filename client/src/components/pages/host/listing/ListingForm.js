import React from "react";
import { FaHome } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/api";
import { useFormik } from "formik";
import { listingSchema } from "../../../schemas/ListingSchema";

const ListingForm = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = user.id;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  };

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      town: "",
      province: "",
      image: "",
      guest: 1,
      rooms: 1,
      bed: 1,
      bathroom: 1,
      title: "",
      description: "",
      price: "",
      tagLine: "",
      discount: 0,
    },
    validationSchema: listingSchema,
    onSubmit: async (values) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await api.post(
          `/user/${userId}/property`,
          createFormData(values),
          config
        );
        if (data) {
          toast.success("Property listed successfully!");
          navigate("/hosting/listing");
        } else {
          toast.error("Error listing property");
        }
      } catch (error) {
        toast.error("Error listing property");
        console.error("Error listing property:", error);
      }
    },
  });

  const createFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };
  const serviceFee = 0.1 * parseFloat(formik.values.price);
  const formattedServiceFee = serviceFee.toFixed(2);
  const totalWithServiceFee = parseFloat(formik.values.price) + serviceFee;
  const youEarn = formik.values.price - serviceFee;

  const discountPercentage = parseFloat(formik.values.discount) || 0;
  const discountAmount = (discountPercentage / 100) * youEarn;
  const priceAfterDiscount = youEarn - discountAmount;

  const handleExit = () => {
    formik.resetForm();
    navigate("/hosting/listing");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mx-2 my-5">
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>
          <FaHome /> Bookme.com
        </span>
        <button
          style={{
            border: "1px solid black",
            borderRadius: "20px",
            padding: "6px 15px 6px 15px",
          }}
          onClick={handleExit}
        >
          Exit
        </button>
      </div>
      <div>
        <span
          className="col-md-12"
          style={{
            fontSize: "30px",
            fontWeight: 500,
          }}
        >
          New Listing
        </span>
        <form className="form row" onSubmit={formik.handleSubmit}>
          <div className="col-md-7">
            <div className="card mt-4">
              <div className="card-header d-flex flex-column p-3">
                <span style={{ fontSize: "20px", fontWeight: 500 }}>
                  Where's your place located?
                </span>
                <span style={{ fontSize: "14px", fontWeight: 320 }}>
                  Your address is only shared with guests after they’ve made a
                  reservation.
                </span>
              </div>

              <div className="d-flex flex-column align-items-start my-1 mx-4 mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Street Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="address"
                />
                {formik.touched.address && formik.errors.address ? (
                  <div style={{ color: "red" }}>{formik.errors.address}</div>
                ) : null}
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="city"
                />
                {formik.touched.city && formik.errors.city ? (
                  <div style={{ color: "red" }}>{formik.errors.city}</div>
                ) : null}
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Town"
                  value={formik.values.town}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="town"
                />
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4 mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Province"
                  value={formik.values.province}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="province"
                />
              </div>
            </div>
            <div className="card my-3">
              <div className="d-flex flex-column align-items-start my-3 mx-4">
                <label className="mb-2">
                  <b>Media</b>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input"
                />
              </div>
            </div>
            <div className="card my-3">
              <div className="card-header d-flex flex-column p-3">
                <span style={{ fontSize: "20px", fontWeight: 500 }}>
                  Share some basics about your place
                </span>
                <span style={{ fontSize: "14px", fontWeight: 320 }}>
                  You'll add more details later, like bed types.
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Guest allowed</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formik.values.guest}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="guest"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Bedrooms</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formik.values.rooms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="rooms"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Beds</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formik.values.bed}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="bed"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Bathrooms</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formik.values.bathroom}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="bathroom"
                />
              </div>
            </div>
            <div className="card my-3">
              <div className="card-header d-flex flex-column justify-content-center align-items-center p-3">
                <div style={{ fontsize: "40px", fontWeight: 700 }}>
                  Tell something about your palce
                </div>
                <span
                  style={{
                    fontsize: "30px",
                    fontWeight: 400,
                    color: "#777777",
                  }}
                >
                  Describe yout place shortly
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column align-items-start my-1 mx-4 mb-2">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Write here ...!"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="description"
                  style={{ height: "150px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card mt-4">
              <div className="card-header d-flex flex-column justify-content-center align-items-center p-3">
                <div style={{ fontsize: "40px", fontWeight: 700 }}>
                  Give your house a title
                </div>
                <span
                  style={{
                    fontsize: "30px",
                    fontWeight: 400,
                    color: "#777777",
                  }}
                >
                  Short titles work best
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column align-items-start my-1 mx-4 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="title"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div style={{ color: "red" }}>{formik.errors.title}</div>
                ) : null}
                <input
                  type="text"
                  className="form-control my-2"
                  placeholder="Tagline"
                  value={formik.values.tagLine}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="tagLine"
                />
              </div>
            </div>

            <div className="card my-3">
              <div className="card-header d-flex flex-column justify-content-center align-items-center p-3">
                <div style={{ fontsize: "40px", fontWeight: 700 }}>
                  Set your price
                </div>
                <span
                  style={{
                    fontsize: "30px",
                    fontWeight: 400,
                    color: "#777777",
                  }}
                >
                  You can change it anytime.
                </span>
              </div>

              <hr />
              <div className="d-flex flex-column  my-1 mx-4 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="price"
                />
                {formik.touched.price && formik.errors.price ? (
                  <div style={{ color: "red" }}>{formik.errors.price}</div>
                ) : null}
                <div className="d-flex flex-column mx-2 mt-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Base Price</span>
                    <span>${formik.values.price}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Service Fee</span>
                    <span>${formattedServiceFee}</span>
                  </div>
                  <hr
                    style={{
                      width: "100%",
                      borderTop: "1px solid black",
                      margin: "20px 0",
                    }}
                  />
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Guest price before taxes</span>
                    <span>${totalWithServiceFee}</span>
                  </div>
                </div>

                <div
                  className="card p-3 mt-4"
                  style={{ width: "100%", borderRadius: "15px" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ fontsize: "15px", fontWeight: 700 }}
                  >
                    <span>You Earn</span>
                    <span>${youEarn}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header d-flex flex-column justify-content-center align-items-center p-3">
                <span style={{ fontSize: "20px", fontWeight: 500 }}>
                  Exclusive Property Discounts!
                </span>
                <span
                  style={{
                    fontsize: "30px",
                    fontWeight: 400,
                    color: "#777777",
                  }}
                >
                  Discover amazing deals on our featured properties.
                </span>
              </div>
              <div className="card-body">
                <label className="mx-4 my-1" style={{ fontWeight: 600 }}>
                  Discount
                </label>
                <div className="m-3">
                  <input
                    type="text"
                    className="form-control p-2"
                    placeholder="Discount (%)"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="discount"
                  />
                  {formik.touched.discount && formik.errors.discount ? (
                    <div style={{ color: "red" }}>{formik.errors.discount}</div>
                  ) : null}
                </div>
                <div
                  className="card p-3 mt-4"
                  style={{ width: "100%", borderRadius: "15px" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ fontsize: "15px", fontWeight: 700 }}
                  >
                    <span>After Discount Price</span>
                    <span>${priceAfterDiscount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-secondary d-flex align-items-start"
              disabled={formik.isSubmitting}
              style={{ backgroundColor: "#ff385d ", border: "0px" }}
            >
              {formik.isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListingForm;
