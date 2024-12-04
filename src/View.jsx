import React from "react";
import { useState } from "react";
import { BriefcaseIcon, MapPinIcon, MailIcon, PhoneIcon } from "./SVG";
import resumeData from "./Data";
import ResumeForm from "./ResumeForm";

const View = () => {
    const [data, setData] = useState(resumeData);
    function addData (input) {
        // console.log(input);
        const updatedData = [...data, input]; // Create a new array with the new input
        setData(updatedData); // Update the state with the new data
        console.log(updatedData);     }
  return (
    <>

        <ResumeForm addData={addData}/>
      {data.map((resumeData, idx) => (
        <div
          key={idx}
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-12"
        >
          {/* Header Section */}
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {resumeData.personal.name}
            </h1>
            <p className="text-xl text-gray-600">{resumeData.personal.title}</p>
            <div className="flex justify-center space-x-4 mt-4 text-gray-500">
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2" />
                <span>{resumeData.personal.location}</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="w-5 h-5 mr-2" />
                <span>{resumeData.personal.email}</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-5 h-5 mr-2" />
                <span>{resumeData.personal.phone}</span>
              </div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4 flex items-center">
              <BriefcaseIcon className="w-6 h-6 mr-3 text-gray-600" />
              Professional Summary
            </h2>
            <p className="text-gray-600">{resumeData.summary}</p>
          </section>

          {/* Work Experience */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">
              Work Experience
            </h2>
            <div className="space-y-6">
              {resumeData.workExperience.map((job, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-gray-600">
                    {job.company} | {job.location}
                  </p>
                  <p className="text-gray-500 italic">{job.period}</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    {job.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">
              Education
            </h2>
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {resumeData.education.degree}
              </h3>
              <p className="text-gray-600">
                {resumeData.education.institution}
              </p>
              <p className="text-gray-500 italic">
                Graduated: {resumeData.education.graduationYear}
              </p>
            </div>
          </section>
        </div>
      ))}
        
    </>
  );
};

export default View;
