"use client";
import SimpleInput from "@/components/common/inputs/simpleInput/simpleInput";
import { Button } from "@/components/ui/button";
import { LoginFormProps } from "@/lib/types/authProps";
import { LoginSchema } from "@/lib/validationSchema/AuthSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver<LoginFormProps>(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
    console.log("Login data: ", data);
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
          <Button className="text-center w-full">Login &rarr;</Button>
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
