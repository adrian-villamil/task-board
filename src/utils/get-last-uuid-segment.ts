export const getLastUUIDSegment = (uuid: string): string => {
  const segments = uuid.split('-');
  return segments[segments.length - 1];
};