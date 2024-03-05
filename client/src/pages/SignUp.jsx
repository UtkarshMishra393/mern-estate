import { Link }  from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 mx-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold
      my-7'>SignUp</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username'
        className='border border-blue-700 p-3 rounded-lg' id='username'/>
        <input type="email" placeholder='email'
        className='border border-blue-700 p-3 rounded-lg' id='email'/>
        <input type="password" placeholder='password'
        className='border border-blue-700 p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-blue-900 disabled:opacity-50'>
          Sign up
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have An Account ?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
