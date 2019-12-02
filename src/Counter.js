import Solution from "./tabu_seach/Solution";

class Counter {
  constructor(nodes) {
    this.nodes = nodes;
  }
  count_value_of_solution(solution) {
    let value = 0;
    solution.get_nodes().map((node, index, array) => {
      value += this.nodes[node][array[(index + 1) % array.length]];
    });
    solution.set_value(value);
    return value;
  }
  count_value_of_move(move, solution) {
    const solution_nodes = solution.get_nodes();
    let new_nodes = [];
    solution_nodes.map((node, index, array) => {
      if (node == move.get_lower()) {
        new_nodes.push(move.get_higher());
      } else if ((node == move.get_higher())) {
        new_nodes.push(move.get_lower());
      } else {
        new_nodes.push(array[index]);
      }
    });
    const new_solution = new Solution(new_nodes);
    const new_value =
      this.count_value_of_solution(new_solution) - solution.get_value();
    move.set_value(new_value);
    move.set_solution(new_solution);
  }
}
export default Counter;
