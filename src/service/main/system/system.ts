import yRequest from '../../index'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return yRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return yRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return yRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return yRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
