export default {
  getIncentiveList() {
    return new Promise((resolve, reject) => {
      resolve({
        data: [
          [
            {
              open: false,
              title: '자연녹지지역',
              baseRatio: 0.2,
              data: [
                {
                  key: 'key-incentive-1',
                  title: '계획유도 인센티브',
                  type: '기반시설계획',
                  mitigation: {
                    category: '주민공동시설 조성',
                    formula: '{p1}*({p2}/{p3})*{r1}',
                    info: {
                      p1: {
                        name: '기준건폐율',
                        value: 0.2,
                      },
                      p2: {
                        name: '기반시설면적',
                        value: 100,
                      },
                      p3: {
                        name: '대지면적',
                        value: 1500,
                      },
                      r1: {
                        name: '2.4',
                        value: 2.4,
                      },
                    },
                  },
                },
              ],
            },
            {
              open: false,
              title: '생산녹지지역',
              baseRatio: 0.2,
              data: [],
            },
            {
              open: true,
              title: '계획관리지역',
              baseRatio: 0.4,
              data: [
                {
                  key: 'key-incentive-2',
                  title: '계획유도 인센티브',
                  type: '기반시설계획',
                  mitigation: {
                    category: '도로개설',
                    formula: '{p1}*({p2}/{p3})*{r1}',
                    info: {
                      p1: {
                        name: '기준건폐율',
                        value: 0.4,
                      },
                      p2: {
                        name: '기반시설면적',
                        value: 50,
                      },
                      p3: {
                        name: '대지면적',
                        value: 1000,
                      },
                      r1: {
                        name: '1.2',
                        value: 1.2,
                      },
                    },
                  },
                },
                {
                  key: 'key-incentive-3',
                  title: '계획유도 인센티브',
                  type: '기반시설계획',
                  mitigation: {
                    category: '공동개발',
                    formula: '{r1}',
                    info: {
                      r1: {
                        name: '3%',
                        value: 0.03,
                      },
                    },
                  },
                },
                {
                  key: 'key-incentive-4',
                  title: '친환경 인센티브',
                  type: '건축물 배치 및 형태',
                  mitigation: {
                    category: '전면공지 확보',
                    formula: '{p1}*({p2}/{p3})*{r1}',
                    info: {
                      p1: {
                        name: '기준건폐율',
                        value: 0.4,
                      },
                      p2: {
                        name: '기반시설면적',
                        value: 50,
                      },
                      p3: {
                        name: '대지면적',
                        value: 1000,
                      },
                      r1: {
                        name: '0.25',
                        value: 0.25,
                      },
                    },
                  },
                },
              ],
            },
            {
              open: false,
              title: '생산관리지역',
              baseRatio: 0.2,
              data: [
                {
                  key: 'key-incentive-5',
                  title: '친환경 인센티브',
                  type: '환경관리계획',
                  mitigation: {
                    category: '주차대수 확보',
                    formula: '{r1}',
                    info: {
                      r1: {
                        name: '1%',
                        value: 0.01,
                      },
                    },
                  },
                },
              ],
            },
            {
              open: false,
              title: '농림지역',
              baseRatio: 0.2,
              data: [],
            },
          ],
          [
            {
              open: false,
              title: '자연녹지지역',
              baseRatio: 1.0,
              data: [],
            },
            {
              open: false,
              title: '생산녹지지역',
              baseRatio: 0.8,
              data: [],
            },
            {
              open: false,
              title: '계획관리지역',
              baseRatio: 1.0,
              data: [
                {
                  key: 'key-incentive-6',
                  title: '친환경 인센티브',
                  type: '건축물 배치 및 형태',
                  mitigation: {
                    category: '전면공지 확보',
                    formula: '{p1}*({p2}/{p3})*{r1}',
                    info: {
                      p1: {
                        name: '기준용적률',
                        value: 1.0,
                      },
                      p2: {
                        name: '전면공지면적',
                        value: 50,
                      },
                      p3: {
                        name: '대지면적',
                        value: 1000,
                      },
                      r1: {
                        name: '0.4',
                        value: 0.4,
                      },
                    },
                  },
                },
              ],
            },
            {
              open: false,
              title: '생산관리지역',
              baseRatio: 0.8,
              data: [],
            },
            {
              open: false,
              title: '농림지역',
              baseRatio: 0.5,
              data: [],
            },
          ],
        ],
      })
    })
  },
}
