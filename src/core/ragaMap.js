import { NRAGAS_HALF, swarams } from "./constants";

const ragaNames = [
  "1. Kanakangi",
  "2. Ratnangi",
  "3. Ganamurti",
  "4. Vanaspati",
  "5. Manavati",
  "6. Tanarupi",
  "7. Senavati",
  "8. Hanumatodi",
  "9. Dhenuka",
  "10 Natakapriya",
  "11. Kokilapriya",
  "12. Rupavati",
  "13. Gayakapriya",
  "14. Vakulabharanam",
  "15. Mayamalavagaula",
  "16. Chakravakam",
  "17. Suryakantam",
  "18. Hatakambari",
  "19. Jhankaradhvani",
  "20. Natabhairavi",
  "21. Kiravani",
  "22. Kharaharapriya",
  "23. Gowrimanohari",
  "24. Varunapriya",
  "25. Mararanjani",
  "26. Charukesi",
  "27. Sarasangi",
  "28. Harikambhoji",
  "29. Dheera sankarabharanam",
  "30. Naganandini",
  "31. Yagapriya",
  "32. Raga vardhini",
  "33. Gangeyabhushani",
  "34. Vagadhesvari",
  "35. Soolini",
  "36. Chalanaatai",
  "37. Salagam",
  "38. Jalarnavam",
  "39. Jhalavarali",
  "40. Navaneetam",
  "41. Pavani",
  "42. Raghupriya",
  "43. Gavambodhi",
  "44. Bhavapriya",
  "45. Subhapantuvarali",
  "46. Shadvidhamargini",
  "47. Suvarnangi",
  "48. Divyamani",
  "49. Dhavalambari",
  "50. Namanarayani",
  "51. Kamavardhini",
  "52. Ramapriya",
  "53. Gamanasrama",
  "54. Visvambhari",
  "55. Syamalangi",
  "56. Shanmukhapriya",
  "57. Simhendra madhyama",
  "58. Hemavati",
  "59. Dharmavati",
  "60. Neetimati",
  "61. Kantamani",
  "62. Rishabhapriya",
  "63. Latangi",
  "64. Vachaspati",
  "65. Mechakalyani",
  "66. Chitrambari",
  "67. Sucharitra",
  "68. Jyotisvarupini",
  "69. Dhatuvardhini",
  "70. Nasika bhushani",
  "71. Kosalam",
  "72. Rasikapriya",
];

const saOffset = [0];
const riOffset = [1, 1, 1, 2, 2, 3]; // offset from root 0
const gaOffset = [2, 3, 4, 3, 4, 4];
const maOffset = [5, 6];
const paOffset = [7];
const daOffset = [8, 8, 8, 9, 9, 10];
const niOffset = [9, 10, 11, 10, 11, 11];

// Construct all Melakartha Raga Map
export const ragaMap = ragaNames.map((ragaName, index) => {
  const maSection = Math.floor(index / NRAGAS_HALF);
  const riGaSection = Math.floor((index % NRAGAS_HALF) / 6);
  const daNiSection = Math.floor(index % 6);
  const scale = [
    saOffset[0],
    riOffset[riGaSection],
    gaOffset[riGaSection],
    maOffset[maSection],
    paOffset[0],
    daOffset[daNiSection],
    niOffset[daNiSection],
  ];
  // A visual representation of the 12 notes
  const scaleLayout = new Array(12).fill(0).map((_note, index) => {
    const swaraIndex = scale.findIndex((noteIndex) => noteIndex === index);
    return swaraIndex < 0 ? "--" : swarams[swaraIndex];
  });

  return {
    name: ragaName,
    scale: scale,
    layout: scaleLayout.join(" "),
  };
});
