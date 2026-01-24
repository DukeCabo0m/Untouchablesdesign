import { useState, useEffect } from 'react';

export interface AttendedConcert {
  slug: string;
  venue: string;
  city: string;
  date: string;
  country: string;
}

const STORAGE_KEY = 'untouchables_attended_concerts';

export function useAttendedConcerts() {
  const [attendedConcerts, setAttendedConcerts] = useState<AttendedConcert[]>([]);

  // Charger les concerts depuis localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAttendedConcerts(JSON.parse(stored));
      } catch (error) {
        console.error('Erreur lors du chargement des concerts:', error);
      }
    }
  }, []);

  // Ajouter un concert
  const addConcert = (concert: AttendedConcert) => {
    setAttendedConcerts((prev) => {
      // Vérifier si le concert n'est pas déjà dans la liste
      if (prev.some((c) => c.slug === concert.slug)) {
        return prev;
      }
      const updated = [...prev, concert];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Retirer un concert
  const removeConcert = (slug: string) => {
    setAttendedConcerts((prev) => {
      const updated = prev.filter((c) => c.slug !== slug);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Vérifier si un concert est dans la liste
  const hasConcert = (slug: string) => {
    return attendedConcerts.some((c) => c.slug === slug);
  };

  // Toggle un concert (ajouter ou retirer)
  const toggleConcert = (concert: AttendedConcert) => {
    if (hasConcert(concert.slug)) {
      removeConcert(concert.slug);
    } else {
      addConcert(concert);
    }
  };

  return {
    attendedConcerts,
    addConcert,
    removeConcert,
    hasConcert,
    toggleConcert,
  };
}
