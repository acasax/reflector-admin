import _ from 'lodash'


export const guid = () => {
  return `${_.random(1000, 100000)}-${_.random(1000, 100000)}`
}

const _UOMConst = ['', 'kg', 'l']

export const getLabelItemUom = (uom = 0) => _UOMConst[uom] || ''

export const formatPrice = (value: (number | string)): string => {
  const valNumber = typeof value === 'number' ? value : Number(value)
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  return formatter.format(valNumber)
}

export const formatQuantity = (value: (number | string), minimumFractionDigits = 3): string => {
  const valNumber = typeof value === 'number' ? value : Number(value)
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits: 3
  })
  return formatter.format(valNumber)
}

export const formatTax = (value: (number | string), minimumFractionDigits = 0, maximumFractionDigits = 2): string => {
  const valNumber = typeof value === 'number' ? value : Number(value)
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  })
  return formatter.format(valNumber)
}


