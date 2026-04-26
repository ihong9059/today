"""
레거시 코드 분석 실습용 샘플
Day 4에서 Claude에게 분석을 요청하는 용도
"""

import hashlib, hmac, time, struct

def gen_otp(secret, interval=30):
    t = struct.pack('>Q', int(time.time()) // interval)
    h = hmac.new(secret.encode(), t, hashlib.sha1).digest()
    o = h[-1] & 0x0F
    code = struct.unpack('>I', h[o:o+4])[0] & 0x7FFFFFFF
    return str(code % 10**6).zfill(6)

def calc(a,b,c):
    if a>0:
        x=a*b+c
        if x>100:
            return x-10
        else:
            return x
    else:
        return 0

def process_users(data):
    result = []
    for i in range(len(data)):
        if data[i]['age'] > 18:
            if data[i]['status'] == 'active':
                if data[i]['email'] != '':
                    result.append({
                        'name': data[i]['name'],
                        'email': data[i]['email'],
                        'type': 'adult_active'
                    })
    return result

def get_user(user_id):
    import sqlite3
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor.execute(query)
    result = cursor.fetchone()
    conn.close()
    return result
