import  {useState} from 'react'
import Navbar from '../Components/CustomNavbar';
import UserIcon from '../Assets/images/userIcon.svg';
import ImageCropper from '../Components/ImageCropper';
import { useProfileImage } from '../Components/ProfileImageContext';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
  const [charCount, setCharCount] = useState(0);
  const  profileImage = useProfileImage();
  const {id} = useParams();
  const handleInputChange = (event) => {
    const inputText = event.target.value;
    const currentLength = inputText.length;

    //? Ensure the character count doesn't exceed the maximum limit
    if (currentLength <= 500) {
      setCharCount(currentLength);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    //? Reset the form
    e.target.reset();
  }
  
    //? Image upload
    const [modalOpen, setModalOpen] = useState(true);
    const [userIcon, setUserIcon] = useState(UserIcon);
    //? Update the avatar
    const updateAvatar = (imgSrc) => {
      setUserIcon(imgSrc);
    };

    
    
  return (
    <form onSubmit={handleSubmit} className='wrapper w-full h-screen overflow-y-auto bg-[#E1E1E1]'>
      <Navbar/>
      <main className='py-2 mx-32 my-4 space-y-4 bg-white rounded-lg px-[200px] min-h-adjust'>
      <h1 className='flex justify-center text-3xl text-blue-950 font-semibold'>Edit Profile</h1>
        <ImageCropper 
          userIcon={userIcon} 
          updateAvatar={updateAvatar} 
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          closeModal={()=> setModalOpen(false)} 
        />
        <div className='flex flex-col'>
          <p className='ml-4'>Username</p>
          <input type="text" placeholder='User123' className='bg-[#D9D9D9] rounded-lg py-2 px-4 outline-none' />
        </div>
        <div className='flex flex-col'>
          <p className='ml-4'>Phone Number</p>
          <input type="tel" placeholder='+213*********' pattern="[+][0-9]*$" title='Number in international format' className='bg-[#D9D9D9] rounded-lg py-2 px-4 outline-none' />
        </div>
        <div className='flex flex-col'>
          <p className='ml-4'>Email Address</p>
          <input type="email" placeholder='user123@gmail.com' className='bg-[#D9D9D9] rounded-lg py-2 px-4 outline-none' />
        </div>
        <div className='flex flex-col'>
          <p className='ml-4'>Profile Description</p>
          <div className='bg-[#D9D9D9] rounded-lg'>
            <textarea
                className="w-full h-[100px] py-2 px-4 outline-none wrapper text-wrap rounded-lg bg-[#D9D9D9]"
                placeholder='Description...'
                maxLength={500}
                onChange={handleInputChange}
                style={{ resize: 'none' }}
              />
            <p className='text-[#414141] flex justify-end mr-2'>{charCount}/500</p>
          </div>
        </div>
        <div className='flex justify-end'>
        <button className='w-32 p-1 mt-4 text-white transition duration-300 ease-in-out  bg-blue-500 rounded-lg hover:scale-[1.01]'>Save</button>
        </div>
      </main>
    </form>
  )
}

export default EditProfile;