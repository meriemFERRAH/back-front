import AdminDashboard from "./AdminDashboard";
import AdminAnalytics from "./AdminAnalytics";
import AdminReport from "./AdminReport";

import { useState } from "react";
export default function AdminBody() {
    const [Dashboard , setDashboard] = useState(true);
    const [Analytics , setAnalytics] = useState(false);
    const [Report , setReport] = useState(false);
  return (
    <div className="flex  bg-blue-100 relative">
        <div className="flex-col pt-32 pb-32 bg-white h-full w-96 fixed">
            <div className= "pt-16 pb-64 flex flex-col gap-2 justify-center items-center">
                <span onClick={()=>{
                    setDashboard(true);
                    setAnalytics(false);
                    setReport(false);
                }} className={` text-xl font-medium pt-2 pb-2 cursor-pointer w-full text-center hover:rounded-xl ${Dashboard ? 'bg-blue-700 text-white  rounded-xl' : ''}`}>
                    Dashboard
                </span>
                <span onClick={()=>{
                    setDashboard(false);
                    setAnalytics(true);
                    setReport(false);
                }} className={` text-xl font-medium pt-2 pb-2 cursor-pointer w-full text-center hover:rounded-xl ${Analytics ? 'bg-blue-700 text-white  rounded-xl' : ''}`}>
                    Analytics
                </span>
                <span onClick={()=>{
                    setDashboard(false);
                    setAnalytics(false);
                    setReport(true);
                }} className={` text-xl font-medium pt-2 pb-2 cursor-pointer w-full text-center  hover:rounded-xl ${Report ? 'bg-blue-700 text-white  rounded-xl' : ''}`}>
                    Reports
                </span>
            </div>
        </div>
        {Dashboard && <AdminDashboard />}
        {Report && <AdminReport />}
        {Analytics && <AdminAnalytics />}



        </div>
  )
}
