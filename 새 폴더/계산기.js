
    let result = parseFloat(prompt("첫 번째 숫자 입력"));
    const num2 = parseFloat(prompt("두 번째 숫자 입력"));
    const operation = prompt("연산 선택(더하기, 빼기, 곱하기, 나누기):");


    if(operation === "더하기") {
        result = result + num2;
    } else if(operation === "빼기") {
        result = result - num2;
    } else if(operation === "곱하기") {
        result = result * num2;
    } else if(operation === "나누기") {
        result = result / num2;
    } 

    alert ("결과값은" + result + "입니다");

    while (true){
    const answer = parseFloat(prompt("결과값에 계산 할 숫자 입력"));
    const operation2 = prompt("연산 선택(더하기, 빼기, 곱하기, 나누기):");

    if(operation2 === "더하기") {
        result = result + answer;
    } else if(operation2 === "빼기") {
        result = result - answer;
    } else if(operation2 === "곱하기") {
        result = result * answer;
    } else if(operation2 === "나누기") {
        result = result / answer;
    } 

    alert ("결과값은" + result + "입니다");

}