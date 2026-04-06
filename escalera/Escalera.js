function stairCase (num){
    for (let i = 1; i <=num; i++){
        let escalon = "";
    for (let j = 1; j<=i; j++){
        escalon =   escalon + "#";
    }
        console.log(escalon);
    }
     
}
stairCase(3)