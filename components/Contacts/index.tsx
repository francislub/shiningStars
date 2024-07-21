"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Contacts = () => {
  const router = useRouter();

  const [contact, setContact] = React.useState({
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = React.useState(false);

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  useEffect(() => {
    if (
      contact.email.length > 0 &&
      contact.message.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://shining-stars-dashboard.onrender.com/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      if (data.success) {
        setContact({
          email: "",
          subject: "",
          message: "",
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
      router.push("/");
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="overflow-hidden pb-16 md:pb-20">
      <div className="container">
        <div
          className=" fade-in mb-24 md:w-[600px] md:mx-auto"
          style={{ marginTop: "5%" }}
          id="fees"
        >
          <h1 className="font-bold text-xl text-black/90 mb-3">
            Send Us a Direct Email
          </h1>
          <h2 className="my-3 text-body-color">
            Contact us directly and we will get back to you. For any inquiries,
            feel free to use the form below.
          </h2>

          <form className="flex flex-col space-y-4" action="" onSubmit={handleSubmit}>
            <input
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              required
              placeholder="Your Email"
              onChange={(e) =>
                setContact({
                  ...contact,
                  email: e.target.value,
                })
              }
            />
            <input
              className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="subject"
              placeholder="Subject"
              onChange={(e) =>
                setContact({
                  ...contact,
                  subject: e.target.value,
                })
              }
            />
            <textarea
              className="rounded-md border border-gray-300 px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="message"
              required
              placeholder="Message"
              onChange={(e) =>
                setContact({
                  ...contact,
                  message: e.target.value,
                })
              }
            />
            <div className="btn_box flex flex-col">
              <div className="-mt-2 mb-4">
                <p className="text-lg text-orange-500">
                  {loading ? "Please wait, processing Contact Form ....." : ""}
                </p>
              </div>
              <button
                type="submit"
                className="rounded bg-primary hover:bg-primary/90 py-2 px-2 text-white"
              >
                {buttonDisabled ? "Email and Message Required" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
