import React, { useState } from 'react';

const ResumeForm = ({ addData }) => {
  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    title: '',
    location: '',
    email: '',
    phone: ''
  });

  // Professional Summary State
  const [summary, setSummary] = useState('');

  // Work Experience State
  const [workExperience, setWorkExperience] = useState([
    { title: '', company: '', location: '', period: '', responsibilities: [''] }
  ]);

  // Skills State
  const [skills, setSkills] = useState(['']);

  // Education State
  const [education, setEducation] = useState({
    degree: '',
    institution: '',
    graduationYear: ''
  });

  // Handle Personal Info Change
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Work Experience Change
  const handleWorkExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][name] = value;
    setWorkExperience(newWorkExperience);
  };

  // Handle Responsibility Change
  const handleResponsibilityChange = (expIndex, respIndex, value) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[expIndex].responsibilities[respIndex] = value;
    setWorkExperience(newWorkExperience);
  };

  // Add New Work Experience
  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience, 
      { title: '', company: '', location: '', period: '', responsibilities: [''] }
    ]);
  };

  // Add Responsibility
  const addResponsibility = (expIndex) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[expIndex].responsibilities.push('');
    setWorkExperience(newWorkExperience);
  };

  // Handle Skills Change
  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  // Add Skill
  const addSkill = () => {
    setSkills([...skills, '']);
  };

  // Handle Education Change
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty skills and responsibilities
    const filteredSkills = skills.filter(skill => skill.trim() !== '');
    const filteredWorkExperience = workExperience.map(exp => ({
      ...exp,
      responsibilities: exp.responsibilities.filter(resp => resp.trim() !== '')
    }));

    const resumeData = {
      personal: personalInfo,
      summary,
      workExperience: filteredWorkExperience,
      skills: filteredSkills,
      education
    };

    addData(resumeData);
  };

  return (
    <div className=" mx-auto bg-white shadow-lg rounded-lg p-8 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Resume Builder</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="name"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
              placeholder="Full Name" 
              className="w-full p-2 border rounded" 
            />
            <input 
              type="text" 
              name="title"
              value={personalInfo.title}
              onChange={handlePersonalInfoChange}
              placeholder="Professional Title" 
              className="w-full p-2 border rounded" 
            />
            <input 
              type="text" 
              name="location"
              value={personalInfo.location}
              onChange={handlePersonalInfoChange}
              placeholder="Location" 
              className="w-full p-2 border rounded"
            />
            <input 
              type="email" 
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              placeholder="Email" 
              className="w-full p-2 border rounded" 
            />
            <input 
              type="tel" 
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
              placeholder="Phone Number" 
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
          <textarea 
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write a brief professional summary" 
            className="w-full p-2 border rounded h-32"
          />
        </div>

        {/* Work Experience */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
          {workExperience.map((exp, expIndex) => (
            <div key={expIndex} className="mb-6 p-4 border rounded">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  name="title"
                  value={exp.title}
                  onChange={(e) => handleWorkExperienceChange(expIndex, e)}
                  placeholder="Job Title" 
                  className="w-full p-2 border rounded"
                />
                <input 
                  type="text" 
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleWorkExperienceChange(expIndex, e)}
                  placeholder="Company" 
                  className="w-full p-2 border rounded"
                />
                <input 
                  type="text" 
                  name="location"
                  value={exp.location}
                  onChange={(e) => handleWorkExperienceChange(expIndex, e)}
                  placeholder="Location" 
                  className="w-full p-2 border rounded"
                />
                <input 
                  type="text" 
                  name="period"
                  value={exp.period}
                  onChange={(e) => handleWorkExperienceChange(expIndex, e)}
                  placeholder="Period (e.g., June 2020 - Present)" 
                  className="w-full p-2 border rounded"
                />
              </div>
              
              {/* Responsibilities */}
              <div>
                <h4 className="font-medium mb-2">Responsibilities</h4>
                {exp.responsibilities.map((resp, respIndex) => (
                  <input 
                    key={respIndex}
                    type="text"
                    value={resp}
                    onChange={(e) => handleResponsibilityChange(expIndex, respIndex, e.target.value)}
                    placeholder={`Responsibility ${respIndex + 1}`}
                    className="w-full p-2 border rounded mb-2"
                  />
                ))}
                <button 
                  type="button"
                  onClick={() => addResponsibility(expIndex)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
                >
                  Add Responsibility
                </button>
              </div>
            </div>
          ))}
          <button 
            type="button"
            onClick={addWorkExperience}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Work Experience
          </button>
        </div>

        {/* Skills */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
          {skills.map((skill, index) => (
            <input 
              key={index}
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="Enter a skill" 
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button 
            type="button"
            onClick={addSkill}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-2"
          >
            Add Skill
          </button>
        </div>

        {/* Education */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="degree"
              value={education.degree}
              onChange={handleEducationChange}
              placeholder="Degree" 
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" 
              name="institution"
              value={education.institution}
              onChange={handleEducationChange}
              placeholder="Institution" 
              className="w-full p-2 border rounded"
            />
            <input 
              type="text" 
              name="graduationYear"
              value={education.graduationYear}
              onChange={handleEducationChange}
              placeholder="Graduation Year" 
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Generate Resume
          </button>
        </div>
      </form>
    </div>
  );
};
export default ResumeForm;