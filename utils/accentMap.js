const accentMap = {
  a: ['ā', 'á', 'ǎ', 'à', 'a'],
  e: ['ē', 'é', 'ě', 'è', 'e'],
  o: ['ō', 'ó', 'ǒ', 'ò', 'o'],
  i: ['ī', 'í', 'ǐ', 'ì', 'i'],
  u: ['ū', 'ú', 'ǔ', 'ù', 'u'],
  v: ['ü', 'ǘ', 'ǚ', 'ǜ', 'v'],
  n: ['ń', 'ň', 'n'],
  m: ['', 'm']
}

export function removeAccent (accent) {
  const index = Object.values(accentMap).findIndex(accentArr => accentArr.includes(accent))
  return Object.keys(accentMap)[index]
}

export default accentMap
