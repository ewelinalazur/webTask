import "./index.css";

import { useState } from "react";

import Heading from "../../components/heading";
import Text from "../../components/text";
import FormInput from "../../components/formInput";

const errorMessages = {
  firstName: "First name is required.",
  lastName: "Last name is required.",
  phoneNumber: "Invalid phone number.",
  service: "Service is required.",
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    service: "",
  });
  const [errors, setErrors] = useState({});
  const phonePattern = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/;

  const validateField = (name, value) => {
    if (!value && errorMessages[name]) {
      return errorMessages[name];
    }

    if (name === "phoneNumber" && !phonePattern.test(value)) {
      return errorMessages.phoneNumber;
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        service: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="content">
          <Heading level={2}>Contact</Heading>
          <Text>
            Questions or concerns? Just fill out the form below and our support
            team will get back to you within 24 hours
          </Text>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex-row">
            <FormInput
              required
              name="firstName"
              placeholder="First Name"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}

            <FormInput
              required
              name="lastName"
              placeholder="Last Name"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
          <FormInput
            required
            name="phoneNumber"
            placeholder="Phone Number"
            type="tel"
            style="full"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}

          <FormInput
            required
            name="service"
            placeholder="Which service are you interested in?"
            type="text"
            style="full"
            value={formData.service}
            onChange={handleChange}
          />
          {errors.service && <span className="error">{errors.service}</span>}

          <button type="submit" className="btn">
            SUBMIT NOW
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
