# class, this, ES6 화살표 함수, 메서드 축양형

## class
> class는 ES6 부턴 지원했고
> 인스턴스 생성을 위한 목적으로 생성됐다.

```js
// 일반 함수를 생성자 함수로 사용
function foo(name) {
    this.name = name;
}

console.log(new foo("soon")) === { name : "soon"}
```

## class로 인스턴스 생성 문법

```js
// 클래스 이름은 student 이런식으로 맨 앞글자르 대문자로
// [class 예약어] [클래스 이름] {
//     // 생성자 함수
//     // 최초에 인스턴스 생성될때 한번 호출
//     constructor(name) {
//         this.name
//     }
//     foo() {
//         console.log("안녕 나는" + name + "야")
//     }
// }

class student {
    constructor (_city) {
        this.age = _age;
        this.name = _name;
        this.city = _city;
    }

    // 생성하는 인스턴스에 포함 시킬 메서드
    getInfo () {
        // ES6 문법 템플릿 리터럴
        // 문자열과 변수를 같이 사용하는 경우
        // 코드영역을 문자열 안에 표현 할 수 있다.
        // ${} 중광호 안에 자바스크립트를 작성하겠다.
        return `나는 : ${this.name }`
    }
}

const student = new Student(20, "soon", "서울");
```

### class의 상속

> 객체에 부모의 내용이 상속 되어서 인스턴스가 생성 되어야 할때.

> 생물(숨을 쉴 수 있다.) -> 동물(움직일수 있다.) -> 새(날개가 있다.) -> 닭(깃털이 있다.)

```js
class Moter {
    getInfo() {
        console.log("부모 클래스의 메서드");
    }

}

    // class 상속
    // extends 상속 키워드 예약어
class Child extends Moter {

}

// Child의 클래스에게 Moter 내용을 상속
// 자식클래스안에 부모의 클래스 내용이 포함된다.

const child = new Child();

console.dir(child);
// { getInfo : f() {} }

// 부모의 클래스의 생성자 함수도 있고 생성자 함수를 호출 해야하는 경우

// 부모의 클래스의 생성자를 호출

class child extends Moter {
    constructor(name, age) {
        super(city); // 부모의 생성자 호출
        this.name = name;
        this.age = age;

        // 자식 클래스에서 부모와 같은 키는 사용하지 말자 
    }
}

const child = new Child("soon", 20);
// city가 없어
// {name, age, getInfo f() {}}
```

> 클래스로 동물 클래스를 만들고 좋아하는 동물 3종류를 만드는데 울음소리는 각각의 동물들이 내는 울음소리를 내고 3 종류의 동물 중에서 1 종류의 동물은 날 수 있다. 달리는 메서드 멈추는 메서드 클래스 4개를 만들어서 

### this가 중요한 것

```js
function foo (a, b) {
    console.log(this);
    this.arr = [a, b];
}

foo(1,2);
// 전역 스코프에서 호출하게 되면
// this === window
// window.arr = [1,2];
// windown 전역 객체는 브라우저의 기능을 호출할때
// window는 자바스크립트를 작성할때 생략이 가능하다.
window.console.log()
console.log();
window.alart();

// this 바인딩 : 상위객체를 참조한다.
```

## 일반 함수 사용

```js
function foo(a, b) {
    console.log(this);
    return [a, b];
}

const a = foo(1,2);
// this 상위의 객체를 찾고 전역 객체를 참조해서 window
console.log(a); //[1, 2]
```

## 생성자 함수로 사용

```js
function foo (a,b) {
    consolo.log(this);
    this.arr = [a, b];
}

const a = new foo(1,2);
// new 키워드로 생성한 객체 안에서 생성자 함수가 호출되고
// 반환은 생성한 객체의 주소값을 반환해서 a라는 변수에 할당 해준 것.
// this는 생성한 객체를 참조하게 된다.
```

## 객체 메서드로 할당
```js
function foo(a,b) {
    console.log(this);
    return [a, b];
}

const bar = {
    method : foo
}
bar.metod(1, 2);
```

함수의 내용은 동일하지만 상황에 따라서 this가 호출되는 위치에 따라서 동적으로 참조하는 객체가 바뀐다.
동적으로 바뀌는 this가 좋을수도 있는데 이 부분은 어려움이 있다.

- 일반 함수
- 생성자 함수
- 객체의 메서드

역할에서 사용하는 함수들은 각각 this가 binding(바인딩)이 되기 때문에
`function` 키워드는 this binding이 된다.

## this binding이란?

```js
function a() {

}

console.dir(a);

/*
    f a()
        arguments
        caller
        length
        name
        prototype
*/

```

`prototype` 이라는 `프로퍼티`는 생성자 함수와 관련이 있다.
일반함수에는 필요가 없다.

- 일반 함수로 사용한다 => constructor가 필요없다.
- function 이라는 키워드는 생성자도 사용하고 일반함수도 사용하고 하다보니
- 일반함수로 사용할때 this 생성자 함수의 사용의 this 바인딩 되서 달라지니 혼란이 올 수 있게 만든다.

bind라는 것은?

```js
function foo(a, b) {
    console.log(this); // window
    return [a,b];
}

const a = foo(1, 2);
console.log(a);

const bar = {
    method : foo
}

bar.method(2,3);
```

