import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { fetchLogin } from "../service/auth";
import { saveToken, saveUser } from "../utils/token";
import { toast } from "../components/Toast";
import type { ValidationErrors } from "../types/form";

const schema = yup.object({
  email: yup.string().email("Geçerli bir e-posta girin").required("E-posta zorunlu"),
  password: yup.string().required("Şifre zorunlu"),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    const result = await fetchLogin(formData);
    setIsLoading(false);
    if (!result) {
      setServerError("E-posta veya şifre hatalı.");
      return;
    }
    saveToken(result.token);
    saveUser({ username: result.username, email: result.email });
    toast.success("Giriş başarılı!");
    navigate("/dashboard");
  };

  return { formData, errors, serverError, isLoading, onChange, handleSubmit };
};
