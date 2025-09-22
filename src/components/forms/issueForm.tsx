import React, { useState } from 'react';
import Select from 'react-select';
import { allLocations } from '../../locationdata/location';
import { addNewIssue } from '../../lib/issueHelpers';

interface LocationOption {
  label: string;
  value: string;
}

const IssueForm = () => {
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const loggedInUser = { id: 'user-3', name: 'Siddhima', email: 'demo@example.com' };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedLocation || !description) {
      alert("Please fill in Title, Location, and Description.");
      return;
    }

    setLoading(true);
    
    const issueData = {
      user_id: loggedInUser.id,
      title,
      description,
      location: selectedLocation?.label || '',
      tags,
      upvotes: 0,
      file_url: null,
      created_at: new Date().toISOString(),
      status: 'pending' as const,
    };

    addNewIssue(issueData);
    alert("Issue submitted successfully!");
    await new Promise(resolve => setTimeout(resolve, 100));
    window.location.href = '/client';
  };

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#111827',
      borderColor: 'transparent',
      borderRadius: '0.5rem',
      boxShadow: 'none',
      padding: '0.25rem',
      cursor: 'pointer',
      '&:hover': {
        borderColor: 'transparent',
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#111827',
      borderRadius: '0.5rem',
      padding: '0.5rem',
      border: 'none',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#2563eb' : '#111827',
      color: state.isFocused ? '#fff' : '#9ca3af',
      cursor: 'pointer',
      borderRadius: '0.375rem',
      padding: '0.75rem',
      '&:active': {
        backgroundColor: '#2563eb'
      }
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#9ca3af'
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#9ca3af'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#9ca3af',
      '&:hover': {
        color: '#fff'
      }
    })
  };

  return (
    <div className="bg-black min-h-screen flex flex-col p-6 font-sans text-gray-200">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Report an Issue</h1>
          <p className="text-gray-400">Your report will be added to the community board.</p>
          <p className="text-green-400 mt-2 text-sm">Logged in as: Guest</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="issue-title" className="block text-sm font-medium text-gray-300 mb-2">Issue Title</label>
            <input
              type="text"
              id="issue-title"
              placeholder="e.g., Pothole on Main Street"
              className="block w-full rounded-lg border-0 bg-gray-900 py-3 px-4 text-gray-200 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <Select
              id="location"
              options={allLocations}
              value={selectedLocation}
              onChange={(option) => setSelectedLocation(option as LocationOption)}
              styles={customSelectStyles}
              placeholder="Select or type to search a location..."
              isSearchable
              className="react-select-dark"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              id="description"
              rows={3}
              placeholder="Describe the issue in detail..."
              className="block w-full rounded-lg border-0 bg-gray-900 py-3 px-4 text-gray-200 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
            <input
              type="text"
              id="tags"
              placeholder="Roads, Sanitation, Safety"
              className="block w-full rounded-lg border-0 bg-gray-900 py-3 px-4 text-gray-200 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="mt-2 text-xs text-gray-500">Use commas to separate tags.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Attachment (Optional)</label>
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-700 px-6 py-10 hover:border-gray-600 bg-gray-900">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-400">
                    <span className="font-semibold text-blue-400">Upload a file</span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500">PNG, JPG up to 10MB</p>
                  {fileName && (<p className="text-sm mt-4 text-green-400 font-medium">{fileName}</p>)}
                </div>
              </div>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Issue"}
          </button>
        </form>
      </div>
      <style>{`
        .react-select-dark .Select__menu {
          background-color: #111827 !important;
        }
        body {
          background-color: #000;
        }
      `}</style>
    </div>
  );
};

export default IssueForm;