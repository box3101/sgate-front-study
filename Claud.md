# 1주차: API 기초 (완전판)

프론트엔드가 데이터를 어떻게 주고받는지 제대로 이해하기

---

## 1. 전체 구조

### 그림으로 보기

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │  HTTP   │                 │  SQL    │                 │
│   프론트엔드     │ ──────▶ │     백엔드      │ ──────▶ │       DB        │
│   (Vue.js)      │         │    (Spring)     │         │    (Oracle)     │
│                 │ ◀────── │                 │ ◀────── │                 │
│   브라우저에서   │  JSON   │   서버에서      │  결과   │   데이터 저장    │
│   화면 보여줌    │         │   로직 처리     │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘

    우리가 만듦              서버 개발자가 만듦            DBA가 관리
```

---

### 실제 예시: KPI 목록 조회

**1단계: 사용자가 KPI 목록 페이지 접속**

```
사용자 → 브라우저에서 KPI 목록 페이지 클릭
```

**2단계: 프론트엔드가 백엔드에 요청**

```javascript
// Vue에서 이렇게 요청함
const response = await fetch("/api/kpi/list?deptCode=DEV&year=2024");
```

```
요청 내용:
- URL: /api/kpi/list
- 파라미터: deptCode=DEV, year=2024
- 의미: "개발팀의 2024년 KPI 목록 줘"
```

**3단계: 백엔드가 DB에 SQL 실행**

```sql
-- 백엔드(Spring)가 이런 SQL을 실행함
SELECT kpi_id, kpi_name, weight, score
FROM tb_kpi
WHERE dept_code = 'DEV'
  AND year = '2024'
ORDER BY kpi_id;
```

**4단계: DB가 결과 반환**

```
DB 테이블 (tb_kpi):
┌──────────┬─────────────────┬────────┬───────┬───────────┬──────┐
│ kpi_id   │ kpi_name        │ weight │ score │ dept_code │ year │
├──────────┼─────────────────┼────────┼───────┼───────────┼──────┤
│ KPI001   │ 프로젝트 완료율  │ 30     │ 85    │ DEV       │ 2024 │
│ KPI002   │ 코드 품질 점수   │ 40     │ 92    │ DEV       │ 2024 │
│ KPI003   │ 버그 수정률      │ 30     │ 88    │ DEV       │ 2024 │
└──────────┴─────────────────┴────────┴───────┴───────────┴──────┘

→ WHERE 조건에 맞는 3개 행 반환
```

**5단계: 백엔드가 JSON으로 변환해서 프론트에 응답**

```json
{
	"resultCode": "SUCCESS",
	"resultMsg": "조회 성공",
	"data": [
		{
			"kpiId": "KPI001",
			"kpiName": "프로젝트 완료율",
			"weight": 30,
			"score": 85
		},
		{
			"kpiId": "KPI002",
			"kpiName": "코드 품질 점수",
			"weight": 40,
			"score": 92
		},
		{
			"kpiId": "KPI003",
			"kpiName": "버그 수정률",
			"weight": 30,
			"score": 88
		}
	],
	"totalCount": 3
}
```

**6단계: 프론트엔드가 화면에 표시**

```vue
<template>
	<table>
		<tr v-for="kpi in kpiList" :key="kpi.kpiId">
			<td>{{ kpi.kpiName }}</td>
			<td>{{ kpi.weight }}%</td>
			<td>{{ kpi.score }}점</td>
		</tr>
	</table>
</template>
```

```
화면:
┌─────────────────┬────────┬───────┐
│ KPI명           │ 가중치  │ 점수  │
├─────────────────┼────────┼───────┤
│ 프로젝트 완료율  │ 30%    │ 85점  │
│ 코드 품질 점수   │ 40%    │ 92점  │
│ 버그 수정률      │ 30%    │ 88점  │
└─────────────────┴────────┴───────┘
```

---

### 왜 프론트가 DB 직접 접근 못하나?

```
만약 프론트에서 직접 DB 접근하면?

