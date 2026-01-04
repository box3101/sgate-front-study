Request URL: /api/kpi/list ← 어디로 요청?
Request Method: POST ← GET/POST 뭐로?
Status Code: 200 OK ← 성공/실패?
Content-Type: application/x-www-form-urlencoded ← 어떤 형식?

Payload 탭:
findYear=2024 ← 보낸 파라미터

Response 탭:
{
"resultCode": "SUCCESS",
"data": [...] ← 받은 데이터
}

Response → 원본 JSON 텍스트 (날것)
Preview → 보기 좋게 정리된 버전 (펼치기/접기 가능)

[ Content-Type ]

● HTTP 요청/응답에서 데이터 형식을 알려주는 헤더

┌─────────────────────────────────────────────────────────┐
│ 형식 예시 │
├─────────────────────────────────────────────────────────┤
│ x-www-form-urlencoded findYear=2024&userId=01 │
│ application/json {"findYear": "2024"} │
└─────────────────────────────────────────────────────────┘

● SGATE 기준:

- 요청: x-www-form-urlencoded (파라미터 보낼 때)
- 응답: application/json (결과 받을 때)

[ params ]
const params = new URLSearchParams() // 빈 송장 준비

// 항목 추가
params.append('받는사람', '홍길동')
params.append('주소', '서울시')
params.append('전화번호', '010-1234')

// 완성된 송장
params.toString()
// → "받는사람=홍길동&주소=서울시&전화번호=010-1234"

실제 코드:
// 1. 빈 송장(파라미터) 준비
const params = new URLSearchParams()

// 2. 항목 추가 (key, value)
params.append('findYear', '2024') // 년도: 2024
params.append('userId', 'user01') // 유저아이디: user01

// 3. 문자열로 변환
params.toString() // → "findYear=2024&userId=user01"

append = 항목 추가
toString() = 완성된 문자열로 변환

POST 방식 (우리가 쓰는 것):
URL: /api/kpi/list
Body: findYear=2024&userId=user01 (숨겨서 전송)

전체 흐름:

1. 프론트 (Vue)
   fetch('/api/kpi/list', { body: 'findYear=2024' })
   ↓

2. API 서버 (Nuxt server)
   list.post.ts 실행
   → params에서 findYear 꺼냄
   → DB에서 데이터 조회
   ↓

3. 가상 DB (data.ts)
   kpiList 배열에서 데이터 반환 (보통 SQL 문법에 따라)
   ↓

4. API 서버
   { resultCode: 'SUCCESS', data: [...] } 응답
   ↓

5. 프론트
   result.data로 화면에 표시

6. 프론트 (사용)
   const result = await fetchKpiList(year)

   result.resultCode // 'SUCCESS'
   result.data // [{...}, {...}] 배열
   result.totalCount // 2

   kpiList.value = result.data // data만 꺼내서 저장

흐름:

프론트: findYear=2024 보냄

↓

백엔드: SQL로 DB 조회

↓

DB: 2024년 데이터 반환

↓

프론트: JSON으로 받음
