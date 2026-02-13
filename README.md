# Yurii Cherkasov

- Birthdate: 21.05.1982
- Email: yurii.cherkasov-0xfa@atatat.net
- Location: Bangkok, Thailand (UTC+7)

Social:
- LinkedIn: https://www.linkedin.com/in/yurii-cherkasov-653b213a0/
- GitHub: https://github.com/yuchdev
- Facebook: https://www.facebook.com/yuchdev
- X (Twitter): https://x.com/yuchdev
- Instagram: https://www.instagram.com/yuchdev

## Blog

This site includes a blog with markdown-based articles. To add a new article:

1. Create a markdown file in the `articles/` directory (e.g., `2026-01-15-my-article.md`)
2. Add YAML front matter at the top:
   ```yaml
   ---
   title: My Article Title
   date: 2026-01-15
   tags: [tag1, tag2]
   ---
   ```
3. Write your content using markdown
4. Add an entry to `articles/index.json`:
   ```json
   {
     "slug": "2026-01-15-my-article",
     "title": "My Article Title",
     "date": "2026-01-15",
     "file": "2026-01-15-my-article.md",
     "tags": ["tag1", "tag2"]
   }
   ```

The blog supports:
- Headings (# to ######)
- Paragraphs
- Inline code: `` `code` ``
- Fenced code blocks: ` ```language ... ``` `
- Links: `[text](url)` (only http/https/mailto URLs allowed for security)
- Unordered lists: `- item`

Security features prevent HTML injection and malicious links.

## Overview

I am a dedicated software engineer with more than a decade of experience in software design and development, with a passion for creating good programs and products. My strongest expertise is in C++, as well as Java and Python as secondary languages, separately or together. I have supported legacy systems, implemented new systems, and designed them from scratch. I have experience both in enterprise and startups, setting up development processes and workflows, Agile/Scrum, code review, Continuous Integration, and task tracking, and providing technical leadership to a small team of Software Engineers, DevOps, and QA. You can take a look at my projects on GitHub, including but not limited to the following:

## Projects

- Advanced C++ by Example — I create educational material for the Advanced C++ course: https://github.com/yuchdev/cpp
- Comprehensive C++ Books Catalog — Creator and maintainer of the most Comprehensive C++ Books Catalog: https://github.com/yuchdev/CppBooks
- Probabilistic Calculator — Checking whether a file or other binary data is encrypted or not: https://github.com/yuchdev/entropy_calculator
- MD5 Bruteforcer — Simple multithreaded MD5 password bruteforcer (for educational purposes only): https://github.com/yuchdev/md5bruteforcer
- Code Generator — Generator of program code and reports supporting C++, Java, HTML5 and Markdown. This CV was generated with the help of this exact generator: https://github.com/yuchdev/code_generator

## Professional Skills

- Strong experience in C/C++ (incl. C++14/17, STL, Templates)
  - Boost (general purpose libraries, Networking, Metaprogramming)
  - Qt5, QtLinguist, Qt Installer Framework
  - Cross-platform Development (a valuable asset)
  - Concurrency, lock-based and lock-free techniques, IPC, distributed computing
  - Educational content
- Solid experience in Python
  - Django REST Framework
  - PyQt5, PyQML, desktop applications with Python
  - CI/CD pipeline automation
  - In general, I can automate basically everything with Python, and like to do so
- Working experience in Java
  - Core Java and JavaFX for cross-platform desktop development
  - High-load blackbox testing platform for REST API
- Unix development
  - Traditional Unix Toolchains: Scripting (bash), Building (gcc, Makefiles), Debugging (gdb)
  - Modern Unix Toolchains: Profiling (perf, Valgrind), Containerization (Docker), Virtualization (KVM, Xen)
  - POSIX, pthreads, high-performance techniques like CPU affinity or kernel bypassing
  - Experience developing for Linux, BSD family and proprietary Unix systems
- Windows development
  - Windows API, multithreading, services, COM and RPC
  - Low-level development, exploit guards, system hooks
  - WinDbg usage and crash-dumps analysis
- Database development
  - SQL queries, stored procedures, triggers, views, and indexes
  - Experience with large relational databases: MS SQL, Oracle 11g, Postgres
  - NoSQL (MongoDB, Redis) from design to optimizations
  - Embedded databases: SQLite, UnQLite
- DevOps skills
  - CI/CD: TeamCity, Jenkins, GitLab CI, GitHub Actions
  - Git(Hub): Version control, Branch and Release Management
  - Docker, Ansible, and general workflow automation on Linux
  - AWS, deployment and management tools, AWS CLI and Boto3 API
  - MS Server-Side Technologies: Active Directory and LDAP, Hyper-V Server, Docker for Windows
- General skills
  - Version control, issue tracking and documentation: Git, Jira, Confluence, Doxygen
  - Modern Object-Oriented Analysis and Design
  - XML/XSL/XSD libraries and XPath Queries

## Experience

### Glorium Technologies – Software Service Company

##### 12.2023 - Present
**Position:** Senior Software Engineer/Consultant

#### Overview

Worked on a portfolio of MedTech products with a strong focus on computer vision, GPU-accelerated image processing, and high-performance systems. Extensively used C++, OpenCV, and NVIDIA CUDA, applying advanced GPGPU parallel computing and multithreading techniques to meet strict performance and reliability requirements.

Led the porting of a large, production-grade SDK from Windows to Linux, ensuring full feature parity, cross-platform compatibility, and optimized runtime performance. Actively analyzed and improved performance of GPU-accelerated rendering and processing services, identifying bottlenecks and delivering measurable throughput and latency improvements.

Handled DevOps responsibilities across multiple projects, designing and maintaining CI/CD pipelines using Jenkins, TeamCity, and GitHub Actions, supported by internal Python-based automation. Managed build, test, packaging, and release workflows, including publishing artifacts to Artifactory.

Provided production support in regulated MedTech environments, investigating incidents, performing root-cause analysis, and delivering stability and performance fixes. Acted as a technical consultant, bridging development, infrastructure, and operational concerns across teams.

#### Projects

##### Digital Pathology Scanner

High-performance image processing and rendering server for digital pathology scanners, leveraging NVIDIA CUDA for GPU acceleration. Responsible for porting core libraries and SDK components from Windows to Linux, ensuring cross-platform compatibility and performance optimization. Designed and maintained CI pipelines and automated packaging, including publishing deliverables to Artifactory.

##### Laboratory Management System

Production-grade laboratory management system with GPU-accelerated components. Provided production support and performance optimization, investigating incidents, diagnosing performance issues, and delivering targeted fixes for stability and throughput under real-world workloads.

##### Embedded IoT Aggregator

Device powered by **Strato Pi** (an industrial IoT platform based on Raspberry Pi) that aggregates data from various sensors and devices, accumulates it in a local database, and sends it to the cloud for further processing.

#### Languages, products and technologies

C++17, Python, OpenCV, NVIDIA CUDA, C#, .NET 8.0, Jenkins, TeamCity

---

### Subjective Agency – Non-commercial Ukrainian organization

##### 12.2019 - 04.2022
**Position:** Lead Backend Engineer

#### Overview

Joined the organization at the outset of the full-scale Russian invasion and focused on building technical solutions to support Ukraine's cyber and information security efforts. Contributed to the development of offensive and defensive security tools, including systems designed to mitigate and withstand DDoS attacks targeting Ukrainian digital infrastructure.

Led backend development for an open web platform dedicated to collecting, structuring, and analyzing information on pro-war propagandists and war criminals. Took full ownership of backend architecture and implementation, designing and delivering secure, scalable services using Django REST Framework and PostgreSQL.

Responsibilities included API design, data modeling, access control, Continuous Integration and Deployment, and operational security of the service. Additionally contributed to frontend development, supporting React-based features and ensuring smooth integration between frontend and backend components in a fast-moving, mission-critical environment.

#### Projects

##### Information Intelligence Backend Platform

Introduced and adopted Django REST Framework, wrapping an existing Postgres database with a structured ORM and RESTful API. Designed Django models, serializers, and views, implemented a custom admin interface, and established a maintainable backend architecture with a strong focus on data integrity and security.

##### Web Application Frontend Support (React)

Provided hands-on support for React-based frontend development when required, assisting with local data caching, reusable UI components, and integration with backend APIs. Acted as a bridge between backend and frontend development to ensure consistent data flow and reliable application behavior.

#### Languages, products and technologies

Python, PyQt, Django REST Framework, JavaScript, React, AWS

---

### Vektor T13 Technologies, LLC – IT-Security Startup

##### 07.2022 - 02.2024
**Position:**  Lead C++ developer

#### Overview

Joined an early-stage IT security startup focused on building privacy-first products for users operating in high-risk environments, including journalists, activists, and security-sensitive organizations. The product vision centered on anti-fingerprinting, surveillance resistance, and secure communication, with long-term plans for a hardened VPN service.

As Lead C++ Developer, responsible for core system development, low-level architecture decisions, and cross-platform engineering. Worked extensively with C++ in performance- and security-critical contexts, addressing platform-specific behavior, build reproducibility, and long-term maintainability.

Contributed to system hardening efforts, privacy-related improvements, and internal tooling, while also participating in architectural discussions, technical documentation, and early product strategy typical of a small, fast-moving startup.

#### Projects

##### Hardened Virtualization Platform (VirtualBox Fork)

Developed privacy-focused enhancements on top of an open-source x86/AMD64/Intel64 virtualization platform, based on a fork of Oracle VirtualBox. Implemented privacy and hardening improvements, established a cross-platform build toolchain, and contributed to internal and external technical documentation to support maintainability and onboarding.

##### IP Auditor & Anti-Fraud Backend

Server-side development of an IP intelligence and anti-fraud system designed to assess risk and threat indicators associated with IP addresses. Built an API aggregation service that collected, normalized, and consolidated data from multiple third-party providers, delivering structured reports covering geolocation, network characteristics, and potential security threats.

#### Languages, products and technologies

C, C++, Qt5, Python, PyQt, Django REST Framework, CMake, TeamCity

---

### Massive, LLC – Distributed computing service provider

#####  09.2019 - 12.2019
**Position:** Senior Software Engineer

#### Overview

Worked on a cross-platform Windows/macOS SDK for an alternative application monetization platform, designed to provide developers with more flexible and user-friendly revenue options than traditional ad-based models. The SDK operated in end-user environments and therefore required careful balancing of performance, stability, and user experience.

Contributed across the full development lifecycle, with a strong focus on build systems, release engineering, and runtime performance control. Played a key role in improving development workflows and production readiness, ensuring reliable delivery of signed and packaged artifacts across supported platforms.

Collaborated closely with product and platform teams to align technical solutions with user experience constraints, particularly in performance-sensitive and always-on distributed computing scenarios.

#### Projects

##### Unified CI Build & Release Pipeline

Redesigned and significantly improved the CI/CD pipeline, introducing a unified system for building, code signing, and packaging applications across Windows and macOS. Reduced manual steps, improved reproducibility, and increased overall reliability of the release process.

##### Adaptive CPU Workload Management

Designed and implemented a CPU workload control system that dynamically limited resource usage to predefined thresholds, ensuring acceptable performance impact and a comfortable end-user experience while maintaining effective participation in distributed workloads.

#### Languages, products and technologies

C++, Python, JavaScript, CMake, AWS API, Google Test

---

### WebGear Services, LTD (Trademark CyberYozh) – Internet Privacy Startup

#####  10.2014 - 07.2018
**Position:** Consultant, Senior C++ Software Engineer

#### Overview

Transitioned from large enterprise environments to early-stage privacy-focused startups, applying prior enterprise experience to establish technical foundations from the ground up. Played a key role in defining system architecture, development workflows, and engineering standards, including CI/CD pipelines, quality assurance processes, and participation in technical hiring—while remaining primarily hands-on and deeply involved in implementation.

Worked extensively on privacy and security-critical software, with a strong focus on C++, cross-platform development, and system-level behavior. The role emphasized building reliable, defensive software for high-risk scenarios, balancing usability with strict security requirements.

#### Projects

##### Secure VPN Client

Developed a cross-platform VPN client with built-in traffic leakage protection, focusing on reliable tunnel management, fail-safe behavior, and preventing accidental exposure of user traffic under adverse network conditions.

##### Emergency Data Wipe System (“Panic Button”)

Designed and implemented an emergency data destruction mechanism capable of securely and irreversibly wiping sensitive data in critical situations, such as device seizure or theft. Engineered to minimize recovery possibility while remaining fast and reliable under real-world constraints.

#### Languages, products and technologies

C++, Boost, Qt5, Python, Windows RAS API, REST API, CMake, TeamCity

---

### Deutsche Bank AG – Global Investment Bank

#####  11.2012 - 09.2014
**Position:** Associate C++/Java Software Engineer

#### Overview

Worked within a large-scale enterprise investment banking environment, contributing to mission-critical trading and risk-management systems with strict requirements for latency, correctness, and reliability. Gained deep exposure to complex, distributed financial systems operating under heavy regulatory and operational constraints.

Focused primarily on performance-critical backend development, collaborating closely with analytics, infrastructure, and business-facing teams. Responsibilities included low-latency systems optimization, translating business requirements into technical solutions, and improving development workflows and CI automation in a multi-team environment.

This role provided hands-on experience with production-grade systems at a significant scale and complexity, laying a strong foundation in performance engineering, distributed computing, and enterprise software delivery.

#### Projects

##### RAPID - Low-Latency Trading Platform

Improved performance of the internal messaging system with end-to-end trading cycle latency below 20 microseconds. Applied lock-free algorithms and low-level concurrency techniques in production code to reduce contention and achieve predictable performance under load.

##### RMS - Risk Management System

Large, multi-tier risk management system operating at enterprise scale. Worked across analytics, computation, and distributed processing modules, collaborating closely with the analytics team to translate business requirements into software architecture and implementation. Provided occasional direct support to business users and significantly improved the CI pipeline using TeamCity and Python-based automation.

#### Languages, products and technologies

C++, Boost, MS Excel/VBA, Python, XML/XSL/XPath, CppUnit, Oracle 11g, TeamCity, REST API

---

### Numerix, LLC – Analytics Provider for derivatives and financial products

#####  07.2011 - 08.2012
- Senior Software Developer

#### Overview

Worked on large-scale financial analytics software used for pricing, structuring, and risk management of complex derivatives. Operated in a performance- and correctness-critical environment where numerical accuracy, reproducibility, and computational efficiency were primary concerns.

Contributed primarily to core platform development and quality engineering, with a strong emphasis on automated testing, performance validation, and low-level optimization. Actively improved development practices by introducing systematic black-box testing and performance profiling, increasing confidence in numerical correctness and system stability across releases.

Combined high-level financial domain understanding with low-level systems expertise, working across APIs, internal infrastructure, and performance-sensitive components.

#### Projects

##### Cross-Asset Derivatives Analytics Platform

Primary contributor to Numerix CrossAsset, a flexible platform for structuring, pricing, and risk management of derivatives, accessible via Excel add-ins as well as C++, C#, and Java APIs. Introduced comprehensive QA automation, including black-box test suites written in Python, leveraging the deterministic nature of numerical computations. Integrated performance profiling into test coverage to detect regressions and validate scalability.

##### Embedded Key-Value Database

Significantly improved performance of an internal embedded database, achieving approximately 4× speedup by replacing generic C++ implementations with platform-specific optimizations using Windows and POSIX APIs. Focused on I/O efficiency, memory handling, and system-level behavior to maximize throughput in real-world workloads.

#### Languages, products and technologies

C/C++, Python, Excel COM API, WinAPI, POSIX API, Valgrind

---

### Wärtsilä (former Transas), Corp. – World-leading developer and supplier of marine and aviation onboard equipment

#####  01.2010 - 07.2011
**Position:** Software Engineer

#### Overview

Worked on mission-critical industrial and aerospace-related software systems, contributing to both onboard and ground-based applications. Participated in full-cycle software development, including system design, implementation, testing, debugging, and peer code reviews, within a safety- and reliability-critical environment.

Developed software across multiple technology stacks, combining Java-based GUI and GIS systems with low-level C/C++ onboard components. Gained early experience working at the intersection of hardware constraints, real-time data processing, and operator-facing interfaces, while also contributing to internal tooling and CI improvements.

#### Projects

##### Gravity - Wildfire Monitoring Drone System

Designed and developed ground control and onboard software for wildfire monitoring drones. Implemented GUI and GIS components in Java for land-based equipment, and onboard control and data-processing software in C/C++. Responsibilities included application design, feature development, bug fixing, writing unit tests, and participating in code reviews across a multidisciplinary team.

##### Internal Security Monitoring System

Developed an X Window System event logging module for an internal security and monitoring platform, using the Xlib API to capture and process low-level system events. Also contributed to improving the CI pipeline, increasing build reliability and development feedback speed.

#### Languages, products and technologies

C/C++, Java SE, Python, Autotools, CMake, XML/XSL/XPath, Google Test

---

### DoctorWeb, LLC – Provider of anti-malware and security solutions

#####  07.2006 - 07.2009
**Position:** Junior Software Engineer

#### Overview

This role marked the beginning of my professional software engineering career. From the outset, I aimed to gain exposure to as many aspects of the development process as possible while participating in the full software lifecycle, from design analysis and implementation to testing and release.

Worked within a mature security product environment, contributing to both user-facing and low-level components. Gained foundational experience in C++, cross-platform development, legacy code maintenance, debugging, and refactoring, while learning to operate within large, multi-module codebases typical of long-lived security products.

#### Projects

##### Doctor Web Security Space

Contributed to a multi-module security solution for protecting workstations and small servers against malware. Initially worked on GUI components, then transitioned to backend and infrastructure modules, including a C++ SQLite-based storage layer and an asynchronous RPC server for Windows. Also participated in legacy code maintenance, bug fixing, and incremental refactoring.

##### Doctor Web Updater

Worked on a cross-platform update module used across the company's product line, from desktop antivirus solutions to server-scale deployments for ISPs. Implemented parts of a platform-independent update service in C++ using Boost, and integrated an embedded Lua engine to support flexible business logic.

#### Languages, products and technologies

C/C++, Lua, MFC, WTL, Watcom

## Education

##### Saint-Petersburg State Polytechnic University — BSc in Software Engineering, 2010

- Best average grade in the group
- Participant of student conferences and publications
- Relevant coursework: Data Structures and Algorithms, Operating Systems, Databases, Software Engineering, Computer Networks, Formal Languages and Automata Theory