<script>
// ❌ 이런 코드가 브라우저에 노출됨
const db = connect({
  host: '192.168.1.100',
  user: 'admin',
  password: 'secret123',  // 비밀번호 노출!
  database: 'kdb_system'
})
</script>

→ F12 개발자도구에서 누구나 볼 수 있음
→ 해커가 DB 직접 접속 가능
→ 데이터 전부 삭제/변조 가능
```

**그래서 백엔드가 중간에서:**

- DB 접속 정보 숨김
- 권한 체크 (이 사람이 이 데이터 볼 수 있나?)
- 입력값 검증 (SQL 인젝션 방지)

---

## 2. JSON

### JSON이 뭔가?

**JSON = JavaScript Object Notation**

- JavaScript: 자바스크립트
- Object: 객체 (데이터 묶음)
- Notation: 표기법

**한마디로:** 데이터를 텍스트로 표현하는 약속된 형식

---

### 왜 JSON을 쓰나?

**예전에는 XML을 썼음:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <resultCode>SUCCESS</resultCode>
  <data>
    <kpi>
      <kpiId>KPI001</kpiId>
      <kpiName>프로젝트 완료율</kpiName>
    </kpi>
  </data>
</response>
```

**JSON:**

```json
{
	"resultCode": "SUCCESS",
	"data": {
		"kpiId": "KPI001",
		"kpiName": "프로젝트 완료율"
	}
}
```

**JSON이 좋은 이유:**

- 더 짧음 (데이터 전송량 적음)
- 읽기 쉬움
- JavaScript에서 바로 객체로 쓸 수 있음

---

### JSON 문법

```json
{
	"문자열": "값은 큰따옴표로",
	"숫자": 123,
	"소수": 45.67,
	"불린": true,
	"널": null,
	"배열": [1, 2, 3],
	"객체": {
		"중첩": "가능"
	}
}
```

**규칙:**

- 키는 반드시 큰따옴표 `"key"`
- 문자열 값도 큰따옴표 `"value"`
- 숫자, true/false, null은 따옴표 없이
- 마지막 항목 뒤에 쉼표 넣으면 에러!

```json
// ❌ 에러 (마지막 쉼표)
{ "name": "철수", }

// ✅ 정상
{ "name": "철수" }
```

---

### 실제 API 응답 구조 (SGATE 예시)

```json
{
	"resultCode": "SUCCESS",
	"resultMsg": "조회가 완료되었습니다.",
	"data": [
		{
			"kpiId": "KPI001",
			"kpiName": "프로젝트 완료율",
			"weight": 30,
			"targetValue": 100,
			"actualValue": 85,
			"score": 85,
			"status": "진행중",
			"createDate": "2024-01-15",
			"updateDate": "2024-03-20"
		}
	],
	"totalCount": 1,
	"pageNo": 1,
	"pageSize": 10
}
```

**각 필드 의미:**
| 필드 | 의미 |
|------|------|
| resultCode | 성공/실패 코드 (SUCCESS, FAIL, ERROR) |
| resultMsg | 사용자에게 보여줄 메시지 |
| data | 실제 데이터 (배열 또는 객체) |
| totalCount | 전체 데이터 개수 |
| pageNo | 현재 페이지 번호 |
| pageSize | 페이지당 데이터 개수 |

---

### JavaScript에서 JSON 다루기

```javascript
// 객체 → JSON 문자열 (서버로 보낼 때)
const user = { name: "철수", age: 30 };
const jsonString = JSON.stringify(user);
console.log(jsonString); // '{"name":"철수","age":30}'
console.log(typeof jsonString); // 'string'

// JSON 문자열 → 객체 (서버에서 받을 때)
const jsonData = '{"name":"철수","age":30}';
const userObj = JSON.parse(jsonData);
console.log(userObj); // { name: '철수', age: 30 }
console.log(userObj.name); // '철수'
```

**fetch에서는 자동으로 해줌:**

```javascript
const response = await fetch("/api/user");
const data = await response.json(); // 자동으로 JSON.parse() 해줌
```

---

## 3. HTTP 메서드

### HTTP가 뭔가?

**HTTP = HyperText Transfer Protocol**

