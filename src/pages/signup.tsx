import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

interface SignupType {
  email: string;
  password: string;
  password_confirm: string;
}

const SignupPage = () => {
  const methods = useForm<SignupType>({ mode: "onBlur" });
  const { signUp } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: SignupType) => {
    try {
      await signUp(data.email, data.password);
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="sign-up-form container mx-auto w-96 my-12 border-2 rounded-md border-gray-200">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-500">
        Sign Up
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
                Email
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
                Password
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
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-500">
                Confirm Password
              </label>
            </div>

            <input
              type="password"
              {...register("password_confirm", {
                required: "Verify your password",
              })}
              className={`border border-solid rounded-md ring:0 focus:ring-0 focus:outline-none border-gray-200 text-slate-900 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password_confirm && (
              <p className="text-red-500">{errors.password_confirm.message}</p>
            )}
          </div>
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className={`h-12 text-center w-2/3 bg-blue-500 border-2 rounded-md hover:shadow-lg hover:bg-blue-400 text-lg transition`}
            >
              <p className="capitalize text-white font-normal">sign up</p>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignupPage;
