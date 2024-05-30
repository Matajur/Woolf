"""
Module that provides sorting of files in the selected directory by their extension

Run as a script:
python hw03.py -s 'source_dir_name' -d 'destination_dir_name'
"""

import argparse
import os
import shutil


def parse_folder(source_dir: str, file_dict: dict = None) -> dict:
    """
    Recursive function to create a list of files in a selected folder,
    including all subfolders inside.

    :param source_dir: source folder to search for files
    :param file_dict: a dictionary of found files, where keys are file
    extensions and values are a list of matching files
    :return: file_dict
    """
    if file_dict is None:
        file_dict = {}

    for item in os.listdir(source_dir):
        item_path = os.path.join(source_dir, item)

        if os.path.isfile(item_path):
            _, extension = os.path.splitext(item)
            file_dict.setdefault(extension.strip("."), []).append(item_path)
        elif os.path.isdir(item_path):
            parse_folder(item_path, file_dict)

    return file_dict


def copy_files(dest_dir: str, file_dict: dict) -> None:
    """
    Function of copying files from the dictionary to the destination folder.

    :param dest_dir: destination folder where to copy the files
    :param file_dict: a dictionary of files, where keys are file
    extensions and values are a list of matching files
    :return: None
    """
    try:
        for extension, files in file_dict.items():
            if not extension:
                extension = "!unknown"
            extension_folder = os.path.join(dest_dir, extension)
            os.makedirs(extension_folder, exist_ok=True)

            for file_path in files:
                shutil.copy(file_path, extension_folder)
    except (FileNotFoundError, PermissionError):
        pass


def main() -> None:
    """
    A function that takes arguments from the user with a source folder to search for files
    to sort and a destination folder to copy the sorted files to. To perform these tasks,
    the corresponding functions: parse_folder() and copy_files() are launched. Arguments
    when starting the script should be passed according to the following scheme:

    python hw03.py -s 'source_dir_name' -d 'destination_dir_name'
    """
    parser = argparse.ArgumentParser(
        description="Script to sort files in a folder according to their extension"
    )
    parser.add_argument("-s", "--source", help="Path to the source folder for sorting")
    parser.add_argument(
        "-d",
        "--dest",
        default="dist",
        help="Path to destination directory for storing sorted files (default: 'dist')",
    )
    args = parser.parse_args()

    source_dir = args.source
    dest_dir = args.dest

    if not os.path.exists(source_dir):
        print(f"Error: Source directory '{source_dir}' does not exist")
        return

    files = parse_folder(source_dir)
    print(files)
    if not files:
        print(f"Source directory '{source_dir}' contains no files")
        return
    copy_files(dest_dir, files)
    print(f"Files copied successfully, check folder '{dest_dir}'")


if __name__ == "__main__":
    main()
