"use client";
import SimpleInput from "@/components/common/inputs/simpleInput/simpleInput";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "@/lib/validationSchema/AuthSchema";
import { SignUpFormProps } from "@/lib/types/authProps";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormProps>({
    resolver: yupResolver<SignUpFormProps>(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormProps> = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", data);
      console.log("Success, User signup", response);
      if (response?.status === 200) {
        setIsLoading(false);
        router.push("/login");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Handle signup error", error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 my-16 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-center text-xl text-neutral-800 dark:text-neutral-200">
        Signup
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="my-8">
          <SimpleInput
            control={control}
            name="firstName"
            label="First Name"
            required={true}
            errorMessage={errors.firstName ? errors?.firstName?.message : ""}
          />
          <SimpleInput
            control={control}
            name="lastName"
            label="Last Name"
            required={true}
            errorMessage={errors.lastName ? errors?.lastName?.message : ""}
          />
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
            Sign up &rarr;
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

export default SignupForm;
