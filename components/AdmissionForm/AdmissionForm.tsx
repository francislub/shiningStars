"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdmissionForm() {
  const router = useRouter()
  const [admissions, setAdmissions] = useState([])
  const [error, setError] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const [child, setChild] = useState({
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
  })

  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await fetch("https://shining-stars-dashboard-hr8p.onrender.com/api/v1/admissions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await response.json()
        setAdmissions(data)

        // Compute the new admission number
        const currentYear = new Date().getFullYear()
        const newIndex = data.length + 1
        const newAdmissionNo = `SSNPSV/${String(newIndex).padStart(3, "00")}/${currentYear}`

        // Set the computed admission number
        setChild((prevChild) => ({
          ...prevChild,
          admission_no: newAdmissionNo,
        }))
      } catch (err) {
        setError(err.message)
      }
    }

    fetchAdmissions()
  }, [])

  const handleDateChange = (e) => {
    const dateOfBirth = e.target.value
    setChild((prevChild) => ({
      ...prevChild,
      date_of_birth: dateOfBirth,
    }))

    // Calculate age
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    setChild((prevChild) => ({
      ...prevChild,
      age: age.toString(),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch("https://shining-stars-dashboard-hr8p.onrender.com/api/v1/admissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(child),
      })
      const data = await res.json()
      if (data.success) {
        setShowSuccessMessage(true)
        setLoading(false)

        // Auto redirect after 5 seconds
        setTimeout(() => {
          router.push("/")
        }, 5000)
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.error(error.message)
      setLoading(false)
    }
  }

  // Success Message Component
  if (showSuccessMessage) {
    return (
      <div className="container h-full w-full my-3 mb-10">
        <section className="mt-4">
          <div className="container">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="max-w-2xl mx-auto text-center">
                {/* Success Icon */}
                <div className="mb-8">
                  <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-green-600 mb-2">🎉 Admission Submitted Successfully!</h2>
                </div>

                {/* Thank You Message */}
                <div className="bg-white border-2 border-green-200 rounded-lg p-8 shadow-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Thank You, {child.parent_name}!</h3>

                  <div className="text-lg text-gray-600 mb-6 space-y-3">
                    <p>
                      We have successfully received the admission application for{" "}
                      <strong className="text-gray-800">{child.name}</strong>.
                    </p>
                    <p>
                      Your admission number is: <strong className="text-blue-600 text-xl">{child.admission_no}</strong>
                    </p>
                  </div>

                  {/* Email Check Notice */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-lg font-medium text-blue-800">📧 Check Your Email!</h4>
                        <p className="text-blue-700 mt-1">
                          A detailed confirmation email has been sent to <strong>{child.parent_email}</strong>
                        </p>
                        <p className="text-blue-600 text-sm mt-2">
                          Please check your inbox (and spam folder) for important admission details and next steps.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">📋 What Happens Next?</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        You will receive a welcome package within 3-5 business days
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Our admissions team will contact you for any additional requirements
                      </li>
                      {/* <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        School orientation will be scheduled before the term begins
                      </li> */}
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Keep your admission number for all future correspondence
                      </li>
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-primary/10 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600">
                      <strong>Need Help?</strong> Contact our admissions office at{" "}
                      <span className="text-primary font-medium">Shiningstars.primary2022@gmail.com</span>
                    </p>
                  </div>

                  {/* Auto Redirect Notice */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-4">
                      You will be automatically redirected to the homepage in a few seconds...
                    </p>
                    <button
                      onClick={() => router.push("/")}
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                      Return to Homepage
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="container h-full w-full my-3 mb-10">
      {/* contact section  */}
      <section className="mt-4">
        <div className="container">
          <h3 className="text-black/90 font-medium my-4 text-2xl">Admission Form</h3>
          <div className=" flex mx-1">
            <div className="px-0">
              <div className=" ">
                <form action="" onSubmit={handleSubmit}>
                  <h1 className="text-black/80 font-medium my-4 text-xl">Personal Details</h1>
                  <div className="my-4 flex flex-col md:flex-row md:justify-between md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg">Pupil{"'"}s Name: </label>
                      <br className="md:hidden" />
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px] mb-3 md:mb-0"
                        id="name"
                        onChange={(e) => setChild({ ...child, name: e.target.value })}
                        value={child.name}
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Admission No: </label>
                      <br className="md:hidden" />
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color"
                        id="admission_no"
                        value={child.admission_no}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[50px]">
                    <div>
                      <label className="text-body-color text-lg">Date Of Birth: </label>
                      <input
                        type="date"
                        className="form-control rounded px-2 py-1 border border-body-color w-[300px] mb-4 md:mb-0"
                        id="date_of_birth"
                        onChange={handleDateChange}
                        value={child.date_of_birth}
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Age: </label>
                      <br className="md:hidden" />
                      <input
                        type="number"
                        className="form-control rounded px-2 py-1 border border-body-color w-[100px]"
                        id="age"
                        value={child.age}
                        disabled
                      />
                    </div>
                    <br className="md:hidden" />

                    <div>
                      <label className="text-body-color text-lg">Gender: </label>
                      <br className="md:hidden" />
                      <select
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px]"
                        id="gender"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            gender: e.target.value,
                          })
                        }
                        value={child.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[50px]">
                    <div>
                      <label className="text-body-color text-lg mr-[65px]">Class: </label>
                      <select
                        className="form-control rounded px-2 py-1 border border-body-color w-[300px] mb-4 md:mb-0"
                        id="grade"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            grade: e.target.value,
                          })
                        }
                        value={child.grade}
                      >
                        <option value="">Select Class</option>
                        <option value="Baby Class">Baby Class</option>
                        <option value="Middle Class">Middle Class</option>
                        <option value="Top Class">Top Class</option>
                        <option value="Primary One">Primary One</option>
                        <option value="Primary Two">Primary Two</option>
                        <option value="Primary Three">Primary Three</option>
                        <option value="Primary Four">Primary Four</option>
                        <option value="Primary Five">Primary Five</option>
                        <option value="Primary Six">Primary Six</option>
                        <option value="Primary Seven">Primary Seven</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Term: </label>
                      <br className="md:hidden" />
                      <select
                        className="form-control rounded px-2 py-1 border border-body-color w-[100px] mb-4 md:mb-0"
                        id="term"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            term: e.target.value,
                          })
                        }
                        value={child.term}
                      >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Residence: </label>
                      <br className="md:hidden" />
                      <select
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px]"
                        id="residence"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            residence: e.target.value,
                          })
                        }
                        value={child.residence}
                      >
                        <option value="">Select Residence</option>
                        <option value="Day">Day</option>
                        <option value="Boarding">Boarding</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-body-color text-lg my-4">
                      Emis No{"("}LIN{")("}If child is directly from another school{")"}:{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px]"
                      id="emis_no"
                      onChange={(e) => setChild({ ...child, emis_no: e.target.value })}
                      value={child.emis_no}
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
                      onChange={(e) => setChild({ ...child, parent_name: e.target.value })}
                      value={child.parent_name}
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
                      onChange={(e) => setChild({ ...child, parent_email: e.target.value })}
                      value={child.parent_email}
                    />
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:justify-between md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg mr-[60px]">Telephone Number: </label>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px]"
                        id="parent_telephone"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            parent_telephone: e.target.value,
                          })
                        }
                        value={child.parent_telephone}
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Relationship with pupil: </label>
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
                        value={child.parent_relationship_with_pupil}
                      />
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg md:mr-[70px]">Address: </label>
                      <br className="md:hidden" />
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
                        value={child.parent_address}
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Village: </label>
                      <br className="md:hidden" />
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
                        value={child.parent_village}
                      />
                      <br className="md:hidden" />
                      <br className="md:hidden" />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">LC1: </label>
                      <br className="md:hidden" />
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
                        value={child.parent_lc}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-body-color text-lg my-4 md:mr-[75px]">NIN NO: </label>
                    <br className="md:hidden" />
                    <input
                      type="text"
                      className="form-control rounded px-2 py-1 border border-body-color md:w-[400px] w-[300px]"
                      id="parent_nin"
                      onChange={(e) => setChild({ ...child, parent_nin: e.target.value })}
                      value={child.parent_nin}
                    />
                  </div>

                  <h1 className="text-black/80 font-medium my-4 text-xl mt-8">Next Of Kin</h1>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[50px]">
                    <div>
                      <label className="text-body-color text-lg">Name: </label>
                      <br className="md:hidden" />
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
                        value={child.next_of_kin_name}
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Gender: </label>
                      <br className="md:hidden" />
                      <select
                        className="form-control rounded px-2 py-1 border border-body-color w-[200px]"
                        id="next_of_kin_gender"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            next_of_kin_gender: e.target.value,
                          })
                        }
                        value={child.next_of_kin_gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:justify-between md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg">Telephone Number: </label>
                      <input
                        type="text"
                        className="form-control rounded px-2 py-1 border border-body-color w-[300px]"
                        id="next_of_kin_telephone"
                        onChange={(e) =>
                          setChild({
                            ...child,
                            next_of_kin_telephone: e.target.value,
                          })
                        }
                        value={child.next_of_kin_telephone}
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Relationship with pupil: </label>
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
                        value={child.next_of_kin_relationship_with_pupil}
                      />
                    </div>
                  </div>

                  <div className="my-4 flex flex-col md:flex-row md:gap-[20px]">
                    <div>
                      <label className="text-body-color text-lg md:mr-[70px]">Address: </label>
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
                        value={child.next_of_kin_address}
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">Village: </label>
                      <br className="md:hidden" />
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
                        value={child.next_of_kin_village}
                      />
                    </div>

                    <div>
                      <label className="text-body-color text-lg">LC1: </label>
                      <br className="md:hidden" />
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
                        value={child.next_of_kin_lc}
                      />
                    </div>
                  </div>

                  <h1 className="text-black/80 font-medium text-xl mt-8">Medical Information</h1>

                  <h2 className="text-body-color font-medium my-4">
                    If your child has any medical issue{"("}s{")"} of which we need to be aware of please let us know
                    below
                  </h2>

                  <div className="form-row mb-5">
                    <div className="form-group col">
                      <textarea
                        className="message-box form-control rounded px-2 py-1 border border-body-color w-full h-[200px]"
                        id="child_medical_info"
                        placeholder="Explain the medical issue(s) here..."
                        onChange={(e) =>
                          setChild({
                            ...child,
                            child_medical_info: e.target.value,
                          })
                        }
                        value={child.child_medical_info}
                      />
                    </div>
                  </div>

                  <div className="btn_box flex flex-col">
                    <div className="-mt-2 mb-4">
                      <p className="text-lg text-orange-500">
                        {loading ? "Please wait, processing Admission Form ....." : ""}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="rounded bg-primary hover:bg-primary/90 py-1 px-2 text-white"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Admission"}
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
  )
}
