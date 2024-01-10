import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/api";

const ListingForm = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = user.id;
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    town: "",
    postalCode: "",
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
  });
  const [loading, setLoading] = useState(false);
  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleFieldChange("image", file);
  };
  const serviceFee = 0.1 * parseFloat(formData.price);
  const formattedServiceFee = serviceFee.toFixed(2);
  const totalWithServiceFee = parseFloat(formData.price) + serviceFee;
  const youEarn = formData.price - serviceFee;

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

      const { data } = await api.post(
        `/user/${userId}/property`,
        createFormData(formData),
        config
      );
      if (data) {
        toast.success("Property listed successfully!");
        navigate("/hosting");
      } else {
        toast.error("Error listing property");
      }
    } catch (error) {
      toast.error("Error listing property");
      console.error("Error listing property:", error);
    } finally {
      setLoading(false);
    }
  };

  const createFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return formData;
  };

  const handleExit = () => {
    setFormData({
      address: "",
      city: "",
      town: "",
      postalCode: "",
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
    });
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
        <form className="form row" onSubmit={handleSubmit}>
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
                  value={formData.address}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                />
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleFieldChange("city", e.target.value)}
                />
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleFieldChange("postalCode", e.target.value)
                  }
                />
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Town"
                  value={formData.town}
                  onChange={(e) => handleFieldChange("town", e.target.value)}
                />
              </div>
              <div className="d-flex flex-column align-items-start my-1 mx-4 mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Province"
                  value={formData.province}
                  onChange={(e) =>
                    handleFieldChange("province", e.target.value)
                  }
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
                  value={formData.guest}
                  onChange={(e) => handleFieldChange("guest", e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Bedrooms</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formData.rooms}
                  onChange={(e) => handleFieldChange("rooms", e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Beds</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formData.bed}
                  onChange={(e) => handleFieldChange("bed", e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between my-1 mx-4">
                <label className="mb-2">Bathrooms</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: "300px" }}
                  value={formData.bathroom}
                  onChange={(e) =>
                    handleFieldChange("bathroom", e.target.value)
                  }
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
                  value={formData.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                />
                <input
                  type="text"
                  className="form-control my-2"
                  placeholder="Tagline"
                  value={formData.tagLine}
                  onChange={(e) => handleFieldChange("tagLine", e.target.value)}
                />
              </div>
            </div>
            <div className="card mt-4">
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
                  value={formData.description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  style={{ height: "150px" }}
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
                  value={formData.price}
                  onChange={(e) => handleFieldChange("price", e.target.value)}
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
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-secondary d-flex align-items-start"
              disabled={loading}
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

export default ListingForm;
