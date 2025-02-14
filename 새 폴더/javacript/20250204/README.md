# 클로저, 1급 객체

> 함수가 선언될때의 어휘적 위치를 기억하고 해당 환경의 변수 등을 접근할수 있는 함수
> 자바스크립트에서 클로저의 개념이 가능한 이유 function 자바스크립트의 함수는 1급 객체이기 때문이다.
> 함수형 프로그래밍을 할 수 있게 지원한다. (자바스크립트,)

```js
// 2 ~ 3 급
const a = if(1 === 1) { return true}
// 1급 객체 제한이 없는것.
const b = function () {return 1};

const time = (time, text) => {
    let a = 1;
    setTimeout(() => {
        console.log(a);
        console.log(text)
    }, time)
    const foo = () => {
        a++;
        console.log(a)
    }
    return foo
}

let a = 0;
let a = 1;

const foo2 = time(); // 함수의 값을 할당
foo2(); // 2
foo2(); // 3
foo2(); // 4
foo2(); // 5
foo2(); // 6
// 참조하고 있는 값이 해제되지 않는다.
// 데이터의 은닉
// 함수 외부에서 참조나 수정하는 내용을 방지 할 수 있다.

// C++ 포인터
// 포인터 주소의 개념을 배우지 못하는 이유가 javascript에서는 포인터의 개념이 없기 때문에
```

## 클로저의 특징

1. 함수내에서 선언한 함수가 상위 스코프의 변수를 참조할수 있다.
2. 함수의 실행이 종료되어도 참조하고 있는 스코프의 변수는 해제되지 않는다.

## 목적

1. 데이터의 구조화(캡슐화) : 외부에서 값을 참조 혹은 수정할수 없게 할수 있다.
2. 함수형 프로그래밍 지원 : 함수의 내부의 함수가 참조하는 변수를 가지고 반환받은 함수로 값을 참조할수 있다.

### 1급 객체
> 프로그래밍에서 1급 객체는 값처럼 사용할수 있는 제한이 없는 개체
> 자바스크립트에서는 함수도 값이다.
- 변수처럼 자유롭게 사용할수 있는개체 (인자 전달 가능, 반환도 가능, 할당도 가능)
- C언어에서는 함수를 변수처럼 저장 불가능 (함수 포인터를 사용함)
- 자바스크립트에서 함수가 1급 객체 이기 때문에 값으로 사용 가능
- 1급 객체는 자유롭게 사용 가능 한 개체 2급과 3급은 사용에 제한이 있는 것.
- 1급 객체의 종류는 함수, 숫자, 문자열, 객체, 배열, 클래스, 프로미스 등등
- 1급 객체라는 이름으로 부르는 이유는 특권을 가졌다 라는 표현

### 1급 객체의 조건 내용
- 다른 함수의 매개변수로 전달해서 사용할수 있다.
- 다른 함수의 return 반환값으로 사용할수 있다.
- 변수 (배열 객체 등등)에 할당할수 있는가?

> 자바스크립트의 함수는 1급 객체

const a = (b) => {

}

{
    foo : a
}

console.log(a);

a(() => {
    console.log(3)
})

### 클로저의 내용
> 자바스크립트의 클로저
> 함수안에 함수가 선언된 어휘적 (렉시컬) 환경
> 공식문서 클로저 `함수와 함수가 선언된 어휘적(렉시컬) 환경의 조합을 말한다. 이 환경은 클로저가 생성된 시점의 유효 범위 내에 있는 모든 지역 변수로 구성된다.`

## 문법
```js

const a = 0;

function b() {
    const index = 0;
    console.log(a);
    return function c() {
        console.log(index);
        function d () {
            let _b = 0;
            console.log(index);
        }
    }

    function e() {
        console.log(_b)
    }
}

const d = b();

```
> 작성한 함수 위치가 어디냐? 내가 직접 함수의 코드를 작성한 위치가 어디냐에 따라 클로저가 될 수 있고 될 수 없을수 있는 것.

> 선언된 위치에서 상위 스코프를 참조한다 => 렉시컬 스코프 
> 렉시컬 스코프 체인 => 선언된 위치에서 상위 스코프의 변수를 참조한다.

> javascript의 함수가 실행될때 실행 컨텍스트를 만들고
> 콜스택에 함수의 실행이 쌓이고 환경 레코드의 외부 아우터를 가지고 있다. (레코드에 함수를 기록할때 어휘적 위치도 기록이 된다.)
> 함수의 내부에서 함수가 선언되고 내부 함수에서 외부 함수의 변수를 참조하는 경우
> 자바스크립트 함수가 호출되고 외부 함수의 변수를 내부 함수가 참조하고 있는 경우 함수를 반환해서 사용하면 함수가 종료되어도 외부 함수의 변수의 값이 해제 되지 않는다.

