import image from '../Assets/imageSignInUp.png' 
import { useState , useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';  
import { useMutation, useQueryClient } from 'react-query';
const useSignUpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (formData) => {
      // Make the API call to your backend for user registration
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};

 
export default function SignUp() {
    const [animationClass, setAnimationClass] = useState('translate-y-[1000px]');
    const [placement, setplacement] = useState(''); 
    const [passwordchecked, isPasswordchecked] = useState(true); 
    const [match, ismatched] = useState(false);
    const signUpMutation = useSignUpMutation();

    useEffect(() => {
        // Update the animation class after a delay
        const timeout = setTimeout(() => {
          setAnimationClass('');
        }, 250);
    
        return () => clearTimeout(timeout);
      }, []);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      const[confirm, setConfirm] =useState(''); 
 
      const handleChange = (e) => { 
        const { name, value } = e.target; 
        setFormData((prevData) => ({ 
          ...prevData, 
          [name]: value, 
        })); 
      }; 
     
      const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const { firstName, lastName, email, password } = formData;
        const username = `${firstName} ${lastName}`;
        const userCredentials = { username, email, password };
        const isPowerful = isPowerfulPassword(password);
        if (confirm != password) ismatched(true);
        isPasswordchecked(isPowerful);
        const matched = match ;
        
        if (!matched && isPowerful) { // Check if the password is powerful before attempting sign-up
          try {
            await signUpMutation.mutateAsync(userCredentials);
            navigate('/Login');
          } catch (error) {
            // Handle sign-up failure
            console.error('Sign-up failed:', error);
          }
        }
      };
      
      function isPowerfulPassword(password) {
        // Define criteria for a powerful password
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    
        // Check if the password meets all criteria
        return (
            (password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChars)
        );
    }
  return (
    <div className="relative h-screen overflow-hidden flex justify-center items-center bg-[url('./Assets/imageSignInUp.png')]" >
        
        <div className={`transition duration-700 absolute top-32 h-fit w-fit max-[475px]:w-full bg-white min-[475px]:rounded-lg ${animationClass} ${placement}`}>
         <h1 className='text-3xl font-bold text-center m-16'>Sign Up</h1>
          <div className='flex flex-col gap-2 items-center justify-center m-16 '>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                <div className=' flex gap-8 '>
                <input
                className='w-36 outline-none cursor-text p-2'
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <input
            className='w-36 outline-none cursor-textp-2'
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
                </div>
           
            <input
            className='outline-none cursor-text p-2'
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            {match && <div className='text-sm font-semibold text-red-500'>Password does not match </div>}
            {!passwordchecked && <div className='text-sm font-semibold text-red-500'>
              Please ensure that the password contains a mix of <br />uppercase 
              and lowercase letters,numbers and special letters.</div>}
            <input
            className='outline-none cursor-text p-2'
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <input
            className='p-2 outline-none w-36 cursor-text'
                type="password"
                placeholder="Confirm Password"
                name="Confirm-password"
                onChange={(e) => setConfirm(e.target.value)}
                value={confirm}
                required
            />
            <button className='h-8 bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-[1.05] text-md rounded-full text-white mb-4' type="submit" >Continue</button>
    </form>
           <h2 className='text-md  text-gray-500'>Do you already have an account?</h2> 
            <h2 className='hover:underline cursor-pointer' onClick={()=>{navigate('/Login')}}>Login</h2>
            </div>
        </div>
    </div>
    
  )
}