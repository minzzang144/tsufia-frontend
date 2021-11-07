<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ShigatsuEl/tsufia-frontend">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Tsufia</h3>

  <p align="center">
    소켓을 활용하여 실시간으로 적용되는 마피아 게임을 만들어보자!
    <br />
    <a href="https://github.com/ShigatsuEl/tsufia-frontend/blob/master/MEMOIRS.md"><strong>개발 후기 »</strong></a>
    <br />
    <a href="https://github.com/ShigatsuEl/tsufia-backend"><strong>Backend Repo »</strong></a>
    <br />
    <br />
    <a href="https://tsufia.netlify.app">View Demo</a>
    ·
    <a href="https://github.com/ShigatsuEl/tsufia-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/ShigatsuEl/tsufia-frontend/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#copyright">Copyright</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Tsufia Introduction][product-introduction]](https://tsufia.netlify.app)

<br />

|                             Mafia Screenshot                             |                            Citizen Screenshot                            |
| :----------------------------------------------------------------------: | :----------------------------------------------------------------------: |
| [![Tsufia Screen Shot][product-screenshot1]](https://tsufia.netlify.app) | [![Tsufia Screen Shot][product-screenshot2]](https://tsufia.netlify.app) |

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React.js](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Socket.io](https://socket.io/)
- [Redux](https://ko.redux.js.org/)
- [Material UI](https://mui.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

다음은 프로젝트를 로컬로 설정하는 방법에 대한 예입니다. 로컬 복사본을 설정하고 실행하려면 다음 간단한 예제 단계를 수행하십시오.

### Prerequisites

다음은 소프트웨어를 사용하는 데 필요한 항목을 나열하고 설치하는 방법의 예입니다.

- npm

  ```sh
  npm install npm@latest -g
  ```

  or

- yarn
  ```sh
  npm install yarn@latest -g
  ```

### Installation

1. [Google Cloud](https://console.cloud.google.com/apis/dashboard?hl=ko)와 [Kakao Developers Application](https://developers.kakao.com/console/app)에서 CLIENT_ID 및 SECRET_KEY를 가져옵니다.
2. 레포지토리 클론
   ```sh
   git clone https://github.com/ShigatsuEl/tsufia-frontend.git
   ```
3. NPM 패키지들 설치
   ```sh
   npm install
   // or
   yarn install
   ```
4. 루트에서 `.env`파일 생성 후 API KEY를 입력합니다.
   ```js
   REACT_APP_EXPIRES_IN = ENTER_YOUR_CUSTOM_EXPIRES_IN;
   REACT_APP_GOOGLE_CLIENT_ID = ENTER_YOUR_API;
   REACT_APP_GOOGLE_SECRET = ENTER_YOUR_API;
   REACT_APP_KAKAO_CLIENT_ID = ENTER_YOUR_API;
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

```sh
npm start
# or
yarn start
```

아래 이미지를 클릭하여 프로젝트가 어떻게 사용되는지 확인할 수 있습니다.

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/tCC3m92m6dk/0.jpg)](https://www.youtube.com/watch?v=tCC3m92m6dk)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] 로그인 및 회원가입
- [x] 소셜 로그인
  - [x] 구글
  - [x] 카카오
- [x] 패스워드 확인 및 프로필 업데이트
- [x] 소켓 연결
  - [x] 방 입장/수정/퇴장 실시간 연동
  - [x] 게임 사이클 실시간 연동
  - [x] 새로고침 후에도 소켓 연결 유지(실수로 게임 중단되는 것을 방지)

제안된 기능(알려진 이슈)의 전체 목록은 [미해결 이슈](https://github.com/ShigatsuEl/tsufia-frontend/issues)를 참조하십시오.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

기여는 오픈 소스 커뮤니티를 배우고, 영감을 주고, 창조할 수 있는 놀라운 장소로 만드는 것입니다. 어떠한 기여도 대단히 감사합니다:)

여러분이 더 좋은 제안을 가지고 있는 경우 레포지토리를 포크하고 풀 리퀘스트 요청을 작성하십시오. 또한 "향상" 태그로 이슈를 간단히 열 수도 있습니다. 프로젝트에 스타를 주는 것을 잊지 마세요! 다시 한 번 감사드립니다!

1. 프로젝트를 Fork합니다
1. Fork된 프로젝트로부터 로컬 환경으로 복사합니다.(`git clone https://github.com/your_name/tsufia-frontend`)
1. 새로운 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
1. 변경된 점을 커밋으로 남깁니다 (`git commit -m 'Add some AmazingFeature'`)
1. 브랜치를 푸쉬합니다 (`git push origin feature/AmazingFeature`)
1. 풀 리퀘스트를 오픈합니다

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

MIT 라이센스에 따라 배포됩니다. 자세한 내용은 `LICENSE.txt`를 참조하십시오.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Copyright -->

## Copyright

프로젝트에서 사용된 이미지와 오디오들은 아래의 라이센스를 따르고 있습니다.

- [이미지(Pixabay License)](https://pixabay.com/ko/service/license/)
- 오디오(Youtube 오디오 보관함 라이센스 - 저작자 표시 필요 없음)

<!-- CONTACT -->

## Contact

Minchan Lee(ShigatsuEl) - [shigatsu970704@gmail.com](mailto:shigatsu970704@gmail.com)

Project Link: [https://github.com/ShigatsuEl/tsufia-frontend](https://github.com/ShigatsuEl/tsufia-frontend)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Choose an Open Source License](https://choosealicense.com)
- [Img Shields](https://shields.io)
- [Socket.io](https://socket.io/)
- [Material UI](https://mui.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ShigatsuEl/tsufia-frontend.svg?style=for-the-badge
[contributors-url]: https://github.com/ShigatsuEl/tsufia-frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ShigatsuEl/tsufia-frontend.svg?style=for-the-badge
[forks-url]: https://github.com/ShigatsuEl/tsufia-frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/ShigatsuEl/tsufia-frontend.svg?style=for-the-badge
[stars-url]: https://github.com/ShigatsuEl/tsufia-frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/ShigatsuEl/tsufia-frontend.svg?style=for-the-badge
[issues-url]: https://github.com/ShigatsuEl/tsufia-frontend/issues
[license-shield]: https://img.shields.io/github/license/ShigatsuEl/tsufia-frontend.svg?style=for-the-badge
[license-url]: https://github.com/ShigatsuEl/tsufia-frontend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/민찬-이-8030a4200
[product-introduction]: images/introduction.jpg
[product-screenshot1]: images/screenshot1.png
[product-screenshot2]: images/screenshot2.png
