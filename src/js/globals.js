import { ElLoading, ElMessageBox } from 'element-plus'

//글로벌 변수 사용
export default {
  install(Vue) {
    Vue.config.globalProperties.$successMessage = function (message) {
      this.$message({ message: message, type: 'success' })
    }

    Vue.config.globalProperties.$errorMessage = function (message) {
      this.$message({ message: message, type: 'error' })
    }

    Vue.config.globalProperties.$cmmLoading = function (message) {
      let loadingMsg = '처리 중...'
      if (message) {
        loadingMsg = message
      }

      return ElLoading.service({
        lock: true,
        text: loadingMsg,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }

    Vue.config.globalProperties.$confirm = function (message, title, isHtml) {
      return ElMessageBox.confirm(message, title ?? '', {
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        dangerouslyUseHTMLString: isHtml ?? false,
      })
    }
  },
}
