// Numéro du premier verset global pour chaque sourate (index = numéro de sourate)
// index 0 = inutilisé, index 1 = sourate 1 commence au verset global 1, etc.
const SOURATE_VERSE_START = [
  0, 1, 8, 294, 494, 670, 790, 955, 1161, 1236,
  1365, 1474, 1597, 1708, 1751, 1803, 1902, 2030, 2141, 2251,
  2349, 2484, 2596, 2674, 2792, 2856, 2933, 3160, 3253, 3341,
  3410, 3470, 3504, 3534, 3607, 3661, 3706, 3789, 3971, 4059,
  4134, 4219, 4273, 4326, 4415, 4474, 4511, 4546, 4584, 4613,
  4631, 4676, 4736, 4785, 4847, 4902, 4980, 5076, 5105, 5127,
  5151, 5164, 5178, 5189, 5200, 5218, 5230, 5242, 5272, 5324,
  5376, 5420, 5448, 5476, 5496, 5552, 5592, 5623, 5673, 5713,
  5759, 5801, 5830, 5849, 5885, 5910, 5932, 5949, 5968, 5994,
  6024, 6044, 6059, 6080, 6091, 6099, 6107, 6126, 6131, 6139,
  6147, 6158, 6169, 6177, 6180, 6189, 6194, 6198, 6205, 6208,
  6214, 6217, 6222, 6226, 6231,
];

const CDN_BASE = 'https://cdn.islamic.network/quran/audio/128/ar.alafasy';

export function getCdnAudioUrl(sourateNum: number, verseNum: number): string {
  if (sourateNum === 1000) return ''; // Ayat Al-Kursi = cas spécial
  const start = SOURATE_VERSE_START[sourateNum];
  if (!start) return '';
  return `${CDN_BASE}/${start + verseNum - 1}.mp3`;
}
