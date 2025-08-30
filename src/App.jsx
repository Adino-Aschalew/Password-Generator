import { useState } from "react";
import { nums,lowercaseLetter,uppercaseLetter,syms } from "./data";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const[passwordLength,setPasswordLength] = useState(8);
  const [lowercase,setLowercase]  = useState(false);
  const [uppercase,setUppercase]  = useState(false);
  const [symbol,setSymbol]  = useState(false);
  const[numbers,setNumbers] = useState(false);
  const [password, setPassword] = useState("");
  
const handleSubmit =(e) =>{
e.preventDefault();
}

const generateStrongPassword =() =>{
let generatedPassword = ""; 

if (lowercase) generatedPassword += lowercaseLetter;
if (uppercase) generatedPassword += uppercaseLetter;
if(numbers) generatedPassword += nums;
if(symbol) generatedPassword +=syms;

setPassword(createPassword(generatedPassword));
toast.success("Password Generated");
}
const createPassword = (generatedPassword) => {
  let password = "";
  const generatedPasswordLength = generatedPassword.length;
  for (let i = 0; i<passwordLength; i++){
    const passwordIndex = Math.floor(Math.random() * generatedPasswordLength);
    password += generatedPassword.toString().charAt(passwordIndex);
  }
  return password;
};
const copyToClipboard = () =>{
  if(!password) {
    toast.error("Nothing copied")
  }else{
    navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard");
  }
}
  return ( 
    <>
    <ToastContainer position="top-center" theme="colored"/>
    <div className="flex items-center justify-center min-h-screen bg-black ">
       <div className="bg-gray-500 p-8 rounded-lg w-150 ">
          <h1 className="text-3xl mb-5 text-center text-black font-bold">Password Generator</h1>
         <div className="flex items-center justify-between p-6 font-bold text-lg bg-black rounded-lg text-white mb-4">
          <p className="text-white">{password} {" "}</p>
          {!password ? null :<button onClick={copyToClipboard} className="transition duration-200 ease-in-out bg-black px-4 py-2 rounded-lg cursor-pointer border hover:bg-gray-500">copy</button>
}
         </div>
        <form onSubmit={handleSubmit}>
          <article className="mb-3 font-bold text-lg flex justify-between items-center">
            <label htmlFor="password-length">Password-Length</label>
            <input type="number" name="password-length" id="password-length" min={8} max={20}
             className="p-1 bg-gray-500 text-white rounded border border-gray-300"
            defaultValue={passwordLength}
            onChange={(e)=> setPasswordLength(e.target.value)}
            />
          </article>
          <article className="mb-3 font-bold text-lg justify-between flex items-center">
            <label htmlFor="lowercase-letters">LowerCase Letters</label>
            <input
             type="checkbox" 
             name="lowercase-letters"
             checked={lowercase}
             onChange = {(e)=>setLowercase(e.target.checked)}
             className="h-5 w-5"
            />
          </article>
             <article className="mb-3 font-bold text-lg flex justify-between items-center">
            <label htmlFor="uppercase-letters">UpperCase Letters</label>
            <input
             type="checkbox" 
             name="uppercase-letters"
             checked={uppercase}
             onChange = {(e)=>setUppercase(e.target.checked)}
             className="h-5 w-5"
            />
          </article>
           <article className="mb-3 font-bold text-lg flex justify-between items-center">
            <label htmlFor="numbers">Numbers</label>
            <input
             type="checkbox" 
             checked={numbers}
             onChange = {(e)=>setNumbers(e.target.checked)}
             className="h-5 w-5"
            /></article>
             <article className="mb-3 font-bold text-lg flex justify-between items-center">
            <label htmlFor="symbol">Symbol</label>
            <input
             type="checkbox" 
             checked={symbol}
             onChange = {(e)=>setSymbol(e.target.checked)}
             className="h-5 w-5"
            /></article>
            <button onClick={generateStrongPassword} className="transition duration-500 ease-in-out font-bold text-xl w-full p-4 bg-black text-white rounded-b-lg hover:bg-gray-500 hover:border hover:text-black cursor-pointer " type="submit">Suggest Strong Password</button>
        </form>
      </div>
      </div>
    </>
   );
}
 
export default App;
