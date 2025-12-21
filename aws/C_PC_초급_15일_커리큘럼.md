# C 언어 (PC) 초급 15일 완성 커리큘럼

**대상:** 프로그래밍을 처음 배우는 완전 초보자
**환경:** Windows PC + VS Code + MinGW (GCC)
**학습 시간:** 하루 30분~1시간
**목표:** C 언어 기초 문법과 개념을 이해하고 간단한 프로그램 작성 가능

---

## 커리큘럼 개요

| 주차 | Day | 주제 | 핵심 개념 |
|------|-----|------|----------|
| 1주차 | 1-3 | 시작하기 | 개발환경, Hello World, 기본 구조 |
| 2주차 | 4-6 | 데이터 다루기 | 변수, 자료형, 연산자 |
| 3주차 | 7-9 | 흐름 제어 | 조건문, 반복문 |
| 4주차 | 10-12 | 함수와 배열 | 함수 정의, 배열, 문자열 |
| 5주차 | 13-15 | 심화 기초 | 포인터 기초, 구조체, 종합 프로젝트 |

---

## 1주차: 시작하기

### Day 1: C 언어 소개와 개발환경 설정
**학습 목표:**
1. C 언어의 역사와 특징 이해하기
2. VS Code 설치 및 설정 배우기
3. 첫 번째 Hello World 프로그램 작성하기

**핵심 개념:**
- C 언어: 1972년 Dennis Ritchie 개발
- 컴파일 언어 vs 인터프리터 언어
- IDE (통합 개발 환경)
- 컴파일러 (gcc)

**실습:**
```c
#include <stdio.h>

int main() {
    printf("Hello World\n");
    return 0;
}
```

**퀴즈:**
- C 언어를 개발한 사람은?
- C 프로그램을 컴파일하기 위해 필요한 것은?
- 화면에 출력할 때 사용하는 함수는?

---

### Day 2: 프로그램의 기본 구조
**학습 목표:**
1. C 프로그램의 기본 구조 이해하기
2. #include와 헤더 파일 역할 알기
3. main() 함수의 의미 파악하기

**핵심 개념:**
- `#include <stdio.h>`: 전처리기 지시문
- `int main()`: 프로그램 시작점 (entry point)
- `{ }`: 코드 블록
- `return 0`: 프로그램 정상 종료
- `;`: 문장의 끝

**실습:**
```c
#include <stdio.h>

// 이것은 주석입니다
int main() {
    printf("첫 번째 줄\n");
    printf("두 번째 줄\n");
    return 0;
}
```

**퀴즈:**
- 프로그램의 시작점이 되는 함수는?
- 문장의 끝을 나타내는 기호는?
- 주석을 작성하는 방법은?

---

### Day 3: 출력과 이스케이프 문자
**학습 목표:**
1. printf() 함수 다양하게 활용하기
2. 이스케이프 문자 종류 알기
3. 여러 줄 출력 프로그램 작성하기

**핵심 개념:**
- `\n`: 줄바꿈 (new line)
- `\t`: 탭 (tab)
- `\\`: 역슬래시 출력
- `\"`: 큰따옴표 출력
- `%%`: 퍼센트 기호 출력

**실습:**
```c
#include <stdio.h>

int main() {
    printf("이름:\t홍길동\n");
    printf("나이:\t20살\n");
    printf("\"안녕하세요\"라고 말했습니다.\n");
    return 0;
}
```

**퀴즈:**
- 줄바꿈을 나타내는 이스케이프 문자는?
- 탭을 나타내는 이스케이프 문자는?
- 큰따옴표를 출력하려면?

---

## 2주차: 데이터 다루기

### Day 4: 변수와 자료형 (정수)
**학습 목표:**
1. 변수의 개념 이해하기
2. 정수형 자료형 (int) 사용하기
3. 변수 선언과 초기화 배우기

**핵심 개념:**
- 변수: 데이터를 저장하는 메모리 공간
- `int`: 정수형 (약 -21억 ~ +21억)
- 변수 선언: `int age;`
- 변수 초기화: `int age = 20;`
- `%d`: 정수 출력 서식 지정자

