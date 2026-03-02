import subprocess
import json
import re

# Level 0-3 URLs
urls = {
    "0-1": "sgpwugVa-nU",
    "0-2": "3HVABWZ_9k4",
    "0-3": "bqGo0MLmalY",
    "0-4": "NmhrGQEDSyk",
    "0-5": "FDrQYwXtxQ0",
    "0-6": "Dzp4NArtZA4",
    "1-1": "WISowL99Kbc",
    "1-2": "d998ZCeuyKE",
    "1-3": "woI2BK7saGU",
    "1-4": "z9cg91gibog",
    "1-5": "S0GCtxtr4Cs",
    "1-6": "kmpmxwriZKM",
    "2-1": "xU1f_NzCXYA",
    "2-2": "OecaaTV7XpQ",
    "2-3": "rzeBwqhlA1o",
    "2-4": "OMU4--8ibtw",
    "2-5": "L2OFSAaPfRg",
    "2-6": "L2OFSAaPfRg",
    "2-7": "g6P2lxIbpq8",
    "2-8": "QfEAerHu96c",
    "3-1": "eGngrAuU7hc",
    "3-2": "yJhQTyFw3Kw",
    "3-3": "rYBb0NkQv2Y",
    "3-4": "HLUvr_tDtiA",
    "3-5": "kIxNJv_XUDE",
    "3-6": "JhNEuQDL2mk",
    "3-7": "JrwQJ90qyP0",
    "3-8": "c6-4t7dwyhE",
}

for lesson_id, video_id in urls.items():
    print(f"{lesson_id}: https://youtu.be/{video_id}")
