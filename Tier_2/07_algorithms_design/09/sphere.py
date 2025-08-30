"""Module local optimization to minimize the Sphere function"""

import random
import math
from typing import List, Tuple, Callable


def sphere_function(x: List[float]) -> float:
    """
    Function that defines the Sphere function
    """
    return sum(xi**2 for xi in x)


def get_random_point(bounds: List[Tuple[float, float]]) -> List[float]:
    """
    Function that generates a random point within bounds
    """
    return [random.uniform(b[0], b[1]) for b in bounds]


def generate_neighbor(
    point: List[float], bounds: List[Tuple[float, float]], step_size: float = 0.1
) -> List[float]:
    """
    Function to generate a neighbor point by small random move within bounds
    """
    neighbor = []
    for i, _ in enumerate(point):
        move = random.uniform(-step_size, step_size)
        new_val = point[i] + move
        new_val = max(bounds[i][0], min(bounds[i][1], new_val))
        neighbor.append(new_val)
    return neighbor


def hill_climbing(
    func: Callable[[List[float]], float],
    bounds: List[Tuple[float, float]],
    max_iterations: int = 1000,
    tolerance: float = 1e-6,
) -> Tuple[List[float], float]:
    """
    Function implementing the Hill Climbing Algorithm
    for finding the minimum of the given function
    """
    current_solution = get_random_point(bounds)
    current_value = func(current_solution)

    for _ in range(max_iterations):
        neighbor = generate_neighbor(current_solution, bounds)
        neighbor_value = func(neighbor)
        if neighbor_value < current_value - tolerance:
            current_solution, current_value = neighbor, neighbor_value
        else:
            break

    return current_solution, current_value


def random_local_search(
    func: Callable[[List[float]], float],
    bounds: List[Tuple[float, float]],
    max_iterations: int = 1000,
    probability: float = 0.2,
) -> Tuple[List[float], float]:
    """
    Function implementing the Random Local Search
    for finding the minimum of the given function
    """
    current_solution = get_random_point(bounds)
    current_value = func(current_solution)
    best_solution = current_solution[:]
    best_value = current_value

    for _ in range(max_iterations):
        candidate_solution = generate_neighbor(current_solution, bounds)
        candidate_value = func(candidate_solution)
        if candidate_value < best_value or random.random() < probability:
            best_solution, best_value = candidate_solution, candidate_value

    return best_solution, best_value


def simulated_annealing(
    func: Callable[[List[float]], float],
    bounds: List[Tuple[float, float]],
    temperature: int = 1000,
    cooling_rate: float = 0.95,
    threshold: float = 1e-6,
) -> Tuple[List[float], float]:
    """
    Function implementing the Simulated Annealing
    for finding the minimum of the given function
    """
    current_solution = get_random_point(bounds)
    current_value = func(current_solution)
    best_solution = current_solution[:]
    best_value = current_value

    while temperature > threshold:

        candidate_solution = generate_neighbor(current_solution, bounds)
        candidate_value = func(candidate_solution)

        if candidate_value < current_value:
            current_solution, current_value = candidate_solution, candidate_value
            if candidate_value < best_value:
                best_solution, best_value = candidate_solution, candidate_value
        else:
            delta = candidate_value - current_value
            prob = math.exp(-delta / temperature)
            if random.random() < prob:
                current_solution, current_value = candidate_solution, candidate_value

        temperature *= cooling_rate

    return best_solution, best_value


if __name__ == "__main__":
    # Limits for a function
    BOUNDS = [(-5, 5), (-5, 5)]

    # Execution of algorithms
    print("Hill Climbing:")
    hc_solution, hc_value = hill_climbing(sphere_function, BOUNDS)
    print("Solution:", hc_solution, "Value:", hc_value)
    # Solution: [0.35321153150955864, -1.0539650916654382] Value: 1.2356008004406633

    print("\nRandom Local Search:")
    rls_solution, rls_value = random_local_search(sphere_function, BOUNDS)
    print("Solution:", rls_solution, "Value:", rls_value)
    # Solution: [-1.0498435879391692, 0.39686702998088375] Value: 1.2596749986228357

    print("\nSimulated Annealing:")
    sa_solution, sa_value = simulated_annealing(sphere_function, BOUNDS)
    print("Solution:", sa_solution, "Value:", sa_value)
    # Solution: [-0.006127931365684777, -0.0059753511574198725] Value: 7.325636427702232e-05
