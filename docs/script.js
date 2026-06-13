function showTab(tab) {
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));


  document.getElementById(tab).classList.add("active");


  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
}


document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => showTab(btn.dataset.tab));
});


const input = document.getElementById("user-input");
const output = document.getElementById("output-area");
const form = document.getElementById("chat-form");


function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);


  if (type === "ai" || type === "error") {
    div.innerHTML = marked.parse(text.replace(/\\n/g, "\n"));
  } else {
    div.textContent = text;
  }


  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();


  const prompt = input.value.trim();
  if (!prompt) return;


  addMessage(`You: ${prompt}`, "user");
  input.value = "";


  const loading = document.createElement("div");
  loading.classList.add("message", "ai");
  loading.textContent = "AI is thinking...";
  output.appendChild(loading);


  try {
    const res = await fetch("https://turbo-meme-5gq6wpq7r6v27q9-8000.app.github.dev/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });


    const data = await res.json();
    loading.remove();


    if (res.ok) {
      addMessage(data.answer, "ai");
    } else {
      addMessage(data.detail || "Error", "error");
    }


  } catch {
    loading.remove();
    addMessage("Backend not running", "error");
  }
});


const gameDatabase = {
  horror: [
    {
      title: "The Mimic",
      image: "https://tr.rbxcdn.com/180DAY-62b697efe0158d0563e36fc30c72325e/500/280/Image/Jpeg/noFilter",
      description:
        "A Japanese folklore-inspired horror experience.",
      review:
        "4.5 stars. Extremely atmospheric and cinematic horror gameplay.",
      pros: ["The atmosphere is constantly tense", "The story is really powerful", "The game is designed for co-op gameplay"],
      cons: ["This game is very scary", "There are hard jumpscares"],
      advice:
        "It is advised that you play with friends and wear headphones for the best experience.",
      link:
        "https://www.roblox.com/games/6243699076/The-Mimic"
    },




    {
      title: "DOORS",
      image: "https://tr.rbxcdn.com/180DAY-663bc02a3552df83c78368c3b4cce0eb/500/280/Image/Jpeg/noFilter",
      description:
        "Escape an endless onslaught of dark, mysterious rooms while avoiding deadly entities.",
      review:
        "4 stars. One of the best modern Roblox horror experiences.",
      pros: ["The game is extremely replayable", "The game's sounds are extremely well designed"],
      cons: ["The game can become repetitive over time"],
      advice:
        "Pay attention to sounds and visual clues. Wear headphones, and read wiki information on entities so that you don't get caught off guard.",
      link:
        "https://www.roblox.com/games/6516141723/DOORS"
    },




    {
      title: "Dead Silence",
      image: "https://tr.rbxcdn.com/180DAY-d2a4a4801eea1eb5206f9d87b3f272ca/768/432/Image/Webp/noFilter",
      description:
        "Investigate a disturbing urban legend.",
      review:
        "4 stars. Objectively still one of the creepiest Roblox games ever made.",
      pros: ["The game is very story-driven", "The game has a classic horror vibe"],
      cons: ["The game has some older visuals"],
      advice:
        "Use headphones and turn off the lights for a creepier experience. Be ready.",
      link:
        "https://www.roblox.com/games/2577040780/Dead-Silence-Horror"
    }
  ],




  rpg: [
    {
      title: "Vesteria",
      image: "https://tr.rbxcdn.com/180DAY-672284a799dbf0af07ae393a30523668/768/432/Image/Webp/noFilter",
      description:
        "Fantasy MMORPG with quests and bosses. Similar to other Roblox MMORPG games like World Zero or Swordburst 3, if you have ever played those games.",
      review:
        "3.5 stars. Deep progression and polished RPG mechanics, but not exactly my cup of tea. Others might find this game enjoyable.",
      pros: ["The game has a huge, beautiful world", "The game has many fun boss battles"],
      cons: ["The game gets quite grindy quickly"],
      advice:
        "This game is best enjoyed long-term with friends who can play with you often and consistently. Be prepared for slow progress that accumulates over time.",
      link:
        "https://www.roblox.com/games/2376885433/Vesteria"
    },




    {
      title: "Deepwoken",
      image: "https://tr.rbxcdn.com/180DAY-8ccf38cd2fbade23ab2400645f112986/500/280/Image/Jpeg/noFilter",
      description:
        "A hardcore RPG featuring difficult combat.",
      review:
        "3.5 stars. An extremely challenging but rewarding experience. Some people really love this game, and I can't really blame them. I have never played this game due to the paywall though.",
      pros: ["The game has deep mechanics", "The game has a massive world"],
      cons: ["The game can have a toxic community", "The game has a steep learning curve", "The game costs Robux to play 😭"],
      advice:
        "Expect to lose characters while learning. YOU WILL DIE MANY TIMES.",
      link:
        "https://www.roblox.com/games/4111023553/Deepwoken"
    }
  ],




  survival: [
    {
      title: "3008",
      image: "https://tr.rbxcdn.com/180DAY-a594aab49519056cbac9bbf4c78c9571/768/432/Image/Webp/noFilter",
      description:
        "An SCP Roblox game focused on SCP-3008, in which you survive in an endless IKEA-inspired store. Run away from crazed and frenzied IKEA workers.",
      review:
        "3.5 stars. Creative and immersive survival gameplay. It's alright, and definitely immerses you in SCP lore. In my opinion, there are better SCP games like SCP Roleplay.",
      pros: ["The game features a lot of base building and night-preparing", "The game has quite a unique concept that you can't find elsewhere"],
      cons: ["The game can get repetitive and you might quit early on", "The game is a little harsh to beginners", "The game can be a little confusing"],
      advice:
        "Build your base above ground level. Hide from the workers at night. Maybe even read some SCP-3008 lore...",
      link:
        "https://www.roblox.com/games/2768379856/3008"
    },




    {
      title: "Natural Disaster Survival",
      image: "https://tr.rbxcdn.com/180DAY-ad0ab7bbc71b26764f3bfc061281f363/500/280/Image/Jpeg/noFilter",
      description:
        "Survive earthquakes, floods, tornadoes, volcano eruptions, and more.",
      review:
        "4 stars. A classic. Simple but timeless Roblox fun. Falls in line with games like Work At A Pizza Place.",
      pros: ["The game is very replayable as it has fast rounds", "The game features insanely classic and nostalgic gameplay", "The game is playable with friends"],
      cons: ["The game has very basic mechanics", "The game can get boring quickly"],
      advice:
        "You must stay alert, move quickly, and learn from your mistakes. And have fun playing one of Roblox's most OG games.",
      link:
        "https://www.roblox.com/games/189707/Natural-Disaster-Survival"
    }
  ],




  tycoon: [
    {
      title: "Retail Tycoon 2",
      image: "https://tr.rbxcdn.com/180DAY-1065393c52e9f52b98db9a26cd9b5d8a/500/280/Image/Jpeg/noFilter",
      description:
        "Build and manage your own successful retail store.",
      review:
        "3.5 stars. One of the deepest management games on Roblox. It feels a little boring and slow for me, but for those willing to put in time, it is great.",
      pros: ["The game allows you to have a lot of creative freedom", "The game can also be considered to have strategic gameplay"],
      cons: ["The game has quite a slow beginning", "Money can come in quite slow in this game"],
      advice:
        "Expand carefully to avoid going into serious debt.",
      link:
        "https://www.roblox.com/games/5865858426/Retail-Tycoon-2"
    },




    {
      title: "Theme Park Tycoon 2",
      image: "https://tr.rbxcdn.com/180DAY-43ce23701dc7af2de45af720b32caf0c/768/432/Image/Webp/noFilter",
      description:
        "Design massive custom theme parks.",
      review:
        "4 stars. Excellent building mechanics and creativity. Has an OG feel for me, as I know people who used to play this game, but not anymore.",
      pros: ["This game also allows you a lot of freedom", "You can build massive parks that can only exist in your dreams"],
      cons: ["The game has a steep learning curve"],
      advice:
        "Start small before giant projects. Work your way up as you make more and more money. Be unique, and most importantly, love your own theme park.",
      link:
        "https://www.roblox.com/games/69184822/Theme-Park-Tycoon-2"
    }
  ],




  simulator: [
    {
      title: "Bee Swarm Simulator",
      image: "https://tr.rbxcdn.com/180DAY-315e29556054777604420711cb64f0b6/768/432/Image/Webp/noFilter",
      description:
        "Collect pollen and build your bee army.",
      review:
        "4 stars. One of Roblox's most addictive simulators. I know friends who play it a lot.",
      pros: ["This game can be quite relaxing and fun with friends", "The game has lots of progression and lots of content to work towards"],
      cons: ["This game is VERY grindy"],
      advice:
        "Upgrade your bees early, and play often to work your way up slowly.",
      link:
        "https://www.roblox.com/games/1537690962/Bee-Swarm-Simulator"
    },




    {
      title: "Pet Simulator 99",
      image: "https://tr.rbxcdn.com/180DAY-2617a1464fb92641ff64536df06ef396/768/432/Image/Webp/noFilter",
      description:
        "Collect pets by opening eggs and unlock powerful upgrades to boost your money income.",
      review:
        " 2 stars. Huge playerbase (but it's mostly kids) and semi-satisfying progression. Unfortunately not recommended for the average Roblox player (especially if you are above the age of 10).",
      pros: ["This game is very addictive", "Some people argue it is fun collecting pets"],
      cons: ["This game gets a LOT of hate for its heavy emphasis on microtransactions and pay-to-win 😢"],
      advice:
        "Save gems for rare pets. Be prepared to feel underwhelmed if you are not willing to spend money...",
      link:
        "https://www.roblox.com/games/8737899170/Pet-Simulator-99"
    }
  ],
  curated: [
    {
      title: "Empire Clash",
      image: "https://tr.rbxcdn.com/180DAY-de07f0ffc8b7ab32f197a851d55fd3a6/768/432/Image/Webp/noFilter",
      description:
        "This game is an team-based empire-invading strategy game.",
      review:
        "4.7 stars. Highly recommend. It is definitely a game that I can play for hours at a time.",
      pros: ["Very fun with friends (especially people from a discord server)", "You can play as many different classes that each have their own skill trees and roles"],
      cons: ["You will die quite a bit", "Grinding levels (especially with combat classes) can take several hours or even days"],
      advice:
        "Start with a civilian class like the hunter or blacksmith, make some gold, and work your way up. Save your gold.",
      link:
        "https://www.roblox.com/games/9588998913/Empire-Clash"
    },
    {
      title: "Field of Battle",
      image: "https://tr.rbxcdn.com/180DAY-e45f0510a0de636e17934080c013b958/150/150/Image/Webp/noFilter",
      description:
        "Very OG game, quite dead, but so much fun when it was in its prime. Might still have some loyal players left.",
      review:
        "5 stars. Highly recommend, its only downfall was its lack of updates and a dying playerbase.",
      pros: ["Strategic battling mechanics", "Multiple different classes that each have their own mechanics", "Vast and beautiful (although outdated) maps"],
      cons: ["Tough for beginners", "Has very few players"],
      advice:
        "Maybe don't play this dead game in 2026. But in case this game ever gets a remake, revamp, or a revival, this will be here waiting for us.",
      link:
        "https://www.roblox.com/games/147536429/Field-of-Battle"
    },
    {
      title: "Grave Digger",
      image: "https://tr.rbxcdn.com/180DAY-050a34e7adac103b4694a01e48d46367/768/432/Image/Webp/noFilter",
      description:
        "An alternate history WW1 shooter game with classes, melee, perks, and slow firearm warfare.",
      review:
        "4.8 stars. It is one of the best shooters on the Roblox platform now, because of its amazing graphics, design, classes, and in-depth lore.",
      pros: ["Many classes to choose from", "Chaotic and exciting gameplay"],
      cons: ["A little laggy at max graphics", "Can feel a little unbalanced or difficult for beginners"],
      advice:
        "Start slow. Learn what your favorite class is, by playing each one and seeing which playstyle you like the most. Then stick to that class, and perfect it. It will take hundreds of hours. But you will have a lot of fun.",
      link:
        "https://www.roblox.com/games/18259975825/Grave-Digger"
    },
    {
      title: "Roblox High School 2",
      image: "https://tr.rbxcdn.com/180DAY-cc0d5a2e4c743fc59d2217306a093c67/768/432/Image/Webp/noFilter",
      description:
        "A sequel to a very popular Roblox game, Robloxian High School RP. In this game, live the life of a student in highschool, where you can be whoever you want to be.",
      review:
        "4 stars. You will like this game even if you don't like RP. The minigames that each class has are undoubtedly fun even for teenagers. And if you have played this game a long time ago, it will give you a lot of nostalgia.",
      pros: ["Gives a lot of nostalgia", "Minigames are extremely fun"],
      cons: ["Has changed a lot over the years", "Probably not interesting for people who have never played it before"],
      advice:
        "Don't play this game if you aren't open minded. You won't like it. But if the game gives you a good sense of nostalgia, appreciate it. Not many games give nostalgia like this one.",
      link:
        "https://www.roblox.com/games/2098516465/Roblox-High-School-2"
    },
    {
      title: "Decaying Winter",
      image: "https://tr.rbxcdn.com/180DAY-a199e09286936ad9e07ab961283bae64/500/280/Image/Jpeg/noFilter",
      description:
        "First person wave survival melee shooter. Scavenge throughout a semi-large map for weapons, ammo, and kill enemies for food and water. Survival is necessary, and death is inevitable.",
      review:
        "5 stars. Game was quite popular during the pandemic, although it has lost most of its playerbase. Still an amazing game, and my favorite class is definitely either Vagabond or Hivemind.",
      pros: ["Amazing and unique classes", "Unique concept"],
      cons: ["A little difficult to learn", "Older graphics"],
      advice:
        "Start off with the Survivalist class, but as soon as you can, switch to Hivemind when you unlock classes. Hivemind is such a beginner friendly class because you can cheese the enemies with direct enemy targeting with the Hivemind abiltiy.",
      link:
        "https://www.roblox.com/games/13438553315/Decaying-Winter"
    },
    {
      title: "Hunted",
      image: "https://tr.rbxcdn.com/180DAY-7ed91690417809e1d6dc2fc664a10af3/500/280/Image/Jpeg/noFilter",
      description:
        "A Roblox recreation of the game Dark Deception. Pretty much a direct copy, but that is the kind of thing that Roblox does well.",
      review:
        "4.5 stars.",
      pros: ["Very similar to Dark Deception", "Good voicelines (because they are a copy from the original LOL)"],
      cons: ["A little scary", "Quite laggy at max graphics"],
      advice:
        "From what I have played, the game is not too hard. But you should definitely play with friends, because that will make the game twice as fun.",
      link:
        "https://www.roblox.com/games/136431686349723/HUNTED"
    },
    {
      title: "Boss Fighting Stages",
      image: "https://tr.rbxcdn.com/180DAY-fbf4ffff95d3bfbe402d42c243aeaa76/768/432/Image/Webp/noFilter",
      description:
        "Choose a class out of the four: Baller, Piercer, Slicer, and Crusher. Battle through various waves of normal enemies that always lead into a boss.",
      review:
        "5 stars.",
      pros: ["Very nostalgic", "Unique concept"],
      cons: ["Slow for beginners", "Older graphics"],
      advice:
        "This game takes quite a long time to level up your classes. But once you get a class to max level, you will be skilled enough to level up the rest of the classes pretty easily.",
      link:
        "https://www.roblox.com/games/137116372/Boss-Fighting-Stages"
    },
    {
      title: "Zach's Service Station",
      image: "https://tr.rbxcdn.com/180DAY-e63cc01bee76ff4e34de47a5520bfb62/500/280/Image/Jpeg/noFilter",
      description:
        "A gas station service simulator where you get to work as one of its employees. Can you survive the grueling days of business out in the desert, and avoid bankruptcy while also expanding, as the bills get higher?",
      review:
        "4.5 stars.",
      pros: ["Great with friends", "Many different tasks you can do"],
      cons: ["Quite difficult to the point where you will lose eventually no matter what", "Does not get updates"],
      advice:
        "This game was extremely popular during the pandemic, but it has fallen from grace. Still an amazingly underrated game that deserves more attention, from both its developers and its players.",
      link:
        "https://www.roblox.com/games/9359839118/Zachs-Service-Station"
    },
    {
      title: "Guts And Blackpowder",
      image: "https://tr.rbxcdn.com/180DAY-44c4b5f4bad7077decd6f959120766aa/768/432/Image/Webp/noFilter",
      description:
        "Napoleonic War style zombie slashing and shooting game. Many classes. Work together in story-driven, objective-based modes, or fend off endless waves of dangerous zombies.",
      review:
        "5 stars. PEAK.",
      pros: ["Amazing classes", "Diverse selection of weaponry"],
      cons: ["A little grindy", "Bad teammates (sometimes)"],
      advice:
        "Give this game a try. You will love it (most likely). This game requires a lot of teamwork and strategy.",
      link:
        "https://www.roblox.com/games/12334109280/Guts-Blackpowder"
    },
    {
      title: "Blackhawk Rescue Mission 5",
      image: "https://tr.rbxcdn.com/180DAY-353a796f880283889129192124b18d9f/768/432/Image/Webp/noFilter",
      description:
        "A large-scale military tactical shooter where teamwork, strategy, and skill determine success.",
      review:
        "4.6 stars. Highly recommended that you check out this game if you love shooter and military roleplay games.",
      pros: ["Massive open world", "Lots of gun customization"],
      cons: ["Graphics can make your computer lag", "AI can be buggy"],
      advice:
        "Get a squad to play the game with, whether you are a beginner or a veteran. Try out all of the guns in the game, each one has a different playstyle, from close quarters combat to mountain sniping.",
      link:
        "https://www.roblox.com/games/2916899287/Blackhawk-Rescue-Mission-5"
    },
    {
      title: "Rise of Nations",
      image: "https://tr.rbxcdn.com/180DAY-658ac363fc76363a185c8e77355b1976/768/432/Image/Webp/noFilter",
      description:
        "Modern world domination strategy game with deep mechanics and many playstyles.",
      review:
        "4.8 stars. ",
      pros: ["Different modes of combat (army and navy and air)", "Very fun with friends (but you should not team)"],
      cons: ["Hard for beginners", "Lots of complicated mechanics"],
      advice:
        "USA is the best country, because it's so isolated from other countries and starts up with a large population, democratic ideology, and insane tax income. However, USA has an XP requirement to make sure that newbies can not play the country.",
      link:
        "https://www.roblox.com/games/2569453732/Rise-of-Nations"
    },
    {
      title: "RB World 5",
      image: "https://tr.rbxcdn.com/180DAY-9153df39b76d398c24535b0d99fe8363/500/280/Image/Jpeg/noFilter",
      description:
        "A semi-realistic basketball game in Roblox.",
      review:
        "4.7 stars. Very addicting game that can make you fall in love with basketball.",
      pros: ["", ""],
      cons: ["", ""],
      advice:
        "",
      link:
        "https://www.roblox.com/games/15800296330/FREE-RB-World-5"
    },
    {
      title: "SCP: Roleplay",
      image: "https://tr.rbxcdn.com/180DAY-146501034377ac1bf95fe1c725a36b6c/768/432/Image/Webp/noFilter",
      description:
        "",
      review:
        " stars.",
      pros: ["Can still beat pay to win classes", ""],
      cons: ["Kind of pay to win", ""],
      advice:
        "",
      link:
        "https://www.roblox.com/games/5041144419/SCP-Roleplay"
    },
    {
      title: "PROJECT APEX",
      image: "https://tr.rbxcdn.com/180DAY-3ab5202569f7a73ec1461464d0f08978/768/432/Image/Webp/noFilter",
      description:
        "",
      review:
        " stars.",
      pros: ["", ""],
      cons: ["", ""],
      advice:
        "",
      link:
        "https://www.roblox.com/games/15509312676/PROJECT-APEX"
    },
    {
      title: "HELLMET",
      image: "https://tr.rbxcdn.com/180DAY-b5cf172cba38b57eb788a93b98577366/768/432/Image/Webp/noFilter",
      description:
        "",
      review:
        " stars.",
      pros: ["", ""],
      cons: ["", ""],
      advice:
        "",
      link:
        "https://www.roblox.com/games/13815196156/HELLMET"
    },
    {
      title: "Noobs in Combat",
      image: "https://tr.rbxcdn.com/180DAY-54bb04d61f5a7291629877360a6fac3a/500/280/Image/Jpeg/noFilter",
      description:
        "",
      review:
        " stars.",
      pros: ["", ""],
      cons: ["", ""],
      advice:
        "",
      link:
        "https://www.roblox.com/games/5734383673/Noobs-in-Combat"
    },
    {
      title: "The Battle Bricks",
      image: "https://tr.rbxcdn.com/180DAY-e5550f00b0a91568e40a06de2053dceb/768/432/Image/Webp/noFilter",
      description:
        "",
      review:
        " stars.",
      pros: ["", ""],
      cons: ["", ""],
      advice:
        "",
      link:
        "https://www.roblox.com/games/10834586502/The-Battle-Bricks"
    },
    {
      title: "The Company",
      image: "https://tr.rbxcdn.com/180DAY-9ba79ea82da9447efc5fffd45f7467ce/768/432/Image/Webp/noFilter",
      description:
        "",
      review:
        " stars.",
      pros: ["", ""],
      cons: ["", ""],
      advice:
        "",
      link:
        "https://www.roblox.com/games/76842920359834/The-Company"
    },
  ]
};




