import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { fetchRegister } from "../service/auth";
import { saveToken, saveUser } from "../utils/token";
import type { ValidationErrors } from "../types/form";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const useRegister = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Kullanıcı adı en az 3 karakter olmalıdır.")
      .required("Kullanıcı adı zorunludur."),
    email: Yup.string()
      .email("Geçerli bir e-posta adresi girin.")
      .required("E-posta zorunludur."),
    password: Yup.string()
      .min(6, "Şifre en az 6 karakter olmalıdır.")
      .required("Şifre zorunludur."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor.")
      .required("Şifre tekrarı zorunludur."),
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
    const response = await fetchRegister({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);

    if (!response) {
      setServerError("Kayıt işlemi başarısız. Lütfen tekrar deneyin.");
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

export default useRegister;
