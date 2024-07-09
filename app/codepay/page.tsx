'use client';
import SectionTitle from "@/components/Common/SectionTitle";
import School from "@/components/school/School";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Teaching() {

  const [teachings, setTeachings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://shining-stars-dashboard.onrender.com/api/v1/students", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // const teaching = data.filter(item => item.staffType === "teaching");
        setTeachings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <section className="my-20 mt-36 mx-10">
      </section>

        <div className="flex flex-col items-start mx-auto md:pl-28 justify-center items-center">
            <div className="md:pl-2">
              <SectionTitle title="Get Your Childs Pay Code" paragraph="" />
            </div>
          </div>

          <div className="boxContainer justify-center items-center md:flex flex flex-wrap md:flex-row mb-5">
                      {teachings.map((post) => (
                          <div className="box bg-gray-300 flex flex-col md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] p-3 md:max-w-[25%] md:p-4 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out cursor-pointer" key={post._id}>
                              
                              <div className="">
                              <Image 
                                src={post.photo} 
                                alt={post.name} 
                                width={340} // Set the appropriate width
                                height={360} // Set the appropriate height
                                className="w-full h-20 object-cover"
                              />
                              </div>
                              <div className="programTitle px-5 text-center">
                              <span className="text-xl text-[#1f8cad]">Class: {post.grade}</span>
                              </div>
                              <div className="programDesc text-center">
                                <h2>Name: {post.name}</h2>
                              </div>
                              <div className="programDesc text-center">
                                <h2>Status: {post.residence}</h2>
                              </div>
                              <div className="programDesc text-center">
                                <h2>Pay Code: {post.paymentCode}</h2>
                              </div>
                              {/* <div className="programDesc">
                                <h2>{post.description}</h2>
                              </div> */}
                          </div>
                      ))}

                    </div>
    </div>
  );
}
