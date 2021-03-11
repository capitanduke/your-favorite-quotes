// An individual player. Holds properties and behavior for one player
class Player {
  constructor(obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.lastName = obj.last;
      this.today = obj.today;
      this.cat1 = obj.categories.catOne;
      this.cat2 = obj.categories.catTwo;
      this.cat3 = obj.categories.catThree;
      this.cat4 = obj.categories.catFour;
  }
  play() {
    console.log(this.name, "plays")
  }

  createCards(obj) {
    const fatherDiv = document.getElementById('father-list');
    const cardContainer = document.createElement('div');
    const bottomContainer = document.createElement('div');
    const title = document.createElement('h1');
    const subTitle = document.createElement('h4');

    const work = document.createElement('p');
    const shopping = document.createElement('p');
    const diligence = document.createElement('p');
    const important = document.createElement('p');
    work.setAttribute("class", "cat-p");
    shopping.setAttribute("class", "cat-p");
    diligence.setAttribute("class", "cat-p");
    important.setAttribute("class", "cat-p");

    const dateCreate = document.createElement('p');
    const deleteBurron = document.createElement('button');
    const divEditButton = document.createElement('div');
    const catsContainer = document.createElement('div');
    const editBurron = document.createElement('button');
    const editIcon = document.createElement('i');

    divEditButton.setAttribute("class", "edit-button-container");
    editIcon.setAttribute("class", "fa fa-edit");
    editIcon.style.fontSize = "24px";
    editIcon.style.cursor = "pointer";
    title.setAttribute("class", "card-title");
    subTitle.setAttribute("class", "card-subtitle");
    catsContainer.setAttribute("class", "categories-container");
    cardContainer.setAttribute("class", "col cards-align");
    bottomContainer.setAttribute("class", "bottom-container");
    dateCreate.setAttribute("class", "date");
    cardContainer.setAttribute("id", obj.id);
    editBurron.setAttribute("id", "editButtonOnClick");
    title.innerHTML = obj.name;
    subTitle.innerHTML = obj.last;
    dateCreate.innerHTML = obj.today;
    deleteBurron.innerHTML = 'Delete';
    editBurron.innerHTML = 'Edit';

    editIcon.onclick = function() {editPlayer(obj);};
    cardContainer.appendChild(title);
    cardContainer.appendChild(subTitle);
    bottomContainer.appendChild(dateCreate);

    for (const property in obj.categories) {
      if( obj.categories[property] !== false){
        if( obj.categories[property] === "love" ){
          work.innerHTML = obj.categories.catOne;
          catsContainer.appendChild(work);
          bottomContainer.appendChild(catsContainer);
          cardContainer.appendChild(bottomContainer);
        } else if( obj.categories[property] === "Motivation" ){
          shopping.innerHTML = obj.categories.catTwo;
          catsContainer.appendChild(shopping);
          bottomContainer.appendChild(catsContainer);
          cardContainer.appendChild(bottomContainer);
        } else if( obj.categories[property] === "Live" ){
          diligence.innerHTML = obj.categories.catThree;
          catsContainer.appendChild(diligence);
          bottomContainer.appendChild(catsContainer);
          cardContainer.appendChild(bottomContainer);
        } else{
          important.innerHTML = obj.categories.catFour;
          catsContainer.appendChild(important);
          bottomContainer.appendChild(catsContainer);
          cardContainer.appendChild(bottomContainer);
        }
      } else {
        if(obj.categories[property] === false){
          let emptyP = obj.categories[property];
          emptyP = document.createElement('p');
          emptyP.setAttribute("class", "empty-cat");
          emptyP.innerHTML = "";
          catsContainer.appendChild(emptyP);
          bottomContainer.appendChild(catsContainer);
          cardContainer.appendChild(bottomContainer);
        }
      }
    }

    divEditButton.appendChild(editIcon);
    bottomContainer.appendChild(divEditButton);
    cardContainer.appendChild(bottomContainer);
    fatherDiv.appendChild(cardContainer);
  }

  static removeCards(index, objId){
    const fatherDiv = document.getElementById(`${objId}`);
    fatherDiv.remove();
  }

}

class Players{
  constructor(){
    this.players = []
  }

  newPlayer(obj){
    let p = new Player(obj)
    this.players.push(p);
    p.createCards(obj)
    console.log(obj);
    //return p
  }

