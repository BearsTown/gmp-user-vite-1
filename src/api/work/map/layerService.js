const layerAPI = {
  getAll: () => {
    return new Promise((resolve) => {
      resolve({
        data: [
          {
            buldName: 'test1',
            layerKey: 'D4A8C9B0-E42E-555B-F06F-840E6D558B8D',
            layerName: 'TEST_DEVELOP_AREA',
          },
          {
            buldName: 'test2',
            layerKey: '5B1AC435-395B-E831-19E6-A7CE51787C45',
            layerName: 'TEST_SCCO_EMD,PGMS_PARK_PO',
          },
          {
            buldName: 'test3',
            layerKey: 'E9CACF3D-FC89-E568-6C8F-CAE41644A83A',
            layerName: 'GMP_P1_B2_LT_C_02',
          },
          {
            buldName: 'pgms_plus_upis_gp',
            layerKey: 'B250C4FA-9B91-C4DA-CB05-692E4BF12650',
            layerName: 'UPIS_C_UQ114,UPIS_C_UQ113,UPIS_C_UQ112,UPIS_C_UQ111',
          },
          {
            buldName: 'DSTPLAN_01',
            layerKey: 'B1003289-17EB-03E8-C717-187CCDDAE373',
            layerName:
              'GMP_P1_B3_DSTPLAN_01,GMP_P1_B3_DSTPLAN_02,GMP_P1_B3_DSTPLAN_03,GMP_P1_B3_DSTPLAN_04,GMP_P1_B3_DSTPLAN_05,GMP_P1_B3_DSTPLAN_06,GMP_P1_B3_DSTPLAN_07,GMP_P1_B3_DSTPLAN_08,GMP_P1_B3_DSTPLAN_09,GMP_P1_B3_DSTPLAN_10,GMP_P1_B3_DSTPLAN_11,GMP_P1_B3_DSTPLAN_12,GMP_P1_B3_DSTPLAN_13,GMP_P1_B3_DSTPLAN_14,GMP_P1_B3_DSTPLAN_15,GMP_P1_B3_DSTPLAN_16,GMP_P1_B3_DSTPLAN_17,GMP_P1_B3_DSTPLAN_18,GMP_P1_B3_DSTPLAN_19,GMP_P1_B3_DSTPLAN_20,GMP_P1_B3_DSTPLAN_21,GMP_P1_B3_DSTPLAN_22,GMP_P1_B3_DSTPLAN_23,GMP_P1_B3_DSTPLAN_24,GMP_P1_B3_DSTPLAN_25,GMP_P1_B3_DSTPLAN_26,GMP_P1_B3_DSTPLAN_27',
          },
          {
            buldName: 'SPFC_01',
            layerKey: '93AA112F-BC95-8747-0DD3-D94FE9D24EA4',
            layerName:
              'GMP_P1_B4_SPFC_01,GMP_P1_B4_SPFC_02,GMP_P1_B4_SPFC_03,GMP_P1_B4_SPFC_04,GMP_P1_B4_SPFC_05',
          },
        ],
      })
    })
  },
}
export { layerAPI }
