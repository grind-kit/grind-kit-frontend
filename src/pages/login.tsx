import React from "react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { setCookie } from "nookies";
const loadStrings = require("@/locales/en/strings");

interface LoginType {
  email: string;
  password: string;
}
const LoginPage = () => {
  const strings = loadStrings;
  const methods = useForm<LoginType>({ mode: "onBlur" });
  const { logIn } = useAuth();
  const router = useRouter();
  const [loginError, setLoginError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LoginType) => {
    try {
      await logIn(data.email, data.password);
      await setCookie(null, "authenticated", "true");
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      setLoginError(true);
    }
  };

  return (
    <div className="sign-up-form container mx-auto w-96 my-12 border-2 rounded-md border-gray-200">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-500">
        {strings.LOGIN_HEADER}
      </h2>
      <FormProvider {...methods}>
        <form
          action=""
          className="w-80 mx-auto pb-12 px-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-500">
                {strings.LOGIN_EMAIL_LABEL}
              </label>
            </div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`border border-solid rounded-md ring:0 focus:ring-0 focus:outline-none border-gray-200 text-slate-900 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-500">
                {strings.LOGIN_PASSWORD_LABEL}
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`border border-solid rounded-md ring:0 focus:ring-0 focus:outline-none border-gray-200 text-slate-900 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={`h-12 text-center w-2/3 bg-blue-500 border-2 rounded-md hover:shadow-lg hover:bg-blue-400 text-lg transition`}
              >
                <p className="capitalize text-white font-normal">
                  {strings.LOGIN_BUTTON}
                </p>
              </button>
            </div>
            {loginError && (
              <p className="text-red-500 text-center">
                {strings.LOGIN_ERROR_MESSAGE}
              </p>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
