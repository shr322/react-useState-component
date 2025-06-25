import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [inp, setInp] = useState('');
  const [inp2, setInp2] = useState('');
  const [modal, setModal] = useState(false)
  const [modalNum, setModalNum] = useState(0);
  return (
    <>
      <div className="App">
        <div className="black-nav">
          <h4>내가 연습한 버전</h4>
        </div>

        <button onClick={()=>{
          const copy = JSON.parse(JSON.stringify(data));
          copy.sort((a,b)=>{
            if(a.title > b.title) {
              return 1;
            } else {
              return -1;
            }
          })
          setData(copy)
        }}>정렬</button>

        {
          data.map((item,index)=>{
            return (
              <div className="list" key={index}>
                <h4 onClick={()=>{
                  setModal(true)
                  setModalNum(index)
                }}>
                  {item.title}

                  <button onClick={(e)=>{
                    e.stopPropagation();
                    const copy = JSON.parse(JSON.stringify(data));
                    copy[index].count++
                    setData(copy)
                  }}>👍</button>{item.count}
                </h4>
                <p>{item.subTitle}</p>
                <p>{item.date}</p>
                <button onClick={()=>{
                  const copy = JSON.parse(JSON.stringify(data));
                  copy.splice(index, 1);
                  setData(copy)
                }}>삭제</button>
              </div>
            )
          })
        }
      </div>

        <form onSubmit={(e)=>{
          e.preventDefault();
           if(!inp && !inp2){ 
              alert('입력창이 비어있습니다.');
              return
            }

            if(!inp){
              alert('메인텍스트를 입력하세요.');
              return
            }

            if(!inp2){
              alert('서브텍스트를 입력하세요.');
              return
            }

            if(inp && inp2){
              const date = new Date;
              const copy = JSON.parse(JSON.stringify(data));
              copy.push({title: `${inp}`, subTitle: `${inp2}`, date: `${(date.getMonth() + 1) + '월'} ${date.getDate() + '일'}`, count: 0})
              setData(copy)

              document.querySelectorAll('input').forEach((item)=>{
                item.value = '';
              })
              setInp('')
              setInp2('')
              document.querySelectorAll('input')[0].focus();
            }
          }}>
          <input type="text" placeholder="메인텍스트" onChange={(e)=>{
            setInp(e.target.value);
          }}/>
          <input type="text" placeholder="서브텍스트" onChange={(e)=>{
            setInp2(e.target.value);
          }}/>
          <button>추가</button>
        </form>
      


      {modal ? <Modal setData={setData} data={data} modalNum={modalNum}></Modal> : null}
      
    </>
  );
}


function Modal(props){
  let data = props.data;
  let num = props.modalNum;
  return (
    <>
      <div className="modal">
        <div>{data[num].title}</div>
        <div>{data[num].subTitle}</div>
        <div>{data[num].date}</div>
        <button onClick={()=>{
          const copy = [...props.data];
          copy[num].count = 0;
          props.setData(copy)
        }}>좋아요 0으로</button>
      </div>
    </>
  )
}

export default App;
