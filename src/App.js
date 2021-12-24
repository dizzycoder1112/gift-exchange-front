import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';




function App() {
  
  const [ user, setUser ] = useState(-1);
  const [ people, setPeople ] = useState([]);

  const [ giftReceiver, setGiftReceiver ] = useState(null);
  useEffect(() =>{
    const url = "http://143.244.155.191:8000/readFile";
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setPeople(data);

    }
    fetchData();
  },[])

  const getGiftReceiver = async () => {
    console.log(JSON.stringify({useIndex: user}));
    const url = "http://143.244.155.191:8000";
    const fetchData = async () => {
      const response = await fetch( url,
        {
          body: JSON.stringify({userIndex: user}),
          method: "POST",
          headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
          },
        });
      const data = await response.json();
      setGiftReceiver(data);
    }
    fetchData();
  }

  const result = (data) => {
    if(data !== null){
      return <div>你抽到了 {data.name}</div>;
    }
    return '';
  }


  return (
    <div style={{textAlign: "center", display: "flex", flexDirection: "column", margin:"0 auto"}}>
      <div>
        <label htmlFor="cars">你是誰？:</label>
      </div>
      <div>
        <select value={user} onChange={(e) => { setUser(e.target.value) }} id="cars">
          <option value={-1}>請選擇</option>
          {
            people.map((person, index) => {
              return <option key={index} value={index}>{index+1}. {person.name}</option>
            })
          }
        </select>
      </div>
      <div>
        <button onClick={() => {getGiftReceiver()}}>抽籤囉!</button>
      </div>
      <div>
        {result(giftReceiver)}
      </div>
      
      
    </div>
  );
}

export default App;
