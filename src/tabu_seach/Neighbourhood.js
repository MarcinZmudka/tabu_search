import Move from "./Move";
import Counter from "../Counter";

class Neighborhood {
  all_moves = []; //wszystkie możliwe ruchy
  top_moves = []; // sąsiedztwo
  done_moves = []; //
  nodes = [];
  set_nodes(nodes) {
    this.nodes = nodes;
  }
  generate_neighborhood(solution) {
    this.done_moves = []; //czyścimy wykonane ruchy
    for (let i = 0; i < this.nodes.length; i++) {
      this.done_moves.push([]);
    }
    solution.get_nodes().map((value, index, array) => {
      this.nodes[value].map((value_node, index_node) => {
        if (
          value != index_node &&
          array[index + (1 % array.length)] != index_node
        ) {
          const new_move = new Move(value, index_node);
          if (!this.done_moves[new_move.lower].includes(new_move.higher)) {
            this.all_moves.push(new_move);
            this.done_moves[new_move.lower].push(new_move.higher);
          }
        }
      });
    });
  }
  find_best_moves() {
    for (let i = 0; i < 5; i++) {
      this.top_moves[i] = this.all_moves[i];
    }
    this.all_moves.map((move, index) => {
      for (let i = 0; i < 5; i++) {
        if (this.top_moves[i].value > move.value) {
          this.top_moves[i] = move;
          break;
        }
      }
    });
  }
  generate_value_of_moves(solution) {
    const counter = new Counter(this.nodes);
    this.all_moves.map(move => {
      counter.count_value_of_move(move, solution);
    });
  }
  count_new_value_of_top(solution) {
    const counter = new Counter(this.nodes);
    this.top_moves.map(move => {
      counter.count_value_of_move(move, solution);
    });
  }
  get_top_moves() {
    return this.top_moves;
  }
  filter_top_move(move) {
    const new_top = this.top_moves.filter(move_base => move_base !== move);
    this.top_moves = new_top;
  }
}
export default Neighborhood;
