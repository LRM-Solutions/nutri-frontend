function generateColorByIndex(index, baseColor = "#24C35E") {
  // Converte a cor base para HSL
  const baseHex = baseColor.replace("#", "");
  const r = parseInt(baseHex.substr(0, 2), 16) / 255;
  const g = parseInt(baseHex.substr(2, 2), 16) / 255;
  const b = parseInt(baseHex.substr(4, 2), 16) / 255;

  // Converte RGB para HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Varia a matiz (30° por índice)
  h = (h + index * 0.0833) % 1; // 0.0833 ≈ 30°/360°

  // Converte HSL de volta para HEX
  const hueToRgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const rgb = [
    Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
    Math.round(hueToRgb(p, q, h) * 255),
    Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
  ];

  return `#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

export { generateColorByIndex };
