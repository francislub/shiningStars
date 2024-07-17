"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import PaymentCodeForm from "@/components/PaymentCodeForm/PaymentCodeForm";

const PaymentCodePage = () => {
  return (
    <>
    <div className="mb-10 pb-10">
      <Breadcrumb
        pageName="Payment Code"
        description="
        Welcome to Shining Stars! To receive your child's payment code, provide the information below and follow the guidelines.
        "
      />
      <PaymentCodeForm />
    </div>
    </>
  );
};

export default PaymentCodePage;
