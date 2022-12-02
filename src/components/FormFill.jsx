import React from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import countries from "../data/countries.json";
import vietNamData from "../data/vietnam-province-district.json";
import Travel from "./Travel";

const FormFill = ({ dataForm, setDataForm, setEdit, edit }) => {
  const navigator = useNavigate();
  const params = useParams();
  const IdEdit = params.id;
  const handleEditValues = (IdEdit, dataForm) => {
    const res = [...dataForm].filter((item) => {
      return item.id === Number(IdEdit);
    });
    return res[0];
  };
  const editValues = handleEditValues(IdEdit, dataForm);
  const MyTextInput = ({ label, ...props }) => {
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
  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>
          {label}
          <span className="text-danger">*</span>
        </label>
        <select
          {...field}
          {...props}
          className={`form-control ${
            meta.touched && meta.error ? "border-danger" : ""
          }`}
        />
        {meta.touched && meta.error ? (
          <div className="error text-danger">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const handleProvince = (vietNamData) => {
    const provinceArr = [];
    for (let item in vietNamData) {
      //   console.log(vietNamData[item]);
      provinceArr.push(vietNamData[item]);
    }
    return provinceArr;
  };
  const handleDistrict = (provinceData, provinceValue) => {
    if (provinceValue) {
      const newDistrict = provinceData.filter((item) => {
        return item.name === provinceValue;
      });
      const districtCities = newDistrict[0].cities;
      const arrDistrict = [];
      for (let item in districtCities) {
        arrDistrict.push(districtCities[item]);
      }
      return arrDistrict;
    } else {
      return [];
    }
  };
  const provinceData = handleProvince(vietNamData);
  const initialValues = {
    id: Date.now(),
    fullName: "",
    object: "",
    date: "",
    gender: "",
    nationality: "",
    nationId: "",
    travel: [],
    province: "",
    district: "",
    address: "",
    email: "",
    phone: "",
    symptoms: "",
    vaccines: "",
  };
  const today = new Date();
  const mobileRules =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Name is required "),
    object: Yup.string().required("Object is required"),
    date: Yup.date().max(today).required("BirthDay is required"),
    gender: Yup.string().required("Gender is required"),
    nationality: Yup.string().required("Nationality is required"),
    nationId: Yup.string().required("ID is required"),
    address: Yup.string().required("Address is required "),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required "),
    phone: Yup.string()
      .matches(mobileRules, "mobie phone is not valid")
      .required("Mobile Phone is required "),
    province: Yup.string().required("Province is required"),
    district: Yup.string().required("District is required"),
  });
  return (
    <Formik
      initialValues={editValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (editValues) {
          for (let i = 0; i < dataForm.length; i++) {
            if (dataForm[i].id === values.id) {
              dataForm[i] = values;
            }
          }
          setDataForm(dataForm);
          setEdit(edit + 1);
          navigator("/table");
        } else {
          setDataForm([...dataForm, values]);
          setEdit(edit + 1);
          navigator("/table");
        }
      }}
      enableReinitialize
    >
      {(formik) => (
        <>
          <div className="pt-4 mb-3 row">
            <div className="col-lg-12">
              <h2 className="fs-2 text-center text-success">
                MEDICAL DECLARATION FORM FOR FOREIGN ENTRY
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="">
                <Form>
                  <div className="row">
                    <div className="col-lg-12">
                      <h4 className="fs-5 fw-bold">Personal information:</h4>
                    </div>
                  </div>
                  {/* FullName */}
                  <div className="mb-4 row">
                    <div className="col-lg-12">
                      <div className="">
                        <MyTextInput
                          label="Full Name"
                          name="fullName"
                          type="text"
                          placeholder="Full Name..."
                        />
                      </div>
                    </div>
                  </div>
                  {/* end fullName */}
                  {/* Object */}
                  <div className="mb-4 row">
                    <div className="col-lg-6">
                      <div className="">
                        <MySelect label="Object" name="object">
                          <option value="">-----Choose</option>
                          <option value="Expert">Expert</option>
                          <option value="Vietnamese">Vietnamese</option>
                          <option value="International Student">
                            International Student
                          </option>
                          <option value="Other">Other</option>
                        </MySelect>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="">
                        <MyTextInput
                          type="date"
                          name="date"
                          label="Date of birth"
                        ></MyTextInput>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <MySelect label="Gender" name="gender">
                        <option value="">-----Choose</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </MySelect>
                    </div>
                  </div>
                  {/* end Object */}
                  {/* =====Nation======= */}
                  <div className="mb-4 row">
                    <div className="col-lg-6">
                      <div>
                        <MySelect label="Nationality" name="nationality">
                          <option value="">----Choose</option>
                          {countries?.map((item) => (
                            <option key={item.code} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </MySelect>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <MyTextInput
                        name="nationId"
                        label="Nation ID or Passport ID"
                        placeholder="Nation ID or Passport ID..."
                      ></MyTextInput>
                    </div>
                  </div>
                  <Travel formik={formik}></Travel>
                  <div className="mt-4 row">
                    <div className="col-lg-12">
                      <h4 className="fs-5 fw-bold">Contact:</h4>
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <div className="col-lg-6">
                      <MySelect label="Province" name="province">
                        <option value="">-----Choose</option>
                        {provinceData?.map((item, index) => (
                          <option value={item.name} key={index}>
                            {item.name}
                          </option>
                        ))}
                      </MySelect>
                    </div>
                    <div className="col-lg-6">
                      <MySelect label="District" name="district">
                        <option value="">-----Choose</option>
                        {handleDistrict(
                          provinceData,
                          formik.values.province
                        ).map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        ))}
                      </MySelect>
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <div className="col-lg-6">
                      <MyTextInput
                        type="text"
                        name="address"
                        label="Address"
                        placeholder="Address..."
                      ></MyTextInput>
                    </div>
                    <div className="col-lg-3">
                      <MyTextInput
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Email..."
                      ></MyTextInput>
                    </div>
                    <div className="col-lg-3">
                      <MyTextInput
                        type="text"
                        name="phone"
                        label="Mobile"
                        placeholder="Mobile..."
                      ></MyTextInput>
                    </div>
                  </div>
                  <div className="mt-4 row">
                    <div className="col-lg-12">
                      <h4 className="fs-5 fw-bold">Symptoms:</h4>
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <div className="col-lg-10">
                      <div className="row">
                        <div className="col-lg-4">
                          <label
                            for=""
                            className="form-label me-4 d-inline-block"
                          >
                            Do you have any following symptoms?:
                          </label>
                        </div>
                        <div className="col">
                          <label htmlFor="fiber" className="mr-4">
                            <Field
                              type="checkbox"
                              name="symptoms"
                              value="Fiber"
                              className="mr-2"
                              id="fiber"
                            ></Field>
                            Fiber
                          </label>
                          <label htmlFor="fever" className="mr-4">
                            <Field
                              type="checkbox"
                              name="symptoms"
                              value="Fever"
                              className="mr-2"
                              id="fever"
                            ></Field>
                            Fever
                          </label>
                          <label htmlFor="sorethroat" className="mr-4">
                            <Field
                              type="checkbox"
                              name="symptoms"
                              value="Sore throat"
                              className="mr-2"
                              id="sorethroat"
                            ></Field>
                            Sore throat
                          </label>
                          <label htmlFor="breathing" className="mr-4">
                            <Field
                              type="checkbox"
                              name="symptoms"
                              value="Difficulty of breathing"
                              className="mr-2"
                              id="breathing"
                            ></Field>
                            Difficulty of breathing
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <div className="col-lg-12">
                      <h4 className="fs-5 fw-bold">Vaccines</h4>
                    </div>
                  </div>
                  <div className="mb-4 row">
                    <div className="col-lg-10">
                      <div className="row">
                        <div className="col-lg-4">
                          <label for="" class="form-label me-4 d-inline-block">
                            Which one would you like to vaccinate ?:
                          </label>
                        </div>
                        <div className="col">
                          <label htmlFor="none" className="mr-4">
                            <Field
                              type="radio"
                              name="vaccines"
                              value="None"
                              className="mr-2"
                              id="none"
                            ></Field>
                            None
                          </label>
                          <label htmlFor="astra" className="mr-4">
                            <Field
                              type="radio"
                              name="vaccines"
                              value="Astra Zenecca"
                              className="mr-2"
                              id="astra"
                            ></Field>
                            Astra Zenecca
                          </label>
                          <label htmlFor="pfizer" className="mr-4">
                            <Field
                              type="radio"
                              name="vaccines"
                              value="Pfizer"
                              className="mr-2"
                              id="pfizer"
                            ></Field>
                            Pfizer
                          </label>
                          <label htmlFor="morderna" className="mr-4">
                            <Field
                              type="radio"
                              name="vaccines"
                              value="Morderna"
                              className="mr-2"
                              id="morderna"
                            ></Field>
                            Moderna
                          </label>
                          <label htmlFor="sinopharm" className="mr-4">
                            <Field
                              type="radio"
                              name="vaccines"
                              value="Sinopharm"
                              className="mr-2"
                              id="sinopharm"
                            ></Field>
                            Sinopharm
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="d-flex align-items-center mb-4">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg mr-2"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-lg mr-2"
                          onClick={() => navigator("/table")}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg"
                          onClick={() => formik.resetForm()}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default FormFill;
