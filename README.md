# LaunchCode Capstone Project

## PlayBack
#### Welcome to PlayBack!
###### This is my capstone project from LaunchCode's Software Development course. PlayBack is used for tracking media consumption over 4 different entertainment types - Movies, TV Shows, Video Games, and Books. Each user has their own Rewind list to track everything they've watched, played, or read. Additionally, each user has a personal Up Next list to track what they will do next time! PlayBack is a great way to keep track of everything in one convenient location.

## Tech Stack
| Frontend  | Backend |
| ------------- |:-------------:|
| React     | Java          |
| JavaScript| SpringBoot    |
| HTML      | SpringSecurity|
| CSS       | MySQL         |
| Vite      | Maven |
| React Router | Hibernate  |

## Installation Instructions
###### Fork the repository and clone it to your local machine. Make sure you have MySQL installed on your machine for the database to work. 
###### Follow these steps:
1. Obtain free keys from the following APIs:
    * OMDb: https://www.omdbapi.com/apikey.aspx
    * RAWG: https://rawg.io/apidocs
    * No key needed for Google Books API
2. Create your own .env file on the root level of the **playback-frontend** directory and enter the following:
    * VITE_OMDB_API_KEY={your_key}
    * VITE_RAWG_API_KEY={your_key}
3. Create your own app.env file in **playback** directory and enter the following:
    * DB_HOST=localhost
    * DB_PORT=3306
    * DB_USER=root
    * DB_PASSWORD= {your_MySQL_password}
    * DB_NAME=playback-database
4. Creat a new schema in MySQL named **playback_database**.
5. Both the frontend and backend will need to be running. I use IntelliJ to run the **PlayBackApplication** main class with a custom Run Configuration:
    * Set up the Run Configuration to read your app.env file from step 3 in order to run properly.
6. To run the frontend:
    * Navigate your console to the **playback-frontend** directory
    * Run the command **npm run dev** in the console
    * Once the frontend is running you can either run the command **"o"** to open the project in your browser or navigate to **http://localhost:5173**
7. Enjoy! PlayBack should now be running. Note that you do need to register and login to an account before utilizing any features.

## ERD
###### View my [Entity Relationship Diagram](https://www.figma.com/board/bXQSZ7qZpP2kWlxXjLAFLH/Unit-2-Final-ERD?node-id=0-1&p=f&t=hlYsdPUJhg4Jy8SJ-0)

## Wireframe
###### View my orignal [Wireframe](https://www.figma.com/board/bXQSZ7qZpP2kWlxXjLAFLH/Unit-2-Final-ERD?node-id=0-1&p=f&t=hlYsdPUJhg4Jy8SJ-0)


## What's In Store For The Future?
###### PlayBack has massive potential for scalability. First and foremost: more media categories to log. This project started as an official version of something I already handle manually in my Notes app on my iPhone. The MVP for PlayBack only includes the four media categories - movies, TV shows, video games, and books. My personal list includes many more categories including concerts, albums, plays, comic books, and a separate list for each to log when I have experienced something an additional time. PlayBack is meant to be the only place you need to go for everything and this next step will bring the app closer to that goal.

###### User Accounts will also become more robust in the future. Each user will have the ability to sort their list as they see fit. Move video games to the top of the list, sort by date added or release date, filter by genre, and many more. Customizability is key to user experience.

###### In the far off future, I would like to add a social aspect to PlayBack. The two major features I have in mind are:
1. A feed that posts when you have updated Rewind or UpNext
2. Shared lists between users
