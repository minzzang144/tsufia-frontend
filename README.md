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
    <a href="https://github.com/ShigatsuEl/tsufia-frontend"><strong>Explore the docs »</strong></a>
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

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [] Feature 1
- [] Feature 2
- [] Feature 3
  - [] Nested Feature

See the [open issues](https://github.com/ShigatsuEl/tsufia-frontend/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Minchan Lee(ShigatsuEl) - shigatsu970704@gmail.com

Project Link: [https://github.com/ShigatsuEl/tsufia-frontend](https://github.com/ShigatsuEl/tsufia-frontend)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- []()
- []()
- []()

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
