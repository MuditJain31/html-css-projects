 let container = document.querySelector(".puzzle .container");
 let submit = document.querySelector("button");

 let values = [];

 for(let i=0;i<81;i++){
     const inputElement = document.createElement('input');
     inputElement.setAttribute('type','text');
     inputElement.setAttribute('value','');
     container.appendChild(inputElement);
}

function colorGrey(input){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(Math.floor(i/3)==0 && (Math.floor(j/3)==0 || Math.floor(j/3)==2)){
                input[9*i+j].classList.add("grey");
            }else if((Math.floor(i/3)==1 && Math.floor(j/3)==1)){
                input[9*i+j].classList.add("grey");
            }else if(Math.floor(i/3)==2 && (Math.floor(j/3)==0 || Math.floor(j/3)==2)){
                input[9*i+j].classList.add("grey");
            }
        }
    }
}

let inputs = document.querySelectorAll("input");
colorGrey(inputs);

submit.addEventListener("click",()=>{
    
    let vals = document.querySelectorAll("input");
    for(let i=0;i<9;i++){
        let tempArr = [];
        let temp="";
        for(let j=0;j<9;j++){
            if(vals[9*i+j].value==""){
                tempArr.push(0);
                temp=temp+" " + 0;
            }else{
                tempArr.push(Number(vals[9*i+j].value));
                temp = temp+ " " +vals[9*i+j].value;
            }
        }
        console.log(temp);
        values.push(tempArr);
    }
    // console.log(values);
    // console.log(typeof values[2][1]);
    container.classList.toggle("none");
    submit.classList.add("none");
    console.log(values);
    solve();
    let count=1;
    let x = setInterval(()=>{
        count++;
        console.log(values);
        
    document.querySelector(".answer").classList.toggle("none");
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            const inputElement = document.createElement('p');
            inputElement.innerText = values[i][j];
            document.querySelector(".answer").appendChild(inputElement);
        }
    }
    let input = document.querySelectorAll("p"); 
    colorGrey(input);
    if(count>1)
    clearInterval(x);
    },1000)
})
function isValid(row,col,val){
    for(let idx=0;idx<9;idx++){
        if(values[row][idx]==val){
            return false;
        }

        if(values[idx][col]==val){
            return false;
        }
        
        if(values[Math.floor(row/3)*3 + Math.floor(idx/3)][Math.floor(col/3)*3 + idx%3]==val){
            return false;
        }
    }
    return true;
}

function solve(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){

            if(values[i][j]==0){

                for(let val=1;val<=9;val++){
                
                    if(isValid(i,j,val)){
                        values[i][j] = val;
                        if(solve()){    
                            return true;
                        }else{
                            values[i][j]=0;
                        }
                    }
                }
                return false;
            }
        }
    }
    
    return true;
}

