# 현재 디렉토리를 ./prisma로 변경
Set-Location -Path ./prisma

# .prisma 확장자 파일 목록을 조회하여 처리
Get-ChildItem -Filter *.prisma | ForEach-Object {
    $FILENAME = $_.BaseName   # 파일의 확장자를 제외한 이름 (예: datalake)

    # .env 파일에서 NODE_ENV 값을 가져오기
    $NODE_ENV = (Get-Content ../.env | Where-Object { $_ -match "NODE_ENV=(.*)" } | ForEach-Object { $matches[1] }).Trim('"')
    
    # .env.$NODE_ENV 파일에서 FILENAME_URL 값을 가져오기
    $FILENAME_URL_KEY = ($FILENAME.ToUpper() + "_URL")
    $FILENAME_URL_VALUE = (Get-Content "../.env.$NODE_ENV" | Where-Object { $_ -match "${FILENAME_URL_KEY}=(.*)" } | ForEach-Object { $matches[1] }).Trim('"')
    # 환경 변수 설정
    Invoke-Expression "`$env:$FILENAME_URL_KEY=`"$FILENAME_URL_VALUE`""

    # npx 명령어 실행
    npx prisma db pull --schema ./$_
}
