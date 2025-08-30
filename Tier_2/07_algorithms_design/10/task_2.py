"""Module for class scheduling using a greedy algorithm"""

from typing import List, Set


class Teacher:
    """
    Definition of the Teacher class
    """

    def __init__(
        self,
        first_name: str,
        last_name: str,
        age: int,
        email: str,
        can_teach_subjects: Set[str],
    ):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.email = email
        self.can_teach_subjects = can_teach_subjects
        self.assigned_subjects = set()

    def __repr__(self):
        return f"{self.first_name} {self.last_name}"


def create_schedule(subjects: Set[str], teachers: List[Teacher]) -> List[Teacher]:
    """
    Function, which uses a greedy algorithm to assign teachers to subjects.
    """
    chosen_teachers = []
    # Uncovered elements from the set of subjects
    uncovered_subjects = subjects.copy()

    # While there are uncovered subjects
    while uncovered_subjects:
        best_teacher = None
        best_coverage = set()

        for teacher in teachers:
            can_cover = teacher.can_teach_subjects & uncovered_subjects
            if can_cover:
                if (
                    not best_teacher
                    or len(can_cover) > len(best_coverage)
                    or (
                        len(can_cover) == len(best_coverage)
                        and teacher.age < best_teacher.age
                    )
                ):
                    best_teacher = teacher
                    best_coverage = can_cover

        if not best_teacher:
            return None  # Cannot cover all subjects

        # Assign selected subjects
        best_teacher.assigned_subjects = best_coverage
        
        # Add the teacher to the chosen list
        chosen_teachers.append(best_teacher)

        # Removing a teacher from the list of unemployed
        teachers.remove(best_teacher)

        # Remove covered subjects from the set of uncovered subjects
        uncovered_subjects -= best_coverage

    return chosen_teachers


if __name__ == "__main__":
    # Complete set of subjects
    subjects = {"Mathematics", "Physics", "Chemistry", "Informatics", "Biology"}

    # Creating a list of teachers
    teachers = [
        Teacher(
            "Olexandr",
            "Ivanenko",
            45,
            "o.ivanenko@example.com",
            {"Mathematics", "Physics"},
        ),
        Teacher("Maria", "Petrenko", 38, "m.petrenko@example.com", {"Chemistry"}),
        Teacher(
            "Sergiy",
            "Kovalenko",
            50,
            "s.kovalenko@example.com",
            {"Informatics", "Mathematics"},
        ),
        Teacher(
            "Natalia",
            "Shevchenko",
            29,
            "n.shevchenko@example.com",
            {"Biology", "Chemistry"},
        ),
        Teacher(
            "Dmytro",
            "Bondarenko",
            35,
            "d.bondarenko@example.com",
            {"Physics", "Informatics"},
        ),
        Teacher("Olena", "Grycenko", 42, "o.grycenko@example.com", {"Biology"}),
    ]

    # Calling the schedule creation function
    schedule = create_schedule(subjects, teachers)

    # Schedule output
    if schedule:
        print("Class schedule:")
        for teacher in schedule:
            print(
                f"{teacher.first_name} {teacher.last_name}, {teacher.age} years, email: {teacher.email}"
            )
            print(
                f"\tTeaches subjects: {', '.join(sorted(teacher.assigned_subjects))}\n"
            )
    else:
        print("It is impossible to cover all subjects with the available teachers.")
