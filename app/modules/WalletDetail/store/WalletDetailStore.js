import { observable, action, computed } from 'mobx'
import MainStore from '../../../AppStores/MainStore'
import chunk from 'lodash.chunk'

class WalletDetailStore {
  @observable.ref list = []
  @observable page = 0
  @computed get getDataTokens() {
    return MainStore.appState.selectedWallet.tokens || []
  }
  @computed get getChunkDataTokens() {
    return chunk(this.getDataTokens, 6) || []
  }

  @action nextPage() {
    if (this.page < this.getChunkDataTokens.length) this.page++
  }

  @computed get getList() {
    const chunkData = this.getChunkDataTokens
    this.list = chunkData[0] || []
    if (this.page == 0 && chunkData.length == 1) return this.list
    return {
      ...this.list,
      ...chunkData[this.page]
    }
  }
}

export default new WalletDetailStore()
