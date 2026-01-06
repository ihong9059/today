# 정보처리기사 페이지 개선 작업 프롬프트 (v2)

## 변경 사항 (v1 → v2)
- EC2 서버 IP 업데이트: 52.79.144.2
- SSH 키 경로 Mac 환경 반영
- 실제 작업 경험 반영 (빌드 시간, 주의사항)
- 현재 상태 반영 (메인/exam 완료, study 보강 필요)

---

## 작업 환경

```bash
# SSH 접속
ssh -i ~/.ssh/uttec-first-ec2.pem ec2-user@52.79.144.2

# 파일 업로드
scp -i ~/.ssh/uttec-first-ec2.pem [로컬파일] ec2-user@52.79.144.2:~/cert-guide/app/category/it/information-processor/

# 빌드 및 배포 (10-15분 소요)
cd ~/cert-guide && npm run build && pm2 restart cert-guide
```

---

## 현재 상태

| 페이지 | 현재 | 목표 | 상태 |
|--------|------|------|------|
| page.tsx | 389줄 | 390줄 | ✅ 완료 |
| exam/page.tsx | 579줄 | 549줄 | ✅ 완료 |
| study/software-design | 332줄 | 450줄 | ⚠️ 50문항 필요 |
| study/software-development | 250줄 | 450줄 | ⚠️ 50문항 필요 |
| study/database | 332줄 | 450줄 | ⚠️ 50문항 필요 |
| study/programming | 318줄 | 450줄 | ⚠️ 50문항 필요 |
| study/system-management | 325줄 | 450줄 | ⚠️ 50문항 필요 |
| study/practical | 258줄 | 350줄 | ⚠️ 25문항 필요 |

---

## 남은 작업: study 과목별 50문항 확충

### 작업 1: 소프트웨어 설계 (software-design)

```
정보처리기사 소프트웨어 설계 과목을 50문항으로 확충해주세요.

대상 파일:
- EC2: ~/cert-guide/app/category/it/information-processor/study/software-design/page.tsx

현재 문항: 약 15개
목표 문항: 50개

토픽별 문항 배분:
1. 요구사항 분석 (8문항)
   - 요구공학 프로세스
   - 기능/비기능 요구사항
   - 요구사항 명세서 (SRS)
   - 요구사항 추적표

2. UML 다이어그램 (10문항)
   - 유스케이스 다이어그램
   - 클래스 다이어그램
   - 시퀀스 다이어그램
   - 상태/활동 다이어그램
   - 컴포넌트/배치 다이어그램

3. UI/UX 설계 (8문항)
   - UI 설계 원칙 (3클릭, 일관성)
   - 와이어프레임/프로토타입
   - 사용성 테스트
   - 접근성 (웹 접근성 지침)

4. 소프트웨어 아키텍처 (10문항)
   - MVC, MVP, MVVM 패턴
   - 레이어드 아키텍처
   - 마이크로서비스
   - 이벤트 기반 아키텍처

5. 객체지향 설계 (7문항)
   - SOLID 원칙
   - 캡슐화, 상속, 다형성
   - 결합도와 응집도
   - 디자인 패턴 (GoF)

6. 인터페이스 설계 (7문항)
   - API 설계 (REST, SOAP)
   - 데이터 인터페이스
   - 시스템 연계 방식
   - 미들웨어
```

### 작업 2: 소프트웨어 개발 (software-development)

```
토픽별 문항 배분 (50문항):
1. 자료구조 (10문항) - 배열, 리스트, 스택, 큐, 트리, 그래프
2. 알고리즘 (10문항) - 정렬, 검색, 재귀, 동적프로그래밍
3. 개발 도구 (8문항) - IDE, 버전관리, 빌드도구
4. 테스트 (10문항) - 단위/통합/시스템, TDD, 커버리지
5. 인터페이스 구현 (7문항) - JSON, XML, 연계 모듈
6. 배포 (5문항) - CI/CD, 컨테이너, 배포 전략
```

### 작업 3: 데이터베이스 구축 (database)

