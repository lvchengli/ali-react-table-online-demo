const cdnLinks = {
  ncov2019Data: 'https://gw.alipayobjects.com/os/basement_prod/8e44b543-0764-411f-adfc-0dae716ef96a.csv',
}

let ncov2019Cache = null
export function getNCoV2019Data() {
  if (!ncov2019Cache) {
    ncov2019Cache = fetch(cdnLinks.ncov2019Data)
      .then((res) => res.text())
      .then((csvString) => {
        // 手动解析 csv，鲁棒性非常差
        const allStrRows = csvString.split('\n')
        const head = allStrRows[0]
        const body = allStrRows.slice(1)
        const keys = head.split(',')
        const result = []
        for (const strRow of body) {
          if (strRow === '') {
            continue
          }
          const values = strRow.split(',')
          const row = {}
          keys.forEach((k, i) => {
            row[k] = values[i]
          })
          result.push(row)
        }
        return result
      })
  }
  return ncov2019Cache
}
