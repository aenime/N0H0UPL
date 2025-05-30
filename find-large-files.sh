#!/bin/bash

# Default size threshold (in MB)
SIZE_THRESHOLD=${1:-100}

# Directory to search (default: current directory)
SEARCH_DIR=${2:-.}

echo "Finding files larger than ${SIZE_THRESHOLD}MB in ${SEARCH_DIR}..."
echo "================================================"

# Find files larger than threshold and sort by size
find "$SEARCH_DIR" -type f -size +${SIZE_THRESHOLD}M -exec ls -lh {} \; 2>/dev/null | \
    awk '{print $5 "\t" $9}' | \
    sort -hr | \
    while read size filepath; do
        printf "%-10s %s\n" "$size" "$filepath"
    done

echo "================================================"
echo "Total large files found:"
find "$SEARCH_DIR" -type f -size +${SIZE_THRESHOLD}M 2>/dev/null | wc -l
