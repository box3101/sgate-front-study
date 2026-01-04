// POST /api/kpi/save - KPI 저장
  import { kpiList } from '~/server/data'  // 가상 DB

  export default defineEventHandler(async (event) => {

    // 1. 프론트에서 보낸 body 받기
    const body = await readBody(event)  // "kpiNm=신규KPI&weight=30&year=2024"

    // 2. 파라미터 파싱 (문자열 → 값 꺼내기)
    const params = new URLSearchParams(body)
    const kpiNm = params.get('kpiNm')    // "신규KPI"
    const weight = params.get('weight')  // "30" (문자열)
    const year = params.get('year')      // "2024"

    // 3. 콘솔 로그 (디버깅용)
    console.log('[API] POST /api/kpi/save - kpiNm:', kpiNm, 'year:', year)

    // 4. 새 KPI 객체 생성
    const newKpi = {
      kpiId: `KPI${String(kpiList.length + 1).padStart(3, '0')}`,  // KPI006, KPI007...
      kpiNm: kpiNm || '',           // KPI명 (없으면 빈값)
      weight: Number(weight) || 0,  // 문자열 → 숫자 변환
      score: 0,                     // 신규라 0점
      year: year || '2024'          // 연도 (없으면 2024)
    }

    // 5. DB에 추가 (배열에 push)
    kpiList.push(newKpi)

    // 6. 응답 반환
    return {
      resultCode: 'SUCCESS',   // 성공 코드
      resultMsg: '저장 완료',   // 메시지
      data: newKpi             // 저장된 데이터 반환
    }
  })
