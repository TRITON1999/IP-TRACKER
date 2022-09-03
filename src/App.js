
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
  const IPFormatChecker = (v) =>{
    let k=0;
    for(var i=0;i<v.length;++i){
      if(v[i]==='.'){
       k++;
      }
      else if (v[i]!=='1'&&v[i]!=='2'&&v[i]!=='3'&&v[i]!=='4'&&v[i]!=='5'&&v[i]!=='6'&&v[i]!=='7'&&v[i]!=='8'&&v[i]!=='9'&&v[i]!=='0'){
        return false;       
      }
    }
    if(k!==3)
      return false;
    return true;
  }
  const handleClick = () => {
    console.log("clicked")
    if(IPFormatChecker(ipinp))
    fetchIpAdd(ipinp)
    else
    alert("please recheck your inout")
  }

  useEffect( () => {
    fetchIpAdd()
  } , [])


  return <div className="root"><div className="header"><p>IP Address Tracker</p> <div className="inputs">
      <input placeholder="Enter the IP Address" type="text" onChange={handleChange}/> <span onClick={handleClick}>Search</span>
    </div>
    <div className="info">
      <div className="card"><h1>IP</h1><div>{res.ip}</div></div>
      <div className="card"><h1>LOCATION</h1><div>{res.city + " / " + res.region}</div></div>
      <div className="card"><h1>TIMEZOME</h1><div>{"UTC " + res.timezone?.utc}</div></div>
      <div className="card"><h1>{res.timezone?.abbr}</h1><div>{res.timezone?.utc}</div></div>
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
