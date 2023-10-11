#!/bin/bash

# 현재 디렉토리를 ./prisma로 변경
cd ./prisma

# .prisma 확장자 파일 목록을 조회하여 처리
for FILE in *.prisma; do
    # 파일의 확장자를 제외한 이름
    FILENAME=$(basename "$FILE" .prisma)

    # .env 파일에서 NODE_ENV 값을 가져오기
    NODE_ENV=$(grep "NODE_ENV=" ../.env | cut -d '=' -f2 | tr -d '"')

    # .env.$NODE_ENV 파일에서 FILENAME_URL 값을 가져오기
    FILENAME_URL_KEY="${FILENAME^^}_URL"
    FILENAME_URL_VALUE=$(grep "${FILENAME_URL_KEY}=" "../.env.$NODE_ENV" | cut -d '=' -f2- | tr -d '"')

    # 환경 변수 설정
    export $FILENAME_URL_KEY=$FILENAME_URL_VALUE

    # npx 명령어 실행
    npx prisma db pull --schema "./$FILE"
done