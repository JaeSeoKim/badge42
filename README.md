# 42-readme-stats

> 🚀 Dynamically generated 42 stats for your git readmes.

![jaeskim's stats](https://42-readme-stats.vercel.app/api/stats/jaeskim)

### ✅ ToDo List

 - [x] [api42.js](./src/api/api42.js)

    - [x] `get42Token = async ()`

      `api.intra.42.fr` 에 등록한 App의 id와 secret를 이용하여 token 할당 받음.

    - [x] `get42UserInfo = async (user_name, access_token)`

      `get42Token` 에서 받은 token를 이용하여 user 정보 일부를 받아옴

    - [x] `get42UserCoalition = async (user_name, access_token)`

      `get42Token` 에서 받은 token를 이용하여 Coalition(소속 팀) 정보를 받아옴

   - [x] `get42UserCrusus = async (user_id, access_token)`

     `get42Token` 에서 받은 token과 `get42UserInfo` 를 이용하여 얻은 user_id를 이용하여 Cursus에 대한 정보를 받아옴

- [ ] `/api/stats/[user_name]`
  
  - [x] api request 낭비를 막기 위해 `res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')` 사용 필요!
  - [ ] 비동기 처리로 하나씩 실행시 Response 응답이 무지막지 하게 느려짐 `Promise` 공부하여서 동기처리로 해결 하기!
  - [ ] token에 대하여 memory에 넣어서 관리 하면 좋은데 `vercel`은 `serverless`형태로 서비스를 해주서 대안 찾아봐야 함.
    - [ ] 외부 DB 서비스 사용하기?
  
- [ ]  `readme stats svg 디자인 하기`
  
  - [ ] 현재 정적인 Text return 에서 React Component로 변경 
  - [ ] `get42UserCoalition` 에서 얻은 `image_url, cover_url, color` 활용하기!
  - [ ] `get42UserCrusus` 에서 만약 Blackhole이 존재 한다면 blackhole 정보 보이기?
  
- [ ] `기본적인 기능 대부분 완성 후 index page 디자인 하기`
  
  - [ ] `tailwindcss` 를 사용할까 `material ui` 를 사용할까?
