"""Example of a double list comprehension"""


def generate_pairs(the_list):
    """
    Function to show all pairs in a list
    """
    return [
        (the_list[i], the_list[j])
        for i in range(len(the_list))
        for j in range(i + 1, len(the_list))
    ]


items = [1, 2, 3, 4]
print(generate_pairs(items))
