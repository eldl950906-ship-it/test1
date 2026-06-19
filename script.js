/*
  ========================================
  LUSH KOREA 소개 페이지 — script.js
  ========================================
  이 파일은 페이지의 모든 동적 동작(인터랙션)을 담당합니다.

  목차 (Ctrl+F로 검색하세요):
  1. DOMContentLoaded 진입점 ............... 페이지 로드 후 실행
  2. 헤더 스크롤 효과 ....................... 스크롤 시 그림자 추가
  3. 모바일 햄버거 메뉴 ..................... 메뉴 열기/닫기
  4. 서브 네비게이션 활성화 ................. 클릭 시 active 상태
  5. 스크롤 리빌 (IntersectionObserver) .... 섹션이 보일 때 나타남
  6. 맨 위로 가기 버튼 ...................... 스크롤 버튼 동작
  7. 이미지 로드 실패 처리 .................. 이미지 오류 시 폴백
  8. 네비게이션 링크 스크롤 강조 ............ 현재 위치 표시
  9. 유틸리티 함수 .......................... 공통으로 사용하는 함수들
*/


/* =========================================
  1. DOMContentLoaded 진입점
  - HTML 파싱이 완료된 후 이 안의 코드가 실행됩니다.
  - 모든 기능을 여기서 초기화합니다.
========================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* 페이지에서 자주 사용할 요소를 미리 변수에 저장 */
  const header       = document.getElementById('site-header');      // 헤더 전체
  const hamburgerBtn = document.getElementById('hamburger-btn');     // 햄버거 버튼
  const mainNav      = document.getElementById('main-nav');          // 메인 네비 영역
  const scrollTopBtn = document.getElementById('scroll-top-btn');   // 맨 위로 버튼
  const revealItems  = document.querySelectorAll('.js-reveal');      // 리빌 대상 섹션들
  const subNavLinks  = document.querySelectorAll('.sub-nav-link');   // 서브 네비 링크들
  const imgElements  = document.querySelectorAll('.info-section__img'); // 소개 이미지들

  /* 각 기능을 순서대로 초기화 */
  initHeaderScroll(header);
  initHamburgerMenu(hamburgerBtn, mainNav, header);
  initSubNavActive(subNavLinks);
  initScrollReveal(revealItems);
  initScrollTopButton(scrollTopBtn);
  initImageFallback(imgElements);
  initNavHighlight();

  /* 개발자 콘솔에 초기화 완료 메시지 출력 */
  console.log('[LUSH] 모든 인터랙션 초기화 완료 ✅');
});


/* =========================================
  2. 헤더 스크롤 효과
  - 스크롤하면 헤더에 그림자가 생겨 입체감이 나타납니다.
========================================= */

/**
 * @param {HTMLElement} header - 스크롤 효과를 적용할 헤더 요소
 */
function initHeaderScroll(header) {
  if (!header) return; // 헤더가 없으면 실행하지 않음

  // 스크롤 이벤트: 페이지를 내릴 때마다 실행
  window.addEventListener('scroll', function () {
    // 스크롤이 10px 이상이면 'scrolled' 클래스 추가 → CSS에서 그림자 강화
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true }); // passive: true → 스크롤 성능 최적화
}


/* =========================================
  3. 모바일 햄버거 메뉴
  - 작은 화면에서 햄버거 버튼으로 메뉴를 열고 닫습니다.
========================================= */

/**
 * @param {HTMLElement} btn     - 햄버거 버튼
 * @param {HTMLElement} nav     - 열리고 닫힐 메뉴 영역
 * @param {HTMLElement} header  - 메뉴 외부 영역 감지용 헤더
 */
function initHamburgerMenu(btn, nav, header) {
  if (!btn || !nav) return;

  /* 햄버거 버튼 클릭 시 메뉴 토글 */
  btn.addEventListener('click', function () {
    const isOpen = nav.classList.contains('is-open'); // 현재 메뉴가 열려 있는지 확인

    toggleMenu(!isOpen, btn, nav); // 현재 상태 반대로 전환
  });

  /* 메뉴 외부(다른 곳) 클릭 시 메뉴 닫기 */
  document.addEventListener('click', function (event) {
    // 클릭한 곳이 헤더 안이 아니면
    if (!header.contains(event.target)) {
      toggleMenu(false, btn, nav); // 메뉴 닫기
    }
  });

  /* ESC 키로 메뉴 닫기 (접근성) */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      toggleMenu(false, btn, nav);
      btn.focus(); // 버튼으로 포커스 이동
    }
  });
}

