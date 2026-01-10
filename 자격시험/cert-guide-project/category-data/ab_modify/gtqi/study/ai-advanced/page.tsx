'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  category: string;
}

const questions: Question[] = [
  // 심볼과 패턴 (13문제)
  {
    id: 1,
    question: "심볼(Symbol)의 장점은?",
    options: ["파일 크기 증가", "반복 오브젝트 효율적 관리 및 파일 크기 감소", "편집 불가능", "색상 제한"],
    answer: 1,
    explanation: "심볼을 사용하면 같은 오브젝트를 여러 번 복사해도 파일 크기가 크게 증가하지 않고 일괄 편집이 가능합니다.",
    category: "심볼과 패턴"
  },
  {
    id: 2,
    question: "심볼 인스턴스를 편집하면?",
    options: ["그 인스턴스만 변경", "원본 심볼이 변경되어 모든 인스턴스 변경", "아무 변화 없음", "자동 삭제"],
    answer: 1,
    explanation: "심볼을 편집하면 해당 심볼의 모든 인스턴스가 동시에 업데이트됩니다.",
    category: "심볼과 패턴"
  },
  {
    id: 3,
    question: "심볼 인스턴스를 일반 오브젝트로 변환하려면?",
    options: ["복사하기", "심볼 링크 해제", "삭제 후 다시 그리기", "불가능"],
    answer: 1,
    explanation: "심볼 링크 해제(Expand Symbol)를 하면 심볼 인스턴스가 일반 편집 가능한 오브젝트로 변환됩니다.",
    category: "심볼과 패턴"
  },
  {
    id: 4,
    question: "심볼 스프레이 도구의 기능은?",
    options: ["심볼 삭제", "심볼 인스턴스를 뿌리듯이 배치", "심볼 색상 변경", "심볼 크기 통일"],
    answer: 1,
    explanation: "심볼 스프레이 도구는 드래그하여 여러 심볼 인스턴스를 빠르게 배치합니다.",
    category: "심볼과 패턴"
  },
  {
    id: 5,
    question: "패턴 만들기 기능의 메뉴 위치는?",
    options: ["파일 메뉴", "편집 메뉴", "오브젝트 > 패턴 > 만들기", "효과 메뉴"],
    answer: 2,
    explanation: "오브젝트 > 패턴 > 만들기 메뉴로 선택한 오브젝트를 패턴으로 등록할 수 있습니다.",
    category: "심볼과 패턴"
  },
  {
    id: 6,
    question: "패턴 타일의 간격을 조절하려면?",
    options: ["패턴 옵션에서 조절", "불가능", "패턴을 다시 만들어야 함", "효과 메뉴 사용"],
    answer: 0,
    explanation: "패턴 편집 모드에서 패턴 옵션의 간격(Spacing) 값을 조절하여 타일 사이 간격을 설정합니다.",
    category: "심볼과 패턴"
  },
  {
    id: 7,
    question: "패턴의 타일 유형(Tile Type)이 아닌 것은?",
    options: ["격자(Grid)", "벽돌(Brick)", "육각형(Hex)", "삼각형(Triangle)"],
    answer: 3,
    explanation: "일러스트레이터의 패턴 타일 유형에는 격자, 벽돌, 육각형이 있으며, 삼각형은 없습니다.",
    category: "심볼과 패턴"
  },
  {
    id: 8,
    question: "오브젝트에 적용된 패턴만 변환하려면?",
    options: ["오브젝트와 함께 변환", "~키를 누르고 변환", "변환 도구 옵션에서 '패턴만 변환' 체크", "불가능"],
    answer: 2,
    explanation: "회전, 크기 조절 등 변환 도구 옵션에서 '패턴만 변환'을 선택하면 패턴만 변형됩니다.",
    category: "심볼과 패턴"
  },
  {
    id: 9,
    question: "심볼 세트에 심볼 크기 변형 도구의 기능은?",
    options: ["심볼 삭제", "심볼 인스턴스 크기 무작위 변경", "심볼 색상 변경", "심볼 위치 이동"],
    answer: 1,
    explanation: "심볼 크기 변형 도구(Symbol Sizer)는 심볼 인스턴스의 크기를 다양하게 조절합니다.",
    category: "심볼과 패턴"
  },
  {
    id: 10,
    question: "9-슬라이스 스케일링(9-Slice Scaling)의 용도는?",
    options: ["이미지 자르기", "심볼 크기 조절 시 모서리 왜곡 방지", "색상 분할", "레이어 분리"],
    answer: 1,
    explanation: "9-슬라이스는 버튼 등의 심볼을 크기 조절할 때 모서리 부분이 늘어나지 않도록 합니다.",
    category: "심볼과 패턴"
  },
  {
    id: 11,
    question: "다이나믹 심볼(Dynamic Symbol)의 특징은?",
    options: ["편집 불가", "개별 인스턴스의 속성 변경 가능", "애니메이션 지원", "3D 전용"],
    answer: 1,
    explanation: "다이나믹 심볼은 심볼 연결을 유지하면서 개별 인스턴스의 색상 등 속성을 변경할 수 있습니다.",
    category: "심볼과 패턴"
  },
  {
    id: 12,
    question: "패턴을 견본(Swatch)으로 등록하는 방법은?",
    options: ["자동 등록됨", "견본 패널로 드래그", "파일 메뉴 사용", "저장 메뉴 사용"],
    answer: 1,
    explanation: "패턴을 만들면 자동으로 견본 패널에 등록되며, 직접 드래그해서 등록할 수도 있습니다.",
    category: "심볼과 패턴"
  },
  {
    id: 13,
    question: "글로벌 견본(Global Swatch)의 장점은?",
    options: ["파일 크기 감소", "견본 수정 시 적용된 모든 오브젝트 자동 업데이트", "속도 향상", "호환성 증가"],
    answer: 1,
    explanation: "글로벌 견본을 수정하면 해당 색상이 적용된 모든 오브젝트의 색상이 자동으로 변경됩니다.",
    category: "심볼과 패턴"
  },
  // 그라디언트와 블렌드 (12문제)
  {
    id: 14,
    question: "그라디언트 패널의 단축키는?",
    options: ["Ctrl+F7", "Ctrl+F9", "Ctrl+G", "G"],
    answer: 1,
    explanation: "그라디언트 패널은 Ctrl+F9 또는 창 > 그라디언트로 열 수 있습니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 15,
    question: "그라디언트 도구의 단축키는?",
    options: ["G", "P", "B", "V"],
    answer: 0,
    explanation: "그라디언트 도구의 단축키는 G입니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 16,
    question: "프리폼 그라디언트(Freeform Gradient)의 특징은?",
    options: ["직선 방향만 가능", "자유로운 위치에 색상 포인트 배치", "2색만 가능", "원형만 가능"],
    answer: 1,
    explanation: "프리폼 그라디언트는 오브젝트 내 원하는 위치에 색상 포인트를 자유롭게 배치할 수 있습니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 17,
    question: "그라디언트 색상 정지점 추가 방법은?",
    options: ["더블클릭", "그라디언트 슬라이더 아래 클릭", "우클릭", "Ctrl+클릭"],
    answer: 1,
    explanation: "그라디언트 슬라이더 아래쪽을 클릭하면 새로운 색상 정지점이 추가됩니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 18,
    question: "그라디언트 색상 정지점 삭제 방법은?",
    options: ["Delete 키", "정지점을 아래로 드래그", "우클릭 후 삭제", "Ctrl+D"],
    answer: 1,
    explanation: "색상 정지점을 슬라이더 바깥 아래쪽으로 드래그하면 삭제됩니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 19,
    question: "블렌드(Blend) 기능의 용도는?",
    options: ["색상 삭제", "두 오브젝트 사이에 중간 단계 오브젝트 생성", "오브젝트 그룹화", "패스 단순화"],
    answer: 1,
    explanation: "블렌드는 두 오브젝트 사이에 형태와 색상이 점진적으로 변하는 중간 오브젝트들을 생성합니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 20,
    question: "블렌드 만들기 단축키는?",
    options: ["Ctrl+B", "Ctrl+Alt+B", "Ctrl+Shift+B", "Alt+B"],
    answer: 1,
    explanation: "Ctrl+Alt+B 또는 오브젝트 > 블렌드 > 만들기로 블렌드를 생성합니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 21,
    question: "블렌드 옵션의 '지정된 단계'의 의미는?",
    options: ["거리 간격 지정", "중간 오브젝트 개수 지정", "색상 수 지정", "레이어 수 지정"],
    answer: 1,
    explanation: "지정된 단계(Specified Steps)는 시작과 끝 오브젝트 사이에 생성될 중간 오브젝트의 개수를 지정합니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 22,
    question: "블렌드 축(Spine)을 수정하려면?",
    options: ["직접 선택 도구로 편집", "불가능", "블렌드를 다시 만들어야 함", "그라디언트 도구 사용"],
    answer: 0,
    explanation: "직접 선택 도구(A)로 블렌드의 축(패스)을 선택하여 형태를 자유롭게 편집할 수 있습니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 23,
    question: "블렌드를 특정 패스를 따라 배치하려면?",
    options: ["오브젝트 > 블렌드 > 축 대체", "복사 붙여넣기", "그룹화", "불가능"],
    answer: 0,
    explanation: "블렌드와 패스를 선택 후 '축 대체'를 하면 블렌드가 해당 패스를 따라 배치됩니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 24,
    question: "그라디언트 메쉬(Gradient Mesh)의 특징은?",
    options: ["직선 그라디언트만 가능", "격자 형태로 복잡한 색상 전환 표현", "2색만 가능", "벡터가 아닌 비트맵"],
    answer: 1,
    explanation: "그라디언트 메쉬는 격자 형태의 메쉬 포인트마다 다른 색상을 지정하여 복잡한 음영을 표현합니다.",
    category: "그라디언트와 블렌드"
  },
  {
    id: 25,
    question: "메쉬 도구의 단축키는?",
    options: ["M", "U", "G", "B"],
    answer: 1,
    explanation: "메쉬 도구의 단축키는 U입니다.",
    category: "그라디언트와 블렌드"
  },
  // 클리핑 마스크와 불투명 마스크 (12문제)
  {
    id: 26,
    question: "클리핑 마스크의 단축키는?",
    options: ["Ctrl+6", "Ctrl+7", "Ctrl+8", "Ctrl+9"],
    answer: 1,
    explanation: "클리핑 마스크 만들기의 단축키는 Ctrl+7입니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 27,
    question: "클리핑 마스크에서 마스크 역할을 하는 오브젝트의 위치는?",
    options: ["맨 아래", "맨 위", "중간", "위치 상관없음"],
    answer: 1,
    explanation: "클리핑 마스크에서는 가장 위에 있는 오브젝트가 마스크(틀) 역할을 합니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 28,
    question: "클리핑 마스크 해제 단축키는?",
    options: ["Ctrl+Shift+7", "Ctrl+Alt+7", "Ctrl+7", "Shift+7"],
    answer: 1,
    explanation: "클리핑 마스크 해제는 Ctrl+Alt+7입니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 29,
    question: "클리핑 마스크와 불투명 마스크의 차이점은?",
    options: ["차이 없음", "클리핑은 형태로, 불투명은 밝기로 마스킹", "색상만 다름", "속도만 다름"],
    answer: 1,
    explanation: "클리핑 마스크는 패스 형태로, 불투명 마스크는 밝기(흑백)로 투명도를 결정합니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 30,
    question: "불투명 마스크에서 흰색의 의미는?",
    options: ["완전 투명", "완전 불투명(보임)", "회색", "관계없음"],
    answer: 1,
    explanation: "불투명 마스크에서 흰색 영역은 완전히 보이고, 검은색 영역은 완전히 투명해집니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 31,
    question: "불투명 마스크를 만드는 방법은?",
    options: ["Ctrl+7", "투명도 패널에서 '마스크 만들기'", "오브젝트 메뉴", "효과 메뉴"],
    answer: 1,
    explanation: "투명도(Transparency) 패널에서 '마스크 만들기'를 클릭하여 불투명 마스크를 생성합니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 32,
    question: "불투명 마스크의 '마스크 반전' 옵션의 효과는?",
    options: ["색상 반전", "흑백 영역의 투명도가 반대로 적용", "크기 반전", "위치 반전"],
    answer: 1,
    explanation: "마스크 반전을 체크하면 원래 보이던 부분이 투명해지고, 투명했던 부분이 보이게 됩니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 33,
    question: "복합 클리핑 패스의 용도는?",
    options: ["색상 변경", "여러 개의 구멍이 있는 마스크 생성", "애니메이션", "3D 효과"],
    answer: 1,
    explanation: "복합 패스를 마스크로 사용하면 도넛처럼 여러 개의 구멍이 있는 클리핑 영역을 만들 수 있습니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 34,
    question: "내부에 그리기(Draw Inside) 모드의 기능은?",
    options: ["레이어 잠금", "선택한 오브젝트 내부에만 그리기", "외부에만 그리기", "삭제 모드"],
    answer: 1,
    explanation: "내부에 그리기 모드는 자동으로 클리핑 마스크가 적용되어 선택한 오브젝트 영역 내부에만 그려집니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 35,
    question: "내부에 그리기 모드 활성화 방법은?",
    options: ["Shift+D 두 번", "도구 패널 하단의 그리기 모드 변경", "Ctrl+D", "두 가지 모두"],
    answer: 3,
    explanation: "Shift+D를 눌러 그리기 모드를 전환하거나 도구 패널 하단에서 직접 선택할 수 있습니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 36,
    question: "클리핑 마스크 내의 오브젝트를 개별 편집하려면?",
    options: ["마스크 해제 필요", "직접 선택 도구로 선택", "불가능", "새로 만들어야 함"],
    answer: 1,
    explanation: "직접 선택 도구(A)로 클리핑 마스크 내의 개별 오브젝트를 선택하여 편집할 수 있습니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  {
    id: 37,
    question: "클리핑 마스크 진입/편집 방법은?",
    options: ["더블클릭", "마스크 해제", "새로 만들기", "불가능"],
    answer: 0,
    explanation: "클리핑 마스크를 더블클릭하면 격리 모드로 진입하여 내부 오브젝트를 편집할 수 있습니다.",
    category: "클리핑 마스크와 불투명 마스크"
  },
  // 효과와 외관 (13문제)
  {
    id: 38,
    question: "일러스트레이터 효과(Effect)의 특징은?",
    options: ["원본 수정", "비파괴적(원본 유지)", "실행 취소 불가", "한 번만 적용 가능"],
    answer: 1,
    explanation: "효과는 비파괴적으로 적용되어 원본 오브젝트는 유지되며 언제든지 수정하거나 제거할 수 있습니다.",
    category: "효과와 외관"
  },
  {
    id: 39,
    question: "외관(Appearance) 패널의 단축키는?",
    options: ["Shift+F5", "Shift+F6", "Ctrl+F10", "F5"],
    answer: 1,
    explanation: "외관 패널은 Shift+F6 또는 창 > 외관으로 열 수 있습니다.",
    category: "효과와 외관"
  },
  {
    id: 40,
    question: "외관 패널에서 할 수 없는 작업은?",
    options: ["효과 추가", "여러 개의 면/선 추가", "앵커 포인트 편집", "효과 순서 변경"],
    answer: 2,
    explanation: "외관 패널에서는 효과와 면/선을 관리하지만, 앵커 포인트 편집은 직접 선택 도구로 합니다.",
    category: "효과와 외관"
  },
  {
    id: 41,
    question: "적용된 효과를 실제 패스로 변환하려면?",
    options: ["오브젝트 > 외관 확장", "복사 붙여넣기", "효과 삭제", "Ctrl+E"],
    answer: 0,
    explanation: "외관 확장(Expand Appearance)을 하면 효과가 적용된 형태가 실제 편집 가능한 패스로 변환됩니다.",
    category: "효과와 외관"
  },
  {
    id: 42,
    question: "왜곡과 변형 효과 중 '지그재그'의 결과는?",
    options: ["물결 모양", "톱니 또는 물결 패스", "회전", "원형"],
    answer: 1,
    explanation: "지그재그 효과는 패스를 뾰족한 톱니 또는 부드러운 물결 모양으로 변형합니다.",
    category: "효과와 외관"
  },
  {
    id: 43,
    question: "스타일라이즈 효과 중 '둥근 모서리'의 기능은?",
    options: ["모서리를 뾰족하게", "직각 모서리를 둥글게 처리", "모서리 삭제", "색상 변경"],
    answer: 1,
    explanation: "둥근 모서리 효과는 오브젝트의 직각 모서리를 지정한 반지름으로 둥글게 만듭니다.",
    category: "효과와 외관"
  },
  {
    id: 44,
    question: "3D 효과 적용 시 '매핑' 기능의 용도는?",
    options: ["색상 변경", "3D 표면에 심볼 배치", "크기 조절", "그림자 추가"],
    answer: 1,
    explanation: "3D 효과의 매핑(Map Art) 기능으로 3D 오브젝트 표면에 심볼 아트워크를 입힐 수 있습니다.",
    category: "효과와 외관"
  },
  {
    id: 45,
    question: "그래픽 스타일(Graphic Style)의 용도는?",
    options: ["패스 단순화", "외관 속성을 저장하여 다른 오브젝트에 적용", "색상 추출", "레이어 관리"],
    answer: 1,
    explanation: "그래픽 스타일은 면, 선, 효과 등 외관 속성의 조합을 저장하여 재사용할 수 있게 합니다.",
    category: "효과와 외관"
  },
  {
    id: 46,
    question: "하나의 오브젝트에 여러 개의 선(Stroke)을 추가하려면?",
    options: ["불가능", "외관 패널에서 새 선 추가", "레이어 복사", "패스 복사"],
    answer: 1,
    explanation: "외관 패널에서 '새 선 추가'를 클릭하면 하나의 오브젝트에 여러 개의 선을 적용할 수 있습니다.",
    category: "효과와 외관"
  },
  {
    id: 47,
    question: "효과 > 경로 > 패스 오프셋과 오브젝트 메뉴의 패스 오프셋의 차이는?",
    options: ["차이 없음", "효과는 비파괴적, 오브젝트 메뉴는 실제 패스 생성", "색상만 다름", "속도 차이"],
    answer: 1,
    explanation: "효과 메뉴의 패스 오프셋은 비파괴적으로 적용되고, 오브젝트 메뉴는 실제 새 패스를 생성합니다.",
    category: "효과와 외관"
  },
  {
    id: 48,
    question: "래스터화(Rasterize) 효과의 결과는?",
    options: ["벡터 유지", "벡터를 비트맵으로 표시(외관만)", "파일 삭제", "색상 변경"],
    answer: 1,
    explanation: "래스터화 효과는 벡터 오브젝트를 비트맵처럼 보이게 하지만 원본 벡터는 유지됩니다.",
    category: "효과와 외관"
  },
  {
    id: 49,
    question: "포토샵 효과(Photoshop Effects)를 적용할 때 필요한 설정은?",
    options: ["특별한 설정 없음", "문서의 래스터 효과 설정(해상도)", "레이어 잠금", "색상 모드 변경"],
    answer: 1,
    explanation: "포토샵 효과 적용 시 효과 > 문서 래스터 효과 설정에서 해상도를 적절히 설정해야 품질이 유지됩니다.",
    category: "효과와 외관"
  },
  {
    id: 50,
    question: "외관 속성을 복사하여 다른 오브젝트에 적용하는 도구는?",
    options: ["선택 도구", "스포이드 도구", "펜 도구", "브러시 도구"],
    answer: 1,
    explanation: "스포이드 도구(I)는 오브젝트의 외관 속성(면, 선, 효과 등)을 복사하여 다른 오브젝트에 적용합니다.",
    category: "효과와 외관"
  }
];

