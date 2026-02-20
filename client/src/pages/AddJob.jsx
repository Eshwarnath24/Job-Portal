import Quill from 'quill';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {

      const descriptionHtml = quillRef.current?.root?.innerHTML || ''

      const tempContainer = document.createElement('div')
      tempContainer.innerHTML = descriptionHtml
      const plainText = tempContainer.textContent?.trim() || ''

      if (!plainText) {
        return toast.error('Please add a job description')
      }

      const { data } = await axios.post(
        backendUrl + '/api/company/post-job',
        { title, description: descriptionHtml, location, salary, category, level },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        toast.success(data.message || 'Job posted successfully')
        setTitle('')
        setSalary(0)
        quillRef.current.root.innerHTML = ""
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
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

      const Delta = Quill.import('delta')

      quillRef.current.clipboard.addMatcher(Node.ELEMENT_NODE, (node) => {
        const text = node.textContent || ''
        return new Delta().insert(text)
      })
    }
  }, [])

  return (
    <div className="min-h-screen w-full flex justify-start py-10 px-4">
      <form onSubmit={onSubmitHandler} className="w-full max-w-3xl space-y-5">
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