/**
 * 메뉴 열기/닫기 상태를 변경하는 함수
 * @param {boolean} open - true: 열기, false: 닫기
 * @param {HTMLElement} btn - 햄버거 버튼
 * @param {HTMLElement} nav - 메뉴 영역
 * 
 */
/*
function toggleMenu(open, btn, nav) {
  if (open) {
    nav.classList.add('is-open');
    btn.classList.add('is-active');
    btn.setAttribute('aria-expanded', 'true'); // 스크린리더에 '열림' 상태 알림
  } else {
    nav.classList.remove('is-open');
    btn.classList.remove('is-active');
    btn.setAttribute('aria-expanded', 'false'); // 스크린리더에 '닫힘' 상태 알림
  }
}
*/
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navList = document.getElementById('nav-list');

  // 버튼 클릭 시 메뉴 열기/닫기 토글
  hamburgerBtn.addEventListener('click', () => {
    // 햄버거 버튼 X 모양 변환 클래스 토글
    hamburgerBtn.classList.toggle('is-active');
    
    // 메뉴 목록 슬라이드인 클래스 토글
    navList.classList.toggle('is-open');
    
    // 웹 접근성(A11y)을 위한 속성 변경 (선택사항이지만 권장)
    const isOpen = hamburgerBtn.classList.contains('is-active');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // 메뉴가 열려있을 때 화면 바깥이나 링크를 누르면 메뉴를 닫아주는 기능 (사용자 경험 향상)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('is-active');
      navList.classList.remove('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    });
  });
});

/* =========================================
  4. 서브 네비게이션 활성화
  - 클릭한 서브 메뉴 탭에 active 스타일을 적용합니다.
========================================= */

/**
 * @param {NodeList} links - 서브 네비게이션 링크들
 */
function initSubNavActive(links) {
  if (!links.length) return;

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // 실제 페이지 이동 막기 (클론이므로)

      /* 모든 링크에서 active 제거 */
      links.forEach(function (l) {
        l.classList.remove('active');
        l.removeAttribute('aria-current');
      });

      /* 클릭한 링크에 active 추가 */
      this.classList.add('active');
      this.setAttribute('aria-current', 'page'); // 스크린리더에 현재 페이지 알림
    });
  });
}



/* =========================================
  5. 스크롤 리빌 (Intersection Observer API)
  - 섹션이 화면에 들어오면 부드럽게 나타납니다.
  - IntersectionObserver: 요소가 화면에 보이는지 감지하는 브라우저 내장 API
========================================= */

/**
 * @param {NodeList} items - 리빌 효과를 적용할 요소들 (.js-reveal 클래스)
 */
function initScrollReveal(items) {
  if (!items.length) return;

  // IntersectionObserver 생성
  const observer = new IntersectionObserver(
    function (entries) {
      // 감지된 요소들을 순회
      entries.forEach(function (entry) {
        // 요소가 화면 안에 들어왔을 때
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible'); // CSS에서 나타나는 효과 실행
          observer.unobserve(entry.target); // 한 번 나타난 후에는 더 이상 감지 불필요
        }
      });
    },
    {
      threshold: 0.12,    // 요소의 12%가 보일 때 트리거 (너무 일찍/늦지 않게)
      rootMargin: '0px'   // 화면 경계 기준
    }
  );

  // 모든 리빌 대상 요소를 관찰 시작
  items.forEach(function (item) {
    observer.observe(item);
  });
}


/* =========================================
  6. 맨 위로 가기 버튼
  - 일정 이상 스크롤하면 버튼이 나타나고,
    클릭하면 페이지 맨 위로 이동합니다.
========================================= */

/**
 * @param {HTMLElement} btn - 맨 위로 가기 버튼
 */
function initScrollTopButton(btn) {
  if (!btn) return;

  /* 스크롤 위치에 따라 버튼 표시/숨김 */
  window.addEventListener('scroll', function () {
    // 400px 이상 스크롤했을 때 버튼 표시
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  /* 버튼 클릭 시 맨 위로 부드럽게 이동 */
  btn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 (CSS scroll-behavior: smooth와 함께 동작)
    });
  });
}


/* =========================================
  7. 이미지 로드 실패 처리 (폴백)
  - 이미지를 불러오지 못하면 CSS 배경색으로 대체합니다.
  - CORS(도메인 정책) 문제로 외부 이미지가 막힐 수 있습니다.
========================================= */

