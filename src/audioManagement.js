// audio object
export const audioFiles = {
  menuTheme: new Audio("./audio/AMONG US - OST - MAIN THEME SONG [HQ].mp3"),
  hitSound: new Audio("./audio/Cannon Sound Effect.mp3"),
  missSound: new Audio("./audio/Water Drop - Sound Effects.mp3"),
  victorySound: new Audio("./audio/Among Us- Crewmate Victory Sound!.mp3"),
  defeatSound: new Audio("./audio/Among Us Defeat Sound Effect!.mp3"),
  revealShipSound: new Audio("./audio/Magic Reveal Sound Effect.mp3"),
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
