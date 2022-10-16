let wrong = document.querySelector(".wrong");
let container = document.querySelector(".puzzle .container");
let submit = document.querySelector("button");


function createDivs(){
    for(let i=0;i<81;i++){
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type','text');
        inputElement.setAttribute('value','');
        container.appendChild(inputElement);
    }
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





function isValid(row,col,val,values){
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


function solve(values){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            
            if(values[i][j]==0){
                
                for(let val=1;val<=9;val++){
                    
                    if(isValid(i,j,val,values)){
                        values[i][j] = val;
                        if(solve(values)){    
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


function checkForValidSudoku(values){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(values[i][j]!=0){
                let temp = values[i][j];
                values[i][j] = 0;
                if(isValid(i,j,temp,values)==false){
                    console.log(values[i][j]);
                    inputs[9*i+j].style.color = "red";
                    return false;
                }
                values[i][j] = temp;
            }
        }
    }
    return true;
}

///////////////////////////////////////////////////////////////////////////////////////////

// --------------------| MAIN FUNCTION |-------------------------
submit.addEventListener("click",()=>{
    
    // 3. extract data from all the input fields
    let values = [];
    let vals = document.querySelectorAll("input");
    
    for(let i=0;i<9;i++){
        let tempArr = [];
        for(let j=0;j<9;j++){
            if(vals[9*i+j].value==""){
                tempArr.push(0);
            }else if(isNaN(Number(vals[9*i+j].value)) || Number(vals[9*i+j].value)<=0 || Number(vals[9*i+j].value)>9){
                //4. CHECKING IF THE INPUT VALUE IS VALID OR NOT
                vals[9*i+j].style.color = "red";
                if(wrong.hasChildNodes(".red")){
                    return;
                }
                const pEle = document.createElement('p');
                pEle.setAttribute('class','red');
                pEle.innerText = "Wrong Value(s) Entered";
                wrong.appendChild(pEle);
                return;
            }else{
                tempArr.push(Number(vals[9*i+j].value));
            }
        }
        values.push(tempArr);
    }
    
    // 5. CHECK IF ALL THE ENTERED VALUES CAN FORM A VALID SUDOKU OR NOT
    if(checkForValidSudoku(values)==false){
        if(wrong.hasChildNodes(".red")){
            return;
        }
        const pEle = document.createElement('p');
        pEle.setAttribute('class','red');
        pEle.innerText = "Wrong Value(s) Entered";
        wrong.appendChild(pEle);
        return;
    }
    
    document.querySelector(".puzzle").removeChild(wrong);
    
    
    container.classList.toggle("none");
    submit.classList.add("none");


    // 6. IF EVERYTHING IS GOING FINE TILL NOW THEN LET'S CREATE AN ANSWER TABLE
    solve(values);
    
    
    let count=1;
    
    let x = setInterval(()=>{
        count++;    
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
    },100)
})



// 1. Create div
createDivs();
let inputs = document.querySelectorAll("input");

// 2. coloring boxes grey
colorGrey(inputs);

inputs.forEach(function(elem) {
    elem.addEventListener("input", function() {
        elem.style.color="black"
    });
});