# Stripe server
: React, Typescript, Grahpql - Using Stripe


## Todo
- [x] Initial repository.
- [x] Register, Login.
- [x] Session Login express-session API, Me.
- [x] createSubscription, changeCreditCard.

### 1. Install
1.0) npm i -g typeorm
: typeorm cli 사용하는 용도.
1.1) yarn add typeorm 
1.2) yarn upgrade-interactive --latest
: 선택하여 버전을 업그레이드 해준다.
1.3) yarn add apollo-server-express express express-session bcryptjs
1.4) yarn add -D @types/express @types/bcryptjs @types/express-session @types/graphql
1.5) yarn add stripe
1.6) yarn add -D @types/stripe
1.7) yarn add dev


### 2. Study
2.0) typeorm init --name server --database postgres
: 자동으로 server 디렉터리가 생성되며, entity의 User가 생성된다.
: 참고: https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md
2.1) createdb stripe-example
: db생성.
2.2) typeorm unique
: typeorm모델에서 @Column({unique: true});로 중복제거를 할 수 있다.
2.3) express-session
: secret: 쿠키를 임의로 변조하는것을 막기위해 사용. (공개되어서는 안됨)
: resave: 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다. 권장: false(필요에따라 true)
: saveUninitialized: 세션이 저장되기 전에 uninitialized상태로(초기화 되지 않는 상태로) 미리 만들어서 저장한다.
: 참고 - https://velopert.com/406
2.4) session 저장.
: express-session의 모듈 session은 session을 사용하는 미들웨어이다.
: session({ })은 콜백함수로서, req,res,next의 인자를 가진 함수를 반환한다.
: 따라서 express()로 생성된 app에 app.use(session({...}));을 넣어주면 session을 사용하도록 한다.
: 실행될때마다 sessionID가 변경된다.
2.5) sessionId Save cookie
: 세션아이디를 쿠키에 저장하는방법이다.
: Login할때, req.session.userId = user.id;  // cookies에 sessionId가 저장됨.
: URL:4000/playground에서 emit -> include로 변경시켜야 확인 가능하다.
2.6) Cors 설정
: cleint단으로부터 apollo 서버에서 세션-쿠키에 대한 값을 요청시 cors에러를 방지하도록 해야한다. new ApolloServer({})로 생성된 객체 server에 다음을 추가
: server.applyMiddleware({ app, cors: { credentials: true, origin: "http://localhost:3000" } })
2.7) fetchPolicy
: 새로운 로그인, 혹은 유저데이터 변경에 대해서 새로 refetch를 하고싶다면,
: User프로필 가져오는 쿼리문에 fetchPolicy: "network-only"를 추가하도록 한다.


### 3. Stripe
3.0) stripe private-key
: stripe는 클라이언트측에 public key / 서버측에 secret_key를 소유하도록 한다.
: 비밀키 암호방식으로 인증한다.
3.1) Stripe 생성은 다음과같다.
: 먼저 stripe 홈페이지에서 새로운 Product생성.
: const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
: const stripeOptions = { 
    email: user.email, 
    source: "", 
    plan: process.env.STRIPE_PLAN_KEY || ""   //plan은 productId
 }; 
: stripe.customers.create(stripeOptions);

### N. Etc
N. tsconfig.json 설정 
: 참고 https://github.com/benawad/fullstack-graphql-airbnb-clone/blob/master/packages/server/tsconfig.json





# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
