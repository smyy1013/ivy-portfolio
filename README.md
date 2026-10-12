# Ivy Yoon 포트폴리오

Next.js (App Router) + Tailwind CSS v4로 만든 원페이지 포트폴리오입니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포용 빌드
```

- 포트폴리오: `/`
- 프로젝트별 페이지: `/projects/프로젝트-이름` (`content/copy.md`의 프로젝트마다 자동 생성)
- 디자인 시스템 미리보기: `/design-system`

## 어디를 고치면 되나

| 바꾸고 싶은 것 | 파일 |
| --- | --- |
| 페이지의 모든 문구 | `content/copy.md` (저장 후 브라우저를 새로고침하면 반영) |
| 사진 | `public/images/` (파일 이름 목록은 그 폴더의 README) |
| 이력서 | `public/resume.pdf` 로 넣기 |
| 이메일, LinkedIn | `content/site.ts` |
| 브랜드 컬러, 폰트, 글자 크기 | `app/globals.css` 상단의 토큰 |

## 디자인 시스템

**토큰** (`app/globals.css`)

- 컬러: `bg` `panel` `ink` `muted` `dim` `accent` `warning` `line` `grid`
  → Tailwind에서 `bg-accent`, `text-muted`, `border-line` 처럼 사용
- 폰트: `font-sans` = Pretendard Variable, `font-mono` = JetBrains Mono
  (두 폰트 모두 `app/fonts/`에 들어 있어 외부 요청 없이 로드)
- 타입 스케일: `type-display` `type-hero` `type-title` `type-heading` `type-card`
  `type-body` `type-mono-body` `type-label` `type-meta` `type-hud`, 그리고 `text-outline`

**컴포넌트** (`components/ui`)

`Button` · `Kicker` · `MetaBox` · `LiveTag` · `SectionHeader` · `GroupHeader` ·
`BracketFrame` · `ImageSlot` · `RichText` · `TitleSplit`

**HUD** (`components/hud`): 배경 그리드와 스캔라인, 십자 커서, 히어로 도면

**섹션** (`components/sections`): `Hero` · `Projects` · `HowIWork` · `Contact`

**프로젝트** (`components/project`): `ProjectCard`(홈 카드) · `ProcessStage` · `ProcessLegend`,
프로젝트 페이지는 `app/projects/[slug]/page.tsx`

## copy.md 작성 규칙

- `# 섹션` 네 개의 순서(Hero → What I Build → How I Work → Let's Build Something)는 유지
- 프로젝트 그룹은 `##`, 프로젝트는 `###`, 바로 아랫줄이 소속과 기간
- 프로젝트마다 `**Result:**` 한 줄(필수), `**Tools:**` 쉼표 목록(선택)
- 프로세스 단계는 `1. **Label.** 설명` 한 줄. 그 아래 `![사진 설명](images/파일.jpg)` 줄을 0개 이상
- 기본 흐름은 Problem → Thinking → Build → Test → Result. 라벨은 자유롭게 쓸 수 있음
- Thinking, Trade-off, Takeaway 단계는 "왜 그렇게 했는지"를 담는 자리라 강조 표시됨
  (강조할 라벨과 단계별 질문 문구는 `content/site.ts`의 `process`에서 수정)
- How I Work에서 `>`로 시작하는 문단은 강조 인용으로 표시
- `[to add: ...]` 같은 대괄호 문구는 주황색으로 표시되어 미완성임을 알려 줌

## 공개 전 스위치

`content/site.ts`의 `showEmptySlots`가 `true`이면 사진이 없는 자리에 파일 이름이 적힌
자리 표시가 보이고, 아직 쓰지 않은 단계(`[to add: ...]`만 있는 단계)도 주황색으로 보입니다.
공개 전에 `false`로 바꾸면 사진이 없는 슬롯과 쓰지 않은 단계가 모두 사라집니다.
문장 중간에 남은 대괄호 문구는 사라지지 않으니 직접 채우거나 지워야 합니다.

## 반응형

- 640px 미만: 한 줄 세로 배치
- 640px 이상: 히어로 도면과 헤드라인이 나란히
- 768px 이상: 프로젝트 헤더가 한 줄(번호, 커버, 제목, 토글)
- 1024px 이상: 히어로 3열, How I Work 2열, 프로세스 단계가 라벨 · 설명 · 사진 3열

십자 커서는 마우스가 있는 기기에서만 켜지고, 터치 기기에서는 기본 동작을 유지합니다.
