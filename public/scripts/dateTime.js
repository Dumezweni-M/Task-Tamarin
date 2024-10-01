//Date displayed in header
const date = new Date();
const day = date.getDate();
const monthString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep","Oct", "Nov", "Dec"];
const month = monthString[date.getMonth()];
const year = date.getFullYear();

const today = `${day}-${month}-${year}`;


const dateDisplay = document.getElementById("dateDisplay");

dateDisplay.textContent = today;


//Time displayed in header

setInterval(() => {
    const time = new Date(); //Specific for "timeDisplay" otherwise it doesnt update
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const currentTime = `
        ${hours.toString().padStart(2, '0')} : 
        ${minutes.toString().padStart(2, '0')} : 
        ${seconds.toString().padStart(2, '0')}`;

    const timeDisplay = document.getElementById('timeDisplay')
    timeDisplay.textContent = currentTime;
}, 1000);


console.log(' Hello')

