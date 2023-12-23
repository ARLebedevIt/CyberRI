export const useFutureDate = () => {
  let date = new Date()
  let dateResult =
    date.getDate() +
    ' / ' +
    (date.getMonth() + 1) +
    ' / ' +
    (date.getFullYear() + 100) +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  return dateResult
}
