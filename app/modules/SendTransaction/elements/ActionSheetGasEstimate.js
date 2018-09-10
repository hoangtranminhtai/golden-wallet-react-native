import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import AppStyle from '../../../commons/AppStyle'
import MainStore from '../../../AppStores/MainStore'
import ActionSheetCustom from '../../../components/elements/ActionSheetCustom'

export default class ActionSheetGasEstimate extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    address: PropTypes.string,
    onPress: PropTypes.func
  }
  static defaultProps = {
    name: '',
    address: '',
    onPress: () => { }
  }

  _onCancelAction = () => {
    this.actionSheet.hide()
  }

  _onPressAction = (gasPrice, adj) => {
    MainStore.sendTransaction.confirmStore.setGasPrice(gasPrice)
    MainStore.sendTransaction.confirmStore.validateAmount()
    MainStore.sendTransaction.confirmStore.setAdjust(adj)
    MainStore.sendTransaction.confirmStore.actionSheet.hide()
  }

  render() {
    const { gasPriceEstimate } = MainStore.appState
    return (
      <ActionSheetCustom ref={(ref) => { MainStore.sendTransaction.confirmStore.actionSheet = ref }} onCancel={this._onCancelAction}>
        <View style={[styles.actionSheetItem, { borderTopLeftRadius: 5, borderTopRightRadius: 5, height: 60 }]}>
          <Text style={[styles.actionSheetText, { fontSize: 12, color: '#8A8D97' }]}>Your transaction will process faster with a higher</Text>
          <Text style={[styles.actionSheetText, { fontSize: 12, color: '#8A8D97' }]}>gas price.</Text>
        </View>
        <TouchableOpacity
          style={styles.actionSheetItem}
          onPress={() => this._onPressAction(gasPriceEstimate.slow, 'Slow')}
        >
          <Text style={styles.actionSheetText}>{`Slow (<30 minutes) ${gasPriceEstimate.slow} Gwei`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionSheetItem}
          onPress={() => this._onPressAction(gasPriceEstimate.standard, 'Standard')}
        >
          <Text style={styles.actionSheetText}>{`Standard (<5 minutes) ${gasPriceEstimate.standard} Gwei`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionSheetItem, { borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderBottomWidth: 0 }]}
          onPress={() => this._onPressAction(gasPriceEstimate.fast, 'Fast')}
        >
          <Text style={styles.actionSheetText}>{`Fast (<2 minutes) ${gasPriceEstimate.fast} Gwei`}</Text>
        </TouchableOpacity>
      </ActionSheetCustom>
    )
  }
}

const styles = StyleSheet.create({
  actionSheetItem: {
    height: 55,
    backgroundColor: AppStyle.backgroundDarkBlue,
    borderBottomWidth: 1,
    borderColor: AppStyle.borderLinesSetting,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionSheetText: {
    fontSize: 16,
    color: '#4A90E2',
    fontFamily: 'OpenSans-Semibold'
  }
})