export default function AIAdvancedPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gtqi-ai-advanced-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setScore(progress.score || 0);
      setAnsweredQuestions(new Set(progress.answered || []));
      setCurrentQuestion(progress.current || 0);
    }
  }, []);

  const saveProgress = (newScore: number, answered: Set<number>, current: number) => {
    localStorage.setItem('gtqi-ai-advanced-progress', JSON.stringify({
      score: newScore,
      answered: Array.from(answered),
      current
    }));
  };

  const handleAnswer = (index: number) => {
    if (answeredQuestions.has(currentQuestion)) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    const newAnswered = new Set(answeredQuestions).add(currentQuestion);
    setAnsweredQuestions(newAnswered);

    let newScore = score;
    if (index === questions[currentQuestion].answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    saveProgress(newScore, newAnswered, currentQuestion);

    if (newAnswered.size === questions.length) {
      setIsComplete(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      saveProgress(score, answeredQuestions, currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setIsComplete(false);
    localStorage.removeItem('gtqi-ai-advanced-progress');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "심볼과 패턴": "bg-orange-100 text-orange-800",
      "그라디언트와 블렌드": "bg-amber-100 text-amber-800",
      "클리핑 마스크와 불투명 마스크": "bg-yellow-100 text-yellow-800",
      "효과와 외관": "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const progress = (answeredQuestions.size / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/design/gtqi" className="inline-flex items-center text-orange-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            GTQi 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">고급 기능</h1>
          <p className="text-orange-100">심볼, 패턴, 그라디언트, 마스크, 효과</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">학습 진행률</span>
            <span className="text-sm font-medium text-orange-600">{answeredQuestions.size} / {questions.length} 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">현재 점수: {score}점</span>
            <span className="text-sm text-gray-500">정답률: {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%</span>
          </div>
        </div>

        {/* Complete Message */}
        {isComplete && (
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-lg p-8 mb-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">학습 완료!</h2>
            <p className="text-xl mb-4">최종 점수: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</p>
            <button
              onClick={resetQuiz}
              className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
            >
              다시 도전하기
            </button>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>
              {question.category}
            </span>
            <span className="text-gray-500 text-sm">문제 {currentQuestion + 1} / {questions.length}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ";

              if (showExplanation) {
                if (index === question.answer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== question.answer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              } else if (answeredQuestions.has(currentQuestion)) {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed";
              } else {
                buttonClass += "border-gray-200 hover:border-orange-400 hover:bg-orange-50 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answeredQuestions.has(currentQuestion)}
                  className={buttonClass}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-2">💡 해설</h3>
              <p className="text-amber-900">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전 문제
          </button>

          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            처음부터 다시
          </button>

          <button
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            다음 문제
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Category Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4">📚 카테고리별 문제 분포</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["심볼과 패턴", "그라디언트와 블렌드", "클리핑 마스크와 불투명 마스크", "효과와 외관"].map((category, idx) => {
              const count = questions.filter(q => q.category === category).length;
              return (
                <div key={idx} className={`p-3 rounded-lg ${getCategoryColor(category)}`}>
                  <div className="font-medium text-sm">{category}</div>
                  <div className="text-sm opacity-80">{count}문제</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
