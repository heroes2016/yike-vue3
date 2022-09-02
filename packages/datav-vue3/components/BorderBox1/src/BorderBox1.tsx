import { defineComponent, renderSlot } from 'vue'
import autoResize from 'packages/datav-vue3/utils/autoResize'
import { deepClone, deepMerge } from 'packages/datav-vue3/utils'
import './index.less'

const BorderBox1Props = {
  color: {
    type: Array,
    default: () => ([]),
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
}

const BorderBox1 = defineComponent({
  props: BorderBox1Props,
  setup(props) {
    const borderBox1 = ref<HTMLElement | null>(null)

    const state = reactive({
      border: ['left-top', 'right-top', 'left-bottom', 'right-bottom'],
      defaultColor: ['#4fd2dd', '#235fa7'],
      mergedColor: [],
    })

    const mergeColor = () => {
      state.mergedColor = deepMerge(deepClone(state.defaultColor, true), props.color || [])
    }

    const { width, height, initWH } = autoResize(borderBox1)

    watch(() => props.color, () => {
      mergeColor()
    })

    onMounted(() => {
      mergeColor()
    })

    return {
      width,
      height,
      initWH,
      state,
      borderBox1,
    }
  },
  render() {
    const { backgroundColor, width, height, state, $slots } = this
    return (
      <div ref="borderBox1" class="dv-border-box-1">
        <svg class="dv-border" width={width} height={height}>
          <polygon
            fill={backgroundColor} points={`10, 27 10, ${height - 27} 13, ${height - 24} 13, ${height - 21} 24, ${height - 11}
      38, ${height - 11} 41, ${height - 8} 73, ${height - 8} 75, ${height - 10} 81, ${height - 10}
      85, ${height - 6} ${width - 85}, ${height - 6} ${width - 81}, ${height - 10} ${width - 75}, ${height - 10}
      ${width - 73}, ${height - 8} ${width - 41}, ${height - 8} ${width - 38}, ${height - 11}
      ${width - 10}, ${height - 27} ${width - 10}, 27 ${width - 13}, 25 ${width - 13}, 21
      ${width - 24}, 11 ${width - 38}, 11 ${width - 41}, 8 ${width - 73}, 8 ${width - 75}, 10
      ${width - 81}, 10 ${width - 85}, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`}
          />
        </svg>

        {
          state.border.map((item) => {
            return (
              <svg key={item} width="150px" height="150px" class={`${item} dv-border`}>
      <polygon
        fill={state.mergedColor[0]}
        points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
      >
        <animate
          attributeName="fill"
          values={`${state.mergedColor[0]};${state.mergedColor[1]};${state.mergedColor[0]}`} dur="0.5s" begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon fill={state.mergedColor[1]} points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8">
        <animate
          attributeName="fill"
          values={`${state.mergedColor[1]};${state.mergedColor[0]};${state.mergedColor[1]}`} dur="0.5s" begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        fill={state.mergedColor[0]}
        points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"
      >
        <animate
          attributeName="fill" values={`${state.mergedColor[0]};${state.mergedColor[1]};transparent`} dur="1s"
          begin="0s" repeatCount="indefinite"
        />
      </polygon>
    </svg>
            )
          })
        }

    <div class="border-box-content">
      { renderSlot($slots, 'default') }
    </div>
      </div>
    )
  },
})

export default BorderBox1
