const placeMessage = document.getElementById("bigBoxMessage");
const message = document.querySelector("#message_text");

function scrollToBottom() {
  placeMessage.scrollTop = placeMessage.scrollHeight;
}

function createMessage() {
  let wrapper = document.createElement("div");

  wrapper.classList.add("row");
  wrapper.id = "boxMessage1";

  let newPara = document.createElement("p");
  newPara.classList.add("col-sm-6");

  let newPara1 = document.createElement("p");
  newPara1.classList.add("col-sm-5");
  newPara1.id = "message1";
  newPara1.textContent = message.value;

  wrapper.append(newPara);
  wrapper.append(newPara1);

  message.value = "";
  scrollToBottom();

  return wrapper;
}

function createMapElement() {
  let wrapper = document.createElement("div");
  wrapper.classList.add("row", "boxMessage2");

  let newPara = document.createElement("p");
  newPara.classList.add("col-sm-1");

  let newPara1 = document.createElement("p");
  newPara1.classList.add("col-sm-5", "message2", "map");

  wrapper.append(newPara);
  wrapper.append(newPara1);

  return [wrapper, newPara1];
}

function createMap(location) {
  let [wrapper, newPara1] = createMapElement();
  placeMessage.appendChild(wrapper);
  let options = { center: location, zoom: 20 };
  return new google.maps.Map(newPara1, options);
}

function getLocation() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let response = JSON.parse(this.responseText);
      createMap(response.results[0].geometry.location);
      scrollToBottom();
    }
  };

  request.open(
    "GET",
    "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAC-uJA9vLh5Ne0mipvEAn157p1y_gVHPU"
  );

  request.send();
}

function onSubmit(e) {
  e.preventDefault();
  placeMessage.appendChild(createMessage());
  getLocation();
}

document.querySelector("#form").addEventListener("submit", onSubmit);
