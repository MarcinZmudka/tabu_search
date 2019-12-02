import Solution from "./Solution";
import Neighborhood from "./Neighbourhood";
import Tabu_List from "./Tabu_list";

class Tabu_Search {
  best_solution = null;
  best_value = null;
  iteration_without_better_score = 0;
  worst_move = 0;
  constructor(iteration, nodes, solution) {
    this.iteration = iteration;
    this.nodes = nodes;
    this.solution = solution;
    this.neighborhood = new Neighborhood();
    this.neighborhood.set_nodes(nodes);
    this.tabu_list = new Tabu_List();
  }
  set_solution(new_solution) {
    // ustala nowe aktualne rozwiązanie i sprawdza, czy nie jest lepsze od najlepszego rozwiązania
    this.solution = new_solution;
    if (new_solution.get_value() > best_value) {
      this.best_value = new_solution.get_value();
      this.best_solution = new_solution;
    }
  }
  generate_new_solution() {
    const new_solution = new Solution();
    new_solution.generate_random_path();
    this.solution = new_solution;
    this.generate_neighborhood();
  }
  start() {
    while (this.iteration > 0) {
      if (this.neighborhood.get_top_moves().length < 1) {
        //jeśli nie ma top_moves to generuje sąsiedztwo
        this.generate_neighborhood();
      } else {
        this.neighborhood.count_new_value_of_top(this.solution);
        if (
          this.neighborhood.get_top_moves()[0].get_value() <
          this.worst_move_value
        ) {
          this.generate_neighborhood();
        }
      }
      const move = this.get_best_move(this.neighborhood.get_top_move());
      this.set_solution(move.get_solution());
      this.tabu_list.add_to_tabu(this.solution);
      this.tabu_list.reduce_tabu();
      if (this.iteration_without_better_score > 100) {
        this.restart();
      }
      this.iteration--;
      this.iteration_without_better_score++;
    }
  }
  generate_neighborhood() {
    this.neighborhood.generate_neighborhood(this.solution);
    this.neighborhood.generate_value_of_moves(this.solution);
    this.neighborhood.find_best_moves();
    this.worst_move = this.neighborhood.get_top_moves()[this.neighborhood.get_top_moves().length-1];
  }
  get_best_move(moves) {
    moves.filter(
      move =>
        !this.tabu_list.check_if_belongs_to_tabu(move) ||
        move.get_solution().get_value() > this.best_value
    ); // nie zachowuje jeśli znajduje się w liście tabu, chyba, że mozemy osiągnąc najlepsze rozwiazanie
    if (moves.length == 0) {
      //ruch najmniej tabu ?
    }
    this.neighborhood.filter_top_move(moves[0]);
    return moves[0];
  }
}
export default Tabu_Search;
