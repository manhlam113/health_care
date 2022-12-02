import { ErrorMessage, Field, useField } from "formik";
import React from "react";
import { useState } from "react";
import countries from "../data/countries.json";

const Travel = ({ formik }) => {
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>
          {label}
          <span className="text-danger">*</span>
        </label>
        <input
          className={`form-control ${
            meta.touched && meta.error ? "border-danger" : ""
          }`}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="error text-danger">{meta.error}</div>
        ) : null}
      </>
    );
  };
  const [travel, setTravel] = useState(formik.values.travel);
  const handleAddMore = () => {
    const travelNewData = [
      ...travel,
      {
        departure: "",
        departureDate: "",
        destination: "",
        immigrationDate: "",
      },
    ];
    setTravel(travelNewData);
  };
  const handleDeleteAddMore = (e) => {
    const indexDelete = e.target.dataset.index;
    const travelClone = [...travel];
    travelClone.splice(indexDelete, 1);
    setTravel(travelClone);
  };
  const handleChange = (e) => {
    const indexData = e.target.dataset.index;
    const travelClone = [...travel];

    travelClone[indexData][e.target.name] = e.target.value;
    setTravel(travelClone);

    formik.values.travel = travel;
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h4 className="fs-5 fw-bold">Travel:</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {travel.length < 1 ? (
            <div className="d-flex align-items-center">
              <h6 className="mr-4">Do you travel in the last 14 days ?</h6>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleAddMore}
              >
                Add more
              </button>
            </div>
          ) : (
            ""
          )}
          <div className="row">
            <div className="col-lg-12">
              <div className="mt-1 mb-4 row">
                {travel?.map((item, index) => (
                  <>
                    <div className="col-lg-12">
                      <h6 className="fw-bold text-primary">
                        Travel {index + 1}
                      </h6>
                    </div>
                    <div className="mb-4 col-lg-6">
                      <label htmlFor="departure">
                        Departure
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        name="departureDate"
                        type="date"
                        className="form-control"
                        data-index={index}
                        value={item.departureDate}
                        onChange={(e) => handleChange(e)}
                      />
                      <ErrorMessage name="departure" />
                    </div>
                    <div className="mb-4 col-lg-6">
                      <label htmlFor="immigrationDate">
                        Immigration Date
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        name="immigrationDate"
                        type="date"
                        className="form-control"
                        data-index={index}
                        value={item.immigrationDate}
                        onChange={(e) => handleChange(e)}
                      />
                      <ErrorMessage name="departure" />
                    </div>
                    <div className="mb-4 col-lg-6">
                      <label htmlFor="departure">
                        Departure
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        name="departure"
                        as="select"
                        className="form-control"
                        data-index={index}
                        value={item.departure}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="">----Choose</option>
                        {countries?.map((item) => (
                          <option key={item.code} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="departure" />
                    </div>
                    <div className="mb-4 col-lg-6">
                      <label htmlFor="destination">
                        Destination
                        <span className="text-danger">*</span>
                      </label>
                      <Field
                        name="destination"
                        as="select"
                        className="form-control"
                        data-index={index}
                        value={item.destination}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="">----Choose</option>
                        {countries?.map((item) => (
                          <option key={item.code} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="departure" />
                    </div>
                    <div className="mt-4 col-lg-12 mb-4">
                      <button
                        type="button"
                        className="btn btn-warning mr-2"
                        onClick={handleAddMore}
                      >
                        Add more
                      </button>
                      <button
                        data-index={index}
                        type="button"
                        class="btn btn-danger"
                        onClick={(e) => handleDeleteAddMore(e)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Travel;
