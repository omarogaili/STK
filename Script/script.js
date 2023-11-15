/* det första jag gör här är att jag hämtar alla bilder jag har i continer som jag har .slide-Continer och här
använder jag mig av en array.from för att jag ska hämta alla bilder som jag har i continer.  
*/
let sliderImages = Array.from(document.querySelectorAll(".slide-Continer img"));
console.log(sliderImages);
/* här ska jag skapa en variable som som har samma värde som array längd och det för att vi ska kuna visa i vilken slid 
vi befinner oss i */
let imageNumber = sliderImages.length;

let firstSlide = 1; // vi börjar från första bilden.
let next = document.getElementById("next"); // nästa bild knappen.
let prev = document.getElementById("prev"); // förregående bilden.
//här kallar jag på funktionen. jag kunde fixa functionen direkt här
//(next.onclick= function(){}) men jag tänkte att det blir mer tydligt om jag skapar function själv.
next.onclick = getNextSlide;
prev.onclick = getPrevSlide;
checkSlide();
function getNextSlide() {
  console.log("next");
  if (next.classList.contains("disabled")) {
    return false;
  } else {
    firstSlide++;
    checkSlide();
  }
}
function getPrevSlide() {
  console.log("prev");
  if (prev.classList.contains("disabled")) {
    return false;
  } else {
    firstSlide--;
    checkSlide();
  }
}
function checkSlide() {
  removeShowing();
  sliderImages[firstSlide - 1].classList.add("showing");
  /*här om vi befinner oss i första bilden så prev btn kommer inte att funka då  */
  if (firstSlide == 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }

  if (firstSlide == imageNumber) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}
/* nu ska jag tar bort den showing klassen som jag har när den bilden inte är active 
och här ska jag skapa en ny function som ska ta bort den showing klassen som vi har fixat i ovan */
function removeShowing() {
  sliderImages.forEach(function (image) {
    image.classList.remove("showing");
  });
}
/* här skapar jag en ny element i nav taggen. då först vill jag komma åt element som har id header alltså "header tagen"
    och då säger jag att jag vill ha första element barnet  och sedan första barnet i nav och det är ul(listan)
    kunde annars välja direkt navbar klassen men jag ville träna på det så jag valde att göra det på det sättet*/
