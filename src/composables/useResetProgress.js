/**
 * 重置学习进度（带二次确认），侧边栏与顶栏共用。
 */
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProgressStore } from '../stores/progress.js'

export function useResetProgress() {
  const store = useProgressStore()

  return async function resetWithConfirm() {
    try {
      await ElMessageBox.confirm(
        '将清空已完成章节、自测成绩、实战步骤与学习时长（主题设置会保留）。此操作不可撤销。',
        '重置学习进度',
        { confirmButtonText: '确认重置', cancelButtonText: '取消', type: 'warning' },
      )
    } catch {
      return false
    }
    store.resetProgress()
    ElMessage({ message: '学习进度已重置', type: 'success' })
    return true
  }
}
