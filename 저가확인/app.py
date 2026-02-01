# -*- coding: utf-8 -*-
"""
쿠팡 서울우유 저가 품목 검색 웹 서버
100ml당 300원 이하 제품을 찾아 리스트합니다.

사용법:
1. 브라우저에서 쿠팡 검색 결과 페이지 열기
2. Ctrl+S로 HTML 저장
3. 이 서버에 HTML 파일 업로드
"""

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from bs4 import BeautifulSoup
import re
import os
from datetime import datetime

app = Flask(__name__)

# 데이터 저장 폴더
DATA_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
CORS(app)  # Chrome 확장 프로그램에서 접근 허용

# 업로드 폴더
UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__))


def extract_volume_ml(text):
    """
    텍스트에서 용량(ml) 추출
    예: "1000ml", "1L", "200ml x 24개" 등
    """
    text = text.lower().replace(',', '')

    # 패턴: 숫자 x 개수 형태 처리 (예: 200ml x 24개)
    pack_pattern = r'(\d+(?:\.\d+)?)\s*ml\s*[x×]\s*(\d+)'
    pack_match = re.search(pack_pattern, text)
    if pack_match:
        ml = float(pack_match.group(1))
        count = int(pack_match.group(2))
        return ml * count

    # L 단위 x 개수
    liter_pack_pattern = r'(\d+(?:\.\d+)?)\s*l\s*[x×]\s*(\d+)'
    liter_pack_match = re.search(liter_pack_pattern, text)
    if liter_pack_match:
        liters = float(liter_pack_match.group(1))
        count = int(liter_pack_match.group(2))
        return liters * 1000 * count

    # 개수 x 용량 형태 (예: 24개 x 200ml)
    reverse_pack_pattern = r'(\d+)\s*개?\s*[x×]\s*(\d+(?:\.\d+)?)\s*ml'
    reverse_match = re.search(reverse_pack_pattern, text)
    if reverse_match:
        count = int(reverse_match.group(1))
        ml = float(reverse_match.group(2))
        return ml * count

    # 단순 ml
    ml_pattern = r'(\d+(?:\.\d+)?)\s*ml'
    ml_match = re.search(ml_pattern, text)
    if ml_match:
        return float(ml_match.group(1))

    # L 단위
    liter_pattern = r'(\d+(?:\.\d+)?)\s*l(?:iter)?(?!\w)'
    liter_match = re.search(liter_pattern, text)
    if liter_match:
        return float(liter_match.group(1)) * 1000

    return None


def extract_price(text):
    """가격 추출 (예: "12,900원" -> 12900)"""
    text = text.replace(',', '').replace(' ', '')
    match = re.search(r'(\d+)', text)
    if match:
        return int(match.group(1))
    return None


def extract_unit_price(text):
    """
    텍스트에서 100ml당 가격 추출
    예: "(100ml당 283원)" -> 283
    """
    # 100ml당 가격 패턴
    pattern = r'\(100ml당\s*(\d+(?:,\d+)?)\s*원\)'
    match = re.search(pattern, text)
    if match:
        price_str = match.group(1).replace(',', '')
        return float(price_str)
    return None


def extract_sale_price(text):
    """
    가격 텍스트에서 할인가 추출
    예: "할인23,140원14%19,800원" -> 19800 (할인가)
    예: "9,260원" -> 9260
    """
    text = text.replace(',', '').replace(' ', '')

    # 할인가 패턴: 퍼센트 뒤에 나오는 가격
    discount_pattern = r'\d+%(\d+)원'
    match = re.search(discount_pattern, text)
    if match:
        return int(match.group(1))

    # 일반 가격 (숫자+원)
    price_pattern = r'(\d+)원'
    matches = re.findall(price_pattern, text)
    if matches:
        # 마지막 가격이 보통 실제 판매가
        return int(matches[-1])

    return None


def parse_coupang_html(html_content, max_price_per_100ml=300):
    """쿠팡 HTML에서 상품 파싱 (새로운 UI 지원)"""
    results = []
    soup = BeautifulSoup(html_content, 'html.parser')

    # 새로운 쿠팡 UI: ProductUnit 클래스
    products = soup.select('[class*="ProductUnit_productUnit"]')

    # 기존 UI 폴백
    if not products:
        products = soup.select('li.search-product')
    if not products:
        products = soup.select('li[class*="search-product"]')

    print(f"Found {len(products)} total products")

    for product in products:
        try:
            # 상품명 (새 UI)
            name_elem = product.select_one('[class*="productName"]')
            if not name_elem:
                name_elem = product.select_one('[class*="name"]')
            if not name_elem:
                name_elem = product.select_one('div.name')

            name = name_elem.get_text(strip=True) if name_elem else ''

            if not name:
                continue

            # 서울우유 제품만 필터링
            if '서울우유' not in name and '서울 우유' not in name:
                continue

            # 가격 영역 (새 UI)
            price_elem = product.select_one('[class*="PriceArea"]')
            if not price_elem:
                price_elem = product.select_one('[class*="price"]')

            price_text = price_elem.get_text(strip=True) if price_elem else ''

            # 100ml당 가격 직접 추출 시도 (쿠팡이 이미 계산해둠)
            price_per_100ml = extract_unit_price(price_text)

            # 판매가 추출
            price = extract_sale_price(price_text)

            if not price:
                continue

            # 100ml당 가격이 없으면 직접 계산
            if not price_per_100ml:
                volume_ml = extract_volume_ml(name)
                if volume_ml and volume_ml > 0:
                    price_per_100ml = (price / volume_ml) * 100
                else:
                    print(f"  Skipping (no volume): {name[:50]}...")
                    continue
            else:
                # 역으로 용량 계산
                volume_ml = (price / price_per_100ml) * 100

            # 링크
            link_elem = product.select_one('a[href*="/products/"]')
            if not link_elem:
                link_elem = product.select_one('a[href*="/vp/products/"]')
            if not link_elem:
                link_elem = product.select_one('a')

            link = ''
            if link_elem and link_elem.get('href'):
                href = link_elem.get('href')
                if href.startswith('/'):
                    link = 'https://www.coupang.com' + href
                elif href.startswith('//'):
                    link = 'https:' + href
                elif not href.startswith('http'):
                    link = 'https://www.coupang.com' + href
                else:
                    link = href

            # 모든 서울우유 제품 로그
            print(f"  서울우유: {name[:40]}... | {price:,}원 | {volume_ml:.0f}ml | {price_per_100ml:.1f}원/100ml")

            # 기준 가격 이하인 경우만 추가
            if price_per_100ml <= max_price_per_100ml:
                results.append({
                    'name': name,
                    'price': price,
                    'volume_ml': round(volume_ml),
                    'price_per_100ml': round(price_per_100ml, 2),
                    'link': link
                })

        except Exception as e:
            print(f"Error parsing product: {e}")
            continue

    # 100ml당 가격 기준 정렬
    results.sort(key=lambda x: x['price_per_100ml'])
    print(f"\nTotal matching products (<=300원/100ml): {len(results)}")

    return results