**실습:**
```c
#include <stdio.h>

int main() {
    int age = 20;
    int year = 2025;

    printf("나이: %d살\n", age);
    printf("연도: %d년\n", year);
    printf("태어난 해: %d년\n", year - age);

    return 0;
}
```

**퀴즈:**
- 정수를 저장하는 자료형은?
- 정수를 출력하는 서식 지정자는?
- 변수를 선언하는 올바른 방법은?

---

### Day 5: 변수와 자료형 (실수, 문자)
**학습 목표:**
1. 실수형 자료형 (float, double) 사용하기
2. 문자형 자료형 (char) 사용하기
3. 다양한 자료형 함께 사용하기

**핵심 개념:**
- `float`: 실수형 (소수점 6자리)
- `double`: 실수형 (소수점 15자리, 더 정밀)
- `char`: 문자형 (1글자)
- `%f`: 실수 출력
- `%.2f`: 소수점 2자리까지 출력
- `%c`: 문자 출력

**실습:**
```c
#include <stdio.h>

int main() {
    float height = 175.5;
    double pi = 3.14159265359;
    char grade = 'A';

    printf("키: %.1f cm\n", height);
    printf("원주율: %.5f\n", pi);
    printf("학점: %c\n", grade);

    return 0;
}
```

**퀴즈:**
- 실수를 저장하는 자료형 2가지는?
- 문자를 저장하는 자료형은?
- 실수를 소수점 2자리까지 출력하려면?

---

### Day 6: 연산자
**학습 목표:**
1. 산술 연산자 사용하기
2. 대입 연산자 이해하기
3. 복합 대입 연산자 활용하기

**핵심 개념:**
- 산술 연산자: `+`, `-`, `*`, `/`, `%`
- `%`: 나머지 연산자 (modulo)
- 정수 나눗셈: 5/2 = 2 (소수점 버림)
- 복합 대입: `+=`, `-=`, `*=`, `/=`
- 증감 연산자: `++`, `--`

**실습:**
```c
#include <stdio.h>

int main() {
    int a = 10, b = 3;

    printf("더하기: %d + %d = %d\n", a, b, a + b);
    printf("빼기: %d - %d = %d\n", a, b, a - b);
    printf("곱하기: %d * %d = %d\n", a, b, a * b);
    printf("나누기: %d / %d = %d\n", a, b, a / b);
    printf("나머지: %d %% %d = %d\n", a, b, a % b);

    a++;  // a = a + 1
    printf("a++ 후: %d\n", a);

    return 0;
}
```

**퀴즈:**
- 나머지를 구하는 연산자는?
- 10 / 3의 결과는? (정수 나눗셈)
- a = a + 5를 짧게 쓰면?

---

## 3주차: 흐름 제어

### Day 7: 조건문 (if-else)
**학습 목표:**
1. if문으로 조건 판단하기
2. if-else문 사용하기
3. 비교 연산자와 논리 연산자 이해하기

**핵심 개념:**
- 비교 연산자: `==`, `!=`, `<`, `>`, `<=`, `>=`
- 논리 연산자: `&&` (AND), `||` (OR), `!` (NOT)
- if문: 조건이 참일 때 실행
- else문: 조건이 거짓일 때 실행

**실습:**
```c
#include <stdio.h>

int main() {
    int score = 85;

    if (score >= 90) {
        printf("A학점입니다.\n");
    } else if (score >= 80) {
        printf("B학점입니다.\n");
    } else if (score >= 70) {
        printf("C학점입니다.\n");
    } else {
        printf("재시험입니다.\n");
    }

    return 0;
}
```

**퀴즈:**
- 같음을 비교하는 연산자는?
- AND 논리 연산자는?
- if문에서 조건이 거짓일 때 실행되는 부분은?

---

### Day 8: 조건문 (switch)
**학습 목표:**
1. switch문의 구조 이해하기
2. case와 break 역할 알기
3. default 사용하기

**핵심 개념:**
- switch: 값에 따라 분기
- case: 각 경우 처리
- break: switch문 탈출
- default: 일치하는 case가 없을 때

