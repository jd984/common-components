import VerifyEmailPage from "@/components/main/verifyEmailPage";
import { Suspense } from "react";

const VerifyTokenPage = () => {
  return (
    <>
      <Suspense>
        <VerifyEmailPage />
      </Suspense>
    </>
  );
};

export default VerifyTokenPage;
