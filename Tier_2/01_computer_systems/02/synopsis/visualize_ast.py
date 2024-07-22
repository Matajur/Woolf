"""Module for visualization of Abstract Syntax Tree used for syntax analysis"""

import ast
from PIL import Image, ImageDraw, ImageFont

# Python source code example
code = """
x = 42 + y * 2
"""

# Code parsing in AST
parsed_ast = ast.parse(code)


def collect_nodes(
    node, node_parent_id=None, ast_level=0, position=0, nodes_per_level=None
):
    """
    Function for recursively traversing AST and collecting information about nodes
    """
    if nodes_per_level is None:
        nodes_per_level = {}

    ast_nodes = []
    ast_edges = []

    ast_node_id = id(node)
    ast_node_label = type(node).__name__

    ast_nodes.append((ast_node_id, ast_node_label, ast_level, position))
    if node_parent_id is not None:
        ast_edges.append((node_parent_id, ast_node_id))

    if ast_level not in nodes_per_level:
        nodes_per_level[ast_level] = 0
    nodes_per_level[ast_level] += 1

    child_position = 0
    for child in ast.iter_child_nodes(node):
        child_nodes, child_edges, _ = collect_nodes(
            child, ast_node_id, ast_level + 1, child_position, nodes_per_level
        )
        ast_nodes.extend(child_nodes)
        ast_edges.extend(child_edges)
        child_position += 1

    return ast_nodes, ast_edges, nodes_per_level


# Collect information about nodes and edges
nodes, edges, nodes_on_level = collect_nodes(parsed_ast)

print(nodes)
# [(1878514065360, 'Module', 0, 0), (1878514068368, 'Assign', 1, 0), (1878514236944, 'Name', 2, 0), (1878511833232, 'Store', 3, 0), (1878516021584, 'BinOp', 2, 1), (1878541204496, 'Constant', 3, 0), (1878511834384, 'Add', 3, 1), (1878541204432, 'BinOp', 3, 2), (1878541204368, 'Name', 4, 0), (1878511833104, 'Load', 5, 0), (1878511834640, 'Mult', 4, 1), (1878541204304, 'Constant', 4, 2)]
# [(ast_node_id, ast_node_label, ast_level, position)]
print(edges)
# [(1878514065360, 1878514068368), (1878514068368, 1878514236944), (1878514236944, 1878511833232), (1878514068368, 1878516021584), (1878516021584, 1878541204496), (1878516021584, 1878511834384), (1878516021584, 1878541204432), (1878541204432, 1878541204368), (1878541204368, 1878511833104), (1878541204432, 1878511834640), (1878541204432, 1878541204304)]
print(nodes_on_level)
# {0: 1, 1: 1, 2: 2, 3: 4, 4: 3, 5: 1}

# Determine image dimensions
width = 1000
height = 800
background_color = (255, 255, 255)
node_color = (0, 0, 0)
font_size = 12

# Create an image
image = Image.new("RGB", (width, height), background_color)
draw = ImageDraw.Draw(image)
font = ImageFont.load_default()

# Determine the position of nodes
node_positions = {}
level_height = height // (max(level for _, _, level, _ in nodes) + 2)
positions_at_level = {level: 0 for level in nodes_on_level}
for node_id, node_label, level, pos in nodes:
    num_nodes_at_level = nodes_on_level[level]
    x = (positions_at_level[level] + 1) * (width // (num_nodes_at_level + 1))
    y = (level + 1) * level_height
    node_positions[node_id] = (x, y)
    positions_at_level[level] += 1

# Drawing edges
for parent_id, child_id in edges:
    parent_pos = node_positions[parent_id]
    child_pos = node_positions[child_id]
    draw.line([parent_pos, child_pos], fill=node_color)

# Drawing nodes
for node_id, node_label, level, pos in nodes:
    x, y = node_positions[node_id]
    draw.ellipse([x - 15, y - 15, x + 15, y + 15], outline=node_color, width=2)
    bbox = draw.textbbox((0, 0), node_label, font=font)
    text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        (x - text_width // 2, y - text_height // 2),
        node_label,
        fill=node_color,
        font=font,
    )

# Saving an image
image.save("ast.png")
