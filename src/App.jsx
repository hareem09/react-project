import { useCallback, useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [password,setPassword]=useState('')
  const[numberAllowed,setnumberAllowed]=useState(false)
  const[charAllowed,setcharAllowed]=useState(false)
  const passwordRef=useRef(null)
  // useEffect(()=>{
  //   Password()
  // },[length,Password,numberAllowed,charAllowed])
  const Password=useCallback(()=>{
   let pass=''
   let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
   if(numberAllowed)str+='0123456789'
   if(charAllowed)str+='!@#$%^&*?><\";=-+,.'
   for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
   }
   setPassword(pass)
  },[length,setPassword,numberAllowed,charAllowed])
  const copytoclipboard=useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.setSelectionRange(0,99)
    passwordRef.current?.select();
  },[password])
  
  useEffect(()=>{
    Password()
  },[length,Password,numberAllowed,charAllowed])
  return (
    <>
    <div className='container w-full text-white mx-auto max-w-md bg-red-600 px-4 my-8 rounded-lg'>
    <h1 className='font-bold text-lg'>Password generator</h1>
      <div className="password  text-green-500  text-center">
        <input
         type="text"
         placeholder='password'
         ref={passwordRef}
         value={password}
         readOnly
         className='w-72 h-14 mt-5 flex-grow outline-none'
         />
         <button className='bg-blue-600 h-14 w-10' onClick={copytoclipboard}>copy</button>
      </div>
      <div className='length p-5'>
      <input 
         type='range'
         min={6}
         max={100}
         value={length}
         onChange={(e)=>{
          setlength(e.target.value)
         }} />
         <label>Length={length}</label>
      </div>
      <div className="checkbox flex justify-around p-5">
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        onChange={()=>{
          setnumberAllowed((prev)=>!prev)
        }}
        />
        <label>Number</label>
         <input 
        type="checkbox"
        defaultChecked={charAllowed}
        onChange={()=>{
          setcharAllowed((prev)=>!prev)
        }}
        />
         <label>Character</label>
      </div>
     </div> 
    </>
  )
}

export default App