- HyperText: 하이퍼텍스트 (링크가 있는 문서)
- Transfer: 전송
- Protocol: 규약, 약속

**한마디로:** 브라우저와 서버가 데이터 주고받는 규칙

---

### 4가지 메서드

**CRUD와 매칭:**
| 메서드 | 의미 | CRUD | 용도 |
|--------|------|------|------|
| GET | 가져와 | Read | 조회 |
| POST | 보내 | Create | 생성 |
| PUT | 바꿔 | Update | 수정 |
| DELETE | 지워 | Delete | 삭제 |

**CRUD = Create, Read, Update, Delete**

---

### GET - 조회

**특징:**

- 데이터를 URL에 붙여서 보냄
- 브라우저 주소창에 보임
- 북마크 가능
- 새로고침해도 같은 결과

**예시:**

```
GET /api/kpi/list?deptCode=DEV&year=2024

URL: /api/kpi/list
파라미터: ?deptCode=DEV&year=2024
         └ ? 뒤에 key=value 형태
         └ 여러 개면 & 로 연결
```

**파라미터 전달 방식:**

```javascript
// 방식 1: URL에 직접
fetch("/api/kpi/list?deptCode=DEV&year=2024");

// 방식 2: 템플릿 리터럴
const deptCode = "DEV";
const year = 2024;
fetch(`/api/kpi/list?deptCode=${deptCode}&year=${year}`);

// 방식 3: URLSearchParams (파라미터 많을 때)
const params = new URLSearchParams({
	deptCode: "DEV",
	year: 2024,
	status: "active",
	page: 1,
});
fetch(`/api/kpi/list?${params}`);
// 결과: /api/kpi/list?deptCode=DEV&year=2024&status=active&page=1
```

**흐름:**

```
프론트                    백엔드                     DB
  │                         │                        │
  │ GET /api/kpi/list       │                        │
  │ ?deptCode=DEV           │                        │
  │ ─────────────────────▶  │                        │
  │                         │  SELECT * FROM tb_kpi  │
  │                         │  WHERE dept_code='DEV' │
  │                         │ ─────────────────────▶ │
  │                         │                        │
  │                         │ ◀───── 결과 3건 ────── │
  │                         │                        │
  │ ◀─── JSON 응답 ──────── │                        │
  │                         │                        │
```

---

### POST - 생성

**특징:**

- 데이터를 body에 숨겨서 보냄
- URL에 안 보임
- 북마크 불가
- 민감한 데이터 전송에 적합

**예시:**

```javascript
fetch("/api/kpi/save", {
	method: "POST",
	headers: {
		"Content-Type": "application/json", // "JSON 형식으로 보낼게"
	},
	body: JSON.stringify({
		kpiName: "신규 프로젝트 진행률",
		weight: 30,
		targetValue: 100,
		deptCode: "DEV",
	}),
});
```

**흐름:**

```
프론트                    백엔드                     DB
  │                         │                        │
  │ POST /api/kpi/save      │                        │
  │ Body: {                 │                        │
  │   kpiName: '신규...',   │                        │
  │   weight: 30            │                        │
  │ }                       │                        │
  │ ─────────────────────▶  │                        │
  │                         │  INSERT INTO tb_kpi    │
  │                         │  (kpi_name, weight...) │
  │                         │  VALUES ('신규...', 30)│
  │                         │ ─────────────────────▶ │
  │                         │                        │
  │                         │ ◀─── 1건 추가됨 ────── │
  │                         │                        │
  │ ◀─ { resultCode:        │                        │
  │      'SUCCESS' } ────── │                        │
```

---

### GET vs POST 비교

```
GET - 조회 (읽기만)
┌─────────────────────────────────────────────────────┐
│ GET /api/kpi/list?deptCode=DEV&year=2024           │
│                   ↑                                 │
│                   파라미터가 URL에 보임              │
│                                                     │
│ → 브라우저 주소창: https://sgate.com/api/kpi/list?deptCode=DEV │
│ → 히스토리에 남음                                    │
│ → 북마크 가능                                        │
└─────────────────────────────────────────────────────┘

POST - 생성/수정 (데이터 변경)
┌─────────────────────────────────────────────────────┐
│ POST /api/kpi/save                                  │
│ Body: { kpiName: '...', weight: 30 }               │
│        ↑                                            │
│        파라미터가 body에 숨겨짐                       │
│                                                     │
│ → 브라우저 주소창: https://sgate.com/api/kpi/save   │
│ → 데이터 안 보임                                     │
│ → 새로고침하면 "다시 제출하시겠습니까?" 경고          │
└─────────────────────────────────────────────────────┘
```

