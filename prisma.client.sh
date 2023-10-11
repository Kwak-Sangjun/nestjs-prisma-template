#!/bin/bash
# 현재 디렉토리를 ./prisma로 변경
cd ./prisma

# .prisma 확장자 파일 목록을 조회하여 처리
for FILE in *.prisma; do
    # npx 명령어 실행
    npx prisma generate --schema "./$FILE"
done
