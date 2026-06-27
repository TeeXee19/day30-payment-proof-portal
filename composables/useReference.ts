export const useReference = () => {
  const generateReference = () => {
    const date = new Date()
    const stamp = date.toISOString().slice(0, 10).replaceAll('-', '')
    const random = Math.random().toString(36).slice(2, 8).toUpperCase()
    return `MDB-${stamp}-${random}`
  }
  return { generateReference }
}
