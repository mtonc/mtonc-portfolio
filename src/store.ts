import { atom , computed}  from 'nanostores';

interface ColorSet {
  text: string;
  bg: string;
}

const sets:Record<string, ColorSet> = {
  blue: {
    text: 'text-sky-500',
    bg: 'bg-sky-500'
  },
  orange: {
    text: 'text-orange-400',
    bg: 'bg-orange-400'
  },
  pink: {
    text: 'text-pink-500',
    bg: 'bg-pink-500'
  },
  green: {
    text: 'text-lime-400',
    bg: 'bg-lime-400'
  }
}

const initialColor = 'green';

export const $activeColor = atom(initialColor);

export const $activeSet = computed($activeColor, c => sets[c]);
