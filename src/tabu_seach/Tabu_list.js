class Tabu_List {
  constructor() {
    this.array_of_moves = [];
    this.cadention = 3;
  }
  check_if_belongs_to_tabu(move) {
    //sprawdza czy ruch znajduje sie w tabu
    if (this.array_of_moves.includes(move)) { //to nie zadziała
      return true;
    }
    return false;
  }
  add_to_tabu(move) {
    // funkcja dodająca ruch do listy tabu
    move.set_cadention(this.cadention);
  }
  reduce_tabu() {
    this.array_of_moves.map(move => move.reduce());
    this.array_of_moves.filter(move => move.get_tabu() > 0);
  }
}
export default Tabu_List;
