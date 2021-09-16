import { mergeReconciler, mergeInternalComponents, processApis } from '@tarojs/shared'
import { components } from './components'
import { noPromiseApis, needPromiseApis } from './apis-list'

const hostConfig = {
  initNativeApi (taro) {
    const global = taro.miniGlobal
    processApis(taro, global, {
      noPromiseApis,
      needPromiseApis,
      isOnlyPromisify: true
    })
  }
}


mergeReconciler(hostConfig)
mergeInternalComponents(components)