둘 다 같은 foo 일반 함수인데 this 결과가 다르다

바인딩을 하는 메서드
this binding을 완화 하기 위한.

- bind
- call
- apply

### bind
```js
function foo(a, b) {
    console.log(this)
    return [a, b];
}

const obj = { name : "soon"}

const fooBind = foo.bind(obj)

const bar = { method : fooBind }
bar.method(1, 2);
```

foo를 선언하고
fooBind라는 변수에 foo.bind 메서드를 호출해서 인자값의 내용을 this값을 변경 해준다.(바인딩)
리턴값은 함수의 값 this의 값을 바꾼 함수를 반환한다.

## call 와 apply

```js
function foo (a,b) {
    console.log(this)
    return [a,b]
}

// bind와 차이는 바로 실행 시킨다는 차이가 있고  
// 전달하는 인자값의 차이가 있다.
// 인자를 어떤 값을 넣느냐의 차이고 첫번째는 함수
foo.call({name : "soon"}, 1, 2);
foo.apply({name : "soon"}, [1,2]);

```

이런식으로 사용해서 원하는 this의 내용을 활용도 가능하다.

자바스크립트 작성할때 사용 목적

## 함수의 다양한 사용

- 일반 함수
- 생성자 함수
- 객체의 메서드로 사용

function 키워드는 기본적으로 함수 선언을 사용하는 목적으로 만들어졌는데
this.binding으로 다른 기능을 추가했다
예를 들어서 생성자 함수는 프로토타입이 생성자 함수를 사용할때 new 키워드를 만나면 생성자가 실행되서
this {} 로 넣어주기 위함 이기 때문, 함수의 내부에서 this를 return;

이런식의 생성자 함수를 표현할 수 있다

```js
function foo(a, b) {
    this.a = a;
    this.b = b;
}
new foo (1,2);
```

new 키워드를 만나면 생성자 함수를 호출하고 this를 바인딩 하고 마지막에 this를 반환한다.

### ES6

#### 생성자 함수

### ES5

```js
function foo(a, b) {
    console.log(this);
    this.arr = [a, b];
}

foo.protype,getArr = function() {
    return this.args
}

const foo = new foo(1,2);
console.log(_foo);
```

### ES6
> class
```js
class foo {
    constructor(a, b) {
        this.arr = [a, b];
    }

    getArr() {
        return this.arr
    }
}

const bar = new Foo(1, 2);
console.dir(bar);
```

문법만 다른 것 보다 차이는
기본적으로 함수는 `메서드`의 역할만 확실하게 할 수 있도록 기능이 되어있다.
예를 들어 foo 객체 안에 getArr 이라는 메서드가 있고 이 메서드는 생성자가 존재한다.
그래서 new 키워드로 결과를 확인하면 결과물로 생성한 인스턴스를 볼수있다.
밑에 class 문법으로 만든 Foo는 메서드 안에 생성자가 없다. new 로 객체를 만들 수 없는 메서드

```js
// 일반 함수
new foo.getArr(); // {} 생성자로 사용가능 생성자 함수가 있음
// 메서드 축약형
new bar.getArr(); // _bar.getArr is not a constructor ES6 메서드 축약형은 생성자 할 수 없어
```

목적에 맞게 함수는 기능을 작성하기 위해서 생성자 함수는 불필요하니 제거 한 것.

ES6 문법 자체가 목적성이 명확해졌다.

### 일반 함수
일반 함수로 선언할때 ES6에 나온 화살표 함수를 사용한다.

유튜버 재남

화살표 함수는 기능을 작성 할 일반함수로 목적에 맞게 사용하고

인스턴스 생성 할때는 class를 사용하고

객체안에 메서드는 메서드 축약형을 사용하자 this 바인딩은 되지만 

### 화살표 함수

```js
function foo() {
    console.log(n)
}

console.dir(foo);
```

```js
() => {
    
}
[매개변수 영역] => {
    코드영역
}

// return
() => {
    return 1;
}

// 축양형
() => 1;
(a,b) => a+b;
// 중괄호 지우면 반환값을 반환한다.

const bar = (arg) => {
    console.log(arg);
}

console.dir(bar);

const _bar = new bor();
```

위에서 얘기한 것 처럼 function은 생성자 함수가 포함되어 있는데 arrow function은 생성자 함수가 포함되어 있지 않다.

### function
> react saga같은 제네레이터 문법은 어쩔수 없이 function

```js

function gen() {
    yield 1
    yield 2
}

const _gen = gen();

console.log(_gen.next().value) 1
console.log(_gen.next().value) 2
```


> 이해가 안되는게 정상

### 문제

화살표 함수는 this 바인딩이 되지 않는다 바로 상위 컨텍스트에 this를 바라본다.

```js
const obj = {
    name : "soon",    
    getName() {
        console.log(obj.name)   
    }
}

const obj2 = obj;
obj2.getName()

function inner() {
    console.log(3, this);   
    function outer() {
        console.log("2", this);  
        function hello() {
            console.log(4, this); 
        }
        hello()
    }

    outer()
    return function() {
        console.log("1,", this)
    }
}

inner();

inner.call({name : "soon2"});
```