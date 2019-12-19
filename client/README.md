# Stripe 

## Todo
- [x] React to Typescript.
- [x] Users - Login, Register
- [x] Stripe - Create, Update
- [x] Stripe - Cancel - reCreate

### 1. Install
1.1) yarn create react-app client --template typescript
1.2) yarn add react-router-dom apollo-boost graphql react-apollo
1.3) yarn add -D @types/react-router-dom apollo @types/graphql
1.4) yarn add react-stripe-checkout
1.5) yarn add stripe
1.6) yarn add -D @types/stripe
1.7) yarn add dotenv

### 2. Study
2.1) client의 세션-쿠키저장
: 이제까지 로컬스토리지의 값은 operation.setContext({ "jwt": ""}); 과 같이 저장했었다.
: 세션에 해당하는 쿠키값을 저장시키기 위해서 apollo의 client 옵션에 credentials: "include" 값을 추가 시키면 된다.
: 그러면 cors에러가 발생한다. 이때 서버측의 middleware에서 cors옵션을 추가하도록 한다.

### 3. Stripe
: 결제모듈 서비스
: PUBLIC_KEY, SECRET_KEY로 구별
: 테스팅 모드: https://stripe.com/docs/testing
