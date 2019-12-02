class Move{
    constructor(first, second, value = 0, cadention = 0){
        this.value = value;
        this.solution = null;
        if(first<second){
            this.lower = first;
            this.higher = second;
            this.tabu = cadention;
        }
        else{
            this.lower = second;
            this.higher = first;
            this.tabu = cadention;
        }
    }
    reduce(){ // funckja zmniejszająca ilość ruchów przez, które obiekt zostaje w tabu liśćie
        this.cadention--;
    }
    set_tabu(number){ // funckja ustawiająca kandencje
        this.cadention = number;
    }
    get_tabu(){
        return this.tabu;
    }
    set_solution(solution){
        this.solution = solution;
    }
    get_solution(){
        return this.solution;
    }
    get_lower(){
        return this.lower;
    }
    get_higher(){
        return this.higher;
    }
    set_value(value){
    this.value = value;
    }
}
export default Move;