### 렉시컬 환경

1. 렉시컬 임벨리먼트
> 코드가 실행되는 컨텍스트

2. 환경 레코드 
> 코드의 this의 값과 선언된 변수와 함수를 기록하는 공간
> 코드의 평가 단계 식별자의 바인딩을 기록하는곳

3. 외부 환경 참조(아우터)
> 렉시컬 환경에서 외부 렉시컬 환경을 참조
> 한단계 위의 상위 스코프를 참조한다.

### 렉시컬 스코프 
> 식별자의 스코프가 연결된 것을 스코프 체인이라고 한다.
> 코드를 작성한 구문이 작성한 그대로 스코프를 갖는 특징을 렉시컬 스코프 라고 한다.
> 어휘적 스코프, 어휘적 스코프 체인

### 클로저 함수와 클로저 함수가 아닌 것.
```js
// 클로저 함수
function counter() {
    let index = 0;

    return function increment() {
        index++;
        console.log(index);
    }
}
debugger
const increment = counter();
debugger
increment();
debugger
// 스코프의 내용을 확인하면 클로저 스코프가 추가 된것을 확인할수 있다. 그러면 클로저 함수

// 클로저 함수가 아닌 경우 어휘적 위치에 내부 함수가 참조하는 외부 함수의 변수가 없다.
// 반환되는 함수도 없다.
function counter() {
    let index;
    index ++;
    console.log(index);
}
debugger
const increment = counter;
debugger
const increment2 = counter();
debugger

// 클로저 함수가 아닌경우
let index = 0;
function counter() {
    return function increment() {
        index++;
        console.log(index);
    }
}
debugger
const increment = counter();
debugger
increment()
debugger

function counter(index) {
    return function increment() {
        index++;
        console.log(index);
    } 
}
debugger
const increment = counter(0);
debugger
increment();
debugger
const a = 1;
const b = 2;
{ a:1, b:2 }

function foo() {
    let a = 1; // 이 값은 외부에서 참조할수 없는 값
    let b = 2;
    return function increment () {
        // 클로저 함수로만 접근이 가능하다.
        // 값의 은닉
        // 캡슐화
        a++ // a라는 값을 참조할수 있는 함수는 increment라는 클로저 함수밖에 없는 것
    }
}

function shop () {

}
// 상점 변수는 클로저 함수로만 접근해서 변경할수 있도록
// shop 이라는 함수의 내용만 수정하면 된다. 상점 기능의 수정이 있을경우
```

## 클로저의 목적(클로저의 모든 패턴)
> javascript의 코드를 구조화 재사용 가능한 단위
> 함수형 프로그래밍으로 작업할수 있다.
> 불필요한 전역 변수를 만들 필요가 적어진다.
> 재사용성도 높고 유지보수성
> 상태 관리와 캡슐화 (개인 변수)

### 카운터 
```js
const createCounter = () => {
    let index = 0;

    const increment = () => {
        index++;
        return index;
    }

    const decrement = () => {
        index--;
        return index;
    }

    // {increment, decrement}
    // 객체의 키를 할당하는 값을 참조하는 변수명과 같게 할것이다.
    // 축약
    // increment 키에 값은 increment 변수에서 참조하는 값을 할당할수 있다.

    return {increment, decrement}
}

// const obj = createCounter();
// obj.increment()
// obj.decrement()

const { increment, decrement } = createCounter();

```

### 이후에 디자인 패턴
> 디자인 패턴의 수업을 들어도 납득을 못함
> 선행이 되어야 하는 부분 객체지향 프로그래밍의 이해도가 생기고
> class 문법에 익숙해져야 함
> 구현 능력이 생겨야 한다. (구현은 다른영역 구현할수 있다는 것이 객체지향 프로그래밍을 해야만 구현할수 있는것은 아니다.)
> 사람들이 많이 사용하는 개발 방법이 디자인 패턴

> 구현능력

> 습득하는 시간

### 실습
> 클론을 해도 되고 모양새를 갖춰서 이쁘게 html css도 만들고
> 게시판 로컬스토리지 CRUD 구현 하기
> 번호 제목 내용 작성자 이름

### 심화과정
> 글을 클릭하면 팝업이 뜨고 안에 글의 내용이 보이는 것
> 페이지 전환은 X

### 페이지 네이션