// 원을 물결(sine) 모양으로 변형해 복슬복슬한 털뭉치 실루엣 경로를 만든다.
export function wavyBlobPath(cx: number, cy: number, r: number, bumps: number, amp: number, points = 48): string {
  const pts: [number, number][] = []
  for (let i = 0; i < points; i++) {
    const t = (i / points) * Math.PI * 2
    const rr = r + amp * Math.sin(t * bumps)
    pts.push([cx + rr * Math.cos(t), cy + rr * Math.sin(t)])
  }
  const n = pts.length
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} `
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `
  }
  return d + 'Z'
}