---

### PUT - 수정

```javascript
fetch("/api/kpi/update", {
	method: "PUT",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		kpiId: "KPI001", // 어떤 걸 수정할지
		kpiName: "수정된 이름", // 수정할 내용
		weight: 40,
	}),
});
```

```sql
-- 백엔드에서 실행되는 SQL
UPDATE tb_kpi
SET kpi_name = '수정된 이름',
    weight = 40
WHERE kpi_id = 'KPI001';
```

---

### DELETE - 삭제

```javascript
fetch("/api/kpi/delete/KPI001", {
	method: "DELETE",
});
```

```sql
-- 백엔드에서 실행되는 SQL
DELETE FROM tb_kpi
WHERE kpi_id = 'KPI001';
```

---

## 4. async/await

### 왜 필요한가?

```javascript
// API 호출은 시간이 걸림 (네트워크 왕복)
// 서버 응답까지 0.1초 ~ 수 초

// 만약 기다리는 동안 브라우저가 멈추면?
// → 버튼 클릭 안 됨
// → 스크롤 안 됨
// → 사용자: "뭐야 고장났나?"

// 그래서 "기다리되, 브라우저는 멈추지 않게" 하는 게 비동기
```

---

### 기본 문법

```javascript
// async: 이 함수 안에서 await 쓸 거야
// await: 여기서 결과 올 때까지 기다려

const fetchData = async () => {
	// 1. fetch 실행 → 서버에 요청 보냄
	// 2. await 때문에 응답 올 때까지 여기서 대기
	// 3. 응답 오면 response에 저장하고 다음 줄로
	const response = await fetch("/api/data");

	// 4. response.json() 실행 → JSON 파싱 시작
	// 5. await 때문에 파싱 끝날 때까지 대기
	// 6. 파싱 끝나면 data에 저장
	const data = await response.json();

	return data;
};
```

---

### await 빼먹으면?

```javascript
const fetchData = async () => {
	const response = fetch("/api/data"); // await 빠짐!
	console.log(response);
	// Promise { <pending> }  ← 아직 응답 안 온 상태
	// 실제 데이터가 아님!

	const data = response.json(); // 에러!
	// response가 Promise라서 .json() 못 함
};
```

---

### async 빼먹으면?

```javascript
const fetchData = () => {  // async 빠짐!
  const response = await fetch('/api/data')
  // SyntaxError: await is only valid in async functions
}
```

**규칙: await는 반드시 async 함수 안에서만**

---

## 5. fetch 사용법

### GET - 기본

```javascript
const getKpiList = async () => {
	const response = await fetch("/api/kpi/list");
	const result = await response.json();
	return result;
};

// 사용
const data = await getKpiList();
console.log(data);
// { resultCode: 'SUCCESS', data: [...], totalCount: 10 }
```

---

### GET - 파라미터 있을 때

```javascript
// 방식 1: 직접 URL에
const getKpiList = async (deptCode, year) => {
	const response = await fetch(`/api/kpi/list?deptCode=${deptCode}&year=${year}`);
	const result = await response.json();
	return result;
};

// 방식 2: URLSearchParams (권장)
const getKpiList = async (params) => {
	const queryString = new URLSearchParams(params).toString();
	const response = await fetch(`/api/kpi/list?${queryString}`);
	const result = await response.json();
	return result;
};

// 사용
const data = await getKpiList({ deptCode: "DEV", year: 2024, page: 1 });
```

---

### POST - 데이터 저장

