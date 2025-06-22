# useState

`useState`는 React에서 **함수형 컴포넌트**에서 \*\*상태(state)\*\*를 관리할 수 있게 해주는 **Hook**이다. 쉽게 말하면, 컴포넌트 안에서 값이 바뀌면 다시 렌더링되게 만드는 기능이다.

---

### ✅ 기본 문법

```jsx
import { useState } from 'react';

const MyComponent = () => {
  const [state, setState] = useState(초기값);

  return (
    <>
      <p>{state}</p>
      <button onClick={() => setState(새로운값)}>변경</button>
    </>
  );
};
```

---

### ✅ 예시

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // count라는 state와 setCount라는 함수를 생성

  return (
    <>
      <p>현재 숫자: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  );
}
```

이 예시에서:

* `count`: 현재 숫자 값 (state)
* `setCount`: count 값을 바꾸는 함수
* `useState(0)`: count의 초기값을 0으로 설정

---

### ✅ 특징 요약

| 특징         | 설명                                            |
| ---------- | --------------------------------------------- |
| 초기값 설정     | `useState(초기값)`으로 state의 시작값을 설정              |
| 값 변경       | `setState(newValue)`로 변경 (직접 state를 바꾸면 안 됨!) |
| 변경 시 렌더링   | state가 바뀌면 해당 컴포넌트가 자동으로 다시 렌더링됨              |
| 여러 개 사용 가능 | 하나의 컴포넌트에서 `useState`를 여러 번 써도 됨              |

---

### ✅ 예: 문자열 저장

```jsx
const [name, setName] = useState("name");

<input 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>
<p>안녕하세요, {name}님!</p>
```

<br><br><br><br>

# useState 사용시 주의사항

### ✅ 1. **state를 직접 변경하면 안 된다**

```js
const [count, setCount] = useState(0);

// ❌ 이렇게 직접 바꾸면 안 됨
count = count + 1;

// ✅ 항상 set함수를 사용해야 함
setCount(count + 1);
```

React는 `setCount()`처럼 **상태를 바꿀 때만 리렌더링**을 트리거하기 때문에 직접 값을 수정하면 렌더링도 안 되고, 상태도 제대로 관리되지 않는다.

---

### ✅ 2. **비동기적 업데이트에 주의**

`setState()`는 **즉시 실행되지 않고, 비동기적으로 처리**된다. 그래서 `setState` 직후에 `state`를 출력하면 이전 값이 나올 수 있다.

```js
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // 이전 값이 출력됨
};
```

**해결 방법:** 이전 값을 기반으로 업데이트할 때는 함수형 업데이트 사용

```js
setCount(prev => prev + 1);
```

---

### ✅ 3. **state는 불변성을 지켜야 한다 (객체/배열 주의)**

객체나 배열을 state로 사용할 때는 **기존 값을 직접 수정하지 말고 복사해서 수정**해야 한다.

```js
// ❌ 잘못된 예
const [user, setUser] = useState({ name: "이름", age: 25 });
user.age = 26;
setUser(user); // 변경 감지 안 됨

// ✅ 올바른 예
setUser({ ...user, age: 26 });
```

---

### ✅ 4. **useState는 컴포넌트 최상단에서만 호출**

Hook은 **조건문, 반복문, 함수 안에서 호출하면 안 된다.**

```js
// ❌ 잘못된 예
if (someCondition) {
  const [x, setX] = useState(0); // Hook은 여기서 쓰면 안 됨
}

