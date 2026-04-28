import requests, json, os, re, glob

TOKEN = os.environ.get('NOTION_TOKEN')
HEADERS = {'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28'}
PARENT_ID = '343cb620-8c2b-8032-829c-e4655bf9e974'

NOTION_LANGUAGES = ['bash','python','javascript','json','typescript','html','css','java','c++','c#',
    'ruby','go','rust','sql','shell','markdown','plain text','yaml','toml','xml','kotlin','swift',
    'php','r','lua','dart','scala','perl','docker','makefile','arduino','latex','mermaid']

def parse_inline(text):
    result = []
    remaining = text.strip()
    if not remaining:
        return [{'type': 'text', 'text': {'content': ' '}}]
    while remaining:
        m_bold = re.search(r'\*\*(.+?)\*\*', remaining)
        m_code = re.search(r'`(.+?)`', remaining)
        m_link = re.search(r'\[(.+?)\]\((.+?)\)', remaining)
        matches = []
        if m_bold: matches.append((m_bold.start(), m_bold, 'bold'))
        if m_code: matches.append((m_code.start(), m_code, 'code'))
        if m_link: matches.append((m_link.start(), m_link, 'link'))
        if not matches:
            result.append({'type': 'text', 'text': {'content': remaining}})
            break
        matches.sort(key=lambda x: x[0])
        pos, match, mtype = matches[0]
        if pos > 0:
            result.append({'type': 'text', 'text': {'content': remaining[:pos]}})
        if mtype == 'bold':
            result.append({'type': 'text', 'text': {'content': match.group(1)}, 'annotations': {'bold': True}})
        elif mtype == 'code':
            result.append({'type': 'text', 'text': {'content': match.group(1)}, 'annotations': {'code': True}})
        elif mtype == 'link':
            result.append({'type': 'text', 'text': {'content': match.group(1), 'link': {'url': match.group(2)}}})
        remaining = remaining[match.end():]
    return result

def md_to_notion_blocks(md_text):
    blocks = []
    lines = md_text.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue

        # Headings (####/##### → heading_3, Notion only supports h1~h3)
        if line.startswith('##### '):
            blocks.append({'object': 'block', 'type': 'heading_3', 'heading_3': {'rich_text': parse_inline(line[6:])}})
        elif line.startswith('#### '):
            blocks.append({'object': 'block', 'type': 'heading_3', 'heading_3': {'rich_text': parse_inline(line[5:])}})
        elif line.startswith('### '):
            blocks.append({'object': 'block', 'type': 'heading_3', 'heading_3': {'rich_text': parse_inline(line[4:])}})
        elif line.startswith('## '):
            blocks.append({'object': 'block', 'type': 'heading_2', 'heading_2': {'rich_text': parse_inline(line[3:])}})
        elif line.startswith('# '):
            blocks.append({'object': 'block', 'type': 'heading_1', 'heading_1': {'rich_text': parse_inline(line[2:])}})

        # Divider
        elif line.strip() == '---':
            blocks.append({'object': 'block', 'type': 'divider', 'divider': {}})

        # Quote
        elif line.startswith('> '):
            blocks.append({'object': 'block', 'type': 'quote', 'quote': {'rich_text': parse_inline(line[2:])}})

        # Numbered list
        elif re.match(r'^\d+\.\s', line):
            text = re.sub(r'^\d+\.\s', '', line)
            blocks.append({'object': 'block', 'type': 'numbered_list_item', 'numbered_list_item': {'rich_text': parse_inline(text)}})

        # Bulleted list
        elif line.startswith('- ') or line.startswith('* '):
            blocks.append({'object': 'block', 'type': 'bulleted_list_item', 'bulleted_list_item': {'rich_text': parse_inline(line[2:])}})

        # Code block
        elif line.startswith('```'):
            lang = line[3:].strip() or 'plain text'
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].startswith('```'):
                code_lines.append(lines[i])
                i += 1
            code_text = '\n'.join(code_lines)[:1900]
            if lang not in NOTION_LANGUAGES:
                lang = 'plain text'
            blocks.append({'object': 'block', 'type': 'code', 'code': {
                'rich_text': [{'type': 'text', 'text': {'content': code_text}}],
                'language': lang
            }})

        # Table
        elif line.startswith('|'):
            table_rows = []
            while i < len(lines) and lines[i].startswith('|'):
                row = lines[i]
                if re.match(r'^\|[\s\-:]+\|', row):
                    i += 1
                    continue
                cells = [c.strip() for c in row.split('|')[1:-1]]
                table_rows.append(cells)
                i += 1
            i -= 1
            if table_rows:
                width = max(len(r) for r in table_rows)
                notion_rows = []
                for row in table_rows:
                    while len(row) < width:
                        row.append('')
                    notion_rows.append({
                        'type': 'table_row',
                        'table_row': {'cells': [[{'type': 'text', 'text': {'content': cell[:2000]}}] for cell in row]}
                    })
                blocks.append({'object': 'block', 'type': 'table', 'table': {
                    'table_width': width,
                    'has_column_header': True,
                    'has_row_header': False,
                    'children': notion_rows
                }})

        # Paragraph
        else:
            blocks.append({'object': 'block', 'type': 'paragraph', 'paragraph': {'rich_text': parse_inline(line[:2000])}})

        i += 1
    return blocks


# 1. Create parent page
data = {
    'parent': {'page_id': PARENT_ID},
    'properties': {'title': {'title': [{'text': {'content': '유투브 영상 정리'}}]}},
    'children': [
        {'object': 'block', 'type': 'callout', 'callout': {
            'rich_text': [{'type': 'text', 'text': {'content': 'YouTube 영상 상세 분석 모음 (9개)'}}],
            'icon': {'type': 'emoji', 'emoji': '🎬'}
        }}
    ]
}
r = requests.post('https://api.notion.com/v1/pages', headers=HEADERS, json=data)
parent_page_id = r.json()['id']
print(f"Parent page created: {r.status_code}")

# 2. Upload each file
files = sorted(glob.glob('C:/todo/today/유투브/*_상세.md'))
for filepath in files:
    filename = os.path.basename(filepath)
    title = filename.replace('_상세.md', '').replace('_', ' ')

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    blocks = md_to_notion_blocks(content)
    first_batch = blocks[:100]
    remaining_blocks = blocks[100:]

    data = {
        'parent': {'page_id': parent_page_id},
        'properties': {'title': {'title': [{'text': {'content': title}}]}},
        'children': first_batch
    }
    r = requests.post('https://api.notion.com/v1/pages', headers=HEADERS, json=data)
    if r.status_code == 200:
        page_id = r.json()['id']
        while remaining_blocks:
            batch = remaining_blocks[:100]
            remaining_blocks = remaining_blocks[100:]
            requests.patch(
                f'https://api.notion.com/v1/blocks/{page_id}/children',
                headers=HEADERS,
                json={'children': batch}
            )
        print(f"OK: {title}")
    else:
        print(f"FAIL: {title} - {r.status_code} {r.text[:150]}")

print("\nDone!")
