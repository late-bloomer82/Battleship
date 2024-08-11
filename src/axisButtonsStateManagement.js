let state = true;

export function toggleButtonState() {
  const xButton = document.getElementById("xAxisButton");
  const yButton = document.getElementById("yAxisButton");

  xButton.addEventListener("click", () => {
    xButton.classList.remove("inactive");
    xButton.classList.add("active");
    yButton.classList.add("inactive");
    state = true;
  });
  yButton.addEventListener("click", () => {
    yButton.classList.remove("inactive");
    yButton.classList.add("active");
    xButton.classList.add("inactive");
    state = false;
  });
}

export function checkButtonState() {
  return state;
}
