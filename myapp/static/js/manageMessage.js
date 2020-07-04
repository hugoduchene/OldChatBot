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


function hidden_loader(load) {
  load.classList.add("hidden");
}

function createLoaderElement() {
  let loader = document.createElement("div");
  loader.classList.add("loader");
  placeMessage.appendChild(loader);
  scrollToBottom();

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
  const error = "Cette adresses ne peut être envoyé ou pensez à vérifier votre orthographe";
  const message_error = createMessageTwo(error);
  message_error.style.color = "red";
  placeMessage.appendChild(message_error);

}



function postCallAPI(url, data = {}) {
  const request = new XMLHttpRequest();
  const formData = new FormData();

  const pr = new Promise((resolve, reject) => {
            request.onreadystatechange = function () {

                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                      console.log(this.responseText);
                        resolve(this.responseText)
                    } else {
                        reject(this.responseText)
                    }
                }
            }
        })

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })

        request.open(
            "POST",
            url
        );
        request.send(formData);
        return pr;
    }



function onSubmit(e) {
  e.preventDefault();
  const object = {message : message.value };
  const loader = createLoaderElement();

  Promise.all([postCallAPI('http://127.0.0.1:5000/api/content/geocoding', object), postCallAPI('http://127.0.0.1:5000/api/content/description', object)]).then((data) => {
    placeMessage.appendChild(createMessage());
    data[0] = JSON.parse(data[0])
    data[1] = JSON.parse(data[1])

    const content_location = data[0].location;
    const content_address = data[0].formatted_address;
    display_message_address(content_address);
    createMap(content_location);

    const content_oc = data[1].content;
    display_message_wiki(content_oc);

    hidden_loader(loader);
    scrollToBottom();

    message.value = "";

  }).catch(error => {
    display_message_error();
    hidden_loader(loader);
    scrollToBottom();
  })
}


document.querySelector("#form").addEventListener("submit", onSubmit);
