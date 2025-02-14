# 논리 연산자, 스코프, 조건문, 반복문, 객체의 특징과 값의 호출

## 논리 연산자
> 반환하는 데이터 타입은 bool
> 두가지의 값을 확인해서 true false 반환한다.

## 논리연산자의 종류
- || (OR) : 둘중에 하나라도 참이라면 true 둘다 false라면 false

``` js
[ false || true ] === true // 둘중의 하나라도 true의 값이면 참이다

// true || false === tue
(3 < 4) || (1 > 2) === true

[ false || false ] === false // 둘중에 하나라도 true가 없다면 false

```

- && (AND) : 둘중에 하나라도 false 라면 false 둘다 true라면 true

```js

// 둘다 참이면 true
[ true && true ] === true

// true && true 
[1 <= 1 && 3 !== "3" ] === true

// 둘 중에 하나라도 false
[ false && true ] === false

[ false && false ] === false

```

## 스코프

> 전역 스코프 

> 중괄호로 묶은 영역이 아닌 코드의 전체 영역
> 중괄호 묶은 부분 제외하고 모두 전역 스코프

```js
let a = 10;

    if(true) {
        console.log(a); // 전역스코프는 프로그램을 종료하는 시점까지 메모리에 유지된다.
}
// 전역 스코프의 변수는 어느곳 에서든 참조가 가능하다.
// 전역에서 변수를 너무 많이 사용하면 협업할때 무리가 있고 프로그래밍의 객체지향적 사고와 상반된다.
// 유저의 정보
```

> 지역 스코프

> 중괄호로 묶은 부분이 전체다 지역 스코프
> 지역 스코프 간에는 참조가 불가능 하다.
> 전역 스코프에 작성한 내용은 어디서든 참조가 가능하다.

```js
// 블록 스코프
if(true) {
    let a = 10: // 블록스코프의 내용이 끝남과 동시에 해제
    console.log(a);
}

if(true) {
    console.log(a); //x
}

// {} : 중괄호 열고 닫고의 사이 영역이 블록 스코프 
console.log(a);
let a = 0;

{
    console.log(a);
}

{
    console.log(a);
}
```

### 조건문 

```js
// 상태의 조건 관리를 할때
// 달리는 상태
// 걷는 상태
// 서있는 상태
const RUN = "RUN"
const STATE = "STATE"
const WORK = " WORK"

let meState = "RUN"

if(meState === RUN){

}else if(meState === STATE){

}

// 적은 조건을 다룰때는 if 조건이 좀 더 가독성이 좋지만

[stitch 예약어] (조건값) {
    case (조건값으로 비교할 조건식) 문 :
        코드 내용
    default
}

// 성격 유형 테스트 검사지 페이지

let myState = "RUN";
switch() {
    case RUN :
    case STATE :
        

        break; //break 코드의 중단점 스코프가 종료된다.
        
   case WORK :
        

        break;      

}
// 괄호에 전달된ㄷ

// if문 보다 직관적으로 조건문의 형태를 보여줄수 있다.
```

### 반복문

```js
// while
// 내가 확신하는 코드 영역에서만 사용하자 디버깅 이후에
// 브라우저 펑
// 코드의 중단점을 잘 설명 해주지 않으면 무한루프가 돌아서
// 운영하고 있는 페이지가 터지면 
// 중단점이 없으면 무한 루프

[while 예약어] (조건식) {
    코드영역
}

while (true) {
    let count = 0;
    while (true){
    if(count > 10) {        
        break; // 코드의 중단점 밑의 코드는 실행되지 않는다.
    }
    count++;
}
    console.log("123")
}

// 코드의 실행 순서를 눈으로 보고 읽을줄 알게 연습
```

### 객체의 특징과 값의 호출
> 객체의 4가지 특징
> 완벽히 마스터 한 사람은 없다 이해도를 계속 높여야 하는 것.
> 해외의 외국권 분들은 우리는 표현방식이 다르기 때문에 

> 눈으로 볼 수 있는 사물의 단위
> 객체의 표현을 프로그래밍 적으로 표현
> 객체라는 것은 프로그래밍 에서 기능을 만들때 객체들의 상호작용 제작된다.

- 추상화 
- 상속
- 다형성
- 캡슐화

### 객체의 표현 방식
1. 객체 리터럴
2. function 생성 방식
3. class 생성 방식

{} : 객체 리터럴 구문

### 데이터의 타입 참조 타입
> 원시타입과 다르다
> array, object, function, Map, set ...

> 주소를 참조하는 주소


### 객체의 문법
```js
// 리터럴 방식
const user = {
    name : "soon"
    age : 20,
    city : "서울"
};

// let soon_name = "soon";
// let soon_age = 20;
// let soon_city = "서울";

// tip은 객체를 언제 만들어야 하느냐 실제로 존재하는 사물이나 개념을 가지고 구상해서 만들때 사물의 단위를 표현할때

// 자동차 판매 사이트를 만들고 있는데 객체 

const computer = {
    name : "ASUS2",
    model : 14,
    color : "black",
    sell : false,
    price : 100
}

// 표기법 ---------------------------------------------------------------------------------------------------
// 값의 호출
computer.name === "ASUS2"
computer.model === 14

// 이런 경우는 키를 추가 할 수 있다
computer.name2 = 123; // 할당을 한 경우 이미 없는 키의 이름으로
// 새로운 키와 값이 생성된다
/*
    {
        name : "ASUS2",
        model : 14,
        color : "black",
        sell : false,
        price : 100
    }
*/
computer.name = "soon"

/// 대괄호 표기법
computer.name === computer["_name"]

// 하나의 사물을 표현할때 여러가지의 데이터를 하나의 단위로 객체 단위로 사용 하기 위해서

// 생성자 방식은??? function class 배울때 new
```

### 실습 과제
> 가위바위보 게임을 하나 만들어 보자

- 요구사항 1 : 플레이어가 가위 혹은 바위 혹은 보를 입력 받을수 있다.
                플레이어가 가위를 입력하면 0 바위 1 보 2
- 요구사항 2 : 컴퓨터는 가위 바위 보 랜덤하게 본인이 선택할 수 있다. (0 1 2)

- 요구사항 3 : 무승부도 있습니다.

- 요구사항 4 : 입력 받은 값이 잘못된 경우 다시 입력 받으세요 계속

- 요구사항 5 : 논리 연산자 ||, && 둘 중 하나 활용 하세요.