let nav = document.getElementById("header").firstElementChild.firstElementChild;
/* här skapar jag en ny tag i listan och jag använder mig av time taggen i html. tänkte de passar bättre när jag ska ha
tid och lagra i den*/
let time = document.createElement("time");
time.id = "time"; // här ger jag den taggen time en id för att sedan jag ska ger den style i Sass (scss)
nav.appendChild(time); // vet inte hur jag ska förklarar det men jag skickar barnet till sin pappa :)
function starTime() {
  var date = new Date();
  var days = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
  ];
  var day = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  hours = checkTime(hours);
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);
  document.getElementById("time").innerHTML =
    days[day] + "   " + hours + ":" + minutes + ":" + seconds; // och här kallar jag på time
  //och skickar in (skriva ut) tiden i den taggen. såklart med hjälp av id som jag har gett den ovan. annars kunde jag
  // använda andra metoder liksom by tagName t.ex.
  var t = setTimeout(starTime, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
console.log(starTime());
/*  lockalstorage  */
function lagradata() {
  /* först tänker jag hämta alla value som användaren ska skriva på sidan 
    sedan tänker jag spara de i lockalStorage och här använder jag JSON eftersom lockalStorage kan spara bara stringer*/
  let alldata = {
    programName: document.getElementById("program_name").value, // hämtar alla värden från användarens inmatningar
    description: document.getElementById("description").value, // hämtar alla värden från användarens inmatningar
    age_limit: document.getElementById("age_limit").value, // hämtar alla värden från användarens inmatningar
  };
  localStorage.setItem("alldata", JSON.stringify(alldata));
}
document.getElementById("btn-search").addEventListener("click", function (event) {
  event.preventDefault();
  let getalldata = JSON.parse(localStorage.getItem("alldata")); // omvandla till string
  let search = document.getElementById("search").value; // hämtar search value
  let result = document.getElementById("result"); // hämtar result span, som resultatet kommer att visas i. result kommer jag att använda bara
   // för att visa resultaten och sedan ska den tömmas 
  console.log(getalldata);
  let savingdata = "";// ska använda den för att lagra sök resultatet i 
  result.innerHTML = " "; // tömmar jag result så det inte står något i den 
  if (search.trim() === "") {
    //om man inte skriver något i sökfältet så kommer sök btn skicka all sparade data
    for (let key in getalldata) {
      savingdata += `<p>${key}: ${getalldata[key]}</p>`;
    }
    result.innerHTML = "Din lista är: " + savingdata;// och här skriver jag resultaten i result span. 
  } else {
    for (let key in getalldata) {
      //om getalldata har en key och den key är lika med search värdet som du skrev så skickar vi tillbaka den
      if (getalldata.hasOwnProperty(key) && getalldata[key] === search) {
        savingdata += `<p>${key}: ${getalldata[key]}</p>`;
        result.innerHTML = savingdata;
        break; // om det du söker efter finns så avslutar loopen.
      } else if (getalldata[key] !== search) {
        result.innerHTML = `<p>${search} finns inte i den listan</p>`;// här skriver skickar vi att det finns ingen matchning 
      }
    }
  } //skapar en span för att fixa en X så när man trycker på den tömmar man result
  let close_result = document.createElement("span");
  close_result.innerHTML = "&#x2715; stäng listan"; // inte innerText annars tolkar inte HTML Unicode-tecknet.
  close_result.id = "close"; // anger en id till X för att styra den i Scss senare
  close_result.addEventListener("click", function () {
    result.innerHTML = ""; // tömmar jag result
  });
  result.appendChild(close_result); // skicka till far
  /* skapar en button för att rensa listan  */
  let delete_data = document.createElement("button");
  delete_data.innerText = "Rensa"; // texten inne i knappen
  delete_data.id = "delete"; // ange den en id
  delete_data.addEventListener("click", function () {
    localStorage.clear();
  });
  result.appendChild(delete_data); // skickar button till sin far result
});
/* först ska skapa jag en 2D array som har två värden då först är program namnet och andra är tiden för programmet*/
let tv_table= [
  ["Malou efter tio  ", " KL 10:00"],
  ["Nyheter  ", " KL 14:00"],
  ["Efter Fem ", " KL 17:00"],
  ["Nyheter  ", " KL 18:00"],
];
// console.log(tv_table[0]);
let tv_tabla= document.getElementById("tv_tabla");
let btn_tv_table= document.createElement("button");
btn_tv_table.id= "btn_tv_table";
btn_tv_table.innerText="tv Tablå";
tv_tabla.appendChild(btn_tv_table);
/* nu fixar jag knapp event så när man trycker på knappen så körs den funktionen */
btn_tv_table.addEventListener("click", function(){
  const list= document.createElement("ul");// skapar jag en ul lista i som kommer och var i tv_tablå sedan sctionen. 
  list.id = "timeForTV";// jag ger listan en id. 
  // jag skapar listan utan för for loopen för att sedan ska jag kunna tömma den i close_result event.  
  for(let i = 0; i < tv_table.length; i++){
    let program = tv_table[i];// skapar en variabel för att lagra datan i först 
    console.log(program);// skriver ut varje program 
    const li= document.createElement("li");// nu skapar jag en li som listan kommer och ha. jag använder en const för att de tiderna kommer inte och ändras.
    li.innerHTML=program;// här ksickar jag värdet på program variablen till html (li). 
    list.appendChild(li);// här skicker jag li till sin fat 
    tv_tabla.appendChild(list);// och här sicker jag listan till sin far element tv_tabla section
    
  }
  let close_result = document.createElement("span");
  close_result.innerHTML = "&#x2715; stäng listan"; // inte innerText annars tolkar inte HTML Unicode-tecknet.
  close_result.id = "close"; // anger en id till X för att styra den i Scss senare
  close_result.addEventListener("click", function () {
    list.innerHTML="";
    close_result.innerHTML = "";
  });
  tv_tabla.appendChild(close_result);
});