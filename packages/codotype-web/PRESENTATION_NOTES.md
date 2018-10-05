# PRESENTATION NOTES

Introduce myself and blazeplate

SO - who here has been ever built a full-stack web application.

I build lots of web apps, and when I have a new idea I like to execute on it quickly.

A great quote - inspiration is perishable. I usually want to get something on the page before I lose interest or motivation.

The problem is that starting a new full-stack web project is often intimidating for beginners and tedious for experienced developers.

Think about it - even the most basic applications share a lot of common :
- Database setup and configuration
- User authentication, roles, and management
- WHAT ELSE?

And I feel like that applies to software (and web dev) a lot. You just want to bake an apple pie, but you spend most of your time inventing the universe. This is where boilerplate applications come into the mix.

# # # # #

SO - let's say that you want to bake an apple pie - on in the case case of a web developer, build a simple application.

Let's say you wanted to build an application for managing a class of students. You have courses, assignments, and grades.

# # # # #

SO - those of you not familiar with the term, a 'boilerplate' application refers to a pre-configured and organized generic codebase upon which you can build your app. There are a lot of popular boilerplate repositories on GitHub for a variety of differnet languages and frameworks. A boilerplate codebase is a great way to jumpstart a new project before the inspiration leaves you.

Introduce Hackathon Starter by sahat. How many stars / forks?

Hackathon Starter is a very popular boilerplate application for a full-stack Node.js/Express.js application. However, it's got some problems:
- Way more features than you actually need (so you waste time removing features, thus partially negating the time-saving benefits of using a boilerplate codebase in the first place)
- Designed more for hacking that building production-ready applications
- Boilerplate applications make assumptions about the language, frameworks, style, and features you want - and those assumptions aren't alwasy working in your best favor.

ON TOP OF THIS - even if you fork something like Hackathon Starter you still have to build YOUR code on top of it, which can be tedious - especially if you either don't know where to begin or you have to write a basic CRUD API before you can actually start building your application logic.

INTRODUCE RAILS GENERATE?
The `rails generate` command in Ruby On Rails (<3) allows a developer to quickly generate a new applicatoin resource across the entire stack with a single command. It's very powerful and it enables beginners to feel empowered by their new skills and enables experienced developers to quickly prototype and iterate in the early stages of a new project. I love Rails generate, and idealogically it's been a guiding force in the development of blazeplate

# # # #

SO - blazeplate


# # # #

DEMO

What app should I build during the demo? Introduce the application earlier in the presentation.
NOTE - some of these should be example applications
- Contact Manager (JUST CONTACTS)
- Restaurant Shift Manager (SHIFT has many WORKERS)
- Course / Student / Assignment / Grades manager
  - COURSE has many STUDENTS
  - COURSE has many ASSIGNMENTS
  - GRADE has one ASSIGNMENT
  - STUDENT has many GRADES

TODO - provision a server to scp the app to during the presentation, and unzip and run `docker-compose up`
