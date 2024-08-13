export function typeMessage(element, text, delay = 30, callback) {
  return new Promise((resolve) => {
    let index = 0;

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, delay);
      } else {
        if (callback) {
          setTimeout(callback, 1000);
        }
        resolve(); // Resolve the promise when typing is complete
      }
    }

    type();
  });
}

export function generateRandomAllyMessage(isHit) {
  const hitMessages = [
    "A SINGULAR STRIKE!",
    "Bullseye! That enemy ship didn't see it coming!",
    "Direct hit! The enemy won't recover from that.",
    "Well done, Captain! The enemy ship is taking on water!",
    "Nailed it! The enemy fleet is falling apart.",
    "Hit confirmed! The enemy is losing ground.",
    "That was a precision strike, Captain! Well done.",
    "Perfect hit! The enemy's defenses are crumbling.",
    "Remarkable accuracy! It's a matter of time",
    "What a hit! The enemy is in shambles",
  ];

  const missMessages = [
    "Just a bit off, Captain. Let's adjust our aim and try again.",
    "Missed by a hair! We'll get them next time.",
    "Close call! The enemy got lucky this time.",
    "No hit this time, Captain. Let's stay focused.",
    "The enemy dodged that one. Ready for another shot?",
    "Well, that was a warning shot! Let's make the next one count.",
    "That one went wide, but no worries—we'll get them soon!",
    "Just a bit off-target, Captain. The next shot will land!",
    "Good try captain, lets stay focused.",
    "The enemy is proving to be evasive captain, but we won't give up",
  ];
  const randomindex = generateRandomIndex();
  console.log(randomindex);
  if (isHit === "yes") {
    return hitMessages[randomindex];
  } else if (isHit === "no") {
    return missMessages[randomindex];
  }
}

export function generateRandomEnemyMessages(isHit) {
  const hitMessages = [
    "Gotcha! That hit must've hurt!",
    "Direct hit! Did you really think you could escape?",
    "Bullseye! Your defenses are crumbling before my eyes.",
    "You’re no match for my aim! That ship won’t last long.",
    "Looks like I’ve got you cornered, Captain!",
    "Your luck just ran out. Consider this a warning.",
    "Are you starting to get worried?",
    "You can’t withstand my firepower! Another hit!",
    "Your ship won't survive many more hits like that!",
    "You can’t hide from my cannons! Direct hit!",
  ];

  const missMessages = [
    "Luck is on your side",
    "Lucky escape. But you won’t be so fortunate next time!",
    "You got away this time, but I’ll hit you soon enough!",
    "What?! That should have hit you! No matter, I’ll correct that.",
    "Just warming up",
    "Enjoy your moment while it lasts. My cannons are reloading as we speak.",
    "You might’ve dodged that one, but what about the next?",
    "Hmm, a minor miscalculation.",
    "Don't get too cocky. Its only a matter of time",
    "Rats!",
  ];

  const randomindex = generateRandomIndex();
  if (isHit === "yes") {
    return hitMessages[randomindex];
  } else if (isHit === "no") {
    return missMessages[randomindex];
  }
}

function generateRandomIndex() {
  return Math.floor(Math.random() * 10);
}
