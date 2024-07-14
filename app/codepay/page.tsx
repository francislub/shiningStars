'use client';

import SectionTitle from "@/components/Common/SectionTitle";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Teaching() {
  const [teachings, setTeachings] = useState([]);
  const [filteredTeachings, setFilteredTeachings] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
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
        setTeachings(data);
        setFilteredTeachings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass(selectedClass);

    if (selectedClass && selectedClass !== "all") {
      const filtered = teachings.filter(teach => teach.grade === selectedClass);
      setFilteredTeachings(filtered);
    } else {
      setFilteredTeachings(teachings);
    }
  };

  return (
    <div>
      <section className="my-20 mt-36 mx-10">
      </section>

      <div className="flex flex-col items-start mx-auto md:pl-28 justify-center items-center">
        <div className="md:pl-2">
          <SectionTitle title="Get Your Child's Pay Code" paragraph="" />
        </div>
        <div className="w-full mt-4 md:mt-6 flex justify-center">
          <input 
            type="email" 
            placeholder="Enter Parent Email" 
            className="w-64 h-9 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       {/* Combo Box for selecting class */}
        <div className="mt-4 mb-4">
          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="p-2 border border-gray-500 rounded-md bg-gray shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-300 hover:bg-blue-200 cursor-pointer"
            required
          >
            <option value="all">Select Class</option>
            <option value="all">All Classes</option>
            <option value="baby-class">Baby Class</option>
            <option value="middle-class">Middle Class</option>
            <option value="top-class">Top Class</option>
            <option value="primary-one">Primary One</option>
            <option value="primary-two">Primary Two</option>
            <option value="primary-three">Primary Three</option>
            <option value="primary-four">Primary Four</option>
            <option value="primary-five">Primary Five</option>
            <option value="primary-six">Primary Six</option>
            <option value="primary-seven">Primary Seven</option>
          </select>
        </div>
      </div>

      <div className="boxContainer justify-center items-center md:flex flex flex-wrap md:flex-row mb-5">
        {filteredTeachings.map((post) => (
          <div className="box bg-gray-300 flex flex-col md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] p-3 md:max-w-[25%] md:p-4 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out cursor-pointer" key={post._id}>
            <div className="w-full h-60">
              <Image 
                src={post.photo} 
                alt={post.name} 
                width={340} 
                height={360} 
                className="w-full h-full object-cover"
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
          </div>
        ))}
      </div>
    </div>
  );
}

