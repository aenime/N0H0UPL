#!/usr/bin/env python3

import os
import sys
from pathlib import Path

def format_size(size_bytes):
    """Convert bytes to human readable format"""
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} PB"

def find_large_files(directory=".", size_mb=100):
    """Find files larger than specified size in MB"""
    large_files = []
    size_bytes = size_mb * 1024 * 1024
    
    for root, _, files in os.walk(directory):
        for file in files:
            filepath = os.path.join(root, file)
            try:
                file_size = os.path.getsize(filepath)
                if file_size > size_bytes:
                    large_files.append((file_size, filepath))
            except (OSError, IOError):
                continue
    
    # Sort by size (largest first)
    large_files.sort(reverse=True)
    
    print(f"Files larger than {size_mb}MB in {directory}:")
    print("=" * 60)
    
    for size, filepath in large_files:
        print(f"{format_size(size):>10} {filepath}")
    
    print("=" * 60)
    print(f"Total: {len(large_files)} large files")
    total_size = sum(size for size, _ in large_files)
    print(f"Combined size: {format_size(total_size)}")

if __name__ == "__main__":
    # Default values
    directory = "."
    size_mb = 100
    
    # Parse command line arguments
    if len(sys.argv) > 1:
        size_mb = int(sys.argv[1])
    if len(sys.argv) > 2:
        directory = sys.argv[2]
    
    find_large_files(directory, size_mb)
