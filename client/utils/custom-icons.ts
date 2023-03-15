import { h } from 'vue'
import type { IconSet, IconAliases, IconProps } from 'vuetify'
import { Icon } from '#components'


const custom: IconSet = {
  component: (props: IconProps) => h(Icon, {name: props.icon}),
}

export { custom }