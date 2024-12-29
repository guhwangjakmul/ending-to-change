# 구해줘요, 동물의 숲
![Group 289381](https://github.com/user-attachments/assets/229957c6-4789-4f71-91ab-29b1100bfe35)
- 배포 URL: https://ending-to-change.vercel.app

## 프로젝트 소개
- "구해줘요, 동물의 숲"은 탄소 중립과 환경 보호를 주제로 한 서비스입니다.
- 퀴즈와 걷기 활동을 통해 사용자에게 능동적인 참여를 유도하며, 단순한 정보 전달을 넘어 실질적인 행동 변화를 이끌어내는 것을 목표로 합니다.
- 사용자는 자신의 환경 보호 실천 기록을 확인하고, 퀴즈를 통해 환경 문제에 대한 지식을 넓힐 수 있습니다.
- 또한, 걷기 데이터를 기반으로 실시간 탄소 절감량을 확인하며 개인의 노력이 환경에 미치는 긍정적인 영향을 체감할 수 있습니다.
- 해당 프로젝트는 사람들이 일상 속에서 실천 가능한 방법을 제시해 지속 가능한 미래를 만들어가는 데 기여합니다.

## 팀원 구성
| 류경혜 | 이나래 | 이지희 | 이하람 | 홍유진 |
| ---- | ---- | ---- | ---- |---- |
| <img src="https://github.com/user-attachments/assets/82cd9f1e-2726-47df-ba35-85541c951420" width="90" /> | <img src="https://github.com/user-attachments/assets/7cce2996-b2b3-4791-bddf-6c92e836eba3" width="90" /> | <img src="https://github.com/user-attachments/assets/596b2109-a101-4ea0-bc47-cd9b4894dc4f" width="90" /> | <img src="https://github.com/user-attachments/assets/6336870d-10de-4e93-a0a3-45dda58764c1" width="90" /> | <img src="https://github.com/user-attachments/assets/4e22724d-d2c4-4bc5-af07-0f474aa653c9" width="90" /> |

## 역할 분담
### 류경혜
- UI
  - 페이지: 로그인, 마이홈, 회원정보 수정
  - 공통 컴포넌트: 카테고리 선택(지구), 404, error
- 기능
  - 소셜 로그인 및 회원 정보 수정
### 이나래
- 디자인
  - 페이지 UI, 캐릭터 일러스트
### 이지희
- 디자인
  - 페이지 UI, 캐릭터 일러스트, 카테고리별 배경
- UI
  - 페이지: /페이지 1단계 ~ 3단계
  - 공통 컴포넌트: 메세지
- 기능 
  - 물약을 사용하여 카테고리별 캐릭터 레벨 변화
### 이하람
- UI
  - 페이지: 걷기 지도, 걷기 설정, 올클리어
  - 공통 컴포넌트: 헤더, 모달, 링크 버튼, 클릭 버튼, 카테고리 뱃지
- 기능
  - 카테고리 선택 기능
### 홍유진
- UI
  - 페이지: 퀴즈, 통계
  - 공통 컴포넌트: 프로그래스바(Lv, Km), 보상 모달
- 기능
  - 카테고리별로 퀴즈 풀기
  - 캘린더에서 날짜 클릭시 해당 날짜에 맞는 걸은양 및 감소된 탄소배출량 및 클릭한 날짜 기준으로 일주일 통계 보여주기
  - 사용자 목표 거리 설정
  - 오늘 날짜 기준으로 걸은 거리 기록
 
    
## 개발 환경
- Front: Next.JS, Tailwind CSS, Zustand
- Back: Next.JS
- Database: Supabase
- 버전 및 이슈 관리: Github, Github Issues
- 협업 툴: Discord, Notion
- 디자인 툴: Figma, Photoshop, Illustrator
- 서비스 배포 환경: Vercel
- 컨벤션

## 개발 기간
- 디자인: 2024.09
- 개발: 2024.10 ~ 2024.12

## 페이지별 기능
### [로그인]
- 서비스 접속 초기화면으로 소셜 로그인 페이지가 나옵니다.
  - 구글 계정으로 로그인이 가능합니다.
- 처음 회원가입을 할 때 유저 닉네임을 랜덤으로 배정해줍니다.
    
| 로그인 | 
| ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 7 43 25" src="https://github.com/user-attachments/assets/3d1b3b48-d0af-45c7-91df-bb864c98da4c" /> |

### [카테고리 선택]
- 회원가입이 되면 카테고리 선택하는 창이 나옵니다. 이때 6개의 카테고리 중 하나를 선택할 수 있습니다.
- 이미 회원가입을 한 경우라면 로그인 후 메인페이지로 이동합니다.

| 처음 카테고리 선택 전 | 처음 카테고리 선택 후 |
| ---- | ---- | 
| <img width="300" alt="스크린샷 2024-12-29 오후 7 49 50" src="https://github.com/user-attachments/assets/373992ab-3ab9-4ef7-b942-fee6222c52ec" /> | <img width="300" alt="스크린샷 2024-12-29 오후 7 50 21" src="https://github.com/user-attachments/assets/770430e6-956d-4318-91be-861adc661288" /> |

- 다른 주민 버튼을 클릭하고 나온 카테고리 페이지에 내가 구한 주민은 민트색 뱃지로 볼 수 있습니다.
- 다른 카테고리를 선택할 수 있습니다. 해당 뱃지는 주황색으로 보입니다.
- 내가 선택한 카테고리에서의 주민을 구하면 해당 뱃지 아이콘은 주민 얼굴로 바뀝니다.
- 다음 버튼을 누르면 해당 카테고리가 보이는 메인 페이지로 이동합니다.

| 내가 구한 주민 & 초기 | 다른 카테고리 선택 | 다음 버튼 클릭 |
| ---- | ---- | ---- | 
| <img width="300" alt="스크린샷 2024-12-29 오후 8 50 49" src="https://github.com/user-attachments/assets/cfed6bc1-baf3-404a-a77a-42befcc6b358" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 51 11" src="https://github.com/user-attachments/assets/b0a3fe02-a9d4-4f73-b18b-88e406e8930b" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 01 02" src="https://github.com/user-attachments/assets/8ec235b0-b934-40e6-9a2f-89fd7e89a860" /> |

### [메인페이지]
- 카테고리에서 선택한 캐릭터를 볼 수 있습니다.
- 해당 카테고리는 3단계로 나눠져 있고 물약으로 Lv을 높일 수 있습니다.
  - 물약 1개당 프로그래스바에서 10씩 증가합니다.
  - Lv.1은 0 ~ 100, Lv.2는 0 ~ 150, Lv.3은 0 ~ 200입니다.
- 물약 버튼을 누르면 프로그래스바의 진행도가 높아지며 포인트만큼 회복했다는 텍스트가 나옵니다.
- 각 단계를 회복했을 시 다음 레벨로 이동하는 텍스트 컴포넌트가 나옵니다.
  - 해당 말풍선을 클릭하면 다음 단계로 이동합니다.
  - 각 단계별 말풍선 내용이 다르며 Lv.3 단계까지 회복시켰을 시 다른 주민을 구하기 버튼이 나옵니다.
  - 다른 주민 버튼을 클릭하면 다시 카테고리 선택 페이지로 이동하여 다른 주민을 구할 수 있습니다.

| Lv.1 | Lv.2 | Lv.3 |
| ---- | ---- | ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 7 55 03" src="https://github.com/user-attachments/assets/3fb69063-d195-431e-9ca5-711200eae89e" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 48 05" src="https://github.com/user-attachments/assets/0fa1fedc-194b-4754-b688-f6b1a69891f5" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 48 36" src="https://github.com/user-attachments/assets/4c79f79b-1024-4055-b627-c6734795c76d" /> |
| <img width="300" alt="스크린샷 2024-12-29 오후 8 47 54" src="https://github.com/user-attachments/assets/b07a275e-1ff3-4224-a4d1-469e1cc2fa33" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 48 23" src="https://github.com/user-attachments/assets/f1cbc3b0-9259-410c-8840-ee692936fdda" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 50 41" src="https://github.com/user-attachments/assets/05b6415c-3bb1-47db-a99c-511c22bc6b11" /> |

### [마이홈]
- 프로필 이미지, 닉네임, 현재 획득한 뱃지의 개수를 알 수 있습니다.
- 카테고리를 Lv.3까지 회복 시키면 뱃지가 보입니다.
- 뱃지를 클릭하면 회복된 주민의 최종 모습을 볼 수 있습니다.

| 뱃지 획득 전 | 획득 후 | 획득한 뱃지 클릭 | 토글버튼 클릭 | 
| ---- | ---- | ---- | ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 8 40 56" src="https://github.com/user-attachments/assets/42f15ba0-c262-43ef-a6f2-347a1ce9fb11" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 02 27" src="https://github.com/user-attachments/assets/aa8006c9-5e6b-46b7-937d-ecdeb8e15f7e" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 03 38" src="https://github.com/user-attachments/assets/51ccde9e-f462-45ea-8808-1657739fcd0a" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 41 04" src="https://github.com/user-attachments/assets/4fb72872-8138-4497-83b7-880f673d446f" /> |

### [회원정보 수정]
- 마이홈 페이지에서 토글 버튼에서 회원정보 수정 버튼을 클릭하면 회원정보 수정 페이지로 이동합니다.
- 연필 아이콘을 클릭시 프로필 닉네임을 수정할 수 있습니다.
- 저장하기 버튼을 클릭시 회원정보가 수정됩니다.
- 글자수는 10글자로 제한되어 있습니다.

| 초기 | 연필 버튼 클릭 |
| ---- | ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 8 41 35" src="https://github.com/user-attachments/assets/fbe9c364-52d1-4b52-a5e5-0b8ab89e558f" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 41 21" src="https://github.com/user-attachments/assets/73d8c3f2-613c-42ea-a824-df494113e869" /> |

### [퀴즈]
- 메인 페이지에서 퀴즈로 물약얻기 버튼을 클릭하면 퀴즈 페이지에서 카테고리에 맞는 문제를 볼 수 있습니다.
- 퀴즈에 대한 문제를 맞히면 해설과 함께 치료약 보상 2point를 주고 틀리면 1point를 줍니다.
  
| 초기 | 정답 | 오답 | 정답 보상 | 오답 보상 |
| ---- | ---- | ---- | ---- | ---- | 
| <img width="300" alt="스크린샷 2024-12-29 오후 7 59 09" src="https://github.com/user-attachments/assets/7192437c-2d54-41d5-8f3a-37db87d49c52" /> | <img width="300" alt="스크린샷 2024-12-29 오후 7 59 20" src="https://github.com/user-attachments/assets/f35ff33f-1efa-4814-9a6c-1480d72b909e" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 00 18" src="https://github.com/user-attachments/assets/172862e6-c110-41a6-a564-e7a73f5e639c" /> | <img width="300" alt="스크린샷 2024-12-29 오후 7 59 30" src="https://github.com/user-attachments/assets/fad5ce60-1735-47b3-b9fd-5f10f67b2a0f" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 00 25" src="https://github.com/user-attachments/assets/93fc13b5-22dc-4427-834d-30f9b92c4698" /> |


### [걷기]
- 메인 페이지에서 걷기로 물약얻기 버튼을 클릭하면 걷기 페이지에서 지도를 볼 수 있습니다.
- 실시간 위치를 받아와 걸으면 해당 거리에 폴리라인이 그려집니다.
- 걷기 중일때 해당 창을 나가면 경고창이 보이고 멈추고 < 클릭하면 보상 받기 모달이 보입니다.
- km 기준으로 치료약 보상을 줍니다.
  - 1km당 2point를 지급하고 1km를 채우지 못했을 때는 1point를 지급합니다. (예: 2km -> 4point, 1.5km -> 3point, 0km -> 0point)

| 걷기 초기 상태 | 걷기 중 | 걷기 중 헤더 < 클릭 | 걷기 멈춤 | 걷기 멈춤 헤더 < 클릭 | 보상 |
| :------------: | :------------: | :------------: | :------------: | :------------: | :------------: |
| <img width="461" alt="image" src="https://github.com/user-attachments/assets/09c1333f-422b-4672-80db-238305bdfd93"> | <img width="451" alt="image" src="https://github.com/user-attachments/assets/3f525fc1-fbbd-428f-b402-a4cc7a378d09"> | <img width="510" alt="image" src="https://github.com/user-attachments/assets/2ca5d4bd-709c-4be1-84bd-c94e0f3525e5"> | <img width="459" alt="image" src="https://github.com/user-attachments/assets/8cfd6380-12f3-46d4-ba38-ae660df3f905"> | <img width="465" alt="image" src="https://github.com/user-attachments/assets/462186b9-8ee9-426a-81f3-2cb19206251a"> | <img width="391" alt="스크린샷 2024-12-29 오후 8 06 45" src="https://github.com/user-attachments/assets/d214d96b-7b70-4034-b4c9-4d4541142ace" /> |

### [탄소 기록함]
- 걷기 페이지에서 통계 버튼을 누르면 탄소 기록함 페이지를 볼 수 있습니다.
- 처음 페이지가 렌더링 될 때 오늘 날짜를 기준으로 데이터가 보여집니다.
- 캘린더와 오늘 걸은 거리 및 탄소 배출량 그리고 일주일치 통계를 볼 수 있습니다.
  - 캘린더에서 오늘 날짜에는 배경이 주황색으로 보입니다.
  - 걸은 날일경우 민트색 동그라미로 해당 날짜를 표시합니다.
  - 다른 날짜를 클릭하면 클릭한 날짜는 회색 배경으로 바뀌고 오늘 날짜는 주황색 텍스트로 변경됩니다.
  - 차트를 호버하면 해당 날짜에 걸은 거리를 볼 수 있습니다.
- 캘린더에서 날짜를 클릭하면 해당 날짜를 기준으로 아래 데이터가 변경됩니다.

| 걷기 기록이 없을 때 | 걷기 기록이 있을 때 | 다른 날짜를 클릭했을 때 |
| :------------: | :------------: | :------------: |
| <img width="300" alt="스크린샷 2024-12-29 오후 8 18 41" src="https://github.com/user-attachments/assets/56c42af7-b5e5-460d-85a1-695053dfcc9a" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 32 46" src="https://github.com/user-attachments/assets/84fb8536-32c8-4b4f-9fc0-ba6a1db980ed" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 22 18" src="https://github.com/user-attachments/assets/0149f1d0-f60e-4868-b2ec-d78f137fee7b" /> |

### [걷기 설정]
- 탄소 기록함 페이지에서 걷기 설정 버튼을 누르면 해당 모달이 나옵니다.
- 처음에는 기본값이 3km으로 되어 있습니다.
- 슬라이드를 이용하여 원하는 거리를 설정하고 결정 버튼을 누르면 탄소 기록함 페이지의 오늘 거리 프로그래스바의 max의 값이 변경됩니다.
  - 결정 버튼을 누르지 않고 모달을 닫을시 데이터는 변경되지 않습니다.

| 초기 | 걷기 설정 |
| ---- | ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 8 18 52" src="https://github.com/user-attachments/assets/4c4360cb-5b77-4ccd-8709-67ee077e159e" /> | <img width="300" alt="스크린샷 2024-12-29 오후 8 19 01" src="https://github.com/user-attachments/assets/fdcef3d5-771b-4183-99f5-8d0fae599374" /> |

### [올클리어]
- 마지막 카테고리를 구하면 마이홈으로 가는 버튼이 나옵니다.
- 해당 버튼을 클릭하면 마이홈 페이지에서 모두 획득 된 뱃지의 모습을 볼 수 있습니다.
- 마이홈 페이지에 토글 버튼을 클릭하면 공유하기가 생깁니다. 해당 버튼을 누르면 모두 구한 주민들의 모습을 공유할 수 있습니다ㅏ.

| 마지막 주민 구했을 때 | 모든 주민을 구한 마이홈 | 공유하기 버튼 | 올클리어 페이지 |
| :------------:| :------------: | :------------: | :------------: |
| <img width="300" alt="스크린샷 2024-12-29 오후 9 13 58" src="https://github.com/user-attachments/assets/0cc19465-6775-4eb3-bf62-48295104c7c3" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 14 35" src="https://github.com/user-attachments/assets/ec03e567-5877-4eca-a74d-c6de78d4bc98" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 16 09" src="https://github.com/user-attachments/assets/c39a45c0-0b84-4959-b35a-788524503e67" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 16 19" src="https://github.com/user-attachments/assets/08c1339f-8a25-4cfc-ae44-5bde128d32be" /> |


### [카테고리별 주민 Lv.1 ~ 3]
- 지구 온난화 (눈사람)
  
| Lv.1 | Lv.1 말풍선 | Lv.2 | Lv.2 말풍선 | Lv.3 | Lv.3 말풍선 | 최종 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 9 09 29" src="https://github.com/user-attachments/assets/af58e102-4d3f-4d67-b539-d159090b01ac" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 09 58" src="https://github.com/user-attachments/assets/c0f6b0c3-4ae8-47ee-adaa-308ff721863e" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 10 06" src="https://github.com/user-attachments/assets/0ae6122c-256a-46cc-89db-30798191ce5f" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 10 25" src="https://github.com/user-attachments/assets/c678740b-a045-4a07-984f-b90d67ecbb6d" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 10 40" src="https://github.com/user-attachments/assets/5c343137-9025-493c-8e56-153d2c8acca4" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 11 00" src="https://github.com/user-attachments/assets/65eeb0da-5f59-44cf-9801-9ed9992040bb" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 15 25" src="https://github.com/user-attachments/assets/76f330a6-0479-4ae4-80f0-9b2929a0069a" /> |

- 분리수거 (고순이)
  
| Lv.1 | Lv.1 말풍선 | Lv.2 | Lv.2 말풍선 | Lv.3 | Lv.3 말풍선 | 최종 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 9 11 13" src="https://github.com/user-attachments/assets/65fbf189-1155-4b4e-8f39-28f67938126c" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 11 29" src="https://github.com/user-attachments/assets/047a0fe9-4a66-41bd-bee6-16527af3f621" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 11 38" src="https://github.com/user-attachments/assets/680cf3fb-e5b9-4065-b93d-5415f8129dec" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 11 58" src="https://github.com/user-attachments/assets/fa284e02-cfc9-4178-8dc4-1ef58b2fb78d" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 12 06" src="https://github.com/user-attachments/assets/fb665b84-e557-40e5-a95d-fa5f7b773602" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 12 29" src="https://github.com/user-attachments/assets/929c9464-c950-4394-a6c9-3d95f949f8aa" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 15 34" src="https://github.com/user-attachments/assets/9ce83944-d49b-425c-b1e6-b93692b33ce3" /> |


- 토양오염 (무파니)
  
| Lv.1 | Lv.1 말풍선 | Lv.2 | Lv.2 말풍선 | Lv.3 | Lv.3 말풍선 | 최종 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 9 42 35" src="https://github.com/user-attachments/assets/eae0e69c-b402-4730-9d55-313348373023" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 43 16" src="https://github.com/user-attachments/assets/fe86f131-5f7a-48b6-98af-bef3d32b62a4" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 43 26" src="https://github.com/user-attachments/assets/651dd981-7ccd-4695-b1f1-9f2064fcbc30" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 43 42" src="https://github.com/user-attachments/assets/5043fd91-fdd1-4011-bfb5-56f1860b5e72" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 08 46" src="https://github.com/user-attachments/assets/c9712765-45f2-4b51-963d-a99dba28180c" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 09 02" src="https://github.com/user-attachments/assets/471783c0-1abb-45f7-a1da-fdf0c4792c10" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 15 42" src="https://github.com/user-attachments/assets/0c0c7d2c-e4db-423c-8e47-45f1441f49e7" /> |

- 수질오염 (해탈한)

| Lv.1 | Lv.1 말풍선 | Lv.2 | Lv.2 말풍선 | Lv.3 | Lv.3 말풍선 | 최종 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 9 12 40" src="https://github.com/user-attachments/assets/5c336000-5e43-4e8f-9595-6d166a040c35" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 13 05" src="https://github.com/user-attachments/assets/768a12a8-4870-43ee-b5f9-289851b81ee9" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 13 13" src="https://github.com/user-attachments/assets/189659a5-6f13-4b2b-9e1c-df9ec3bc4eff" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 13 30" src="https://github.com/user-attachments/assets/cb5a69d8-2711-4dd7-b5a0-4f3805f9a916" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 13 36" src="https://github.com/user-attachments/assets/e0fc61e4-05f0-4275-b44c-b720a9ca280e" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 51 38" src="https://github.com/user-attachments/assets/04c84071-3509-4276-a3b9-f7e9d68208b9" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 15 49" src="https://github.com/user-attachments/assets/ede03e92-cfed-4b42-ab95-a041a4b18ed3" /> | 

- 대기오염 (너굴이)
  
| Lv.1 | Lv.1 말풍선 | Lv.2 | Lv.2 말풍선 | Lv.3 | Lv.3 말풍선 | 최종 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| <img width="300" alt="스크린샷 2024-12-29 오후 8 51 20" src="https://github.com/user-attachments/assets/edb6b94d-7ac5-4248-a934-4d6230a6c6dc" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 47 14" src="https://github.com/user-attachments/assets/a1646d66-116c-43da-a89a-19c414058821" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 47 23" src="https://github.com/user-attachments/assets/53e11a5e-6fdc-4624-8fec-300b74c840ec" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 47 42" src="https://github.com/user-attachments/assets/c6b96f5f-4f92-430e-87cb-f6af5841d812" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 47 49" src="https://github.com/user-attachments/assets/bb113836-b677-4268-a1a1-57e08e7db3be" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 49 43" src="https://github.com/user-attachments/assets/3b375658-6caa-4ba2-b278-c6e50f7ceafe" /> | <img width="300" alt="스크린샷 2024-12-29 오후 9 15 58" src="https://github.com/user-attachments/assets/69ee6557-ee6c-4a5d-b0a8-37323a1f7af9" /> |















