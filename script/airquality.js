const btn = document.getElementById("btnf");
const city = document.getElementById('city');
const metercontainer = document.getElementById("meter-container");
const meter = document.createElement('div');
const text=document.getElementById('textname');
meter.classList.add('meter');
meter.classList.add('circle');
metercontainer.appendChild(meter);
meter.style.backgroundColor="greenyellow"
meter.style.setProperty("box-shadow", "0px 0px  5px 10px white");

city.addEventListener('focus',()=>{
    text.style.setProperty("visibility","hidden");
    meter.innerHTML = 0;

});
btn.addEventListener('click', display);
// text.style.setProperty("visibility","hidden");
meter.innerHTML = 0;
function display() {
    let url = "https://api.waqi.info/feed/" + city.value + "/?token=9d622508f4dd09cc38119db570e0126136bde23d";
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        console.log(data["status"]);
        let aqi = data["data"]["aqi"];
        text.style.setProperty("visibility","visible");
        if(data["status"]=="ok"){
            meter.innerHTML = aqi;
            let color = "";
            let  level="";
            if (aqi <= 50) {
                color = "green";
                level="good";
            }
            else if (aqi < 101) {
                level="Modereate";
                color = "yellow";
            } else if (aqi < 151) {
                level="Unhealthy for Sensitive Groups";
                color = "orange";

            } else if (aqi < 201) {
                level="Unhealthy";
                color = "rgb(231, 43, 74)";

            } else if (aqi < 300) {
                level="Very Unhealthy";
                color = "rgb(179, 17, 179)";

            } else{
                level="Hazardous";
                color = " rgb(95, 9, 45)";
            }
            meter.style.setProperty("box-shadow", "0px 0px  5px 10px " + color);
            text.innerHTML=data["data"]["city"]["name"]+"<br>"+aqi+"<br>"+level;
            // text.style.backgroundColor=color;
            // text.style.color="white";
        }
        else{
            text.innerHTML=city.value+"<br>"+"Not found in the list try using the capital of state";
        }
    });

}