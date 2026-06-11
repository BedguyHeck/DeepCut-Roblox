# DeepCut-Roblox
Created by Charles Jiang and Raymond Lin


Basic information:
1. What the app does and why:
This chatbot specializes in finding underrated gems in Roblox using the genre you ask for. It will give a brief description, what makes it underrated and special, and give recommendation or advice to narrow down your choices. Our mission is to solve the problem of the Roblox game market being flooded with slop games, by helping Robloxians find passion project Roblox games of their favorite genre with ease.


2. How to run it locally:
Go to this website: https://bedguyheck.github.io/DeepCut-Roblox/


3. Which research paper you used and how it influenced your code:
Research Paper Link: https://aclanthology.org/W17-5106.pdf
Research Paper Title: "Building an Argument Search Engine for the Web"
How it influenced our code: This research paper describes the process of argument searching in an argument search engine as one of 5 steps: The Query, Retrieving Arguments, Ranking Arguments, Presenting Arguments, and The Result. We built our Game Finder AI chatbot around this 5 step process: First, the user provides a query, generally containing the genre of game that they want to discover. Next, the AI retrieves a variety of Roblox games under that genre, with the aim in mind of choosing underrated games (games that have few players/a small playerbase, are not on the front page of Roblox, etc.). Then, the AI ranks these arguments, placing games that seem to fit the user's preferences (which are assumed based on the user's previous chat history) at the top, and games that don't fit the user's presumed preferences, but do fit the genre, at the bottom. These arguments are presented in a list format, which is the result.
Research Paper Citation: Henning Wachsmuth, Martin Potthast, Khalid Al-Khatib, Yamen Ajjour, Jana Puschmann, Jiani Qu, Jonas Dorsch, Viorel Morari, Janek Bevendorff, and Benno Stein. 2017. Building an Argument Search Engine for the Web. In Proceedings of the 4th Workshop on Argument Mining, pages 49–59, Copenhagen, Denmark. Association for Computational Linguistics.


4. Each partner's primary contribution area:
Charles Jiang: Backend (API, AI logic, output interpretation)
Raymond Lin: Frontend (GUI, Website design, Game Library)


Video Demo Link: 


Working with an AI Agent:
1. What you used the agent for is specific. Which features did you build with its help? What kinds of prompts did you give it?
2. What worked well where did the agent save you time or produce something better than you expected?
3. What didn't work, where did it make mistakes, go in the wrong direction, or require significant correction?
4. What you learned about prompting, what did you figure out about how to ask it effectively?
5. What you would do differently knowing what you know now, how would you change the way you collaborated with it?


Charles' paragraph (Backend):
I used the AI (ChatGPT) to help me understand and find a free API that I can use. Then, how to use an API key without hardcoding it into the code by putting it into a .env file instead. I used chatbot also to make sure that it is specialized in giving me underrated roblox games. The agent helped me a lot by writing the basic code for the chatbot so I don't need to spend time writing it. Prompting really specifically instead of just giving it a general “Write me this code” matters a lot. If I knew what I knew now, I would have instantly figured out which API key to use and how to use it instead of wasting time researching.


Raymond's paragraph (Frontend):
I used the AI (ChatGPT) mainly for two things: 1. to code the index.html, script.js, and style.css files, and 2. to generate example games to put into the Game Library section of our website (although I also implemented some of my own favorite Roblox games as well, found in the Author's curated games section). I wanted the AI to give me as accurate and relevant of a coding response as possible, so I gave the AI prompts that contained all of the existing code, in order to give the AI the entire picture. I found that if I did not give the AI the entire picture, it would generate code that if implemented into my script, would break the system. I also found that telling the AI to re-code the entire script from start to finish helped me a lot, because admittedly, at the beginning, figuring out where to implement the code that the AI gave me was quite difficult. Eventually, though, I got acquainted with the structure of the code that the AI had built for me, and so I could easily figure out where to put newly generated code. The AI was also very helpful in telling me where to implement the code if I did not know where to. I learnt that the AI grows off of context, and that when you open up a new tab/chat with ChatGPT, the AI will lose all of its previous information, so you should make sure to give it context first. I also found that AI can have quite a terrible concept of what is underrated and what is not, because some of the games that it told me to implement were NOT at all underrated (they were front-page Roblox games that most Robloxians have heard of). The AI was also genuinely horrible at figuring out the links for Roblox game thumbnails, and it would just give me placehold.co links, so I decided to adapt and just implement the image links manually. However, the AI definitely saved me a lot of time and effort because I did not have to deeply learn the ways of Javascript, Typescript, HTML, and CSS, and it was pretty good at finding Roblox game links. Finally, I feel like I learned a lot about using AI to build projects in this final project, and if I had the opportunity to do this all over again, I would change the way me and Charles collaborated by creating a To-Do checklist for both of us to easily see what tasks we have to work on next. Although, I would probably need more time to do something like that.
