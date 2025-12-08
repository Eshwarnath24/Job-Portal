import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecrutierLogin = () => {
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);

    const { setShowRecruiterLogin } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (state === "Sign Up" && !isSubmited) {
            setIsSubmited(true);
        }

    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium mb-1'>Recutier {state}</h1>
                <p className='text-center text-2xl text-neutral-700 font-medium'>Welcome {state === "Login" ? "back" : ""}! Please sign {state === "Login" ? "in" : "up"} to continue</p>
                {
                    state === "Sign Up" && isSubmited ?
                        <>
                            <div className='flex items-center gap-6 my-10'>
                                <label htmlFor="image">
                                    <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
                                </label>
                                <p>Upload Company <br /> logo</p>
                            </div>
                        </>
                        : <>
                            {state !== 'Login' && (
                                <div className='border px-4 py-2 flex items-center gap-4 rounded-full my-3'>
                                    <img src={assets.person_icon} alt="" />
                                    <input className='outline-none text-sm flex-1' onChange={e => setName(e.target.value)} value={name} placeholder='Company Name' type="text" required />
                                </div>
                            )}

                            <div className='border px-4 py-2 flex items-center gap-4 rounded-full my-3'>
                                <img src={assets.email_icon} alt="" />
                                <input className='outline-none text-sm flex-1' onChange={e => setEmail(e.target.value)} value={email} placeholder='Email ID' type="text" required />
                            </div>

                            <div className='border px-4 py-2 flex items-center gap-4 rounded-full my-3'>
                                <img src={assets.lock_icon} alt="" />
                                <input className='outline-none text-sm flex-1' onChange={e => setPassword(e.target.value)} value={password} placeholder='********' type="text" required />
                            </div>
                        </>
                }

                {state === "Login" && <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password ?</p>}
                <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-lg'>
                    {state === "Login" ? "Login" : isSubmited ? "Create Account" : "Next"}
                </button>

                {
                    state === "Login"
                        ?
                        <p className='mt-5 text-center'>Don't have an Account? <span onClick={() => setState("Sign Up")} className='text-blue-600 font-bold cursor-pointer'>Sign Up</span></p>
                        :
                        <p className='mt-5 text-center'>Have an Account? <span onClick={() => setState("Login")} className='text-blue-600 font-bold cursor-pointer'>Sign In</span></p>
                }

                <img onClick={() => setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer size-3' src={assets.cross_icon} alt="" />
            </form>
        </div>
    );
}

export default RecrutierLogin
