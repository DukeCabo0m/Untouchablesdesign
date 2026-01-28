#!/usr/bin/env python3
import os
import re

def replace_font_mono_in_file(filepath):
    """Replace font-mono with empty string in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Count occurrences before replacement
        count = content.count('font-mono ')
        count += content.count('font-mono"')
        
        if count > 0:
            # Replace font-mono followed by space
            content = content.replace('font-mono ', '')
            # Replace font-mono at end of className (before closing quote)
            content = re.sub(r'className="font-mono"', 'className=""', content)
            content = re.sub(r'className=\'font-mono\'', 'className=\'\'', content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✓ {filepath}: {count} occurrences replaced")
            return count
        return 0
    except Exception as e:
        print(f"✗ Error processing {filepath}: {e}")
        return 0

def main():
    total_replaced = 0
    files_processed = 0
    
    # Walk through src directory
    for root, dirs, files in os.walk('./src'):
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                count = replace_font_mono_in_file(filepath)
                if count > 0:
                    files_processed += 1
                    total_replaced += count
    
    print(f"\n{'='*50}")
    print(f"Total files processed: {files_processed}")
    print(f"Total occurrences replaced: {total_replaced}")
    print(f"{'='*50}")

if __name__ == "__main__":
    main()
