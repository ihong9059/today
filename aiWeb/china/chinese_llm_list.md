# 중국 LLM AI 목록

| 순번 | 모델명 | 개발사 | 무료 API | API 링크 | 비고 |
|:----:|--------|--------|:--------:|----------|------|
| 1 | **DeepSeek-R1** | DeepSeek | ✅ 무료 크레딧 | https://platform.deepseek.com | 671B 파라미터, MIT 라이선스, 가장 저렴 |
| 2 | **DeepSeek-V3** | DeepSeek | ✅ 무료 크레딧 | https://platform.deepseek.com | 효율성 최고, $0.14/1M 토큰 |
| 3 | **Qwen2.5** | Alibaba | ✅ 무료 티어 | https://dashscope.aliyun.com | 0.5B~72B 다양한 크기 |
| 4 | **Qwen2.5-Max** | Alibaba | ✅ 무료 티어 | https://dashscope.aliyun.com | $0.38/1M 토큰 |
| 5 | **Kimi K2** | Moonshot AI | ✅ 무료 크레딧 | https://platform.moonshot.cn | 128K 컨텍스트, 비미국 최강 |
| 6 | **ERNIE 4.5** | Baidu | ⚠️ 제한적 | https://cloud.baidu.com/product/wenxinworkshop | 중국어 최적화 |
| 7 | **GLM-4.5** | Zhipu AI | ✅ 무료 티어 | https://open.bigmodel.cn | 355B 파라미터 |
| 8 | **Doubao** | ByteDance | ⚠️ 중국 내 | https://www.volcengine.com | 소비자 중심 앱 |
| 9 | **Yi-Large** | 01.AI | ✅ 무료 티어 | https://platform.lingyiwanwu.com | Apache 2.0 |
| 10 | **Baichuan** | Baichuan | ✅ 무료 티어 | https://platform.baichuan-ai.com | Apache 2.0 |

---

## 무료 API 접근 상세

### 1. DeepSeek (추천)
- **가입**: https://platform.deepseek.com
- **무료 크레딧**: 신규 가입 시 500만 토큰 무료
- **가격**: $0.14/1M 입력, $0.28/1M 출력 (업계 최저)
- **특징**: OpenAI 호환 API

### 2. Alibaba Qwen
- **가입**: https://dashscope.aliyun.com
- **무료 티어**: 월 100만 토큰 무료
- **특징**: 다양한 모델 크기 선택 가능

### 3. Moonshot Kimi
- **가입**: https://platform.moonshot.cn
- **무료 크레딧**: 신규 가입 시 제공
- **특징**: 128K 컨텍스트 윈도우

### 4. Zhipu GLM
- **가입**: https://open.bigmodel.cn
- **무료 티어**: 제한적 무료 사용
- **특징**: 중국어 성능 우수

---

## API 형식 비교

| 모델 | API 형식 | 인증 방식 |
|------|----------|-----------|
| DeepSeek | OpenAI 호환 | API Key |
| Qwen | 자체 SDK | API Key |
| Kimi | OpenAI 호환 | API Key |
| GLM | 자체 SDK | API Key + JWT |

---

*작성일: 2026-02-14*
