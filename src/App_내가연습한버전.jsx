import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [inp, setInp] = useState('');
  

  return (
    <>
      <div className="App">
        <div className="black-nav">
          <h4>내가 연습한 버전</h4>
        </div>

        {
          data.map((item,index)=>{
            return (
              <div className="list" key={index}>
                <h4>{item.title}</h4>
                <p>{item.subTitle}</p>
                <p>{item.date}</p>
              </div>
            )
          })
        }
      </div>

      <input type="text" onChange={(e)=>{
        setInp(e.target.value);
      }}/>
      <button onClick={()=>{
        const date = new Date;
        const copy = JSON.parse(JSON.stringify(data));
        copy.push({title: `${inp}`, subTitle: `${data.length+1}번 내용입니다.`, date: `${(date.getMonth() + 1) + '월'} ${date.getDate() + '일'}`})
        setData(copy)
      }}>추가</button>
    </>
  );
}

export default App;
