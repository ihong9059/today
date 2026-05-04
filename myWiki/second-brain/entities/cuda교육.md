---
title: CUDA / Jetson 교육
type: entity
created: 2026-04-19
updated: 2026-04-19
tags: [교육, GPU, CUDA, Jetson, AI]
links: [ai-landscape, skills, uttec-edu, 서버인프라]
---

# CUDA / Jetson 교육

## 한 줄 정의
6주 CUDA 병렬 프로그래밍 커리큘럼. Jetson Nano + PC(NVIDIA GPU) 환경.

## 구성
| 주차 | 주제 | 핵심 코드 |
|------|------|----------|
| 1 | Jetson 셋업, CUDA 개념, Hello CUDA | CPU vs GPU 벤치마크 |
| 2 | Thread/Block/Grid, 메모리 할당 | Vector Add, SAXPY |
| 3 | 메모리 계층, Shared Memory | 행렬 곱셈, Reduction |
| 4 | 이미지 처리 (stb_image) | Grayscale, Blur, Edge |
| 5 | OpenCV + CUDA, TensorRT | 객체 검출, 실시간 비디오 |
| 6 | 최종 프로젝트 | 기획→구현→발표 |

## 핵심 인사이트
- GPU 이점은 50M+ 요소에서 명확해짐
- Jetson: Unified Memory (Host/Device 공유) vs PC: 분리 구조
- 50개+ 파일 (.cu, .cpp, 가이드 문서)

## 관련 페이지
- [[uttec-edu]]: 상위 교육 플랫폼
- [[skills]]: CUDA, Jetson Nano 기술
- [[ai-landscape]]: 온디바이스 AI 기술
- [[서버인프라]]: Jetson Nano 에지 서버
