export const parseVideoDuration = (duration: string): string => {
    const durationParts: string[] = duration // Obtenenmos string de la duracion del video
      .replace("PT", "")
      .replace("H", ":") // Hora
      .replace("M", ":") // Minutos
      .replace("S", "") // Segundos
      .split(":"); // Dividimos la cadena string de duracion
  
    if (durationParts.length === 3) {
      return `${durationParts[0]}:${
        parseInt(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]
      }:${
        parseInt(durationParts[2]) < 9 ? `0${durationParts[2]}` : durationParts[2]
      }`;
    }
  
    if (durationParts.length === 2) {
      return `${durationParts[0]}:${
        parseInt(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]
      }`;
    }
  
    if (durationParts.length === 1) {
      return `0:${
        parseInt(durationParts[0]) < 9 ? `0${durationParts[0]}` : durationParts[0]
      }`;
    }
  
    return "";
  };
  