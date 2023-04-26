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
   ok_responses = OK_200,
}) {
   const req = new XMLHttpRequest()
   const urlParams = new URLSearchParams(params)
   const queryString = urlParams.toString()
   req.open(method, url + (queryString ? `?${queryString}` : ''))
   Object.keys(headers).forEach((el) => {
      req.setRequestHeader(el, headers[el])
   })
   req.responseType = responseType
   req.onload = (e) => {
      const target = e.target
      if (checkStatus && target.response.status != 'ok') {
         onError(target.response)
         return
      }
      if (!ok_responses.includes(target.status)) {
         onError(target.response)
         return
      }

      onSuccess(target.response)
   }
   req.onerror = () => {
      onError()
   }
   let dataBody = body
   if (requestType === 'urlencoded') {
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      const body_params = new URLSearchParams(body)
      dataBody = body_params.toString()
   }
   if (requestType === 'json') {
      req.setRequestHeader('Content-type', 'application/json')
      dataBody = JSON.stringify(body)
   }
   req.send(dataBody)
}
