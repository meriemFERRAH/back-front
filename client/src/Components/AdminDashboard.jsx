import { useState } from "react";
import Image from "../Assets/EventCardImg.png";
export default function AdminDashboard() {
    const Data = [
        {
            id: 1,
            imgSrc : Image,
            alt: "img1",
            Event: "Event Name1",
            price: "Price",
            Organizer :"user X",
            location:"alger",
            Followers:"100",
            Date:" sep 12"

        },
        {
            id: 2,
            imgSrc : Image,
            alt: "img1",
            Event: "Event Name",
            price: "150$",
            Organizer :"user X",
            location:"oran",
            Followers:"100",
            Date:" sep 12"

        },
        {
            id: 3,
            imgSrc : Image,
            alt: "img1",
            Event: "Event Name",
            price: "150$",
            Organizer :"user X",
            location:"oran",
            Followers:"100",
            Date:" sep 12"
        }, {
            id: 4,
            imgSrc : Image,
            alt: "img1",
            Event: "Event Name",
            price: "150$",
            Organizer :"user X",
            location:"oran",
            Followers:"100",
            Date:" sep 12"
          
        }, {
            id: 5,
            imgSrc : Image,  
            alt: "img1",
            Event: "Event Name",
            price: "150$",
            Organizer :"user X",
            location:"oran",
            Followers:"100",
            Date:" sep 12"
          
        }, {
            id: 6,
            imgSrc : Image,  
            alt: "img1",
            Event: "Event Name",
            price: "150$",
            Organizer :"user X",
            location:"oran",
            Followers:"100",
            Date:" sep 12"
          
        }, {
            id: 7,
            imgSrc : Image,  
            alt: "img1",
            Event: "Event Name",
            price: "150 $",
            Organizer :"user X",
            location:"oran",
            Followers:"100",
            Date:" sep 12"
          
        },
      ]

      const [CardsData , setCardsData] = useState(Data)
      const [searchInput, setSearchInput] = useState('');
      const [locationInput, setLocationInput] = useState('');
    
      const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
      };
    
      const handleLocationInputChange = (e) => {
        setLocationInput(e.target.value);
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search Input:', searchInput);
        console.log('Location Input:', locationInput);
      
        const filteredEvents = Data.filter((event) => {
          const searchTerm = searchInput.toLowerCase();
          return (
            (event.Event && event.Event.toLowerCase().includes(searchTerm)) ||
            (event.location && event.location.toLowerCase().includes(searchTerm))
          );
        });
      
        console.log('Filtered Events:', filteredEvents);
      
        const locationTerm = locationInput.toLowerCase();
        const finalFilteredEvents = filteredEvents.filter((event) =>
          event.location && event.location.toLowerCase().includes(locationTerm)
        );
      
        console.log('Final Filtered Events:', finalFilteredEvents);
      
        setCardsData(finalFilteredEvents);
      };
      
      
    
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSubmit(e);
        }
      };
  return (
    <div className="ps-96">
        <form className="ps-8 flex pt-32" onSubmit={handleSubmit}>
      <div className="rounded-2xl shadow-md bg-white w-[400px] flex gap-2 justify-center items-center ps-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g opacity="0.5">
        <circle cx="5.78721" cy="5.78721" r="5.09339" stroke="black" stroke-width="1.38765"/>
        <path d="M13.653 14.7359C14.0594 15.1424 14.7184 15.1423 15.1248 14.7359C15.5312 14.3294 15.5312 13.6705 15.1247 13.2641L13.653 14.7359ZM15.1247 13.2641L10.4442 8.58378L8.97243 10.0556L13.653 14.7359L15.1247 13.2641Z" fill="black"/>
        </g>
    </svg>
        <input
          className="focus:outline-none focus:border-none border-none text-md p-2"
          type="text"
          placeholder="Search by event name, username, keywords"
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <input
        className="focus:outline-none focus:border-none border-none w-[150px] ms-8 rounded-2xl shadow-md text-md p-2"
        type="text"
        placeholder="Location"
        value={locationInput}
        onChange={handleLocationInputChange}
        onKeyPress={handleKeyPress}
      />
    </form>
    <div className="ps-16 pe-8 pb-2 pt-8 flex gap-[700px]">
        <p className="text-gray-800 font-semibold text-md">There is <span className="text-blue-700 font-bold">{CardsData.length}</span> events found</p>
        <p className="text-gray-800 font-semibold text-md">Sort by:<span className="text-md text-blue-700 font-bold">Date</span></p>
    </div>
    {(CardsData != 0 )&& <div className="border-2 ms-4 mb-8 bg-gray-100 rounded-lg border-gray-300 flex flex-col justify-center items-center gap-4 p-4">
    {CardsData.map((card)=>(
            <div className=" bg-gray-200 flex justify-center items-center p-4 rounded-md border-2 w-full border-gray-300" key={card.id}>
                <img className="w-[200px] h-[180px] basis-1/4" src={card.imgSrc} alt="" />
                <div className=" basis-1/2 ps-8 pe-8 w-fit">
                    <h1 className="text-3xl text-black font-bold pb-4">{card.Event}</h1>
                    <div className="pb-4"> 
                        <p className="text-lg font-bold text-cyan-900"><span className="text-lg font-medium  text-black ">User Name :</span> {card.Organizer}</p>
                        <p className="text-lg font-bold text-cyan-900"><span className="text-lg font-medium text-black ">Date :</span>{card.Date}</p>
                        <p className="text-lg font-bold text-cyan-900"><span className="text-lg font-medium  text-black">Location :</span> {card.location.toUpperCase()}</p>
                        <p className="text-xl font-bold text-yellow-600" ><span className="text-lg font-medium  text-black">Price :</span> {card.price}</p>
                    </div>
                    
                </div>
                <div className=" basis-1/4 flex flex-col justify-center items-center gap-2">
                    <button className="border-none p-1 text-xl bg-blue-700 rounded-lg text-white w-32 hover:scale-[1.05] transition duration-500">Approve</button>
                    <button className="border-none p-1 text-xl bg-slate-400 rounded-lg text-white w-32 mb-4 hover:scale-[1.05] transition duration-500">Refuse</button>
                </div>
            </div>
        ))}
    </div>}
    {(CardsData.length < 3) && <span className="h-screen block"></span>}
    </div>
    )
}

