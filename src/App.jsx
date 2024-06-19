import React, { useEffect, useState } from 'react'

function ColorGradient() {
  const [baseColor, setBaseColor] = useState('#42a4ff')
  const [colorName, setColorName] = useState('primary')
  const [range, setRange] = useState(7)
  function hexToHSL(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255
    let g = parseInt(hex.slice(3, 5), 16) / 255
    let b = parseInt(hex.slice(5, 7), 16) / 255

    let max = Math.max(r, g, b)
    let min = Math.min(r, g, b)
    let h,
      s,
      l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      let d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
  }

  function hslToHex(h, s, l) {
    s /= 100
    l /= 100
    let c = (1 - Math.abs(2 * l - 1)) * s
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    let m = l - c / 2
    let r = 0,
      g = 0,
      b = 0

    if (0 <= h && h < 60) {
      r = c
      g = x
      b = 0
    } else if (60 <= h && h < 120) {
      r = x
      g = c
      b = 0
    } else if (120 <= h && h < 180) {
      r = 0
      g = c
      b = x
    } else if (180 <= h && h < 240) {
      r = 0
      g = x
      b = c
    } else if (240 <= h && h < 300) {
      r = x
      g = 0
      b = c
    } else if (300 <= h && h < 360) {
      r = c
      g = 0
      b = x
    }

    r = Math.round((r + m) * 255)
      .toString(16)
      .padStart(2, '0')
    g = Math.round((g + m) * 255)
      .toString(16)
      .padStart(2, '0')
    b = Math.round((b + m) * 255)
      .toString(16)
      .padStart(2, '0')

    return `#${r}${g}${b}`
  }

  function generateGradientColors(baseHex) {
    const baseHSL = hexToHSL(baseHex)
    const colors = {}

    for (let i = 1; i <= 10; i++) {
      const step = (5 - i) * range // Ajustamos la luminosidad
      const newL = Math.max(0, Math.min(100, baseHSL[2] + step))
      colors[`${colorName}-${i}00`] = hslToHex(baseHSL[0], baseHSL[1], newL)
    }

    return colors
  }

  const [gradientColors, setGradientColors] = useState({})

  useEffect(() => {
    setGradientColors(generateGradientColors(baseColor))
  }, [baseColor, colorName, range])

  return (
    <>
      <main className='color-wrapper'>
        {Object.entries(gradientColors).map(([key, value]) => (
          <p className='color-row' key={key} style={{ backgroundColor: value }}>
            {key}: {value}
          </p>
        ))}
      </main>

      <footer style={{ backgroundColor: gradientColors.primary - 1000 }}>
        <div className='color-picker-ctn'>
          <input
            type='text'
            style={{ backgroundColor: baseColor }}
            className='color-input'
            value={baseColor}
            onChange={(e) => setBaseColor(`${e.target.value}`)}
          />
          <input
            className='color-picker'
            type='color'
            onChange={(e) => setBaseColor(`${e.target.value}`)}
            value={baseColor}
          />
        </div>
        <div className='range-ctn'>
          <p>Range {range}</p>
          <input
            className='range'
            type='range'
            min={3}
            max={10}
            value={range}
            onChange={(e) => setRange(e.target.value)}
          />
        </div>

        <input
          className='color-input'
          type='text'
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
        />
      </footer>
    </>
  )
}

export default ColorGradient
