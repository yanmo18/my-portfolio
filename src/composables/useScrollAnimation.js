/**
 * 滚动动画检测 Composable
 * 使用 Intersection Observer API 检测元素是否进入视口
 */
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 创建滚动动画状态
 * @param {object} options - 配置选项
 * @param {string} options.rootMargin - 观察器根元素边距，默认 '0px'
 * @param {number} options.threshold - 交叉比例阈值，默认 0.1
 * @returns {object} 动画状态和方法
 */
export function useScrollAnimation(options = {}) {
  const { rootMargin = '0px', threshold = 0.1 } = options

  const isVisible = ref(false)
  const hasAnimated = ref(false)
  let observer = null

  const observe = (el) => {
    if (!el || hasAnimated.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            hasAnimated.value = true
            // 动画触发后停止观察
            if (observer && entry.target) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { rootMargin, threshold }
    )

    observer.observe(el)
  }

  const disconnect = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onUnmounted(() => {
    disconnect()
  })

  return {
    isVisible,
    hasAnimated,
    observe,
    disconnect
  }
}

/**
 * 批量元素滚动动画
 */
export function useBatchScrollAnimation(count = 1, options = {}) {
  const { rootMargin = '-50px', threshold = 0.1, staggerDelay = 100 } = options

  const visibleItems = ref(new Array(count).fill(false).map(() => ({ isVisible: false, hasAnimated: false })))
  let observers = []

  const observeItem = (el, index) => {
    if (!el || visibleItems.value[index]?.hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              visibleItems.value[index] = { isVisible: true, hasAnimated: true }
            }, index * staggerDelay)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold }
    )

    observers.push(observer)
    observer.observe(el)
  }

  const disconnectAll = () => {
    observers.forEach((obs) => obs.disconnect())
    observers = []
  }

  onUnmounted(() => {
    disconnectAll()
  })

  return {
    visibleItems,
    observeItem,
    disconnectAll
  }
}

/**
 * 鼠标移动跟踪
 */
export function useMouseFollow() {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const isInViewport = ref(false)

  const handleMouseMove = (e) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
    isInViewport.value = true
  }

  const handleMouseLeave = () => {
    isInViewport.value = false
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseleave', handleMouseLeave)
  })

  return {
    mouseX,
    mouseY,
    isInViewport
  }
}
