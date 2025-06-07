import Image from "next/image";
import { AcademicCapIcon, ClipboardCheckIcon, CashIcon, UserGroupIcon } from "@heroicons/react/solid";
import image from "../../public/images/shin/stu.jpg";

const ScholarshipSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Shining Stars Scholarship Program
        </h2>
        <p className="text-center text-xl text-gray-800 mb-12 max-w-3xl mx-auto">
          Empowering bright minds to reach their full potential through academic excellence and financial support.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Image
            src={image}
            alt="Shining Stars"
            className="w-[500px] h-[300px] lg:mt-12 -mb-10"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">About Our Scholarship</h3>
          <p className="text-gray-800 mb-4">
            The Shining Stars Vvumba Scholarship Program is designed to support exceptional students who demonstrate
            outstanding academic potential and a commitment to personal growth. Our program aims to provide financial
            assistance and mentorship to help students excel in their primary education journey.
          </p>
          <p className="text-gray-800">
          Recipients of the Shining Stars Scholarship will receive subsidized fees coverage, access to advanced
          learning resources, and participation in exclusive enrichment programs.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-16">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Scholarship Requirements</h3>
        <ul className="space-y-4 text-gray-800">
          <li className="flex items-start">
            <ClipboardCheckIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
            <span>Maintain a minimum grade average of 85% or equivalent</span>
          </li>
          <li className="flex items-start">
            <ClipboardCheckIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
            <span>Demonstrate strong leadership skills and community involvement</span>
          </li>
          <li className="flex items-start">
            <ClipboardCheckIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
            <span>Submit a personal essay highlighting academic goals and aspirations</span>
          </li>
          <li className="flex items-start">
            <ClipboardCheckIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
            <span>Provide two letters of recommendation from teachers or community leaders</span>
          </li>
          <li className="flex items-start">
            <ClipboardCheckIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
            <span>Successfully complete an interview with the scholarship committee</span>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <AcademicCapIcon className="w-12 h-12 text-blue-500 mb-4" />
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Full Tuition Coverage</h4>
          <p className="text-gray-800">100% of tuition fees covered for the duration of primary education</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <CashIcon className="w-12 h-12 text-green-500 mb-4" />
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Book Allowance</h4>
          <p className="text-gray-800">Annual allowance for textbooks and essential school supplies</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <UserGroupIcon className="w-12 h-12 text-purple-500 mb-4" />
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Mentorship Program</h4>
          <p className="text-gray-800">One-on-one guidance from experienced educators and professionals</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ClipboardCheckIcon className="w-12 h-12 text-red-500 mb-4" />
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Enrichment Activities</h4>
          <p className="text-gray-800">Access to exclusive workshops, field trips, and learning experiences</p>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipSection;
