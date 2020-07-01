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

  return wrapper;
}

function createMessageTwo(content) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("row", "boxMessage2");

  let newPara = document.createElement("p");
  newPara.classList.add("col-sm-1");

  let newPara1 = document.createElement("p");
  newPara1.classList.add("col-sm-5", "message2");
  newPara1.textContent = content;

  wrapper.append(newPara);
  wrapper.append(newPara1);

  return wrapper
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

function hidden_loader(a) {
  a.classList.add("hidden");
}

function createLoaderElement() {
  let loader = document.createElement("div");
  loader.classList.add("loader");
  placeMessage.appendChild(loader);
  setTimeout(function(){hidden_loader(loader)}, 1000);

  return loader;

}


function createMap(center) {
  let [wrapper, newPara1] = createMapElement();
  placeMessage.appendChild(wrapper);
  let options = { center: center,
                  zoom: 20
                };
  return new google.maps.Map(newPara1, options);
}

function cleanHtml(content_character) {
  let clean_html_content = content_character.replace(/<[^>]*>/g, '');
  let clean_symbol_content = clean_html_content.replace(/&#160;/g, ' ');

  return clean_symbol_content;
}

function display_message_wiki(content_character) {
  let content_clean = cleanHtml(content_character);
  let wrapper = createMessageTwo(content_clean);
  placeMessage.appendChild(wrapper);

}

function display_message_address(content_address) {
  let character = "Bien sûr mon poussin ! La voici : " + content_address;
  let message_address = createMessageTwo(character);
  placeMessage.appendChild(message_address);
}

function display_message_error() {
  let error = "Cette adresses ne peut être envoyé ou pensez à vérifier votre orthographe";
  let message_error = createMessageTwo(error);
  message_error.style.color = "red";
  placeMessage.appendChild(message_error);

}

function get_pos_location() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let response = JSON.parse(this.responseText);
      let content_location = response.openclassroom.results[0].geometry.location;
      let content_address = response.openclassroom.results[0].formatted_address;
      display_message_address(content_address);
      createMap(content_location);
      scrollToBottom();

    }
  };

  request.open(
    "GET",
    "https://old-chat-bot.herokuapp.com/api/content/geocoding"
  );

  request.send();
}

function getcontent_oc() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let response = JSON.parse(this.responseText);
      let content_oc = response.openclassroom.query.pages["5653202"].extract;
      display_message_wiki(content_oc);
      scrollToBottom();

    }
  };

  request.open(
    "GET",
    "https://old-chat-bot.herokuapp.com/api/content/description"
  );

  request.send();
}



function onSubmit(e) {
  e.preventDefault();
  placeMessage.appendChild(createMessage());

  if (message.value.includes("OpenClassrooms")) {
    createLoaderElement();
    setTimeout(get_pos_location, 1000);
    setTimeout(getcontent_oc, 1000);
  }
  else {
    createLoaderElement();
    setTimeout(display_message_error, 1000);
  }
  scrollToBottom();
  message.value = "";
}

document.querySelector("#form").addEventListener("submit", onSubmit);