@app.route('/')
def index():
    """메인 페이지"""
    return render_template('index.html')


@app.route('/api/upload', methods=['POST'])
def api_upload():
    """HTML 파일 업로드 및 파싱"""
    if 'file' not in request.files:
        return jsonify({'success': False, 'error': 'No file uploaded'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'error': 'No file selected'})

    try:
        # HTML 내용 읽기
        html_content = file.read().decode('utf-8', errors='ignore')

        # 파싱
        products = parse_coupang_html(html_content, max_price_per_100ml=300)

        return jsonify({
            'success': True,
            'count': len(products),
            'threshold': 300,
            'products': products
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/api/parse-text', methods=['POST'])
def api_parse_text():
    """HTML 텍스트 직접 파싱"""
    data = request.get_json()
    if not data or 'html' not in data:
        return jsonify({'success': False, 'error': 'No HTML provided'})

    try:
        html_content = data['html']
        auto_save = data.get('auto_save', False)
        products = parse_coupang_html(html_content, max_price_per_100ml=300)

        # 자동 저장 요청 시 파일로 저장
        if auto_save and products:
            save_to_markdown(products)

        return jsonify({
            'success': True,
            'count': len(products),
            'threshold': 300,
            'products': products
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


def save_to_markdown(products):
    """분석 결과를 마크다운 파일로 저장"""
    os.makedirs(DATA_FOLDER, exist_ok=True)

    now = datetime.now()
    filename = now.strftime('%Y-%m-%d_%H%M%S') + '.md'
    filepath = os.path.join(DATA_FOLDER, filename)

    content = f"""# 서울우유 저가 품목 검색 결과

- **검색 시간**: {now.strftime('%Y-%m-%d %H:%M:%S')}
- **기준 가격**: 100ml당 300원 이하
- **발견 개수**: {len(products)}개

## 저가 품목 리스트

| # | 상품명 | 판매가 | 용량 | 100ml당 가격 |
|---|--------|--------|------|--------------|
"""

    for i, p in enumerate(products, 1):
        name = p['name'][:50] + '...' if len(p['name']) > 50 else p['name']
        link = f"[{name}]({p['link']})" if p.get('link') else name
        content += f"| {i} | {link} | {p['price']:,}원 | {p['volume_ml']}ml | **{p['price_per_100ml']}원** |\n"

    content += f"\n---\n*자동 생성됨*\n"

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"[저장] {filepath}")
    return filepath


@app.route('/api/save', methods=['POST'])
def api_save():
    """분석 결과를 마크다운으로 저장"""
    data = request.get_json()
    if not data or 'products' not in data:
        return jsonify({'success': False, 'error': 'No products provided'})

    try:
        products = data['products']
        if not products:
            return jsonify({'success': False, 'error': 'No products to save'})

        filepath = save_to_markdown(products)
        return jsonify({
            'success': True,
            'filepath': filepath,
            'filename': os.path.basename(filepath)
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/api/history')
def api_history():
    """저장된 분석 기록 조회"""
    try:
        os.makedirs(DATA_FOLDER, exist_ok=True)
        files = []
        for f in sorted(os.listdir(DATA_FOLDER), reverse=True):
            if f.endswith('.md'):
                filepath = os.path.join(DATA_FOLDER, f)
                stat = os.stat(filepath)
                files.append({
                    'filename': f,
                    'size': stat.st_size,
                    'created': datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d %H:%M:%S')
                })
        return jsonify({'success': True, 'files': files[:50]})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


if __name__ == '__main__':
    print("=" * 60)
    print("쿠팡 서울우유 저가 품목 검색 서버")
    print("100ml당 250원 이하 제품을 찾습니다.")
    print("=" * 60)
    print("사용법:")
    print("1. 브라우저에서 쿠팡 '서울우유' 검색")
    print("2. Ctrl+S로 페이지를 HTML로 저장")
    print("3. 이 서버에 HTML 파일 업로드")
    print("=" * 60)
    print("서버 시작: http://localhost:5000")
    print("=" * 60)
    app.run(host='0.0.0.0', port=5000, debug=True)
