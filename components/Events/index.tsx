import React, { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import SingleEvent from "./SingleEvent";
import Link from "next/link";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://shining-stars-dashboard.onrender.com/api/v1/events", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const reversedData = data.slice(0).reverse();
        setEvents(reversedData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="bg-primary/5 py-16 md:py-20 lg:py-28">
      <div className="container -mb-20">
        <SectionTitle
          title="Events"
          paragraph="Stay up-to-date with the latest events at our school!"
          center
        />

        {error && <p>Error: {error}</p>}

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {events.map((post) => (
            <div key={post.id} className="w-full">
              <SingleEvent post={post} />
            </div>
          ))}
        </div>
        {/* <Link href="https://photos.app.goo.gl/fVYcE9K1GW8f98Jp9">
          <div className="bg-blue-300 text-white text-2xl font-bold p-4 rounded mb-10 lg:mb-2 w-full h-10 lg:15 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-blue-600">
            <h1 className="animate-fade-in delay-500">Our previous Events</h1>
          </div>
        </Link> */}

      </div>
    </section>
  );
};

export default Events;
