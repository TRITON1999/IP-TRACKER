
import React, {useState, useEffect} from "react";
// import tbg from "./pattern-bg.png";
import "./App.css"
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
  } from 'react-leaflet'

function App() {
  const [ipinp, setIpInp] = useState()
  const [res, setRes] = useState({
    latitude: 0,
    longitude: 0
  })

  const MapMaker = ({lat,lon})=> {
    console.log(lat,lon)
    return (<MapContainer center={[lat, lon]} zoom={5} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
	
    <Marker position={[lat, lon]}>
      <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>)
  }

  const fetchIpAdd = (ip="") => {
    fetch("http://ipwho.is/"+ip).then(res => res.json()).then(res => {
      setRes(res)
    }).catch(console.error)
  }

  const handleChange = e => setIpInp(e.target.value)
  const handleClick = () => {
    console.log("clicked")
    fetchIpAdd(ipinp)
  }

  useEffect( () => {
    fetchIpAdd()
  } , [])


  return <div className="root"><div className="header"><p>IP Address Tracker</p> <div className="inputs">
      <input placeholder="Enter the IP Address" type="text" onChange={handleChange}/> <span onClick={handleClick}></span>
    </div>
    <div className="info">
      <div className="card"><div>IP</div><div>{res.ip}</div></div>
      <div className="card"><div>LOCATION</div><div>{res.city + " / " + res.region}</div></div>
      <div className="card"><div>TIMEZOME</div><div>{"UTC " + res.timezone?.utc}</div></div>
      <div className="card"><div>{res.timezone?.abbr}</div><div>{res.timezone?.ip}</div></div>
    </div>
  </div>
  <div id="map">
  {res.latitude * res.longitude != 0 && (
    <MapMaker lat={res.latitude} lon={res.longitude} />
  )}
  </div>
  </div>
}

export default App;