/**
 * @param {NodeList} images - 처리할 이미지 요소들
 */
function initImageFallback(images) {
  if (!images.length) return;

  // 섹션별 대체 배경색 (CSS gradient 사용)
  const fallbackColors = [
    'linear-gradient(135deg, #b5d5c0 0%, #8fbfa5 100%)', // 1번: 초록
    'linear-gradient(135deg, #d4c8b8 0%, #bfaa94 100%)', // 2번: 베이지
    'linear-gradient(135deg, #c5d8e8 0%, #9bbad0 100%)', // 3번: 하늘
    'linear-gradient(135deg, #e0d0c8 0%, #c8b0a0 100%)', // 4번: 살구
  ];

  images.forEach(function (img, index) {
    /* 이미지 로드 실패 이벤트 */
    img.addEventListener('error', function () {
      const wrapper = img.closest('.info-section__image-wrap'); // 부모 래퍼 찾기

      if (wrapper) {
        // 폴백 배경색 적용 (인덱스 순환: 4개 이상이면 처음부터 반복)
        wrapper.style.background = fallbackColors[index % fallbackColors.length];
        img.style.display = 'none'; // 깨진 이미지 아이콘 숨기기
      }
    });

    /* 이미지 성공적으로 로드됐을 때 (로그 확인용) */
    img.addEventListener('load', function () {
      console.log('[LUSH] 이미지 로드 성공:', img.src);
    });
  });
}


/* =========================================
  8. 네비게이션 링크 스크롤 강조
  - (현재는 단일 페이지 클론이라 기본 active 유지)
  - 실제 멀티 페이지 구성 시 현재 URL과 비교해 활성화
========================================= */
function initNavHighlight() {
  /* 현재 페이지 URL에서 파일명 추출 */
  const currentPath = window.location.pathname;
  const navLinks    = document.querySelectorAll('.nav-link');

  navLinks.forEach(function (link) {
    // 링크의 href와 현재 URL이 일치하면 active 처리
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}


/* =========================================
  9. 유틸리티 함수
  - 여러 곳에서 공통으로 사용하는 함수들
========================================= */

/**
 * 디바운스 함수
 * - 함수가 너무 자주 호출되지 않도록 제한합니다.
 * - 예: 스크롤, 리사이즈 이벤트에 사용
 *
 * @param {Function} func  - 실행할 함수
 * @param {number}   delay - 지연 시간 (밀리초)
 * @returns {Function} - 디바운스가 적용된 새 함수
 *
 * 사용 예시:
 *   window.addEventListener('resize', debounce(handleResize, 200));
 */
function debounce(func, delay) {
  let timeoutId; // 타이머 ID 저장

  return function (...args) {
    clearTimeout(timeoutId); // 이전 타이머 취소
    timeoutId = setTimeout(function () {
      func.apply(this, args); // 딜레이 후 함수 실행
    }, delay);
  };
}

/**
 * 요소가 현재 화면(뷰포트)에 보이는지 확인하는 함수
 * - IntersectionObserver 미지원 브라우저를 위한 폴백으로 사용 가능
 *
 * @param {HTMLElement} element - 확인할 요소
 * @returns {boolean} - 화면에 보이면 true
 *
 * 사용 예시:
 *   if (isInViewport(myElement)) { ... }
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect(); // 요소의 화면 내 위치 정보

  return (
    rect.top    >= 0 &&
    rect.left   >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right  <= (window.innerWidth  || document.documentElement.clientWidth)
  );
}

/**
 * 페이지 맨 위로 부드럽게 이동하는 함수
 * - scroll-top-btn에서 사용하지만, 외부에서도 호출 가능
 *
 * 사용 예시:
 *   scrollToTop();
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* =========================================
  윈도우 리사이즈 시 처리
  - 화면 크기 변경 시 모바일 메뉴 자동으로 닫기
  - debounce 적용으로 성능 최적화 (200ms 지연)
========================================= */
window.addEventListener('resize', debounce(function () {
  const mainNav      = document.getElementById('main-nav');
  const hamburgerBtn = document.getElementById('hamburger-btn');

  // 768px 이상(태블릿/데스크탑)으로 커지면 모바일 메뉴 닫기
  if (window.innerWidth > 768 && mainNav && hamburgerBtn) {
    mainNav.classList.remove('is-open');
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
}, 200));
