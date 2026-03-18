import type { IconPack } from "../types";
import { emojiPack } from "./emoji";
import { mdiPack } from "./mdi";
import { mdiOutlinePack } from "./mdi-outline";
import { faSolidPack } from "./fa-solid";
import { faRegularPack } from "./fa-regular";
import { bsIconsPack } from "./bs-icons";
import { heroiconsPack } from "./heroicons";
import { phosphorPack } from "./phosphor";

export const iconPacks: Record<string, IconPack> = {
  emoji: emojiPack,
  mdi: mdiPack,
  "mdi-outline": mdiOutlinePack,
  "fa-solid": faSolidPack,
  "fa-regular": faRegularPack,
  "bs-icons": bsIconsPack,
  heroicons: heroiconsPack,
  phosphor: phosphorPack,
};
