import "./index.css";

import { useState } from "react";

import Heading from "../../components/heading";
import Text from "../../components/text";
import FormInput from "../../components/formInput";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    service: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const phonePattern = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/;

    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }
    if (!formData.service) newErrors.service = "Service is required.";

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
    const validationErrors = validate();
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
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
          <FormInput
            style="full"
            name="phoneNumber"
            placeholder="Phone Number"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}

          <FormInput
            style="full"
            name="service"
            placeholder="Which service are you interested in?"
            required
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
