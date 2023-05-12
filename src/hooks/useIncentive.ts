import { computed } from 'vue'

export const useIncentive = (mitigation) => {
  const formulaRef = computed({
    get: () => {
      return getFormula('name').replaceAll('*', 'x')
    },
    set: (state) => {},
  })

  const calculateRef = computed({
    get: () => {
      const formula = getFormula('value')
      const value = new Function('return ' + formula)()
      return Number(value.toFixed(3))
    },
    set: (state) => {},
  })

  function getFormula(column) {
    let formula = mitigation.formula
    Object.keys(mitigation.info).forEach((key) => {
      formula = formula.replace(`{${key}}`, mitigation.info[key][column])
    })
    return formula
  }

  return {
    formulaRef,
    calculateRef,
  }
}
