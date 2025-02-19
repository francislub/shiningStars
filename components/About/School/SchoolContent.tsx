"use client"

import { useState } from "react"
import { Star } from "lucide-react"

export default function SchoolContentOne() {
  const [activeSection, setActiveSection] = useState<"anthem" | "rules">("anthem")

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveSection("anthem")}
          className={`pb-2 px-4 font-medium ${
            activeSection === "anthem" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
          }`}
        >
          School Anthem
        </button>
        <button
          onClick={() => setActiveSection("rules")}
          className={`pb-2 px-4 font-medium ${
            activeSection === "rules" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
          }`}
        >
          Rules & Regulations
        </button>
      </div>

      {activeSection === "anthem" ? (
        <div className="space-y-8 mb-[60px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              SHINING STARS NURSERY AND PRIMARY SCHOOL
              <Star className="h-6 w-6 text-yellow-500" />
            </h1>
            <h2 className="text-xl font-semibold mb-8">SCHOOL ANTHEM</h2>
          </div>

          <div className="space-y-8 text-center max-w-2xl mx-auto ">
            <div className="space-y-2">
              <p>Shining stars the source of wisdom</p>
              <p>Honoring our talents to achieve all the best</p>
              <p>We shall rejoice and praise God for that</p>
              <p>Our school will ever shine</p>
            </div>

            <div className="space-y-2">
              <p>The school provides quality education</p>
              <p>God fearing children with good morals</p>
              <p>Our Lord Father guide our board</p>
              <p>Parents and teachers for the rise of our school</p>
            </div>

            <div className="space-y-2">
              <p>In academic and co-curriculum</p>
              <p>With all skills and how to achieve</p>
              <p>In excellence for our future</p>
              <p>Our school will arise and shine</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 mb-[60px]">
          <h1 className="text-2xl font-bold mb-6">SCHOOL RULES AND REGULATIONS</h1>

          <ul className="space-y-4 list-disc pl-6">
            <li>Pupils must report on the first day of the term to the Head teacher or to the teacher assigned.</li>
            <li>All pupils must have arrived at the school from 7:00-7:30am.</li>
            <li>All pupils must attend the school religious activities as organized by the school administration.</li>
            <li>
              All pupils must put on full school uniform when at school and on their way back home. Sportswear is only
              allowed on Wednesday and Friday.
            </li>
            <li>
              All pupils must take care of school property e.g. scholastic materials, doors, windows e.t.c. any damage
              made carelessly must be paid for the offender.
            </li>
            <li>Pupils must not leave the school compound without permission.</li>
            <li>Stealing or cheating of any form is prohibited incase found will be suspended from school.</li>
            <li>All pupils must do class home work given by the teacher.</li>
            <li>
              All pupils must respect break and lunch time e.g. lunch is compulsory to all pupils at school and paid for
              by the parents.
            </li>
            <li>
              Cooked food from home is strictly not allowed for reasons of respecting religion culture and for the
              purposes of maintaining good health and hygiene habits practices.
            </li>
            <li>All pupils must cover books using school branded covers only.</li>
            <li>
              No pupils should miss classes. In case of sickness, permission should be got from the class teacher or
              head teacher before going back home.
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

