// 공통 API 호출 함수
export const useApi = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options)
  return await response.json()
}