**실습:**
```c
#include <stdio.h>

int main() {
    int menu = 2;

    switch (menu) {
        case 1:
            printf("짜장면을 선택했습니다.\n");
            break;
        case 2:
            printf("짬뽕을 선택했습니다.\n");
            break;
        case 3:
            printf("볶음밥을 선택했습니다.\n");
            break;
        default:
            printf("잘못된 메뉴입니다.\n");
    }

    return 0;
}
```

**퀴즈:**
- switch문에서 각 경우를 나타내는 키워드는?
- case 끝에 반드시 써야 하는 키워드는?
- 모든 case에 해당하지 않을 때 실행되는 것은?

---

### Day 9: 반복문 (for, while)
**학습 목표:**
1. for문으로 반복 실행하기
2. while문 사용하기
3. 반복 횟수 제어하기

**핵심 개념:**
- for문: `for (초기화; 조건; 증감) { }`
- while문: `while (조건) { }`
- 무한 루프: 조건이 항상 참인 경우
- break: 반복문 탈출
- continue: 다음 반복으로 건너뛰기

**실습:**
```c
#include <stdio.h>

int main() {
    // for문: 1부터 10까지 출력
    printf("for문:\n");
    for (int i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\n\n");

    // while문: 1부터 10까지 합계
    printf("while문:\n");
    int sum = 0;
    int n = 1;
    while (n <= 10) {
        sum += n;
        n++;
    }
    printf("1~10 합계: %d\n", sum);

    return 0;
}
```

**퀴즈:**
- for문의 3가지 구성요소는?
- 반복문을 강제로 빠져나오는 키워드는?
- 다음 반복으로 건너뛰는 키워드는?

---

## 4주차: 함수와 배열

### Day 10: 함수 기초
**학습 목표:**
1. 함수의 개념과 필요성 이해하기
2. 함수 정의와 호출 방법 배우기
3. 매개변수와 반환값 사용하기

**핵심 개념:**
- 함수: 특정 작업을 수행하는 코드 묶음
- 함수 선언: 반환형 함수이름(매개변수)
- 매개변수: 함수에 전달하는 값
- return: 함수의 결과값 반환
- void: 반환값이 없는 함수

**실습:**
```c
#include <stdio.h>

// 함수 선언
int add(int a, int b);
void greet(void);

int main() {
    greet();

    int result = add(5, 3);
    printf("5 + 3 = %d\n", result);

    printf("10 + 20 = %d\n", add(10, 20));

    return 0;
}

// 함수 정의
int add(int a, int b) {
    return a + b;
}

void greet(void) {
    printf("안녕하세요!\n");
}
```

**퀴즈:**
- 함수가 값을 반환할 때 사용하는 키워드는?
- 반환값이 없는 함수의 반환형은?
- 함수에 전달되는 값을 무엇이라 하나요?

---

### Day 11: 배열 기초
**학습 목표:**
1. 배열의 개념 이해하기
2. 배열 선언과 초기화 배우기
3. 배열 요소 접근하기

**핵심 개념:**
- 배열: 같은 자료형의 연속된 메모리 공간
- 배열 선언: `int arr[5];`
- 인덱스: 0부터 시작
- 배열 초기화: `int arr[] = {1, 2, 3, 4, 5};`
- 배열 크기: 요소 개수

**실습:**
```c
#include <stdio.h>

int main() {
    // 배열 선언과 초기화
    int scores[5] = {85, 90, 78, 92, 88};

    // 배열 요소 출력
    printf("점수 목록:\n");
    for (int i = 0; i < 5; i++) {
        printf("scores[%d] = %d\n", i, scores[i]);
    }

    // 배열 합계와 평균
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }
    printf("합계: %d\n", sum);
    printf("평균: %.1f\n", (float)sum / 5);

    return 0;
}
```

**퀴즈:**
- 배열의 인덱스는 몇부터 시작하나요?
- int arr[10]에서 마지막 요소의 인덱스는?
- 배열의 3번째 요소에 접근하려면?

---

### Day 12: 문자열
**학습 목표:**
1. 문자열의 개념 이해하기
2. 문자 배열과 문자열 차이 알기
3. 문자열 함수 사용하기

