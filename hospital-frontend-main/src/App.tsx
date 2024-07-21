import { useEffect, useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import { useParams } from "react-router-dom";


export default function Component() {

  const [patientData, setPatientData] = useState({});
  const [loading, setLoading] = useState(true);
  let patientId = useParams().id;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3000/patients/${patientId}`);
        const data = await res.json();
        const {doctorId} = data
        setPatientData(data);

        const res2 = await fetch(`http://localhost:3000/doctors/${doctorId}`);
        const data2 = await res2.json();
        setPatientData({...data, doctor: data2});
        
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [])

  if(loading) return <div>Loading...</div>
  
  return (
    <Hero patientData={patientData}></Hero>
  )
}