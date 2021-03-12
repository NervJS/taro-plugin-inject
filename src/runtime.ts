import { defaultReconciler, mergeReconciler, mergeInternalComponents, processApis } from '@tarojs/shared'
import { components } from './components'
import { noPromiseApis, needPromiseApis } from './apis-list'

const originFn = (defaultReconciler as any).initNativeApi

const hostConfig = {
  initNativeApi (taro) {
    originFn?.(taro)
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
