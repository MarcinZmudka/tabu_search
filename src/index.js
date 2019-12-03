import menu from "./menu";
import importer from "./importer";
import Solution from "./tabu_seach/Solution";
import Neighborhood from "./tabu_seach/Neighbourhood";
import Counter from "./Counter";
import Tabu_Search from "./tabu_seach/Tabu_Search";
//menu();
const nodes =  importer("tsp_6_2");
const solution = new Solution();
solution.generate_random_path(nodes);
const counter = new Counter(nodes);
counter.count_value_of_solution(solution);

const tabu_search = new Tabu_Search(800,nodes, solution);
tabu_search.start();
console.log(tabu_search.best_value);
console.log(tabu_search.best_solution.get_nodes());