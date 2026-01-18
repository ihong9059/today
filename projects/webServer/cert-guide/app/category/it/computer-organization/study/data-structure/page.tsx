'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'linear',
    name: '선형 자료구조',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '배열(Array)과 연결 리스트(Linked List)의 차이점을 설명하시오.', answer: '배열: 연속 메모리, O(1) 접근 / 연결리스트: 비연속, O(n) 접근, 삽입삭제 유리', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 배열(Array)과 연결 리스트(Linked List)의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '스택(Stack)의 특징과 주요 연산을 설명하시오.', answer: 'LIFO 구조, push/pop/peek 연산, 함수호출/수식계산에 활용', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 스택(Stack)의 특징과 주요 연산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '큐(Queue)의 특징과 종류를 설명하시오.', answer: 'FIFO 구조, 선형큐/원형큐/우선순위큐/덱(Deque)', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 큐(Queue)의 특징과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '원형 큐(Circular Queue)의 필요성과 구현 방법을 설명하시오.', answer: '선형큐 공간낭비 해결, (rear+1)%size로 인덱스 순환', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 원형 큐(Circular Queue)의 필요성과 구현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '단일 연결 리스트와 이중 연결 리스트의 차이를 설명하시오.', answer: '단일: next 포인터만, 이중: prev/next 포인터, 양방향 탐색 가능', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 단일 연결 리스트와 이중 연결 리스트의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '스택을 이용한 후위 표기식 계산 과정을 설명하시오.', answer: '피연산자는 push, 연산자면 pop 2개로 계산 후 결과 push', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 스택을 이용한 후위 표기식 계산 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '중위 표기식을 후위 표기식으로 변환하는 방법을 설명하시오.', answer: '연산자 우선순위에 따라 스택 활용, 괄호 처리 포함', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 중위 표기식을 후위 표기식으로 변환하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '덱(Deque)의 특징과 활용 사례를 설명하시오.', answer: '양쪽 끝에서 삽입/삭제 가능, 스크롤/히스토리 관리', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 덱(Deque)의 특징과 활용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '희소 행렬(Sparse Matrix)의 효율적 저장 방법을 설명하시오.', answer: '0이 많은 행렬, 삼중쌍(row,col,value) 또는 연결리스트로 저장', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 희소 행렬(Sparse Matrix)의 효율적 저장 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '다항식의 연결 리스트 표현 방법을 설명하시오.', answer: '(계수, 지수) 쌍으로 노드 구성, 지수 내림차순 연결', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 다항식의 연결 리스트 표현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'tree',
    name: '트리',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '이진 트리(Binary Tree)의 종류를 설명하시오.', answer: '정(Full), 완전(Complete), 포화(Perfect), 균형(Balanced) 이진 트리', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 이진 트리(Binary Tree)의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '이진 트리의 순회 방법 3가지를 설명하시오.', answer: '전위(Pre): 루트-좌-우, 중위(In): 좌-루트-우, 후위(Post): 좌-우-루트', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 이진 트리의 순회 방법 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '이진 탐색 트리(BST)의 특징과 연산 복잡도를 설명하시오.', answer: '좌측<루트<우측, 평균 O(log n), 최악 O(n) - 편향시', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 이진 탐색 트리(BST)의 특징과 연산 복잡도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'AVL 트리의 균형 조건과 회전 연산을 설명하시오.', answer: '균형인수 |BF|≤1, LL/RR/LR/RL 회전으로 균형 유지', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: AVL 트리의 균형 조건과 회전 연산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'B-트리의 특징과 활용 분야를 설명하시오.', answer: '다진 탐색 트리, 디스크 기반 DB 인덱스에 활용, 노드 분할/병합', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: B-트리의 특징과 활용 분야를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '힙(Heap)의 특징과 종류를 설명하시오.', answer: '완전이진트리, 최대힙(부모≥자식), 최소힙(부모≤자식)', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 힙(Heap)의 특징과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '힙 정렬(Heap Sort)의 동작 과정을 설명하시오.', answer: '최대힙 구성 → 루트 추출 → 힙 재구성 반복, O(n log n)', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 힙 정렬(Heap Sort)의 동작 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '레드-블랙 트리의 특징을 설명하시오.', answer: '자가 균형 BST, 노드 색상 속성, 삽입/삭제 시 색상 조정', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 레드-블랙 트리의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '트라이(Trie) 자료구조의 특징과 활용을 설명하시오.', answer: '문자열 검색에 특화, 자동완성/사전에 활용, O(문자열길이)', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 트라이(Trie) 자료구조의 특징과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '스레드 이진 트리(Threaded Binary Tree)의 목적을 설명하시오.', answer: 'NULL 포인터를 순회용으로 활용, 순회 시 스택 불필요', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 스레드 이진 트리(Threaded Binary Tree)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'graph',
    name: '그래프',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '그래프의 표현 방법 2가지를 비교하시오.', answer: '인접행렬: O(V²) 공간, O(1) 탐색 / 인접리스트: O(V+E) 공간', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 그래프의 표현 방법 2가지를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'DFS(깊이 우선 탐색)의 동작 원리를 설명하시오.', answer: '스택/재귀 사용, 한 경로를 끝까지 탐색 후 백트래킹', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: DFS(깊이 우선 탐색)의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'BFS(너비 우선 탐색)의 동작 원리를 설명하시오.', answer: '큐 사용, 현재 레벨의 모든 노드 탐색 후 다음 레벨로', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: BFS(너비 우선 탐색)의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '다익스트라(Dijkstra) 알고리즘을 설명하시오.', answer: '단일 출발점 최단경로, 그리디 방식, 음수 가중치 불가', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 다익스트라(Dijkstra) 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '플로이드-워셜(Floyd-Warshall) 알고리즘을 설명하시오.', answer: '모든 쌍 최단경로, DP 방식, O(V³), 음수 가중치 가능', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 플로이드-워셜(Floyd-Warshall) 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '크루스칼(Kruskal) 알고리즘을 설명하시오.', answer: 'MST 생성, 간선 정렬 후 사이클 없이 선택, Union-Find 활용', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 크루스칼(Kruskal) 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '프림(Prim) 알고리즘을 설명하시오.', answer: 'MST 생성, 정점 기반, 인접 정점 중 최소 가중치 선택', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 프림(Prim) 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '위상 정렬(Topological Sort)의 조건과 방법을 설명하시오.', answer: 'DAG에서만 가능, 진입차수 0인 노드부터 제거/DFS 역순', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 위상 정렬(Topological Sort)의 조건과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '벨만-포드(Bellman-Ford) 알고리즘을 설명하시오.', answer: '음수 가중치 가능, V-1번 반복, 음수 사이클 탐지 가능', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 벨만-포드(Bellman-Ford) 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '강한 연결 요소(SCC)의 개념과 탐색 방법을 설명하시오.', answer: '방향그래프에서 상호 도달 가능한 정점 집합, Tarjan/Kosaraju 알고리즘', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 강한 연결 요소(SCC)의 개념과 탐색 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'search-sort',
    name: '탐색과 정렬',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: '버블 정렬(Bubble Sort)의 동작과 복잡도를 설명하시오.', answer: '인접 원소 비교 교환, O(n²), 안정 정렬', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 버블 정렬(Bubble Sort)의 동작과 복잡도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '퀵 정렬(Quick Sort)의 동작과 복잡도를 설명하시오.', answer: '피벗 기준 분할, 평균 O(n log n), 최악 O(n²)', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 퀵 정렬(Quick Sort)의 동작과 복잡도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '병합 정렬(Merge Sort)의 동작과 복잡도를 설명하시오.', answer: '분할정복, O(n log n) 보장, 안정 정렬, 추가 공간 필요', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 병합 정렬(Merge Sort)의 동작과 복잡도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '삽입 정렬(Insertion Sort)의 특징을 설명하시오.', answer: '정렬된 부분에 삽입, O(n²), 거의 정렬된 데이터에 효율적', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 삽입 정렬(Insertion Sort)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '선택 정렬(Selection Sort)의 특징을 설명하시오.', answer: '최소값 선택 교환, O(n²), 교환 횟수 최소', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 선택 정렬(Selection Sort)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '이진 탐색(Binary Search)의 조건과 복잡도를 설명하시오.', answer: '정렬된 배열 필요, O(log n), 중간값 비교 후 범위 축소', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 이진 탐색(Binary Search)의 조건과 복잡도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '해시 탐색의 원리와 충돌 해결 방법을 설명하시오.', answer: '해시함수로 인덱스 계산, 체이닝/개방주소법(선형/이차탐사)', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 해시 탐색의 원리와 충돌 해결 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '기수 정렬(Radix Sort)의 특징을 설명하시오.', answer: '비교 없는 정렬, 자릿수별 정렬, O(d*(n+k))', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 기수 정렬(Radix Sort)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '계수 정렬(Counting Sort)의 특징을 설명하시오.', answer: '비교 없는 정렬, 개수 누적 활용, O(n+k), 정수 범위 제한', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 계수 정렬(Counting Sort)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '안정 정렬과 불안정 정렬의 차이를 설명하시오.', answer: '안정: 같은 키 원래 순서 유지 / 불안정: 순서 보장 안됨', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 안정 정렬과 불안정 정렬의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'advanced',
    name: '고급 자료구조',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: 'Union-Find(서로소 집합) 자료구조를 설명하시오.', answer: '집합 병합(Union)과 대표 원소 찾기(Find), 경로압축/랭크최적화', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: Union-Find(서로소 집합) 자료구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '세그먼트 트리(Segment Tree)의 용도를 설명하시오.', answer: '구간 쿼리(합/최대/최소) 처리, 구간 갱신, O(log n)', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 세그먼트 트리(Segment Tree)의 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '펜윅 트리(Fenwick Tree/BIT)의 특징을 설명하시오.', answer: '구간 합 쿼리 특화, 세그먼트 트리보다 간결한 구현', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 펜윅 트리(Fenwick Tree/BIT)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'LRU 캐시를 구현하는 자료구조를 설명하시오.', answer: '해시맵 + 이중연결리스트, O(1) 접근/갱신', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: LRU 캐시를 구현하는 자료구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '블룸 필터(Bloom Filter)의 원리를 설명하시오.', answer: '확률적 자료구조, False Positive 허용, 공간 효율적 집합 검사', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 블룸 필터(Bloom Filter)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '스킵 리스트(Skip List)의 구조를 설명하시오.', answer: '다중 레벨 연결리스트, 확률적 균형, O(log n) 탐색', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 스킵 리스트(Skip List)의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'KMP 알고리즘의 원리를 설명하시오.', answer: '문자열 패턴 매칭, 실패 함수로 불필요한 비교 생략, O(n+m)', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: KMP 알고리즘의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '동적 프로그래밍(DP)의 두 가지 접근법을 설명하시오.', answer: 'Top-down: 메모이제이션/재귀, Bottom-up: 테이블화/반복', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 동적 프로그래밍(DP)의 두 가지 접근법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '분할 정복(Divide and Conquer)의 개념을 설명하시오.', answer: '문제를 작은 부분으로 분할, 해결, 병합하는 알고리즘 설계 기법', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 분할 정복(Divide and Conquer)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '빅오(Big-O) 표기법과 시간복잡도 분석을 설명하시오.', answer: '알고리즘 성능 상한 표현, O(1)<O(log n)<O(n)<O(n log n)<O(n²)', prompt: `전자계산기조직응용기사 자료구조 문제입니다.\n\n문제: 빅오(Big-O) 표기법과 시간복잡도 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function DataStructurePage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['linear']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computer-org-data-structure-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('computer-org-data-structure-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (topicId: string, questionId: number) => {
    setCompletedQuestions(prev => {
      const topicCompleted = prev[topicId] || [];
      const newCompleted = topicCompleted.includes(questionId)
        ? topicCompleted.filter(id => id !== questionId)
        : [...topicCompleted, questionId];
      return { ...prev, [topicId]: newCompleted };
    });
  };

  const getTopicProgress = (topicId: string, total: number) => {
    const completed = completedQuestions[topicId]?.length || 0;
    return Math.round((completed / total) * 100);
  };

  const getTotalProgress = () => {
    const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
    const totalCompleted = Object.values(completedQuestions).reduce((acc, arr) => acc + arr.length, 0);
    return Math.round((totalCompleted / totalQuestions) * 100);
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/computer-organization" className="text-gray-600 hover:text-blue-600">전자계산기조직응용기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">자료구조</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🌳</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">자료구조</h1>
              <p className="text-blue-100">전자계산기조직응용기사 3과목 - 선형/비선형 자료구조, 탐색, 정렬</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-blue-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topics */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">
                    {topic.questions.length}문항
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }}
                    />
                  </div>
                  <span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span>
                  <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border ${
                        completedQuestions[topic.id]?.includes(q.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                            completedQuestions[topic.id]?.includes(q.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-blue-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition"
                        >
                          🤖 AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
