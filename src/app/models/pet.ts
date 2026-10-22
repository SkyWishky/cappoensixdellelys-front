export type Species = 'CAT' | 'DOG' | 'DUCK' | 'DRAGON' | 'BLOB';

export type PetAction = 'feed' | 'play' | 'sleep';

export interface Pet {
  id: number;
  name: string;
  species: Species;
  fullness: number;
  happiness: number;
  energy: number;
  alive: boolean;
  createdAt: string;
  diedAt: string | null;
}

export const SPECIES_EMOJI: Record<Species, string> = {
  CAT: '🐱',
  DOG: '🐶',
  DUCK: '🦆',
  DRAGON: '🐉',
  BLOB: '🫠',
};

export function mood(pet: Pet): string {
  if (!pet.alive) return '🪦';
  const lowest = Math.min(pet.fullness, pet.happiness, pet.energy);
  if (lowest > 60) return '😄';
  if (lowest > 30) return '😐';
  return '😱';
}
