'use client'

import Breadcrumb from "@/components/Common/Breadcrumb";
import SchoolContentOne from "@/components/About/School/SchoolContent";

const SchoolContent = () => {
  return (
    <>
      <Breadcrumb
        pageName="Why Shining Stars"
        description="
        Shining Stars is a place for everyone, somewhere you can be yourself. Whether you're an out-of-the-box thinker, boundary-breaker or change-maker, this is where you'll get ahead and find your place as part of a global community.
        "
      />
      <SchoolContentOne />
    </>
  );
};

export default SchoolContent;