```javascript
const saveKpi = async (kpiData) => {
	const response = await fetch("/api/kpi/save", {
		method: "POST", // POST 방식
		headers: {
			"Content-Type": "application/json", // JSON으로 보낸다고 알려줌
		},
		body: JSON.stringify(kpiData), // 객체를 JSON 문자열로 변환
	});
	const result = await response.json();
	return result;
};

// 사용
const result = await saveKpi({
	kpiName: "신규 KPI",
	weight: 30,
	targetValue: 100,
});

if (result.resultCode === "SUCCESS") {
	alert("저장 완료!");
} else {
	alert(result.resultMsg);
}
```

---

### PUT - 데이터 수정

```javascript
const updateKpi = async (kpiData) => {
	const response = await fetch("/api/kpi/update", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(kpiData),
	});
	const result = await response.json();
	return result;
};

// 사용
await updateKpi({
	kpiId: "KPI001", // 어떤 걸 수정할지
	kpiName: "수정된 이름",
	weight: 40,
});
```

---

### DELETE - 데이터 삭제

```javascript
const deleteKpi = async (kpiId) => {
	const response = await fetch(`/api/kpi/delete/${kpiId}`, {
		method: "DELETE",
	});
	const result = await response.json();
	return result;
};

// 사용
if (confirm("정말 삭제하시겠습니까?")) {
	await deleteKpi("KPI001");
}
```

---

## 6. 에러 처리

### try-catch 기본

```javascript
const fetchData = async () => {
	try {
		// 성공하면 여기 실행
		const response = await fetch("/api/data");
		const data = await response.json();
		return data;
	} catch (error) {
		// 실패하면 여기 실행
		console.error("에러 발생:", error);
	} finally {
		// 성공하든 실패하든 무조건 실행
		// 로딩 끄기 같은 정리 작업
	}
};
```

---

### HTTP 상태 코드

| 코드 | 영어                  | 의미        | 대응            |
| ---- | --------------------- | ----------- | --------------- |
| 200  | OK                    | 성공        | 정상 처리       |
| 201  | Created               | 생성됨      | POST 성공       |
| 400  | Bad Request           | 잘못된 요청 | 파라미터 확인   |
| 401  | Unauthorized          | 인증 필요   | 로그인 페이지로 |
| 403  | Forbidden             | 권한 없음   | 권한 확인       |
| 404  | Not Found             | 못 찾음     | URL 확인        |
| 500  | Internal Server Error | 서버 에러   | 백엔드한테 문의 |

---

### 주의: fetch는 404도 에러로 안 침!

```javascript
// ❌ 이러면 404도 그냥 넘어감
try {
	const response = await fetch("/api/없는주소");
	const data = await response.json();
} catch (e) {
	// 404는 여기 안 옴!
}

// ✅ 직접 체크해야 함
try {
	const response = await fetch("/api/없는주소");

	if (!response.ok) {
		// ok = 상태코드 200~299
		throw new Error(`HTTP ${response.status}`);
	}

	const data = await response.json();
} catch (e) {
	// 이제 404도 여기로 옴
	console.error(e);
}
```

---

## 7. Vue에서 API 호출

### 기본 패턴

```vue
<script setup>
import { ref, onMounted } from "vue";

// 상태 3종 세트
const loading = ref(false); // 로딩 중?
const error = ref(null); // 에러 있음?
const kpiList = ref([]); // 데이터

// API 호출 함수
const fetchKpiList = async () => {
	loading.value = true; // 로딩 시작
	error.value = null; // 에러 초기화

	try {
		const response = await fetch("/api/kpi/list");

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const result = await response.json();
		kpiList.value = result.data; // 데이터 저장
	} catch (e) {
		error.value = "데이터를 불러오는데 실패했습니다.";
		console.error(e);
	} finally {
		loading.value = false; // 로딩 끝
	}
};

// 화면 뜨자마자 실행
onMounted(() => {
	fetchKpiList();
});
</script>

<template>
	<!-- 로딩 중 -->
	<div v-if="loading">로딩중...</div>

	<!-- 에러 발생 -->
	<div v-else-if="error">
		{{ error }}
		<button @click="fetchKpiList">다시 시도</button>
	</div>

	<!-- 데이터 표시 -->
	<div v-else>
		<table>
			<tr v-for="kpi in kpiList" :key="kpi.kpiId">
				<td>{{ kpi.kpiName }}</td>
				<td>{{ kpi.weight }}%</td>
				<td>{{ kpi.score }}점</td>
			</tr>
		</table>

		<!-- 데이터 없을 때 -->
		<div v-if="kpiList.length === 0">등록된 KPI가 없습니다.</div>
	</div>
</template>
```

