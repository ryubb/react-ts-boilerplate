import * as React from "react";
import * as Yup from "yup";

import LoginComponent from "./components";

const validationSchema = () =>
  Yup.object().shape({
    email: Yup.string().required("必須項目です。"),
    password: Yup.string().required("必須項目です。"),
  });

const Top: React.SFC = () => {
  const onSubmit = (values: { email: string; password: string }): void => {
    console.log(values);
  };
  return (
    <LoginComponent
      onSubmit={onSubmit}
      validationSchema={() => validationSchema()}
    />
  );
};

export default Top;
