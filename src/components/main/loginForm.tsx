"use client";
import SimpleInput from "@/components/common/inputs/simpleInput/simpleInput";
import { Button } from "@/components/ui/button";
import { setLocalToken } from "@/lib/store/GetNewToken";
import { LoginFormProps } from "@/lib/types/authProps";
import { LoginSchema } from "@/lib/validationSchema/AuthSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver<LoginFormProps>(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", data);
      console.log("Success, User login", response);
      if (response?.status === 200) {
        const cookie = response.headers["x-middleware-set-cookie"];
        const token = cookie?.split(";")[0].split("=")[1];
        Cookies.set("newToken", token);
        dispatch(setLocalToken(token));
        setIsLoading(false);
        router.push("/profile");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Handle login error", error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input my-16 bg-white dark:bg-black">
      <h2 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="my-8">
          <SimpleInput
            control={control}
            name="email"
            type="email"
            label="Email Address"
            required={true}
            errorMessage={errors.email ? errors?.email?.message : ""}
          />
          <SimpleInput
            control={control}
            name="password"
            type="password"
            label="Password"
            required={true}
            errorMessage={errors.password ? errors?.password?.message : ""}
          />
        </div>
        <div className="flex justify-center items-center w-full">
          <Button disabled={isLoading} className="text-center w-full">
            Login &rarr;
          </Button>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <Button variant={"secondary"} className="w-full">
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
          </Button>
          <Button variant={"secondary"} className="w-full">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
