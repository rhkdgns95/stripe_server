# Stripe server
: React, Typescript, Grahpql - Using Stripe



## Todo
- [x] Initial repository.
- [] 


### 1. Install
1.0) npm i -g typeorm
: typeorm cli 사용하는 용도.
1.1) yarn add typeorm 
1.2) yarn upgrade-interactive --latest
: 선택하여 버전을 업그레이드 해준다.
1.3) yarn add apollo-server-express express express-session bcryptjs
1.4) yarn add -D @types/express @types/bcryptjs @types/express-session @types/graphql

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

### N. Etc
N. tsconfig.json 설정 
: 참고 https://github.com/benawad/fullstack-graphql-airbnb-clone/blob/master/packages/server/tsconfig.json





# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command