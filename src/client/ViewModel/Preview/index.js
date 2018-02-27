/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import { Root, observable, bindView } from 'react-mobx-vm'
import View from './View'

@bindView(View)
export default class Store extends Root {
  @observable html = ''
  @observable contentType = 'md'
}
