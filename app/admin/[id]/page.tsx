'use client';
import SectionTitle from "@/components/Common/SectionTitle";
import School from "@/components/school/School";
import Breadcrumb from "@/components/Common/Breadcrumb";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';

export default function Teaching({params}) {

  const [administrators, setAdministrators] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://shining-stars-dashboard.onrender.com/api/v1/admins", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const filteredData = data.filter(item => item._id === params.id);
        setAdministrators(filteredData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, [params.id]);

  return (
    <div className="mb-20">
      <section className="my-20 mt-5 mx-10">
      <Breadcrumb
        pageName="Administrator"
        description="
        Shining Stars is a place for everyone, somewhere you can be yourself. Whether you're an out-of-the-box thinker, boundary-breaker or change-maker, this is where you'll get ahead and find your place as part of a global community.
        "
      />
      </section>

        <div className="flex flex-col items-start mx-auto md:pl-28 justify-center items-center ">
            {/* <div className="md:pl-2 ">
              <SectionTitle title="Administrators" paragraph="" />
            </div> */}
          </div>

          <div className="boxContainer w-full flex flex-col md:flex-row md:space-x-12 justify-center items-center">
      {administrators.map((post) => (
        <div className="box flex flex-col md:flex-row md:w-[600px] lg:w-[700px] xl:w-[800px] 2xl:w-[1000px] p-4 md:max-w-[100%] md:p-4 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out cursor-pointer " key={post._id}>
                     
          <div className="flex md:flex-row flex-col w-full">
            <div className="flex flex-col items-center md:w-2/5">
              <Image
                src={post.photo}
                alt={post.name}
                width={640}
                height={360}
                className="w-full h-30 object-cover"
              />
              <div className="programTitle px-5 text-center mt-4">
                <span className="text-xl text-[#1f8cad]">{post.title}</span>
              </div>
              <div className="programDesc text-center mt-2">
                <h2>{post.name}</h2>
              </div>
            </div>
            <div className="programDetails md:w-3/5 px-5 flex flex-col">
              <div className="programTitle mb-2">
                <span className="text-xl text-[#1f8cad]">Description</span>
              </div>
              <div className="programDesc mb-4">
                <h2>{post.description}</h2>
              </div>
              <div className="programTitle mb-2">
                <span className="text-xl text-[#1f8cad]">Message</span>
              </div>
              <div className="programDesc">
                <h2>{post.message}</h2>
              </div>
            </div>
          </div>
         
        </div>
                      ))}

                    </div>
    </div>
  );
}
