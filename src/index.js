import menu from "./menu";
import importer from "./importer";
import Solution from "./tabu_seach/Solution";
import Neighborhood from "./tabu_seach/Neighbourhood";
import Counter from "./Counter";
//menu();
const nodes =  importer("tsp_10");
const solution = new Solution();
solution.generate_random_path(nodes);
const counter  = new Counter(nodes);
counter.count_value_of_solution(solution);

console.log(solution.get_value());
console.log(solution.nodes);
const neighborhood = new Neighborhood();
neighborhood.set_nodes(nodes);
neighborhood.generate_neighborhood(solution);
neighborhood.generate_value_of_moves(solution);
neighborhood.find_best_moves();
console.log(neighborhood.top_moves);



