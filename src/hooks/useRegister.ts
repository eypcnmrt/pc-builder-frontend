import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { fetchRegister } from "../service/auth";
import { saveToken, saveUser } from "../utils/token";
import { toast } from "../components/Toast";
import type { ValidationErrors } from "../types/form";

const schema = yup.object({
  username: yup.string().min(3, "Kullanıcı adı en az 3 karakter olmalı").required("Kullanıcı adı zorunlu"),
  email: yup.string().email("Geçerli bir e-posta girin").required("E-posta zorunlu"),
  password: yup.string().min(6, "Şifre en az 6 karakter olmalı").required("Şifre zorunlu"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı zorunlu"),
});

export const useRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (key: keyof typeof formData, value: string) => {
    setFormData((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    try {
      await schema.validate(formData, { abortEarly: false });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errs: ValidationErrors = {};
        err.inner.forEach((e) => { if (e.path) errs[e.path] = e.message; });
        setErrors(errs);
      }
      return;
    }
    setIsLoading(true);
    const result = await fetchRegister({ username: formData.username, email: formData.email, password: formData.password });
    setIsLoading(false);
    if (!result) {
      setServerError("Kayıt başarısız. Bu e-posta zaten kullanımda olabilir.");
      return;
    }
    saveToken(result.token);
    saveUser({ username: result.username, email: result.email });
    toast.success("Hoş geldin! Hesabın oluşturuldu.");
    navigate("/dashboard");
  };

  return { formData, errors, serverError, isLoading, onChange, handleSubmit };
};
