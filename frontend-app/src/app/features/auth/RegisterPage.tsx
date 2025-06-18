import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../../../api/authApi";
import { useAuthStore } from "../../../stores/authStore";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

type RegisterSchemaFormData = yup.InferType<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const registerUser = useAuthStore((state) => state.registerUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaFormData>({
    resolver: yupResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterSchemaFormData) =>
      registerApi(data.username, data.email),
    onSuccess: (user) => {
      registerUser(user);
      navigate("/chat");
    },
  });

  const onSubmit = (data: RegisterSchemaFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border border-gray-300 rounded-md p-6 max-w-md w-full bg-white shadow"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <div>
          <label className="block font-medium">Username</label>
          <input
            {...register("username")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded text-white transition ${
            mutation.isPending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
