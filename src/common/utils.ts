import { App } from './types';

export const getTargetValue = (value: { currentTarget: { value: string } }) =>
  value.currentTarget.value;

export const shuffleArray = <T>(arr: T[]): T[] => {
  const shuffled = [...arr]; // Copy the array to avoid mutating the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

export const splitIntoChunks =
  (n: number) =>
  <T>(array: T[]): T[][] => {
    // Calculate the size of each chunk
    const chunkSize = Math.ceil(array.length / n);

    // Create an array to hold the chunks
    const chunks: T[][] = [];

    for (let i = 0; i < n; i++) {
      // Slice the array to create chunks and push them into the chunks array
      const chunk = array.slice(i * chunkSize, i * chunkSize + chunkSize);
      if (chunk.length > 0) {
        chunks.push(chunk);
      }
    }

    return chunks;
  };

export function updateElementInArray<T>(
  array: T[],
  updater: (element: T) => T,
  predicate: (element: T) => boolean,
): T[] {
  return array.map(element => {
    // Check if the current element matches the predicate
    if (predicate(element)) {
      // Update the element using the updater function if it matches
      return updater(element);
    }
    // Return the original element if it doesn't match
    return element;
  });
}

export const getPlayers = (state: App) =>
  'players' in state
    ? state.players
    : 'controlPlayer' in state && 'otherPlayers' in state
      ? [state.controlPlayer, ...state.otherPlayers]
      : [];

export const getPlayersFull = (
  state: Exclude<App, { kind: 'waitingLobby' } | { kind: 'pickingPeriod' }>,
) =>
  'players' in state
    ? state.players
    : 'controlPlayer' in state && 'otherPlayers' in state
      ? [state.controlPlayer, ...state.otherPlayers]
      : [];

export const namesToListStr = (names: string[]) => {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  let list = `${names[names.length - 2]}${names.length === 2 ? '' : ','} and ${names[names.length - 1]}`;
  for (let i = names.length - 3; i >= 0; i--) {
    list = `${names[i]}, ${list}`;
  }
  return list;
};
