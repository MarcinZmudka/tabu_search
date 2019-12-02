const readline = require("readline-sync");
import Timer from "./timer";
import importer from "./importer";
let nodes = null;
const timer = new Timer();


function showMenu() {
  console.log("Wybierz jeden z podpunktów");
  console.log("0. Załaduj plik");
  console.log("1. Pokaż załadowny plik");
  console.log("2. Podaj liczbę iteracji");
  console.log("3. Tabu Search");
  console.log("4. Wyjdz z programu");
}
function test(){
  nodes = importer("n5v0");
  console.log(nodes[0].elements);  
  console.log(nodes[0].elements[0].elements);  
  console.log(nodes[0].elements ==nodes[0].elements[1].elements);
}
function choose(number) {
  switch (number) {
    case "1":
      showNodes();
      break;
    case "0":
      importFunc();
      break;
    case "2":
      //bruteForce();
      break;
    case "3":
      //branchBound();
      break;
    case "4":
      return;
    default:
      null;
  }
  init();
}

function init() {
  showMenu();
  read("", choose);
}

function importFunc() {
  //funckja importująca wskazany plik
  try {
    read("podaj nazwę pliku\n", name => {
      nodes = importer(name);
    });
  } catch (err) {
    console.log(err.code);
  }
}

function read(text, callback) {
  //funckja czytajaca dane wpisane do użytkownika i wywołująca funckję podaną jako paramtr z danymi jako parametrem
  var feedback = readline.question(text);
  callback(feedback);
}
function showNodes() {
  if (nodesNotNull) {
    nodes.map(node => {
      let path = "";
      node.elements.map(node => {
        path += " "+parseFloat(node.attributes.cost);
      });
      console.log(path);
    })
  }
}

function nodesNotNull() {
  //funckja sprawdzjąca czy plik z danymi zostal wczytany
  if (nodes == null) {
    console.log("Musisz zaimportować plik, by podjąć dalsze kroki");
    return false;
  }
  return true;
}
export default init;