// ✅ 항상 컴포넌트 함수 최상단에서 호출
const [x, setX] = useState(0);
```

---

### ✅ 5. **초기값 계산이 무거울 경우 함수형 초기화 사용**

```js
const [data, setData] = useState(() => {
  // 복잡한 연산
  return expensiveComputation();
});
```

이렇게 하면 컴포넌트가 **처음 렌더링될 때 한 번만 계산**하고, 이후 렌더링에서는 다시 계산하지 않는다.

---

### ✅ 6. **setState 후 이전 state에 의존할 때는 항상 콜백 형태로**

```js
setCount(prev => prev + 1);
```

이렇게 안 하면 렌더링 순서에 따라 **최신 값이 아닌 이전 값으로 덮어쓰는 버그**가 생길 수 있다. 특히 `setCount()`를 여러 번 연속 호출할 경우!

<br><br><br><br>

# props

> **props**는 부모 컴포넌트가 자식 컴포넌트에게 전달하는 **데이터**(속성값)를 의미한다.
> `prop`은 “property(속성)”의 줄임말이다.

---

### ✅ 예시

```jsx
// 부모 컴포넌트
function App() {
  return <Welcome name="이름" />;
}

// 자식 컴포넌트
function Welcome(props) {
  return <h1>안녕하세요, {props.name}님!</h1>;
}
```

* `App`이 `Welcome` 컴포넌트에게 `name="이름"`라는 값을 전달함.
* `Welcome`은 `props.name`으로 해당 값을 사용.

---

## ✅ 구조 분해 방식

더 간단하게 쓰고 싶다면 **구조 분해**해서 이렇게도 가능:

```jsx
function Welcome({ name }) {
  return <h1>안녕하세요, {name}님!</h1>;
}
```

---

## ✅ props의 특징

| 특징           | 설명                            |
| ------------ | ----------------------------- |
| 단방향 데이터 흐름   | 부모 → 자식 방향으로만 전달됨             |
| 읽기 전용        | 자식 컴포넌트에서 props를 직접 수정하면 안 됨  |
| 다양한 타입 전달 가능 | 문자열, 숫자, 객체, 배열, 함수 등 무엇이든 가능 |
| 조건부 렌더링에 유용  | 전달된 props 값에 따라 렌더링 조절 가능     |

---

## ⚠️ props 사용 시 주의사항

### 1. **props는 읽기 전용이다 (불변성)**

```jsx
function MyComponent(props) {
  props.name = "다른 이름"; // ❌ 이렇게 바꾸면 안 됨
}


/* 바꿀거면 이런식으로 */
{<Modal setData={setData} data={data} modalNum={modalNum}/>}

function Modal(props){
  return (
    <>
      <div className="modal">
        <button onClick={()=>{
          const copy = [...props.data];
          copy[num].count = 0;
          props.setData(copy)
        }}>좋아요 초기화</button>
      </div>
    </>
  )
}
```

→ 자식 컴포넌트는 **props를 수정하지 않고 사용만 해야 함.**
수정이 필요하다면, 상태(state)를 부모 컴포넌트로 끌어올려야 함. (state lifting)

---

### 2. **필요 없는 props를 전달하지 말기**

불필요한 props가 많으면 코드가 복잡해지고, 컴포넌트 재사용성이 떨어져.
필요한 것만 최소한으로 전달하는 것이 좋다.

---

### 3. **props가 함수일 때 의존성 주의**

props로 전달된 함수가 렌더링마다 새로 만들어지면, 자식 컴포넌트에서 `useEffect`가 불필요하게 계속 실행될 수 있어.

**해결 방법:** `useCallback` 사용

---

### 4. **PropTypes나 TypeScript로 props 타입 명시 추천**

props에 잘못된 데이터 타입이 들어오면 버그의 원인이 되므로,
개발 시 `PropTypes`(JS) 또는 `TypeScript`를 쓰면 안전하게 개발 가능.

```jsx
import PropTypes from 'prop-types';

function Welcome({ name }) {
  return <h1>안녕하세요, {name}님!</h1>;
}

Welcome.propTypes = {
  name: PropTypes.string.isRequired,
};
```

---

### 5. **부모가 렌더링될 때 자식도 같이 렌더링된다는 점 주의**

props가 바뀌면 자식 컴포넌트가 다시 렌더링되므로, **불필요한 렌더링**을 막기 위해 `React.memo`를 사용할 수 있다.

```jsx
const Welcome = React.memo(function Welcome({ name }) {
  return <h1>안녕하세요, {name}님!</h1>;
});
```
