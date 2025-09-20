import React, { useState } from "react";
import Select from 'react-select';
import { allLocations } from '../../locationdata/location.js';

// --- Icons and Styles (No Change) ---
const FileTextIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /> <polyline points="14 2 14 8 20 8" /> </svg> );
const TagIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /> <path d="M7 7h.01" /> </svg> );
const UploadCloudIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /> <path d="M12 12v9" /> <path d="m16 16-4-4-4 4" /> </svg> );
const customSelectStyles = {
  control: (provided, state) => ({ ...provided, backgroundColor: '#111827', borderColor: state.isFocused ? '#0ea5e9' : '#374151', boxShadow: 'none', '&:hover': { borderColor: '#4b5563' }, minHeight: '50px', }),
  menu: (provided) => ({ ...provided, backgroundColor: '#1f2937', border: '1px solid #374151', }),
  option: (provided, state) => ({ ...provided, backgroundColor: state.isFocused ? '#0ea5e9' : 'transparent', color: state.isFocused ? '#fff' : '#d1d5db', '&:active': { backgroundColor: '#0284c7', }, }),
  singleValue: (provided) => ({ ...provided, color: '#d1d5db', }),
  input: (provided) => ({ ...provided, color: '#d1d5db', }),
  placeholder: (provided) => ({ ...provided, color: '#6b7280', }),
};

const IssueForm = () => {
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || { id: 'user-guest', email: 'Guest' };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !selectedLocation || !description) {
      alert("Please fill in Title, Location, and Description.");
      return;
    }

    setLoading(true);

    const newIssue = {
      id: Date.now(),
      user_id: loggedInUser.id,
      title,
      description,
      location: selectedLocation.label,
      tags,
      file_url: null,
      created_at: new Date().toISOString(),
      upvotes: 0,
      status: 'pending',
    };

    const existingIssues = JSON.parse(localStorage.getItem('civic_issues') || '[]');
    const updatedIssues = [newIssue, ...existingIssues];
    localStorage.setItem('civic_issues', JSON.stringify(updatedIssues));

    alert("Issue submitted successfully!");

    // Wait a moment before redirecting to ensure localStorage saves
    await new Promise(resolve => setTimeout(resolve, 100));
    window.location.href = '/admin';
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="bg-black text-gray-50 rounded-2xl shadow-2xl p-8 max-w-lg w-full border border-gray-800/50">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-white">Report an Issue</h1>
                <p className="text-gray-400 mt-2">Your report will be added to the community board.</p>
                <p className="text-sm text-green-400 mt-2">Logged in as: {loggedInUser.email}</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="issue-title" className="block text-sm font-medium text-gray-300 mb-2">Issue Title</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><FileTextIcon className="h-5 w-5 text-gray-500" /></div>
                        <input type="text" id="issue-title" placeholder="e.g., Pothole on Main Street" className="block w-full rounded-md border-0 bg-gray-900 py-3 pl-10 pr-3 text-gray-50 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-500" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <Select id="location" options={allLocations} value={selectedLocation} onChange={setSelectedLocation} styles={customSelectStyles} placeholder="Select or type to search a location..." isSearchable />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea id="description" rows={3} placeholder="Describe the issue in detail..." className="block w-full rounded-md border-0 bg-gray-900 py-3 px-4 text-gray-50 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-500" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><TagIcon className="h-5 w-5 text-gray-500" /></div>
                        <input type="text" id="tags" placeholder="Roads, Sanitation, Safety" className="block w-full rounded-md border-0 bg-gray-900 py-3 pl-10 pr-3 text-gray-50 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-sky-500" value={tags} onChange={(e) => setTags(e.target.value)} />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Use commas to separate tags.</p>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Attachment (Optional)</label>
                    <label htmlFor="file-upload" className="relative cursor-pointer">
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-700/50 px-6 py-10 hover:border-gray-600">
                            <div className="text-center">
                                <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                    <span className="font-semibold text-sky-500">Upload a file</span>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-500">PNG, JPG up to 10MB</p>
                                {fileName && (<p className="text-sm mt-4 text-green-400 font-medium">{fileName}</p>)}
                            </div>
                        </div>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                </div>

                <button type="submit" disabled={loading} className="w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-200">{loading ? "Submitting..." : "Submit Issue"}</button>
            </form>
        </div>
    </div>
  );
};

export default function App() {
  return <IssueForm />;
}