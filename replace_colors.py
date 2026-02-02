#!/usr/bin/env python3
import os
import re

def replace_in_file(filepath):
    """Replace #E0E0E0 with #F0F0F0 in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Count replacements
        count = content.count('#E0E0E0')
        if count == 0:
            return 0
        
        # Replace
        new_content = content.replace('#E0E0E0', '#F0F0F0')
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ {filepath}: {count} replacements")
        return count
    except Exception as e:
        print(f"✗ {filepath}: {e}")
        return 0

def main():
    total = 0
    for root, dirs, files in os.walk('/src'):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.jsx', '.js')):
                filepath = os.path.join(root, file)
                total += replace_in_file(filepath)
    
    print(f"\nTotal: {total} replacements")

if __name__ == '__main__':
    main()
