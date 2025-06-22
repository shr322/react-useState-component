import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {

  let [글제목, 글제목변경] = useState(['남자코트','강남','파이썬'])
  let [count, setCount] = useState([0,0,0]);
  let [modal, setModal] = useState(false)
  let [modalNum, setModalNum] = useState(0);

  let [입력값, 입력값변경] = useState('');

  return (
    <>
      <div className="App">

        <div className="black-nav">
          <h4>블로그임</h4>
        </div>

        <button onClick={()=>{
          let copy = JSON.parse(JSON.stringify(글제목))
          copy.sort((a,b)=>{
            if(a>b){
              return 1
            } else {
              return -1
            }
          })
          글제목변경(copy)
        }}>ㄱㄴㄷ정렬</button>

        {
          글제목.map((item,i)=>{
            return (
              <div className="list" key={i}>
                <h4 onClick={()=>{
                  setModal(true)
                  setModalNum(i)
                }}>
                  {item}
                  <span onClick={(e)=>{
                    e.stopPropagation();
                    let copy = JSON.parse(JSON.stringify(count))
                    copy[i]++
                    setCount(copy)
                  }}>👍</span> {count[i]}
                </h4>
                <p>2월 17일 발행</p>

                <button onClick={()=>{
                  const copy = JSON.parse(JSON.stringify(글제목));
                  const copy2 = JSON.parse(JSON.stringify(count))

                  copy.splice(i,1);
                  copy2.splice(i,1);

                  글제목변경(copy)
                  setCount(copy2)
                }}>삭제</button>
              </div>
            )
          })
        }
        

      </div>

      <input type="text" onChange={(e)=>{
        입력값변경(e.target.value)
      }}/>
      <button onClick={()=>{
        const copy = JSON.parse(JSON.stringify(글제목));
        const copy2 = JSON.parse(JSON.stringify(count))
        copy.push(입력값)
        copy2.push(0)
        글제목변경(copy)
        setCount(copy2)
      }}>추가</button>
      
        {
          modal ? <Modal 글제목변경={글제목변경} 글제목={글제목} modalNum={modalNum}></Modal> : null
        }
    </>
  );
}


function Modal(props){
  return (
    <div className="modal">
      <div className="modal_tit">{props.글제목[props.modalNum]}</div>
      <div className="modal_txt">상세내용</div>
      <div className="modal_date">날짜</div>
      <button onClick={()=>{
        props.글제목변경(['여자코트','강북','자바스크립트'])
      }}>변경</button>
    </div>
  )
}

export default App;