---

### 저장 패턴

```vue
<script setup>
import { ref } from "vue";

const form = ref({
	kpiName: "",
	weight: 0,
	targetValue: 0,
});
const saving = ref(false);

const saveKpi = async () => {
	// 유효성 검사
	if (!form.value.kpiName) {
		alert("KPI명을 입력하세요.");
		return;
	}
	if (form.value.weight <= 0) {
		alert("가중치는 0보다 커야 합니다.");
		return;
	}

	saving.value = true;

	try {
		const response = await fetch("/api/kpi/save", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form.value),
		});

		const result = await response.json();

		if (result.resultCode === "SUCCESS") {
			alert("저장되었습니다.");
			// 폼 초기화
			form.value = { kpiName: "", weight: 0, targetValue: 0 };
		} else {
			alert(result.resultMsg || "저장에 실패했습니다.");
		}
	} catch (e) {
		alert("저장 중 오류가 발생했습니다.");
		console.error(e);
	} finally {
		saving.value = false;
	}
};
</script>

<template>
	<form @submit.prevent="saveKpi">
		<div>
			<label>KPI명</label>
			<input v-model="form.kpiName" />
		</div>
		<div>
			<label>가중치</label>
			<input v-model.number="form.weight" type="number" />
		</div>
		<div>
			<label>목표값</label>
			<input v-model.number="form.targetValue" type="number" />
		</div>

		<button type="submit" :disabled="saving">
			{{ saving ? "저장중..." : "저장" }}
		</button>
	</form>
</template>
```

---

## 8. 개발자도구 Network 탭 (상세)

### 열기

```
Windows: F12 또는 Ctrl + Shift + I
Mac: Cmd + Option + I
```

---

### 화면 구성

```
┌─────────────────────────────────────────────────────────────────┐
│ Elements  Console  Sources  Network  Performance  ...           │
├─────────────────────────────────────────────────────────────────┤
│ [All] [Fetch/XHR] [JS] [CSS] [Img] [Media] [Font] [Doc] [WS]   │  ← 필터
├──────────────────────────┬──────────────────────────────────────┤
│ Name          Status Time│ Headers  Preview  Response  Timing   │
├──────────────────────────┼──────────────────────────────────────┤
│ list          200   45ms │ ▼ General                            │
│ save          200   123ms│   Request URL: /api/kpi/list         │
│ update        500   89ms │   Request Method: GET                │
│                          │   Status Code: 200 OK                │
│                          │                                      │
│                          │ ▼ Request Headers                    │
│                          │   Accept: application/json           │
│                          │   Content-Type: application/json     │
│                          │                                      │
│                          │ ▼ Query String Parameters            │
│                          │   deptCode: DEV                      │
│                          │   year: 2024                         │
└──────────────────────────┴──────────────────────────────────────┘
```

---

### 필터 선택

```
[All]       - 전부 (이미지, CSS, JS 다 포함)
[Fetch/XHR] - API 호출만 ← 이거 선택!
[JS]        - JavaScript 파일
[CSS]       - CSS 파일
[Img]       - 이미지
```

---

### API 클릭해서 볼 것

**1. Headers 탭 - General**

```
Request URL: https://sgate.kdb.co.kr/api/kpi/list
Request Method: GET
Status Code: 200 OK
```

- URL: 어디로 요청했나
- Method: GET/POST/PUT/DELETE
- Status Code: 성공(200)/실패(400, 500 등)

**2. Headers 탭 - Request Headers**

```
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyJhbGci...
```

- Content-Type: 어떤 형식으로 보내는지
- Authorization: 로그인 토큰

**3. Payload 탭 (POST일 때)**

