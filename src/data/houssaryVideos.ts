// Vidéos de récitation complète par sourate — Sheikh Mahmoud Khalil Al-Houssary (الحصري)
// Source : chaîne officielle @HosariOfficial
// Compléter avec d'autres IDs au fur et à mesure

const HOUSSARY_VIDEO_IDS: Record<number, string> = {
  99:  'U7AzURa-R8g',   // Az-Zalzalah
  100: 'EL4SxRS34II',   // Al-Adiyat
  101: 'sNH1X_ddtfY',   // Al-Qari'a
  102: 'egqBWZTl_Ys',   // At-Takathur
  103: 'GPUuRSlJPfQ',   // Al-Asr (vidéo groupée 103-105)
  104: 'xdGmMgcD1es',   // Al-Humazah
  105: 'pVmc5cu4rKY',   // Al-Fil
  106: 'UiAKPVQvks4',   // Quraysh (vidéo groupée 106-108)
  107: 'UiAKPVQvks4',   // Al-Ma'un (vidéo groupée 106-108)
  108: 'eNNTGCpu5nQ',   // Al-Kawthar
  109: 'Rom_n_tRClA',   // Al-Kafirun (vidéo groupée 109-111)
  110: 'Rom_n_tRClA',   // An-Nasr (vidéo groupée 109-111)
  111: 'qi4DCze83F0',   // Al-Masad
  112: '_vwzaiimE7s',   // Al-Ikhlas
  113: '4SpKnOIPjzU',   // Al-Falaq
  114: 'CZdDLi8niIQ',   // An-Nas
};

export function getHoussaryEmbedUrl(sourateNumber: number): string | null {
  const videoId = HOUSSARY_VIDEO_IDS[sourateNumber];
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}
