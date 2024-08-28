import { useRef, useEffect, useState } from "react";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import "./App.css";
import Even from "./components/even";
 

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleSetText = (e) => {
    setText(e.target.value);
  };

  // 레퍼런스 변수 didMountRef를 만들고 초기값 지정
  const didMountRef = useRef(false); 

  const handleSetCount = (value) => {
    setCount(count + value);
  };

//상태변수 count, text 값이 변경될 때 컴포넌트 업데이트 발생
  //이때 useEffect를 이용해서 콜백함수 실행: 상태변수가 변경될 때 콘솔에 출력

  useEffect(() => {
    console.log(`업데이트 : ${text} ${count}`)
  }, [count, text])

  //컴포넌트가 마운트 + 업데이트일 때 항상 실행
  //두 번째 인자인 의존성 배열에 값이 없으면, 컴포넌트가 랜더링 될 때마다 useeffect의 콜백함수가 실행

  // useEffect(() => {
  //   console.log('업데이트')
  // })

///컴포넌트가 마운트될 때 didMountref가 false -> 이 때는 콘솔에 출력하지 않음
//컴포넌트가 업데이트 될 때 didMountref true -> 이 때는 콘솔에 출력

  useEffect(() => {
    //컴포넌트 마운트 시점에 실행
    // .current: 현재 값을 알 수 있음
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    } else {
      //컴포넌트 마운트 된 뒤 컴포넌트가 업데이트 될 때 실행
      console.log("컴포넌트 업데이트")
    }
  })

  //컴포넌트 마운트 시점에만 실행: 의존성 배열에 값이 없을 때
  useEffect(() => {
      console.log('component mount')
    }, [])

  useEffect(() => {
    // setInterval(() =>{
      const intervalID = setInterval(()=>{
      console.log("깜빡")
    }, 1000);
    return ()=> {
      console.log("Clean up");
      clearInterval(intervalID);
    };
  });

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input type="text" value={text} onChange={handleSetText} />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 && <Even />}
      </section>
      <section>
        <Controller handleSetCount={handleSetCount} />
      </section>
    </div>
  );
}

export default App;