```json
{
	"kpiName": "신규 KPI",
	"weight": 30
}
```

- POST로 보낸 데이터

**4. Response 탭**

```json
{
  "resultCode": "SUCCESS",
  "data": [...]
}
```

- 서버가 보낸 응답 데이터

**5. Preview 탭**

- Response를 보기 좋게 정리한 버전

---

### AS-IS 분석하는 법

**목표:** 기존 JSP 화면에서 API 파악해서 TO-BE Vue로 똑같이 만들기

**순서:**

```
1. 기존 JSP 화면 열기
   └ 예: http://sgate.kdb.co.kr/kpi/list.do

2. F12 → Network 탭 → Fetch/XHR 필터

3. 화면에서 기능 실행
   └ "조회" 버튼 클릭

4. 새로 뜬 API 클릭 (예: list)

5. 정보 수집:
   ┌─────────────────────────────────────────┐
   │ URL: /api/kpi/list                      │
   │ Method: GET                             │
   │ 파라미터: deptCode, year, page          │
   │ 응답:                                   │
   │   - resultCode: SUCCESS/FAIL           │
   │   - data: [{kpiId, kpiName, ...}]      │
   │   - totalCount: 숫자                    │
   └─────────────────────────────────────────┘

6. 메모해두고 TO-BE Vue에서 동일하게 구현
```

---

### API 정리 양식

| 항목     | 내용                              |
| -------- | --------------------------------- |
| API명    | KPI 목록 조회                     |
| URL      | /api/kpi/list                     |
| Method   | GET                               |
| 호출시점 | 페이지 로드 시, 검색 버튼 클릭 시 |

**Request:**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| deptCode | String | N | 부서코드 |
| year | String | N | 연도 |
| page | Number | N | 페이지번호 (기본값 1) |

**Response:**
| 필드 | 타입 | 설명 |
|------|------|------|
| resultCode | String | SUCCESS/FAIL |
| data | Array | KPI 목록 |
| data[].kpiId | String | KPI ID |
| data[].kpiName | String | KPI명 |
| data[].weight | Number | 가중치 |
| totalCount | Number | 전체 건수 |

---

## 실습 과제

### 과제 1: Network 탭으로 API 분석

**할 일:**

1. SGATE AS-IS 화면 열기
2. F12 → Network → Fetch/XHR
3. 아래 기능 실행하면서 API 분석:
   - KPI 목록 조회
   - KPI 저장
   - KPI 삭제

**정리할 것 (각 API별):**

```
- URL:
- Method:
- 파라미터:
- 응답 구조:
```

---

### 과제 2: API 호출 코드 작성

**분석한 API 중 1개를 Vue로 구현:**

```vue
<script setup>
import { ref, onMounted } from "vue";

// 여기에 상태 정의

// 여기에 API 호출 함수

// onMounted에서 호출
</script>

<template>
	<!-- 로딩/에러/데이터 표시 -->
</template>
```

---

### 과제 3: 저장 기능 구현

**폼 입력 → API 호출 → 결과 처리:**

```vue
<script setup>
// 폼 데이터
// 저장 중 상태
// 저장 함수 (유효성 검사 포함)
</script>

<template>
	<!-- 입력 폼 -->
	<!-- 저장 버튼 -->
</template>
```

---

## 요약

```
1. 전체 흐름
   프론트 → 백엔드 → DB → 백엔드 → 프론트

2. JSON
   JavaScript Object Notation
   데이터 주고받는 형식

3. HTTP 메서드
   GET: 조회 (파라미터가 URL에)
   POST: 생성 (파라미터가 body에)
   PUT: 수정
   DELETE: 삭제

4. async/await
   async: 비동기 함수 선언
   await: 응답 기다리기

5. fetch
   GET: fetch(url)
   POST: fetch(url, { method: 'POST', body: ... })

6. 에러 처리
   try-catch로 감싸기
   response.ok로 상태 체크

7. Network 탭
   Fetch/XHR 필터
   Headers, Payload, Response 확인
```

---

_다음 주: Vue3 기본 (ref, reactive, computed, watch, v-if, v-for)_
