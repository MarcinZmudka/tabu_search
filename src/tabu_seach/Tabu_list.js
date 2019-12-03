class Tabu_List {
  constructor() {
    this.array_of_moves = [];
    this.cadention = 3;
  }
  check_if_belongs_to_tabu(move) {
    //sprawdza czy ruch znajduje sie w tabu

    let belongs = false;
    this.array_of_moves.map(tabu_move => {
      if (
        move.get_lower() == tabu_move.get_lower() &&
        move.get_higher() == tabu_move.get_higher()
      ) {
        belongs = true;
      }
    });
    return belongs;
  }
  add_to_tabu(move) {
    // funkcja dodająca ruch do listy tabu
    move.set_tabu(this.cadention);
    this.array_of_moves.push(move);

  }
  reduce_tabu() {
    this.array_of_moves.map(move => move.reduce());
    const new_array = this.array_of_moves.filter(move => move.get_tabu() > 0);
    this.array_of_moves = new_array;
  }
}
export default Tabu_List;