**핵심 개념:**
- 문자열: 문자 배열 + null 문자('\0')
- 문자열 선언: `char str[] = "Hello";`
- `%s`: 문자열 출력 서식
- `strlen()`: 문자열 길이
- `strcpy()`: 문자열 복사
- `strcmp()`: 문자열 비교
- `#include <string.h>`: 문자열 함수 헤더

**실습:**
```c
#include <stdio.h>
#include <string.h>

int main() {
    char name[] = "홍길동";
    char greeting[50] = "안녕하세요, ";

    printf("이름: %s\n", name);
    printf("글자 수: %lu\n", strlen(name));

    // 문자열 연결
    strcat(greeting, name);
    strcat(greeting, "님!");
    printf("%s\n", greeting);

    // 문자열 비교
    char pw1[] = "1234";
    char pw2[] = "1234";
    if (strcmp(pw1, pw2) == 0) {
        printf("비밀번호 일치!\n");
    }

    return 0;
}
```

**퀴즈:**
- 문자열의 끝을 나타내는 특수 문자는?
- 문자열 길이를 구하는 함수는?
- 두 문자열이 같은지 비교하는 함수는?

---

## 5주차: 심화 기초

### Day 13: 포인터 기초
**학습 목표:**
1. 메모리 주소의 개념 이해하기
2. 포인터 변수 선언과 사용하기
3. 주소 연산자와 역참조 연산자 배우기

**핵심 개념:**
- 포인터: 메모리 주소를 저장하는 변수
- `&`: 주소 연산자 (변수의 주소)
- `*`: 역참조 연산자 (주소의 값)
- 포인터 선언: `int *ptr;`
- 포인터 초기화: `ptr = &변수;`

**실습:**
```c
#include <stdio.h>

int main() {
    int num = 10;
    int *ptr = &num;  // num의 주소를 ptr에 저장

    printf("num의 값: %d\n", num);
    printf("num의 주소: %p\n", &num);
    printf("ptr의 값 (주소): %p\n", ptr);
    printf("ptr이 가리키는 값: %d\n", *ptr);

    // 포인터로 값 변경
    *ptr = 20;
    printf("변경 후 num: %d\n", num);

    return 0;
}
```

**퀴즈:**
- 변수의 주소를 구하는 연산자는?
- 포인터가 가리키는 값을 구하는 연산자는?
- int *ptr에서 *의 의미는?

---

### Day 14: 구조체 기초
**학습 목표:**
1. 구조체의 개념과 필요성 이해하기
2. 구조체 정의와 변수 선언하기
3. 구조체 멤버 접근하기

**핵심 개념:**
- 구조체: 여러 자료형을 하나로 묶음
- struct 키워드로 정의
- `.`: 멤버 접근 연산자
- 구조체 배열: 구조체를 여러 개 저장

**실습:**
```c
#include <stdio.h>
#include <string.h>

// 구조체 정의
struct Student {
    char name[20];
    int age;
    float score;
};

int main() {
    // 구조체 변수 선언과 초기화
    struct Student s1;
    strcpy(s1.name, "홍길동");
    s1.age = 20;
    s1.score = 85.5;

    // 구조체 멤버 출력
    printf("이름: %s\n", s1.name);
    printf("나이: %d\n", s1.age);
    printf("점수: %.1f\n", s1.score);

    // 초기화와 동시에 값 설정
    struct Student s2 = {"김철수", 22, 90.0};
    printf("\n이름: %s, 나이: %d, 점수: %.1f\n",
           s2.name, s2.age, s2.score);

    return 0;
}
```

**퀴즈:**
- 구조체를 정의하는 키워드는?
- 구조체 멤버에 접근하는 연산자는?
- 여러 자료형을 하나로 묶는 것을 무엇이라 하나요?

---

### Day 15: 종합 프로젝트 - 성적 관리 프로그램
**학습 목표:**
1. 지금까지 배운 내용 종합 복습하기
2. 실용적인 프로그램 작성하기
3. 파일 입출력 기초 맛보기

