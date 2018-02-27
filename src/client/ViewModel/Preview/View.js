/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2018/2/11
 * @description:
 */
import * as React from 'react'
import { stateless } from 'react-mobx-vm'
import c from 'classname'

export default stateless((local, props) => (
  <div className={c('telescope', local.contentType === 'md' ? 'markdown-body' : 'code-body markdown-body' )}
       dangerouslySetInnerHTML={{ __html: local.html }}
  />
))
