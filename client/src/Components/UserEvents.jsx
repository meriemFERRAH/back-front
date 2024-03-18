import AddBtn from '../Assets/images/add.svg'; 
import { useQuery , useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import image from '../Assets/images/hero.png'

const CreateNewEvent = () => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <Link to="/createEvent">
        <img
        src={AddBtn}
        alt="Add Button"
        className="transition duration-300 ease-in-out transform cursor-pointer hover:scale-110"
      /></Link>
    </div>
  );
};
const deleteEvent = async (eventId, token) => {
    const response = await fetch(`http://localhost:8000/deletEvent/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
  };
  
  const ShowingEventCard = ({ data, token , isUser }) => {
    const navigate = useNavigate();
  
    const handleCardClick = (id) => {
      navigate(`/EventPage/${id}`);
    };
  
    // Mutation function for deleting an event
    const deleteEventMutation = useMutation((eventId) => deleteEvent(eventId, token));
  
    const handleDelete = (id) => {
      deleteEventMutation.mutate(id);
    };
    const userEvent = data?.YourEvents;
    return (
        <>
            {userEvent?.map((card) => (
                <div className='flex flex-col items-center ' key={card._id}>
                    <div className="cards1" onClick={() => handleCardClick(card._id)} >
                    <img className='w-[300px] h-[250px}' src={image} alt="image" />
                <div className="absolute top-0 left-0 bg-white pt-0.5 pb-0.5 pe-2 ps-2"><p className="text-base font-medium">{card.price}</p></div>
                <div className="flex justify-between items-center pt-2 pb-2 ps-1 pe-2">
                <div className="basis-1/6 font-medium text-md text-center">
                  <div>{new Date(card.date).getDate()}</div>
                  <div>{new Date(card.date).toLocaleString('default', { month: 'short' })}</div>
                  <div>{new Date(card.date).getFullYear()}</div>
                </div>
                    <div className="basis-3/6 ps-1">
                        <h3 className="text-md font-medium text-center">{card.title}</h3>
                        <h4 >{data?.username}</h4>
                    </div>
                    <div className="basis-2/6"> <span className="font-medium ps-4">{data?.followers?.length} </span>Followers</div>
                </div>
                <div className="absolute top-2 right-2 bg-white hover:scale-[1.1] transition duration-500 p-1 rounded-3xl z-10">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 14" fill="none">
                        <path d="M11.6458 0.699707C10.1567 0.699707 8.84484 1.44425 8.1003 2.61425C7.35575 1.44425 6.04393 0.699707 4.55484 0.699707C2.21484 0.699707 0.300293 2.61425 0.300293 4.95425C0.300293 9.17334 8.1003 13.4633 8.1003 13.4633C8.1003 13.4633 15.9003 9.2088 15.9003 4.95425C15.9003 2.61425 13.9858 0.699707 11.6458 0.699707Z" fill="#C2C2C2"/>
                    </svg>
                </div>
                    </div>
                    {isUser && <button className='bg-red-600 rounded-xl font-semibold text-white pt-2 pb-2 pe-4 ps-4 mt-4 hover:scale-[1.01]' onClick={() => handleDelete(card._id)}>Delete This Event</button>}
                </div>
            ))}
        </>
    );
};

const UserEvents = ({ isUser, data }) => {
    // Token management logic
    const token = localStorage.getItem('token') // Replace 'your_token' with your actual token or use your token management system
    
    return (
      <section className="flex flex-col py-4 gap-y-8">
        <div className='w-[900px]'>
          <h3 className="text-lg font-semibold">Upcoming</h3>
          <div className="grid grid-cols-3 gap-4  justify-items-center mt-4 mb-4">
            <ShowingEventCard data={data} token={token} />
            {isUser && <CreateNewEvent />}
          </div>
        </div>
        <div className='w-[900px]'>
          <h3 className="text-lg font-semibold">Passed</h3>
          <div className="grid grid-cols-3 gap-4 justify-items-center mt-4 mb-4">
            <ShowingEventCard data={data} token={token} isUser={isUser} />
          </div>
        </div>
      </section>
    );
  };
  
  export default UserEvents;