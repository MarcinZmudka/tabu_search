import fs from "fs";

function importer(name) {
  let nodes = [];
  try {
    const txt = fs.readFileSync(`./files/${name}.txt`, "utf8"); //czytanie pliu
    const hor = txt.split("\n");
    hor.map(line => {
      if (line.length > 5) {
        const array = line.split(" ");
        array.flat(Infinity);
        const new_array = array.filter(value => value != "");
        const newer_array = new_array.map(value => parseInt(value));
        const another_array = newer_array.filter(value =>  !Number.isNaN(value));
        nodes.push(another_array);
      }
    });    
  } catch (err) {
    console.error(err.message);
  }
  return nodes;
}
export default importer;
