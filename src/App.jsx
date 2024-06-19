import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

const App = () => {

  const [length ,setLength]=useState(8);
  const [numberAllowed ,setNumberAllowed]=useState(false);
  const [characterAllowed ,setCharacterAllowed]=useState(false);
  const [password, setPassword]=useState("")
  const passwordref=useRef(null);
  const copy= useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password]);
  const passwordGenrator=useCallback(()=>{
    let pass="";
    let str="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if(numberAllowed)str+="1234567890";
    if(characterAllowed)str+="!@#$%^&*(){}[]`~";
    for(let i=0; i<length;i++){
      let random= Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(random);
    }
    setPassword(pass);
  },[length,numberAllowed,characterAllowed]);
  useEffect(()=>{passwordGenrator()},[length,numberAllowed,characterAllowed,passwordGenrator])
  return (
    <>
      <div className="container h-screen flex flex-col items-center bg-black">
        <h1 className="text-5xl p-20 text-white">Password Genrator</h1>
        <div className="bg-gray-700 justify-self-center p-8 h-40 w-2/4 rounded-xl">
          <div className="flex">
            <input className="outline-none text-xl w-full p-1" type="text" value={password} readOnly ref={passwordref}/>
            <button className="bg-blue-500 px-3 text-white rounded-e-3xl hover:bg-blue-700" onClick={(copy)}>COPY</button>
          </div>
          <div className="flex mt-8 justify-between text-white">
            <div>
              <input type="range" value={length} max={20}  min={4} onChange={(e)=>{setLength(e.target.value)}} className="mr-3" />
              <label htmlFor=""> Length ({length})</label>
            </div>
            <div className="flex justify-between w-1/3">
              <div>
                <input type="checkbox" id="num" onChange={()=>{setNumberAllowed(!numberAllowed)}} className="mr-1" />
                <label htmlFor="num">Number</label>
              </div>
              <div>
                <input type="checkbox" id="char" onChange={()=>{setCharacterAllowed(!characterAllowed)}} className="mr-1" />
                <label htmlFor="char">Character</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
