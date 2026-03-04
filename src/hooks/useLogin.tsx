import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { fetchLogin } from "../service/auth";
import { saveToken, saveUser } from "../utils/token";
import type { ValidationErrors } from "../types/form";

type FormData = {
  email: string;
  password: string;
};

const useLogin = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Geçerli bir e-posta adresi girin.")
      .required("E-posta zorunludur."),
    password: Yup.string().required("Şifre zorunludur."),
  });

  const onChangeFormData = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const newErrors: ValidationErrors = {};
        validationError.inner.forEach((err) => {
          if (err.path) newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        return;
      }
    }

    setLoading(true);
    const response = await fetchLogin(formData);
    setLoading(false);

    if (!response) {
      setServerError("E-posta veya şifre hatalı.");
      return;
    }

    saveToken(response.token);
    saveUser({ username: response.username, email: response.email });
    navigate("/dashboard");
  };

  return {
    formData,
    errors,
    serverError,
    isLoading,
    onChangeFormData,
    handleSubmit,
  };
};

export default useLogin;
