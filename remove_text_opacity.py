#!/usr/bin/env python3
"""
Script pour retirer toutes les transparences sur les textes
Remplace text-[#E0E0E0]/XX par text-[#E0E0E0]
"""

import re
import os
from pathlib import Path

# Patterns à remplacer
patterns = [
    (r'text-\[#E0E0E0\]/\d+', 'text-[#E0E0E0]'),
    (r'placeholder:text-\[#E0E0E0\]/\d+', 'placeholder:text-[#E0E0E0]'),
    (r'border-\[#E0E0E0\]/\d+', 'border-[#E0E0E0]'),
]

def process_file(file_path):
    """Traite un seul fichier"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Applique tous les patterns
        for pattern, replacement in patterns:
            content = re.sub(pattern, replacement, content)
        
        # Sauvegarde seulement si changé
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Erreur avec {file_path}: {e}")
        return False

def main():
    """Point d'entrée principal"""
    root = Path('/src/app')
    
    if not root.exists():
        print(f"Le répertoire {root} n'existe pas!")
        return
    
    # Trouve tous les fichiers .tsx
    tsx_files = list(root.rglob('*.tsx'))
    
    modified_count = 0
    for file_path in tsx_files:
        if process_file(file_path):
            modified_count += 1
            print(f"✓ Modifié: {file_path.relative_to(root.parent)}")
    
    print(f"\nTerminé! {modified_count} fichiers modifiés sur {len(tsx_files)}")

if __name__ == '__main__':
    main()