const results = document.getElementById("results");

function getPlaceId(gameLink) {

  const match = gameLink.match(/\/games\/(\d+)/);

  return match ? match[1] : null;
}


async function getThumbnail(placeId) {

  try {

    const res = await fetch(
      `https://turbo-meme-5gq6wpq7r6v27q9-8000.app.github.dev/api/thumbnail?place_id=${placeId}`
    );

    const data = await res.json();

    return data.imageUrl;

  } catch {

    return null;

  }
}
async function findGames() {
  const genre = document.getElementById("genreSelect").value;
  results.innerHTML = "";


  if (!genre) {
    results.innerHTML = `<p class="empty">Select a genre</p>`;
    return;
  }


  const games = gameDatabase[genre] || [];


  for (const game of games) {
    const card = document.createElement("div");
    card.classList.add("card");


  const img = document.createElement("img");

  img.src =
    `https://placehold.co/500x280/0f172a/38bdf8?text=Loading...`;

  const placeId = getPlaceId(game.link);

  if (placeId) {

    const thumbnailUrl =
      await getThumbnail(placeId);

    if (thumbnailUrl) {
      img.src = thumbnailUrl;
    }

  }


    img.onerror = () => {
      img.src = `https://placehold.co/500x280/0f172a/38bdf8?text=${encodeURIComponent(game.title)}`;
    };


    const content = document.createElement("div");
    content.classList.add("card-content");


    content.innerHTML = `
      <h2>${game.title}</h2>
      <p class="desc">${game.description}</p>
      <p class="review">⭐ ${game.review}</p>
      <div class="lists">
        <p><strong>Pros:</strong> ${game.pros.join(", ")}</p>
        <p><strong>Cons:</strong> ${game.cons.join(", ")}</p>
      </div>
      <p class="advice">💡 ${game.advice}</p>
      <a href="${game.link}" target="_blank">Play</a>
    `;


    card.appendChild(img);
    card.appendChild(content);


    results.appendChild(card);
  };
}


document.getElementById("searchBtn").addEventListener("click", findGames);
window.findGames = findGames;
