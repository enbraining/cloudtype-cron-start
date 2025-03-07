# 실행하기

## ZIP 파일 생성하기

```
mkdir nodejs
npm install
mv node_modules nodejs
zip -r layer.zip nodejs
```

## 람다 레이어 생성

`Lambda - Layers - Create layer - 아래와 같이 입력`

- name: nodeModulesLayer
- Choose file (layer.zip)

## AWS Lambda 함수 만들기

`AWS - Lambda - Create function - Author from scratch - 아래와 같이 입력 - Create function`

- Function name: cloudtypeCronFunction
- Runtime: Node.js 22.x
- Architecture: x86_64

## 람다 함수에 레이어 추가

`AWS - Lambda - Functions - cloudtypeCronFunction - Code - Layers - Add a layer`

- Choose a layer
  - Layer source: Specify an ARN
  - Specify an ARN: 생성한 레이어 ARN

## 환경변수 설정하기

`AWS - Lambda - Functions - cloudtypeCronFunction - Configuration - Environment variables - Edit - 아래의 환경변수 추가`

- `USER_EMAIL`: 이메일
- `USER_PASSWORD`: 비밀번호
- `ACCOUNT_NAME`: 계정 이름
- `PROJECT_NAME`: 프로젝트 이름
- `SERVICE_NAME`: 서비스 이름

## 코드 입력하기

`AWS - Lambda - Functions - cloudtypeCronFunction - Code - Code source - index.js 붙여넣기`

## 스케줄러 등록하기

`AWS - Lambda - Functions - cloudtypeCronFunction - Function overview - Add trigger`

> 0 20 ? * * * : 한국 기준 5시 

- Triger configuration
  - EventBridge (CloudWatch Events) 선택
  - Create a new rule
    - Rule name: cloudtypeCronRule
    - Rule type: Schedule expression
    - Schedule expression: cron(0 20 ? \* \* \*) 
