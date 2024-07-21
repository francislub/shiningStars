"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdmissionForm() {
  const router = useRouter();

  const [child, setChild] = React.useState({
    name: "",
    admission_no: "",
    date_of_birth: "",
    age: "",
    gender: "",
    grade: "",
    residence: "",
    term: "",
    emis_no: "",
    parent_name: "",
    parent_email: "",
    parent_telephone: "",
    parent_relationship_with_pupil: "",
    parent_address: "",
    parent_village: "",
    parent_lc: "",
    parent_nin: "",
    next_of_kin_name: "",
    next_of_kin_gender: "",
    next_of_kin_telephone: "",
    next_of_kin_relationship_with_pupil: "",
    next_of_kin_address: "",
    next_of_kin_village: "",
    next_of_kin_lc: "",
    child_medical_info: "",
  });

  const [loading, setLoading] = React.useState(false);

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  useEffect(() => {
    if (
      child.name.length > 0 &&
      child.admission_no.length > 0 &&
      child.date_of_birth.length > 0 &&
      child.age.length > 0 &&
      child.gender.length > 0 &&
      child.grade.length > 0 &&
      child.residence.length > 0 &&
      child.term.length > 0 &&
      child.emis_no.length > 0 &&
      child.parent_name.length > 0 &&
      child.parent_email.length > 0 &&
      child.parent_telephone.length > 0 &&
      child.parent_relationship_with_pupil.length > 0 &&
      child.parent_address.length > 0 &&
      child.parent_village.length > 0 &&
      child.parent_lc.length > 0 &&
      child.parent_nin.length > 0 &&
      child.next_of_kin_name.length > 0 &&
      child.next_of_kin_gender.length > 0 &&
      child.next_of_kin_telephone.length > 0 &&
      child.next_of_kin_relationship_with_pupil.length > 0 &&
      child.next_of_kin_address.length > 0 &&
      child.next_of_kin_village.length > 0 &&
      child.next_of_kin_lc.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [child]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://shining-stars-dashboard.onrender.com/api/v1/admissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(child),
      });
      const data = await res.json();
      if (data.success) {
        setChild({
          name: "",
          admission_no: "",
          date_of_birth: "",
          age: "",
          gender: "",
          grade: "",
          residence: "",
          term: "",
          emis_no: "",
          parent_name: "",
          parent_email: "",
          parent_telephone: "",
          parent_relationship_with_pupil: "",
          parent_address: "",
          parent_village: "",
          parent_lc: "",
          parent_nin: "",
          next_of_kin_name: "",
          next_of_kin_gender: "",
          next_of_kin_telephone: "",
          next_of_kin_relationship_with_pupil: "",
          next_of_kin_address: "",
          next_of_kin_village: "",
          next_of_kin_lc: "",
          child_medical_info: "",
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
      router.push("/admission");
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container h-full w-full my-3 mb-10">
      {/* contact section  */}
      <section className="mt-4">
        <div className="container">
          <h3 className="text-black/90 font-medium my-4 text-2xl">
            Admission Form
          </h3>
          <div className=" flex mx-1">
            <div className="px-0">
              <div className=" ">
                <form action="" onSubmit={handleSubmit}>
                  <h1 className="text-black/80 font-medium my-4 text-xl">Personal Details</h1>
                  <div className="my-4 flex flex-col md:flex-row md:justify-between md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg">
                        Pupil{"'"}s Name:{" "}
                      </label>
                      <br className="md:hidden"/>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px] mb-3 md:mb-0"
                        id="name"
                        onChange={(e) =>
                          setChild({ ...child, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">
                        Admission No:{" "}
                      </label>
                      <br className="md:hidden"/>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color"
                        id="admission_no"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            admission_no: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[50px]">
                    <div>
                      <label className="text-body-color text-lg">
                        Date Of Birth:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[300px] mb-4 md:mb-0"
                        id="date_of_birth"
                        placeholder="dd/mm/yy"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            date_of_birth: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Age: </label><br className="md:hidden"/>
                      <input
                        type="number"
                        className="form-control rounded px-2 py-1 border border-body-color w-[100px]"
                        id="age"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            age: e.target.value,
                          })
                        }
                      />
                    </div><br className="md:hidden"/>

                    <div>
                      <label className="text-body-color text-lg">
                        Gender:{" "}
                      </label><br className="md:hidden"/>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px]"
                        id="gender"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            gender: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[50px]">
                    <div>
                      <label className="text-body-color text-lg mr-[65px]">
                        Class:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[300px] mb-4 md:mb-0"
                        id="grade"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            grade: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Term: </label><br className="md:hidden"/>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[100px] mb-4 md:mb-0"
                        id="term"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            term: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">
                        Residence:{" "}
                      </label><br className="md:hidden"/>
                      <input
                        type="text"
                        placeholder="Day / Boarding"
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px]"
                        id="residence"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            residence: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-body-color text-lg my-4">
                      Emis No{"("}LIN{")"}:{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px]"
                      id="emis_no"
                      onChange={(e) =>
                        setChild({ ...child, emis_no: e.target.value })
                      }
                    />
                  </div>

                  <h1 className="text-black/80 font-medium my-4 text-xl mt-8">Contact Information</h1>

                  <div className="mb-3">
                    <label className="text-body-color text-lg my-4">
                      Parent{"'"}s{"/"}Guardian{"'"}s Name:{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px]"
                      id="parent_name"
                      onChange={(e) =>
                        setChild({ ...child, parent_name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-body-color text-lg my-4">
                      Parent{"'"}s{"/"}Guardian{"'"}s Email:{" "}
                    </label>
                    <input
                      type="email"
                      className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px]"
                      id="parent_email"
                      onChange={(e) =>
                        setChild({ ...child, parent_email: e.target.value })
                      }
                    />
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:justify-between md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg mr-[60px]">
                        Telephone Number:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px]"
                        id="parent_telephone"
                        onChange={(e) =>
                          setChild({ ...child, parent_telephone: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">
                        Relationship with pupil:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color"
                        id="parent_relationship_with_pupil"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            parent_relationship_with_pupil: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg md:mr-[70px]">
                        Address:{" "}
                      </label><br className="md:hidden" />
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[300px]"
                        id="parent_address"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            parent_address: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Village: </label><br className="md:hidden" />
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px] md:mr-[58px]"
                        id="parent_village"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            parent_village: e.target.value,
                          })
                        }
                      /><br className="md:hidden" /><br className="md:hidden" />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">
                        LC1:{" "}
                      </label><br className="md:hidden" />
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px]"
                        id="parent_lc"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            parent_lc: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-body-color text-lg my-4 md:mr-[75px]">
                      NIN NO:{" "}
                    </label><br className="md:hidden" />
                    <input
                      type="text"
                      className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px]"
                      id="parent_nin"
                      onChange={(e) =>
                        setChild({ ...child, parent_nin: e.target.value })
                      }
                    />
                  </div>

                  <h1 className="text-black/80 font-medium my-4 text-xl mt-8">Next Of Kin</h1>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[50px]">
                    <div>
                      <label className="text-body-color text-lg">
                        Name:{" "}
                      </label><br className="md:hidden" />
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[300px]"
                        id="next_of_kin_name"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            next_of_kin_name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">
                        Gender:{" "}
                      </label><br className="md:hidden" />
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px]"
                        id="next_of_kin_gender"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            next_of_kin_gender: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:justify-between md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg">
                        Telephone Number:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[300px]"
                        id="next_of_kin_telephone"
                        onChange={(e) =>
                          setChild({ ...child, next_of_kin_telephone: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">
                        Relationship with pupil:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color"
                        id="next_of_kin_relationship_with_pupil"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            next_of_kin_relationship_with_pupil: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg md:mr-[70px]">
                        Address:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[300px]"
                        id="next_of_kin_address"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            next_of_kin_address: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Village: </label><br className="md:hidden" />
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px] md:mr-[58px]"
                        id="next_of_kin_village"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            next_of_kin_village: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">
                        LC1:{" "}
                      </label><br className="md:hidden" />
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px]"
                        id="next_of_kin_lc"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            next_of_kin_lc: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <h1 className="text-black/80 font-medium text-xl mt-8">Medical Information</h1>

                  <h2 className="text-body-color font-medium my-4">If your child has any medical issue{"("}s{")"} of which we need to be aware of please let us know below</h2>

                  <div className="form-row mb-5">
                    <div className="form-group col">
                      <textarea
                        className="message-box form-control rounded px-2 py-1 border border-body-color w-full h-[200px]"
                        id="child_medical_info"
                        placeholder="Explain the medical issue(s) here..."
                        onChange={(e) =>
                          setChild({ ...child, child_medical_info: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="btn_box flex flex-col">
                    <div className="-mt-2 mb-4">
                      <p className="text-lg text-orange-500">
                        {loading
                          ? "Please wait, processing Admission Form ....."
                          : ""}
                      </p>
                    </div>
                    <button type="submit" className="rounded bg-primary hover:bg-primary/90 py-1 px-2 text-white">
                      {buttonDisabled ? "All Information Required" : "Submit"}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end contact section  */}
    </div>
  );
}