```
토픽별 문항 배분 (50문항):
1. 데이터 모델링 (10문항) - ER 다이어그램, 정규화, 반정규화
2. SQL (15문항) - SELECT, JOIN, 서브쿼리, DDL, DCL
3. 트랜잭션 (8문항) - ACID, 동시성 제어, 락
4. 인덱스/최적화 (7문항) - B-Tree, 쿼리 튜닝
5. NoSQL (5문항) - 문서형, 키-값, 그래프 DB
6. 데이터베이스 보안 (5문항) - 권한, 암호화, 감사
```

### 작업 4: 프로그래밍 언어 활용 (programming)

```
토픽별 문항 배분 (50문항):
1. C 언어 (15문항) - 포인터, 배열, 구조체, 메모리
2. Java (15문항) - 클래스, 상속, 인터페이스, 컬렉션
3. Python (10문항) - 리스트, 딕셔너리, 함수, 클래스
4. 공통 개념 (10문항) - 변수, 연산자, 제어문, 함수
```

### 작업 5: 정보시스템 구축관리 (system-management)

```
토픽별 문항 배분 (50문항):
1. 소프트웨어 개발 방법론 (10문항) - 애자일, 스크럼, XP, 데브옵스
2. 프로젝트 관리 (10문항) - WBS, PERT/CPM, 위험관리
3. 품질 관리 (8문항) - ISO 25010, 테스트, 품질 지표
4. 정보 보안 (12문항) - 암호화, 접근제어, 취약점, 보안 법규
5. 네트워크 (10문항) - OSI 7계층, TCP/IP, 프로토콜
```

### 작업 6: 실기 (practical)

```
토픽별 문항 배분 (25문항):
1. 프로그래밍 코드 실행 결과 (10문항) - C, Java, Python 출력 예측
2. SQL 작성/결과 (8문항) - SELECT, JOIN, 집계함수
3. 요구사항/화면설계 (4문항) - 유스케이스, UI 설계
4. 기타 실무 (3문항) - 네트워크, 보안 설정
```

---

## 문항 형식 (기계기사 패턴)

```javascript
const questions = [
  {
    id: 1,
    topic: '요구사항 분석',
    question: '요구공학에서 요구사항 개발 프로세스 4단계를 순서대로 나열하시오.',
    answer: '도출 → 분석 → 명세 → 확인',
    prompt: `정보처리기사 소프트웨어 설계 문제입니다.

문제: 요구공학에서 요구사항 개발 프로세스 4단계를 순서대로 나열하시오.

다음 순서로 설명해주세요:
1. 핵심 개념 정리
2. 각 단계별 상세 설명
3. 실무 적용 예시
4. 관련 개념 (요구사항 관리 vs 개발)
5. 연습문제 3개`
  },
  // ... 49개 더
];
```

---

## 페이지 구조 템플릿

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function SoftwareDesignStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  // localStorage에서 진행상황 로드
  useEffect(() => {
    const saved = localStorage.getItem('ip-software-design-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  // 진행상황 저장
  const toggleComplete = (id: number) => {
    const newSet = new Set(completedQuestions);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setCompletedQuestions(newSet);
    localStorage.setItem('ip-software-design-progress', JSON.stringify([...newSet]));
  };

  const progress = (completedQuestions.size / 50) * 100;

  return (
    <div>
      {/* 헤더 + 브레드크럼 */}
      {/* 진행률 표시 */}
      <div className="bg-gray-200 rounded-full h-3">
        <div className="bg-indigo-500 h-3 rounded-full" style={{width: `${progress}%`}} />
      </div>

      {/* 토픽별 아코디언 */}
      {topics.map(topic => (
        <div key={topic.name}>
          <button onClick={() => toggleTopic(topic.name)}>
            {topic.name} ({topic.questions.length}문항)
          </button>
          {expandedTopics.has(topic.name) && (
            <div>
              {topic.questions.map(q => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  completed={completedQuestions.has(q.id)}
                  onToggle={() => toggleComplete(q.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 체크리스트

```
- [x] 메인 페이지 (page.tsx) - 389줄 ✅
- [x] 시험 상세 (exam/page.tsx) - 579줄 ✅
- [ ] study/software-design - 50문항
- [ ] study/software-development - 50문항
- [ ] study/database - 50문항
- [ ] study/programming - 50문항
- [ ] study/system-management - 50문항
- [ ] study/practical - 25문항
- [ ] EC2 업로드
- [ ] 빌드 성공
- [ ] 웹사이트 동작 확인
```
