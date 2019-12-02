class Solution {
  constructor(nodes = []) {
    this.value = 0;
    this.nodes = nodes;
  }
  generate_random_path(nodes_all) {
    const length = nodes_all.length;
    let left_numbers = Array(length)
      .fill(null)
      .map((value, index) => index);
    function rand(size) {
      // zwraca liczbę od 0 do size -1
      return Math.floor(Math.random() * size);
    }
    this.nodes = [];
    for (let i = 0; i < length; i++) {
      const index = rand(left_numbers.length);
      const new_value = left_numbers[index];
      this.nodes.push(new_value);
      left_numbers = left_numbers.filter(
        (value, index_1) => value != new_value
      );
    }
  }
  get_nodes() {
    return this.nodes;
  }
  set_nodes(nodes) {
    this.nodes = nodes;
  }
  get_value() {
    if (this.value == 0) {
      console.log("wartośc nie ustawiona");
    }
    return this.value;
  }
  set_value(value) {
    this.value = value;
  }
}
export default Solution;