**핵심 개념:**
- 배운 내용 종합: 변수, 배열, 함수, 구조체
- 메뉴 기반 프로그램
- 데이터 저장 및 조회
- 간단한 파일 저장 (선택)

**실습:**
```c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 10

struct Student {
    char name[20];
    int kor, eng, math;
    float avg;
};

// 함수 선언
void addStudent(struct Student students[], int *count);
void showAll(struct Student students[], int count);
void showAverage(struct Student students[], int count);

int main() {
    struct Student students[MAX_STUDENTS];
    int count = 0;
    int menu;

    while (1) {
        printf("\n===== 성적 관리 =====\n");
        printf("1. 학생 추가\n");
        printf("2. 전체 보기\n");
        printf("3. 평균 보기\n");
        printf("0. 종료\n");
        printf("선택: ");
        scanf("%d", &menu);

        switch (menu) {
            case 1:
                addStudent(students, &count);
                break;
            case 2:
                showAll(students, count);
                break;
            case 3:
                showAverage(students, count);
                break;
            case 0:
                printf("프로그램을 종료합니다.\n");
                return 0;
            default:
                printf("잘못된 선택입니다.\n");
        }
    }

    return 0;
}

void addStudent(struct Student students[], int *count) {
    if (*count >= MAX_STUDENTS) {
        printf("더 이상 추가할 수 없습니다.\n");
        return;
    }

    struct Student *s = &students[*count];

    printf("이름: ");
    scanf("%s", s->name);
    printf("국어 점수: ");
    scanf("%d", &s->kor);
    printf("영어 점수: ");
    scanf("%d", &s->eng);
    printf("수학 점수: ");
    scanf("%d", &s->math);

    s->avg = (s->kor + s->eng + s->math) / 3.0;
    (*count)++;

    printf("%s 학생이 추가되었습니다.\n", s->name);
}

void showAll(struct Student students[], int count) {
    if (count == 0) {
        printf("등록된 학생이 없습니다.\n");
        return;
    }

    printf("\n%-10s %5s %5s %5s %7s\n",
           "이름", "국어", "영어", "수학", "평균");
    printf("----------------------------------------\n");

    for (int i = 0; i < count; i++) {
        printf("%-10s %5d %5d %5d %7.1f\n",
               students[i].name,
               students[i].kor,
               students[i].eng,
               students[i].math,
               students[i].avg);
    }
}

void showAverage(struct Student students[], int count) {
    if (count == 0) {
        printf("등록된 학생이 없습니다.\n");
        return;
    }

    float total = 0;
    for (int i = 0; i < count; i++) {
        total += students[i].avg;
    }

    printf("전체 학생 평균: %.2f\n", total / count);
}
```

**퀴즈:**
- 이 프로그램에서 사용된 자료구조는?
- 메뉴를 반복하기 위해 사용한 반복문은?
- 포인터로 구조체 멤버에 접근하는 연산자는?

---

## 학습 완료 후 다음 단계

### 중급 과정 미리보기
- 동적 메모리 할당 (malloc, free)
- 파일 입출력 심화
- 다차원 배열
- 포인터 심화 (이중 포인터, 함수 포인터)
- 전처리기 매크로

### 추천 연습
1. 각 Day의 실습 코드 직접 작성해보기
2. 퀴즈 문제 복습하기
3. 실습 코드 수정하며 실험해보기
4. 간단한 계산기, 숫자 맞추기 게임 만들어보기

---

## 핵심 용어 정리

| 용어 | 설명 |
|------|------|
| 변수 | 데이터를 저장하는 메모리 공간 |
| 자료형 | 데이터의 종류 (int, float, char 등) |
| 연산자 | 계산을 수행하는 기호 (+, -, *, / 등) |
| 조건문 | 조건에 따라 실행을 분기 (if, switch) |
| 반복문 | 특정 코드를 반복 실행 (for, while) |
| 함수 | 특정 작업을 수행하는 코드 묶음 |
| 배열 | 같은 자료형의 연속된 저장 공간 |
| 문자열 | 문자 배열 + null 문자 |
| 포인터 | 메모리 주소를 저장하는 변수 |
| 구조체 | 여러 자료형을 하나로 묶은 사용자 정의 자료형 |
