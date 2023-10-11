# 현재 디렉토리를 ./prisma로 변경
Set-Location -Path ./prisma

# .prisma 확장자 파일 목록을 조회하여 처리
Get-ChildItem -Filter *.prisma | ForEach-Object {
    # npx 명령어 실행
    npx prisma generate --schema ./$_
}