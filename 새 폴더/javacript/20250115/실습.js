function bar() {
  const num = 1;
  function bar2() {
      console.log(num);               // 1 (2)
      
      function bar3() {
          const num = 3;
          console.log(num);
      }

      function bar4(num) {
          console.log(num);             // 1 (1)
      }
      bar4(num);
  }
  bar2();
}                                     

bar(); 