import { Gameboard } from "./gameboard";
import { Ship } from "./shipClass";
import { Player } from "./player";
import { createSetupPage, enterCombatBtn } from "./domSetupPage";
import { dragNdrop } from "./dragNdrop";

enterCombatBtn.addEventListener("click", createSetupPage);
