// function foo(a,b) {
//     console.log(this);
//     return [a, b];
// }

// const bar = {
//     method : foo
// }

// bar.method(1, 2);

// function foo(a, b) {
//     console.log(this); // window
//     return [a,b];
// }

// const a = foo(1, 2);
// console.log(a);

// const bar = {
//     method : foo
// }

// bar.method(2,3);

// function foo(a, b) {
//     console.log(this)
//     return [a, b];
// }

// const obj = { name : "soon"}

// const fooBind = foo.bind(obj);

// console.log(fooBind); //binding의 내용이 포함된 참조 할 객체가 이미 바인디 되었다.

// const bar = { method : fooBind }
// bar.method(1, 2);


function foo() {
    console.log(n)
}

console.dir(foo);

const bar = (arg) => {
    console.log(arg);
}

console.dir(bar);
