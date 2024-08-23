export function typeMessage(element, text, delay = 20) {
  return new Promise((resolve) => {
    let index = 0;

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, delay);
      } else {
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
    "Remarkable accuracy! It's a matter of time.",
    "What a hit! The enemy is in shambles.",
    "Outstanding hit, Captain! We're turning the tide!",
    "You hit their weak spot! Victory is within reach!",
    "Excellent shot! The enemy's morale is plummeting.",
    "Our aim is true! The enemy is feeling the pressure.",
    "Direct hit, Captain! Keep up the great work.",
    "Great shot! The enemy's defenses are breaking down.",
    "Impressive accuracy! The enemy is on the ropes.",
    "Another perfect hit! The enemy's defeat is imminent.",
    "Your targeting is spot-on, Captain! Well done!",
    "Fantastic! The enemy is reeling from that strike.",
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
    "Good try, Captain. Let's keep our aim sharp.",
    "The enemy is proving to be evasive, Captain, but we won't give up.",
    "We missed this time, but we’ll recalibrate and get them next round!",
    "Don’t let it get to you, Captain. We’ll find our mark soon!",
    "A near miss! The enemy’s luck won’t last long.",
    "Adjusting our aim—next shot will be on target.",
    "That shot went wide, but stay alert—we’re in this to win.",
    "Heads up, Captain! We’re due for a hit.",
    "Keep your spirits up, Captain. Our next shot will land.",
    "That one was close, but not quite. We’ll get them next time.",
    "Missed! But we’re just getting started.",
    "The enemy dodged us this time, but our aim will improve.",
  ];

  const randomIndex = generateRandomIndex(hitMessages.length);
  if (isHit === "yes") {
    return hitMessages[randomIndex];
  } else if (isHit === "no") {
    return missMessages[randomIndex];
  }
}

export function generateRandomEnemyMessages(isHit) {
  const hitMessages = [
    "Bullseye! Your ships are no match for my skills.",
    "Direct hit! Did you really think you could outsmart me?",
    "Another perfect shot! Your fleet is falling apart.",
    "You’re getting hit hard! My aim is unbeatable.",
    "Looks like I’m on fire today! Can’t you see you’re doomed?",
    "Another strike! Your defenses are crumbling.",
    "You can’t escape my relentless assault!",
    "Every shot finds its mark—how does it feel to lose?",
    "Your ships are like sitting ducks. Easy targets!",
    "I’m hitting all the right spots—what’s your strategy again?",
    "You’re outmatched and outgunned! Expect more hits.",
    "I’m unbeatable! Your fleet is going down fast.",
    "Another hit! Your tactics are laughable.",
    "You’re just making it easier for me—more hits are coming!",
    "You’re sinking fast! My aim is too precise for you.",
    "How does it feel to be cornered? More hits incoming!",
    "You can’t hide from me! Your defeat is imminent.",
    "I’m picking you off one by one—no escape!",
    "Your ships are doomed! My accuracy is unmatched.",
    "Your defeat is inevitable—prepare for more hits!",
  ];

  const missMessages = [
    "You’re just lucky—my aim is too good for you.",
    "Enjoy this moment of luck. It won’t last long!",
    "You dodged this time, but don’t get too comfortable.",
    "Just a fluke! My next shot will find its mark.",
    "Nice dodge, but it’s only a temporary reprieve.",
    "You got away this time, but my aim is still superior.",
    "A minor miss! I’m just warming up.",
    "Consider this a lucky escape. I’m closing in.",
    "You might have dodged, but I’ll be hitting you soon.",
    "Your luck is running out. My shots will land next time!",
    "You’re on borrowed time—my aim is flawless!",
    "That shot was a warm-up. Prepare for more hits.",
    "You escaped this time, but my accuracy will prevail.",
    "A miss, but it just means I’ll be more precise next time.",
    "Don’t get too cocky! I’ll be hitting you soon enough.",
    "A miss, but expect more precise strikes shortly.",
    "You’re evading now, but the hits will come soon.",
    "My aim is relentless. I’ll get you eventually.",
    "A close miss. I’m just honing my skills.",
    "A miss, but it’s only a matter of time before I get you.",
  ];

  const randomIndex = generateRandomIndex(hitMessages.length);
  if (isHit === "yes") {
    return hitMessages[randomIndex];
  } else if (isHit === "no") {
    return missMessages[randomIndex];
  }
}

function generateRandomIndex(length) {
  return Math.floor(Math.random() * length);
}
