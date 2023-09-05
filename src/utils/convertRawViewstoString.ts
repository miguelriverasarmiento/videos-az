export const convertRawViewstoString = (labelValue: String, isSub = false): string => {
   // Tenemos esto para convertir vistas sin procesar en cadenas
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(0) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(0) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(isSub ? 2 : 0) + "K"
      : Math.abs(Number(labelValue)).toString();
  }; // Convierte las vistas sin procesar en miles de millones de millones y k vista.
  