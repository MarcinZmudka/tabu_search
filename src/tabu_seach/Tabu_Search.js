import Solution from "./Solution";
import Neighborhood from "./Neighbourhood";
import Tabu_List from "./Tabu_list";
import Counter from "../Counter";

class Tabu_Search {
  best_solution = null;
  best_value = 999999;
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
    if (new_solution.get_value() < this.best_value) {
      this.best_value = new_solution.get_value();
      this.best_solution = new_solution;
      this.iteration_without_better_score = 0;
    }
    else{
      this.iteration_without_better_score++;
    }
  }
  restart() { //generuje nowe rozwiązanie oraz sąsiedztwo
    const new_solution = new Solution();
    new_solution.generate_random_path(this.nodes);
    const counter = new Counter(this.nodes);
    counter.count_value_of_solution(new_solution);
    this.solution = new_solution;
    this.generate_neighborhood();
  }
  start() {
    while (this.iteration > 0) {
      if (this.neighborhood.get_top_moves().length < 1) {
        //jeśli nie ma top_moves to generuje sąsiedztwo
        this.generate_neighborhood();
      } 
      else {
        this.neighborhood.count_new_value_of_top(this.solution);
        //jeśli najlepszy możliwy ruch z sąsiedztwa jest gorszy od najgorszego z początku, odbuduj sąsiedztwo
        if (
          this.neighborhood.get_top_moves()[0].get_value() <
          this.worst_move_value
        ) {
          this.generate_neighborhood();
        }
      }
      const move = this.get_best_move(this.neighborhood.get_top_moves());
      this.set_solution(move.get_solution());
      this.tabu_list.add_to_tabu(move); //dodajemy ruch do listy tabu
      this.tabu_list.reduce_tabu(); //zmniejszamy ograniczenie
      if (this.iteration_without_better_score > 20) {
        this.iteration_without_better_score = 0;
        this.restart();
      }
      this.iteration--;
    }
  }
  generate_neighborhood() { //generuje nowe sąsiedztwo
    this.neighborhood.generate_neighborhood(this.solution);
    this.neighborhood.generate_value_of_moves(this.solution);
    this.neighborhood.find_best_moves();
    this.worst_move = this.neighborhood.get_top_moves()[this.neighborhood.get_top_moves().length-1];
  }
  get_best_move(moves) { //zwraca najlepszy ruch oraz usuwa go z top_moves z sąsiedztwa
    //to bym zmienił
    const new_moves = moves.filter(
      move =>
        !this.tabu_list.check_if_belongs_to_tabu(move) ||
        move.get_solution().get_value() < this.best_value
    ); // nie zachowuje jeśli znajduje się w liście tabu, chyba, że mozemy osiągnąc najlepsze rozwiazanie
    if (new_moves.length == 0) { // jeśli wszystkie ruchy są zakazane, wtedy wybieramy ruch najmniej tabu
      let move_with_smallest_tabu = null;
      let tabu = 100;
      moves.map(move => {
        if(tabu > move.get_tabu()){
          move_with_smallest_tabu = move;
          tabu = move.get_tabu();
        }
      })
      new_moves.push(move_with_smallest_tabu);
    }
    this.neighborhood.filter_top_move(new_moves[0]);
    return new_moves[0];
  }
}
export default Tabu_Search;
