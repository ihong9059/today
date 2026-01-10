'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'data-structure',
    name: '자료구조',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '스택(Stack)의 특징과 연산을 설명하시오.', answer: 'LIFO(Last In First Out), push/pop 연산', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 스택(Stack)의 특징과 연산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '큐(Queue)의 특징과 연산을 설명하시오.', answer: 'FIFO(First In First Out), enqueue/dequeue 연산', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 큐(Queue)의 특징과 연산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '배열(Array)과 연결 리스트(Linked List)의 차이점을 설명하시오.', answer: '배열: 연속 메모리, 인덱스 접근 O(1) / 연결리스트: 불연속, 삽입삭제 O(1)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 배열(Array)과 연결 리스트(Linked List)의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '이진 트리(Binary Tree)의 3가지 순회 방법을 설명하시오.', answer: '전위(Pre-order), 중위(In-order), 후위(Post-order)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 이진 트리(Binary Tree)의 3가지 순회 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '이진 탐색 트리(BST)의 특징을 설명하시오.', answer: '왼쪽 자식 < 부모 < 오른쪽 자식, 탐색 O(log n)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 이진 탐색 트리(BST)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '힙(Heap)의 종류와 특징을 설명하시오.', answer: '최대힙(부모≥자식), 최소힙(부모≤자식), 우선순위 큐 구현', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 힙(Heap)의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '그래프(Graph)의 표현 방법 2가지를 설명하시오.', answer: '인접 행렬(Adjacency Matrix), 인접 리스트(Adjacency List)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 그래프(Graph)의 표현 방법 2가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '해시 테이블(Hash Table)의 충돌 해결 방법 2가지를 설명하시오.', answer: '체이닝(Chaining), 개방 주소법(Open Addressing)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 해시 테이블(Hash Table)의 충돌 해결 방법 2가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '원형 큐(Circular Queue)의 개념과 구현 이유를 설명하시오.', answer: '배열 끝과 시작을 연결, 메모리 재사용 위해', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 원형 큐(Circular Queue)의 개념과 구현 이유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '덱(Deque)의 개념을 설명하시오.', answer: 'Double-Ended Queue, 양쪽에서 삽입/삭제 가능', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 덱(Deque)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: 'B-트리(B-Tree)의 특징과 용도를 설명하시오.', answer: '균형 다진 탐색 트리, 데이터베이스 인덱스에 활용', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: B-트리(B-Tree)의 특징과 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'AVL 트리의 특징을 설명하시오.', answer: '자가 균형 이진 탐색 트리, 높이 차이 1 이하 유지', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: AVL 트리의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '트라이(Trie) 자료구조의 특징과 용도를 설명하시오.', answer: '문자열 검색 특화, 자동완성/사전 구현', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 트라이(Trie) 자료구조의 특징과 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '레드-블랙 트리의 특징을 설명하시오.', answer: '자가 균형 이진 탐색 트리, 노드 색상으로 균형 유지', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 레드-블랙 트리의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '우선순위 큐(Priority Queue)의 구현 방법을 설명하시오.', answer: '힙(Heap)으로 구현, 삽입/삭제 O(log n)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 우선순위 큐(Priority Queue)의 구현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '완전 이진 트리와 포화 이진 트리의 차이를 설명하시오.', answer: '완전: 마지막 레벨 왼쪽부터, 포화: 모든 레벨 꽉 참', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 완전 이진 트리와 포화 이진 트리의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: '신장 트리(Spanning Tree)의 개념을 설명하시오.', answer: '그래프의 모든 정점을 포함하는 사이클 없는 부분 그래프', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 신장 트리(Spanning Tree)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'algorithm',
    name: '알고리즘',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '버블 정렬(Bubble Sort)의 시간복잡도와 동작 원리를 설명하시오.', answer: 'O(n²), 인접한 두 원소 비교하며 교환', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 버블 정렬(Bubble Sort)의 시간복잡도와 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '선택 정렬(Selection Sort)의 동작 원리를 설명하시오.', answer: '최솟값 찾아 맨 앞과 교환 반복, O(n²)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 선택 정렬(Selection Sort)의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '삽입 정렬(Insertion Sort)의 특징을 설명하시오.', answer: '정렬된 부분에 새 원소 삽입, 거의 정렬된 데이터에 효율적', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 삽입 정렬(Insertion Sort)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '퀵 정렬(Quick Sort)의 평균/최악 시간복잡도와 피벗 선택을 설명하시오.', answer: '평균 O(n log n), 최악 O(n²), 피벗 기준 분할 정복', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 퀵 정렬(Quick Sort)의 평균/최악 시간복잡도와 피벗 선택을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '병합 정렬(Merge Sort)의 특징을 설명하시오.', answer: '분할 정복, 안정 정렬, O(n log n), 추가 메모리 필요', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 병합 정렬(Merge Sort)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '힙 정렬(Heap Sort)의 동작 원리를 설명하시오.', answer: '최대힙 구성 후 루트 추출 반복, O(n log n)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 힙 정렬(Heap Sort)의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '이진 탐색(Binary Search)의 조건과 시간복잡도를 설명하시오.', answer: '정렬된 배열, O(log n)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 이진 탐색(Binary Search)의 조건과 시간복잡도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'DFS(깊이 우선 탐색)와 BFS(너비 우선 탐색)의 차이를 설명하시오.', answer: 'DFS: 스택/재귀, 깊이 먼저 / BFS: 큐, 레벨 순서', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: DFS(깊이 우선 탐색)와 BFS(너비 우선 탐색)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '다익스트라 알고리즘의 용도와 특징을 설명하시오.', answer: '최단 경로 탐색, 음수 가중치 불가, 그리디', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 다익스트라 알고리즘의 용도와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '분할 정복(Divide and Conquer) 알고리즘을 설명하시오.', answer: '문제를 작은 부분으로 분할, 해결 후 병합', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 분할 정복(Divide and Conquer) 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '동적 프로그래밍(Dynamic Programming)의 특징을 설명하시오.', answer: '최적 부분 구조, 중복 부분 문제, 메모이제이션', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 동적 프로그래밍(Dynamic Programming)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '그리디 알고리즘(Greedy Algorithm)의 특징을 설명하시오.', answer: '각 단계 최선의 선택, 지역 최적해 → 전역 최적해 기대', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 그리디 알고리즘(Greedy Algorithm)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '크루스칼 알고리즘과 프림 알고리즘의 차이를 설명하시오.', answer: '크루스칼: 간선 기반, 프림: 정점 기반 MST', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 크루스칼 알고리즘과 프림 알고리즘의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '시간 복잡도 Big-O 표기법을 설명하시오.', answer: '최악의 경우 수행 시간 상한, O(1) < O(log n) < O(n) < O(n²)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 시간 복잡도 Big-O 표기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '재귀 알고리즘과 반복 알고리즘의 차이를 설명하시오.', answer: '재귀: 함수 호출 스택, 반복: 루프, 재귀→반복 변환 가능', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 재귀 알고리즘과 반복 알고리즘의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '플로이드-워셜 알고리즘의 용도를 설명하시오.', answer: '모든 정점 쌍 최단 경로, O(n³)', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 플로이드-워셜 알고리즘의 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: '백트래킹(Backtracking)의 개념을 설명하시오.', answer: '해 탐색 중 유망하지 않으면 되돌아가기, 가지치기', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 백트래킹(Backtracking)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'interface',
    name: '인터페이스 구현',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '모듈의 정의와 특성을 설명하시오.', answer: '독립적 기능 단위, 재사용성, 분리성, 추상화', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 모듈의 정의와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '공통 모듈의 설계 원칙을 설명하시오.', answer: '정확성, 명확성, 완전성, 일관성, 추적성', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 공통 모듈의 설계 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'EAI(Enterprise Application Integration)의 개념을 설명하시오.', answer: '기업 내 이기종 시스템 통합, 데이터/프로세스 공유', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: EAI(Enterprise Application Integration)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'Point-to-Point 방식과 Hub & Spoke 방식의 차이를 설명하시오.', answer: 'P2P: 직접 연결, Hub&Spoke: 중앙 허브 경유', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: Point-to-Point 방식과 Hub & Spoke 방식의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'WSDL(Web Services Description Language)의 역할을 설명하시오.', answer: '웹 서비스 명세 정의, 인터페이스 설명 XML 문서', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: WSDL(Web Services Description Language)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'UDDI(Universal Description, Discovery and Integration)의 역할을 설명하시오.', answer: '웹 서비스 등록 및 검색을 위한 레지스트리', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: UDDI(Universal Description, Discovery and Integration)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '미들웨어(Middleware)의 종류 4가지를 쓰시오.', answer: 'DB, RPC, MOM, TP-Monitor, ORB, WAS', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 미들웨어(Middleware)의 종류 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '인터페이스 보안 구현 방법 3가지를 쓰시오.', answer: 'SSL/TLS, 암호화, 접근 제어, 인증', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 인터페이스 보안 구현 방법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '데이터 포맷 변환의 개념과 방법을 설명하시오.', answer: '이기종 시스템 간 데이터 형식 변환, XML/JSON 변환', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 데이터 포맷 변환의 개념과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '인터페이스 감시 및 오류 처리 방법을 설명하시오.', answer: '로깅, 예외처리, 재시도, 알림, 롤백', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 인터페이스 감시 및 오류 처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: 'RPC(Remote Procedure Call)의 개념을 설명하시오.', answer: '원격 시스템의 프로시저를 로컬처럼 호출', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: RPC(Remote Procedure Call)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'MOM(Message Oriented Middleware)의 특징을 설명하시오.', answer: '비동기 메시지 기반 통신, 느슨한 결합', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: MOM(Message Oriented Middleware)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '스텁(Stub)과 스켈레톤(Skeleton)의 역할을 설명하시오.', answer: '스텁: 클라이언트측 대리자, 스켈레톤: 서버측 대리자', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 스텁(Stub)과 스켈레톤(Skeleton)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'testing',
    name: '소프트웨어 테스트',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: '화이트박스 테스트와 블랙박스 테스트의 차이를 설명하시오.', answer: '화이트박스: 내부 구조 검사, 블랙박스: 기능만 검사', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 화이트박스 테스트와 블랙박스 테스트의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '테스트 케이스의 구성요소를 설명하시오.', answer: '테스트 ID, 입력값, 기대결과, 사전조건, 사후조건', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 테스트 케이스의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '단위 테스트, 통합 테스트, 시스템 테스트, 인수 테스트를 설명하시오.', answer: '단위: 모듈, 통합: 모듈 간, 시스템: 전체, 인수: 사용자 검증', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 단위 테스트, 통합 테스트, 시스템 테스트, 인수 테스트를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '동치분할(Equivalence Partitioning)의 개념을 설명하시오.', answer: '입력 데이터를 유사 그룹으로 분할, 대표값 테스트', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 동치분할(Equivalence Partitioning)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '경계값 분석(Boundary Value Analysis)을 설명하시오.', answer: '경계값과 경계 인접값 테스트, 오류 발생 가능성 높은 지점', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 경계값 분석(Boundary Value Analysis)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '문장 커버리지, 분기 커버리지, 조건 커버리지를 설명하시오.', answer: '문장: 모든 문장 실행, 분기: 모든 분기, 조건: 모든 조건', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 문장 커버리지, 분기 커버리지, 조건 커버리지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '회귀 테스트(Regression Test)의 목적을 설명하시오.', answer: '변경 후 기존 기능 영향 확인, 새로운 결함 발생 여부', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 회귀 테스트(Regression Test)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '상향식 통합과 하향식 통합의 차이를 설명하시오.', answer: '상향식: 하위→상위, 하향식: 상위→하위, 스텁/드라이버 사용', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 상향식 통합과 하향식 통합의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '알파 테스트와 베타 테스트의 차이를 설명하시오.', answer: '알파: 개발자 환경, 베타: 사용자 환경', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 알파 테스트와 베타 테스트의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '테스트 자동화 도구의 종류를 설명하시오.', answer: '정적(코드분석), 동적(테스트실행), 성능, 기능', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 테스트 자동화 도구의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '테스트 오라클(Test Oracle)의 개념을 설명하시오.', answer: '테스트 결과의 정확성을 판단하는 기준', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 테스트 오라클(Test Oracle)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '성능 테스트의 종류 4가지를 쓰시오.', answer: '부하, 스트레스, 스파이크, 내구성 테스트', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 성능 테스트의 종류 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: 'TDD(Test-Driven Development)의 개념을 설명하시오.', answer: '테스트 먼저 작성 후 코드 구현, Red-Green-Refactor', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: TDD(Test-Driven Development)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '결함 관리 프로세스를 순서대로 설명하시오.', answer: '결함 등록 → 분류 → 수정 → 검증 → 종료', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 결함 관리 프로세스를 순서대로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '정적 테스트 기법 3가지를 쓰시오.', answer: '코드 인스펙션, 워크스루, 동료 검토', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 정적 테스트 기법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '목(Mock) 객체와 스텁(Stub)의 차이를 설명하시오.', answer: 'Mock: 행위 검증, Stub: 상태 검증', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 목(Mock) 객체와 스텁(Stub)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'build-deploy',
    name: '빌드 및 배포',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: 'CI(Continuous Integration)의 개념과 장점을 설명하시오.', answer: '지속적 통합, 빈번한 통합으로 문제 조기 발견', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: CI(Continuous Integration)의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'CD(Continuous Deployment/Delivery)의 차이를 설명하시오.', answer: 'Delivery: 수동 배포, Deployment: 자동 배포', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: CD(Continuous Deployment/Delivery)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'Git의 기본 명령어 5가지를 쓰시오.', answer: 'init, add, commit, push, pull', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: Git의 기본 명령어 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '형상관리(Configuration Management)의 목적을 설명하시오.', answer: '소프트웨어 변경사항 추적 및 관리, 버전 통제', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 형상관리(Configuration Management)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '형상 항목(Configuration Item)의 종류를 설명하시오.', answer: '소스코드, 문서, 설정파일, 라이브러리', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 형상 항목(Configuration Item)의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'Jenkins의 역할과 특징을 설명하시오.', answer: '오픈소스 CI/CD 도구, 빌드 자동화, 플러그인 확장', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: Jenkins의 역할과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'Docker의 개념과 장점을 설명하시오.', answer: '컨테이너 기반 가상화, 환경 일관성, 가벼움', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: Docker의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '빌드 자동화 도구 3가지를 쓰시오.', answer: 'Maven, Gradle, Ant', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 빌드 자동화 도구 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '블루-그린 배포(Blue-Green Deployment)를 설명하시오.', answer: '두 환경 운영, 무중단 배포, 빠른 롤백', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 블루-그린 배포(Blue-Green Deployment)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '카나리 배포(Canary Deployment)의 개념을 설명하시오.', answer: '일부 사용자에게만 새 버전 배포, 점진적 확대', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 카나리 배포(Canary Deployment)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: 'DevOps의 개념과 목적을 설명하시오.', answer: '개발+운영 협업, 빠른 배포 사이클, 자동화', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: DevOps의 개념과 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'Git 브랜치 전략(Git Flow)을 설명하시오.', answer: 'main, develop, feature, release, hotfix 브랜치', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: Git 브랜치 전략(Git Flow)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: 'Infrastructure as Code(IaC)의 개념을 설명하시오.', answer: '코드로 인프라 관리, 버전관리/재현성/자동화', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: Infrastructure as Code(IaC)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'Kubernetes의 역할을 설명하시오.', answer: '컨테이너 오케스트레이션, 자동 스케일링, 배포 관리', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: Kubernetes의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '형상 통제(Configuration Control)의 절차를 설명하시오.', answer: '변경 요청 → 검토 → 승인 → 적용 → 기록', prompt: `정보처리기사 소프트웨어 개발 문제입니다.\n\n문제: 형상 통제(Configuration Control)의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function SoftwareDevelopmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('software-development-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('software-development-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it/information-processor" className="text-gray-600 hover:text-blue-600">정보처리기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">소프트웨어 개발</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">💻</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">소프트웨어 개발 학습</h1>
                <p className="text-blue-100">정보처리기사 필기 2과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-blue-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter((q) => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(topic.id)} className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleComplete(topic.id, q.id)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}>
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                              <div className="flex gap-2 flex-wrap">
                                <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</a>
                                <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</a>
                                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
