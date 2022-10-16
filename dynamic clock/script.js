let icons = document.querySelector(".icons"),
section = document.querySelector("section");

// icons.addEventListener("click",()=>{
//     section.classList.toggle("dark");
// })

defaultDarkMode();

icons.onclick = () =>{
    section.classList.toggle("dark");
}



setInterval(()=>{
    let date = new Date();
    
    let hour = date.getHours();
    let meridiem = (hour>=12)?"PM":"AM";
    
    hour = hour>12?hour-12:(hour==0?12:hour);
    document.querySelector(".num_hour").innerHTML = hour;

    let mins = date.getMinutes();
    document.querySelector(".num_minute").innerHTML = mins;
    
    let seconds = date.getSeconds();
    document.querySelector(".num_second").innerHTML = seconds;

    document.querySelector(".am_pm").innerText = meridiem;

    

},500);

function defaultDarkMode(){
    let date = new Date();
    let hour = date.getHours();

    let meridiem = (hour>=12&&hour!=24)?"PM":"AM";
    hour = hour>12?hour-12:hour;

    if(meridiem=="PM" && hour>=6){
        section.classList.add("dark");
    }else if(meridiem=="AM" && hour<=6){
        section.classList.add("dark");
    }else{
        section.classList.remove("dark");
    } 
}