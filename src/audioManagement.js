import menuTheme from "./audio/AMONG US - OST - MAIN THEME SONG [HQ].mp3";
import hitSound from "./audio/Cannon Sound Effect.mp3";
import missSound from "./audio/Water Drop - Sound Effects.mp3";
import victorySound from "./audio/Among Us Victory Sound.mp3";
import defeatSound from "./audio/Among Us Defeat Sound.mp3";
import revealShipSound from "./audio/Magic Reveal Sound Effect.mp3";

// Create audio object
export const audioFiles = {
  menuTheme: new Audio(menuTheme),
  hitSound: new Audio(hitSound),
  missSound: new Audio(missSound),
  victorySound: new Audio(victorySound),
  defeatSound: new Audio(defeatSound),
  revealShipSound: new Audio(revealShipSound),
};

audioFiles.menuTheme.loop = true;
audioFiles.menuTheme.volume = 0.025;
audioFiles.hitSound.volume = 0.05;
audioFiles.missSound.volume = 0.05;
audioFiles.victorySound.volume = 0.3;
audioFiles.defeatSound.volume = 0.25;
audioFiles.revealShipSound.volume = 0.05;
export function playSound(soundName) {
  const sound = audioFiles[soundName];

  if (!sound) {
    return Promise.reject(new Error(`Sound "${soundName}" not found`));
  }

  return new Promise((resolve, reject) => {
    //event listener to resolve the promise when the sound has finished playing
    sound.onended = () => {
      resolve();
    };

    sound.onerror = (error) => {
      reject(error);
    };

    sound.play().catch(reject);
  });
}

export function stopSound(soundName) {
  const sound = audioFiles[soundName];
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
  }
}
