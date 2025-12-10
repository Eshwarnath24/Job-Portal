import Quill from 'quill';
import React, { useEffect, useRef, useState } from 'react'
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState('');

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image']
          ]
        },
        placeholder: 'Type the job description here...'
      })

      // Sync initial content to state and listen for changes
      setDescription(quillRef.current.root.innerHTML)
      const handleChange = () => setDescription(quillRef.current.root.innerHTML)
      quillRef.current.on('text-change', handleChange)
      return () => {
        quillRef.current.off('text-change', handleChange)
      }
    }
  }, []) // The dependency array ensures it runs once on mount

  return (
    <div className="min-h-screen w-full flex justify-start py-10 px-4">
      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-3xl space-y-5">
        <div>
          <label className="text-sm font-medium">Job Title</label>
          <input
            onChange={e => setTitle(e.target.value)} value={title}
            type="text"
            placeholder="Type here"
            className="w-full border rounded-md px-3 py-2 mt-1 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Job Description</label>
          <div
            ref={editorRef}
            className="w-full border mt-1 min-h-[150px] bg-white"
          ></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Job Category</label>
            <select onChange={e => setCategory(e.target.value)} value={category} className="w-full border rounded-md px-3 py-2 mt-1 outline-none">
              {
                JobCategories.map((category, index) => {
                  return <option key={index} value={category}>{category}</option>
                })
              }
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Job Location</label>
            <select onChange={e => setLocation(e.target.value)} value={location} className="w-full border rounded-md px-3 py-2 mt-1 outline-none">
              {
                JobLocations.map((location, index) => {
                  return <option key={index} value={location}>{location}</option>
                })
              }
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Job Level</label>
            <select onChange={e => setLevel(e.target.value)} value={level} className="w-full border rounded-md px-3 py-2 mt-1 outline-none">
              <option>Senior Level</option>
              <option>Mid Level</option>
              <option>Junior Level</option>
            </select>
          </div>
        </div>

        <div className="sm:w-1/3">
          <label className="text-sm font-medium">Salary</label>
          <input
            min={0}
            onChange={e => setSalary(Number(e.target.value))} value={salary}
            type="number"
            placeholder="0"
            className="w-full border rounded-md px-3 py-2 mt-1 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            onClick={() => console.log({ title, description, category, location, level, salary })}
            className="bg-black text-white px-8 py-2 rounded-md hover:opacity-90"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddJob
