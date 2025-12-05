"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  RegisterUserDto,
  registerUserSchema,
} from "@/features/users/contracts/register.dto";
import { authClient } from "@/shared/lib/auth-client";
import { Input } from "@/shared/components/Input";

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserDto>({
    resolver: zodResolver(registerUserSchema),
  });

  const handleUserSignUp: SubmitHandler<RegisterUserDto> = async (formData) => {
    console.log({ formData });
    const { data, error } = await authClient.signUp.email({
      name: formData.username, // required
      email: formData.email, // required
      password: formData.password, // required
      // image: "https://example.com/image.png",
      callbackURL: "/",
    });
    console.error({ error });
  };

  return (
    <form onSubmit={handleSubmit(handleUserSignUp)} className="space-y-2">
      <Input label="Name" {...register("username")} error={errors.username} />
      <Input
        label="E-mail"
        {...register("email")}
        type="email"
        error={errors.email}
      />
      <Input
        label="Password"
        {...register("password")}
        type="password"
        error={errors.password}
      />
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register("username")}
          className="outline rounded-sm p-1 outline-slate-700 focus:outline-white"
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full outline outline-slate-700 px-4 py-2 rounded-sm hover:bg-slate-700 bg-slate-900"
        >
          Register
        </button>
      </div>
    </form>
  );
};