  deletePlayer(objId){
    let id = parseInt(objId, 10);
    const index = this.players.findIndex(x => x.id === id);
    if (index > -1) {
      Player.removeCards(index, objId);
      this.players.splice(index, 1);
    }
  }

  editPlayer(obj){
    let id = parseInt(obj.objId, 10);
    const card = document.getElementById(`${id}`);
    const elements = document.getElementById(`${id}`).childNodes;
    console.log(elements[2].childNodes[1].childNodes[0]);

    const buttonEdit = elements[2].childNodes[1].childNodes[0];
    const index = this.players.findIndex(x => x.id === id);
    this.players.map((value, i) => {
      if(value.id === id){
        for(const ele in obj) {
          if( ele === "name"){
            value.name = obj.name;
            elements[0].innerHTML = value.name;
          } else if( ele === "last"){
            value.last = obj.last;
            elements[1].innerHTML = value.last;
          }
        }

        for(const cats in obj.categories){
          if(cats === "catOne"){
            if(obj.categories[cats] === "love"){
              value.cat1 = obj.categories[cats];
              elements[2].childNodes[1].childNodes[0].innerHTML = value.cat1;
              if(elements[2].childNodes[1].childNodes[0].classList.contains('empty-cat')){
                elements[2].childNodes[1].childNodes[0].classList.remove("empty-cat");
                elements[2].childNodes[1].childNodes[0].classList.add("cat-p");
              }
            } else {
              value.cat1 = false;
              elements[2].childNodes[1].childNodes[0].innerHTML = "";
              elements[2].childNodes[1].childNodes[0].classList.remove("cat-p");
              elements[2].childNodes[1].childNodes[0].classList.add("empty-cat");
            }
          } else if(cats === "catTwo"){
            if(obj.categories[cats] === "Motivation"){
              value.cat2 = obj.categories[cats];
              elements[2].childNodes[1].childNodes[1].innerHTML = value.cat2;
              if(elements[2].childNodes[1].childNodes[1].classList.contains('empty-cat')){
                elements[2].childNodes[1].childNodes[1].classList.remove("empty-cat");
                elements[2].childNodes[1].childNodes[1].classList.add("cat-p");
              }
            } else {
              value.cat2 = false;
              elements[2].childNodes[1].childNodes[1].innerHTML = "";
              elements[2].childNodes[1].childNodes[1].classList.add("empty-cat");
              elements[2].childNodes[1].childNodes[1].classList.remove("cat-p");
            }
          } else if(cats === "catThree"){
            if(obj.categories[cats] === "Live"){
              value.cat3 = obj.categories[cats];
              elements[2].childNodes[1].childNodes[2].innerHTML = value.cat3;
              if(elements[2].childNodes[1].childNodes[2].classList.contains('empty-cat')){
                elements[2].childNodes[1].childNodes[2].classList.remove("empty-cat");
                elements[2].childNodes[1].childNodes[2].classList.add("cat-p");
              }
            } else {
              value.cat3 = false;
              elements[2].childNodes[1].childNodes[2].innerHTML = "";
              elements[2].childNodes[1].childNodes[2].classList.add("empty-cat");
              elements[2].childNodes[1].childNodes[2].classList.remove("cat-p");
            }
          } else if(cats === "catFour"){
            if(obj.categories[cats] === "Success"){
              value.cat4 = obj.categories[cats];
              elements[2].childNodes[1].childNodes[3].innerHTML = value.cat4;
              if(elements[2].childNodes[1].childNodes[3].classList.contains('empty-cat')){
                elements[2].childNodes[1].childNodes[3].classList.remove("empty-cat");
                elements[2].childNodes[1].childNodes[3].classList.add("cat-p");
              }
            } else {
              value.cat4 = false;
              elements[2].childNodes[1].childNodes[3].innerHTML = "";
              elements[2].childNodes[1].childNodes[3].classList.add("empty-cat");
              elements[2].childNodes[1].childNodes[3].classList.remove("cat-p");
            }
          }
        }

        buttonEdit.onclick = function() {editPlayer(obj);};

      }
    })
  }

  static allPlayers(){
    return this.players
  }
  get numberOfPlayers(){
      return this.players.length
  }
}

/*let league = new Players()
league.newPlayer("Mark")
league.newPlayer("Roger")*/

// list all the players
/*console.log(league.numberOfPlayers + " Players)
console.log(league.allPlayers)*/


// make them do something
//league.allPlayers.forEach(player => player.play())
