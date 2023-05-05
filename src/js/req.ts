/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

const noop = () => {}
const NO_PARAMS = {}
const NO_HEADERS = {}
const OK_200 = [200]

export function request({
   method = 'GET',
   url = '../pages/test.html',
   params = NO_PARAMS,
   requestType = 'json',
   responseType = 'json',
   headers = NO_HEADERS,
   body,
   checkStatus = false,
   onSuccess = noop,
   onError = noop,
   okResponses = OK_200,
}: {
   method?: string
   url?: string
   params?: Record<string, any>
   requestType?: string
   responseType?: XMLHttpRequestResponseType
   headers?: Record<string, string>
   body?: any
   checkStatus?: boolean
   onSuccess?: (response: any) => void
   onError?: (error: any) => void
   okResponses?: number[]
}) {
   const req = new XMLHttpRequest()
   const urlParams = new URLSearchParams(params)
   const queryString = urlParams.toString()
   req.open(method, url + (queryString ? `?${queryString}` : ''))
   Object.keys(headers).forEach((el) => {
      req.setRequestHeader(el, headers[el])
   })
   req.responseType = responseType
   req.onload = () => {

   req.onload = (e) => {
      const target = e.target

      if (checkStatus && req.response.status != 'ok') {
         onError(req.response)
         return
      }
      if (!okResponses.includes(req.status)) {
         onError(req.response)
         return
      }

      onSuccess(req.response)
   }
   req.onerror = () => {
      onError(req.response)
   }
   let dataBody = body
   if (requestType === 'urlencoded') {
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      const bodyParams = new URLSearchParams(body)
      dataBody = bodyParams.toString()
   }
   if (requestType === 'json') {
      req.setRequestHeader('Content-type', 'application/json')
      dataBody = JSON.stringify(body)
   }
   req.send(dataBody)
}
