import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../api/api";

const EditListing = () => {
  const { propertyId } = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [prevImageURL, setPrevImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    town: "",
    province: "",
    image: null,
    guest: 1,
    rooms: 1,
    bed: 1,
    bathroom: 1,
    title: "",
    description: "",
    price: 0,
    tagLine: "",
    discount: 0,
  });

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        if (propertyId) {
          const { data } = await api.get(`/property/${propertyId}`, config);
          setPrevImageURL(data.image);
          setFormData((prevData) => ({ ...prevData, ...data }));
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchPropertyData();
  }, [propertyId, user.token, user.id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPrevImageURL(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        image: null,
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const requiredFields = ["address", "city", "province", "price"];
      if (requiredFields.some((field) => !formData[field])) {
        toast.error("Please provide necessary information");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const formDataObject = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataObject.append(key, value);
      }

      const { response } = await api.put(
        `/property/${propertyId}/editProperty`,
        formDataObject,
        config
      );
      if ({ response }) {
        toast.success("Listing saved successfully!");
        navigate("/hosting/listing");
      } else {
        toast.error("Error saving listing. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExit = () => {
    navigate("/hosting/listing");
  };

  const serviceFee = 0.1 * parseFloat(formData.price);
  const formattedServiceFee = serviceFee.toFixed(2);
  const totalWithServiceFee = parseFloat(formData.price) + serviceFee;
  const youEarn = formData.price - serviceFee;
  const discountPercentage = parseFloat(formData.discount) || 0;
  const discountAmount = (discountPercentage / 100) * youEarn;
  const priceAfterDiscount = youEarn - discountAmount;
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
        <form
          className="form row"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
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
                  name="address"
                  className="form-control"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4">
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4">
                <input
                  type="text"
                  name="town"
                  className="form-control"
                  placeholder="Town"
                  value={formData.town}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4 mb-4">
                <input
                  type="text"
                  name="province"
                  className="form-control"
                  placeholder="Province"
                  value={formData.province}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="card my-3">
              <div className="d-flex flex-column align-items-start my-3 mx-4">
                <label className="mb-2">
                  <b>Media</b>
                </label>
                {prevImageURL && (
                  <img
                    src={prevImageURL}
                    alt="Previous"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  />
                )}
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
                  name="guest"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formData.guest}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Bedrooms</label>
                <input
                  type="text"
                  name="rooms"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formData.rooms}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Beds</label>
                <input
                  type="text"
                  name="bed"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formData.bed}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Bathrooms</label>
                <input
                  type="text"
                  name="bathroom"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formData.bathroom}
                  onChange={handleChange}
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
                  name="description"
                  className="form-control"
                  placeholder="Write here ...!"
                  value={formData.description}
                  onChange={handleChange}
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
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="tagLine"
                  className="form-control my-2"
                  placeholder="Tagline"
                  value={formData.tagLine}
                  onChange={handleChange}
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
                  name="price"
                  className="form-control"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                />
                <div className="d-flex flex-column mx-2 mt-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Base Price</span>
                    <span>${formData.price}</span>
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
                    value={formData.discount}
                    onChange={handleChange}
                    name="discount"
                  />
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
              disabled={loading}
              style={{ backgroundColor: "#ff385d ", border: "0px" }}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditListing;
