---
name: reference_dwg_read_oda
description: DWG(AutoCAD) 도면 판독 = ODA File Converter 로컬 추출 + ezdxf. 재변환 말고 이 경로 재사용
metadata: 
  node_type: memory
  type: reference
  originSessionId: f5babae0-09c9-44d2-adf8-855cdc4d9c22
---

DWG 파일(AutoCAD, 예: AC1032=2018) 판독 표준 경로. 2026-07-23 삼환전기 보안등 도면(E13·E2) 판독 시 확립.

**설치 (관리자 권한 불필요):**
- ODA File Converter 실행파일: `C:\todo\tools\oda\ODAFileConverter.exe` (v27.1, 모든 DLL·.tx 모듈 동봉)
- 설치법: opendesign.com guestfiles에서 MSI 다운로드 → `msiexec /a package.msi /qn TARGETDIR=C:\todo\tools\oda` (admin 없이 페이로드만 추출)

**판독 (Python, ezdxf 1.4.4 + odafc addon 이미 설치됨):**
```python
from ezdxf.addons import odafc
odafc.win_exec_path = r"C:\todo\tools\oda\ODAFileConverter.exe"
doc = odafc.readfile(dwg_path)   # DWG→DXF 자동 변환 후 로드
# msp = doc.modelspace(); TEXT/MTEXT/ATTRIB/INSERT.attribs 순회로 도면 텍스트 완전 추출
```
- 렌더: ezdxf.addons.drawing MatplotlibBackend + malgun.ttf 등록 → PNG.
- UTF-8 출력은 PowerShell `>` 리다이렉트 금지(UTF-16 재인코딩로 한글 깨짐) → Python에서 직접 `open(...,encoding='utf-8')`로 파일 쓰기.

🚫 막다른 길 (재시도 금지):
- **aspose-cad 무료판** = 실제 도면 대신 X자 워터마크만 렌더(평가 제한). 라이선스 없이 무의미.
- **strings 직접 추출** = AC1032는 객체 데이터 압축 저장이라 텍스트 안 나옴(노이즈만).

관련: [[reference_samhwan_electric]] 도면 판독이 이 인프라 확립 계기.
