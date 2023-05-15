export const shrtedNum = (num: number) => {
  const bubu = ['', 'тыс', 'млн', 'млрд']

  const thousands = Math.floor((('' + num).length - 1) / 3)

  const coef = 1000 ** thousands

  return (num / coef).toFixed(1) + ' ' + bubu[thousands]
}
