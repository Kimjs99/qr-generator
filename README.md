# QR 코드 생성기

<div align="center">
  <img src="qrlogo.png" alt="QR Generator Logo" width="120" height="120">
  <h3>로고가 포함된 QR 코드를 쉽게 생성할 수 있는 웹 애플리케이션</h3>
  <p>
    <a href="https://github.com/Kimjs99/qr-generator">
      <img src="https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github" alt="GitHub Repository">
    </a>
    <a href="https://vercel.com">
      <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel" alt="Deployed on Vercel">
    </a>
    <a href="https://reactjs.org">
      <img src="https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react" alt="React">
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-5.0.2-blue?style=flat-square&logo=typescript" alt="TypeScript">
    </a>
  </p>
</div>

## ✨ 주요 기능

- 🖼️ **로고 업로드**: 드래그 앤 드롭으로 로고 이미지 업로드
- 🔗 **URL 관리**: 최대 10개까지 URL 입력 가능 (추가/삭제 버튼)
- 🎯 **QR 코드 생성**: 로고가 중앙에 배치되고 주변은 흰색 배경 처리
- 💾 **자동 다운로드**: 생성된 QR 코드들이 자동으로 다운로드됨
- 🗑️ **개별 초기화**: 로고나 URL을 개별적으로 제거 가능
- 🔄 **전체 초기화**: 모든 데이터를 한 번에 초기화
- 🎨 **사용자 친화적 UI**: 모던하고 직관적인 인터페이스

## 🚀 빠른 시작

### 온라인 사용
1. [배포된 사이트](https://vercel.com)에 접속
2. 로고 이미지 업로드
3. URL 입력 (최대 10개)
4. "QR 코드 생성하기" 버튼 클릭

### 로컬 개발
```bash
# 저장소 클론
git clone https://github.com/Kimjs99/qr-generator.git
cd qr-generator

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

## 🎨 UI 특징

- **반응형 디자인**: 모든 화면 크기에 최적화
- **그라데이션 배경**: 시각적으로 매력적인 디자인
- **아이콘**: Lucide React 아이콘으로 직관적인 UI
- **애니메이션**: 호버 효과와 로딩 애니메이션
- **사용법 안내**: 하단에 친절한 사용법 가이드

## 🔧 기술 스택

- **React 18** + **TypeScript**
- **Vite** (빠른 개발 서버)
- **Tailwind CSS** (스타일링)
- **QRCode.js** (QR 코드 생성)
- **Lucide React** (아이콘)

## 📦 스크립트 명령어

```bash
# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드 생성
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🎯 주요 기능 상세

### 로고 처리
- 로고는 QR 코드 중앙에 배치됩니다
- 로고 주변은 흰색 배경으로 처리되어 QR 코드 인식에 방해되지 않습니다
- 로고 크기는 QR 코드 크기의 20%로 자동 조정됩니다

### URL 관리
- 최대 10개까지 URL을 입력할 수 있습니다
- 각 URL은 개별적으로 삭제 가능합니다
- URL 입력 필드는 유효성 검사를 수행합니다

### 초기화 기능
- **개별 초기화**: 로고나 특정 URL만 제거
- **전체 초기화**: 모든 데이터를 한 번에 초기화 (확인 대화상자 포함)

## 📊 프로젝트 통계

- **총 파일 수**: 15개
- **코드 라인 수**: 4,000+ 줄
- **개발 시간**: 약 2시간
- **커밋 수**: 5개
- **기능 수**: 8개 주요 기능

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👨‍💻 개발자

**Kimjs99** - [GitHub](https://github.com/Kimjs99)

---

<div align="center">
  <p>⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요! ⭐</p>
</div>
