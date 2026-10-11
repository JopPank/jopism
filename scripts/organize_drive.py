import argparse
import os
import sys
from pathlib import Path


def count_contents(folder: Path) -> tuple[int, int]:
    file_count = 0
    directory_count = 0

    def raise_walk_error(error: OSError) -> None:
        raise error

    for _, directories, files in os.walk(
        folder, onerror=raise_walk_error, followlinks=False
    ):
        directory_count += len(directories)
        file_count += len(files)

    return file_count, directory_count


def is_within(path: Path, parent: Path) -> bool:
    try:
        path.relative_to(parent)
        return True
    except ValueError:
        return False


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Preview or move a Google Drive website folder."
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(r"G:\My Drive"),
        help=r"Local Google Drive folder (default: G:\My Drive)",
    )
    parser.add_argument(
        "--source",
        default="OS Gatineau",
        help="Website folder, relative to --root unless an absolute path is given",
    )
    parser.add_argument(
        "--destination-folder",
        default="Website Files",
        help="Destination folder, relative to --root (default: Website Files)",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Move the folder after displaying the plan and receiving confirmation",
    )
    args = parser.parse_args()

    try:
        root = args.root.resolve(strict=True)
        if not root.is_dir():
            raise ValueError(f"Drive root is not a directory: {root}")

        source_arg = Path(args.source)
        source_path = source_arg if source_arg.is_absolute() else root / source_arg
        if source_path.is_symlink():
            raise ValueError(f"Refusing to move a symbolic link: {source_path}")
        source = source_path.resolve(strict=True)
        if not is_within(source, root) or source == root:
            raise ValueError(f"Source must be inside the Drive root: {source}")
        if not source.is_dir():
            raise ValueError(f"Source is not a directory: {source}")

        destination_folder = Path(args.destination_folder)
        if destination_folder.is_absolute() or ".." in destination_folder.parts:
            raise ValueError("Destination folder must be a relative path inside --root")
        destination_parent = (root / destination_folder).resolve()
        if not is_within(destination_parent, root):
            raise ValueError(
                f"Destination folder must be inside the Drive root: {destination_parent}"
            )
        destination = destination_parent / source.name
        if destination == source or is_within(destination, source):
            raise ValueError("Destination cannot be the source folder or its descendant")
        if os.path.lexists(destination):
            raise FileExistsError(f"Destination already exists: {destination}")

        file_count, directory_count = count_contents(source)
        print("Dry-run move plan")
        print(f"  Source:      {source}")
        print(f"  Destination: {destination}")
        print(f"  Contents:    {file_count} files, {directory_count} subfolders")

        if not args.apply:
            print("No changes made. Review the plan; use --apply to continue.")
            return 0

        if not sys.stdin.isatty():
            raise ValueError("--apply requires an interactive terminal confirmation")
        confirmation = input("Type MOVE to move this folder: ").strip()
        if confirmation != "MOVE":
            print("Cancelled. No changes made.")
            return 0

        destination_parent.mkdir(parents=True, exist_ok=True)
        source.rename(destination)
        print("Folder moved. Google Drive for desktop will sync the change.")
        return 0
    except (OSError, ValueError) as error:
        parser.exit(2, f"Error: {error}\n")


if __name__ == "__main__":
    raise SystemExit(main())
