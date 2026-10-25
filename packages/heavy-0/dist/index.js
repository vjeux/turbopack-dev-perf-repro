import { parse } from "@repro/shared";
import * as part0 from "./part0.js";
import * as part1 from "./part1.js";
import * as part2 from "./part2.js";
import * as part3 from "./part3.js";
import * as part4 from "./part4.js";
import * as part5 from "./part5.js";
import * as part6 from "./part6.js";
import * as part7 from "./part7.js";
import * as part8 from "./part8.js";
import * as part9 from "./part9.js";
import * as part10 from "./part10.js";
import * as part11 from "./part11.js";
import * as part12 from "./part12.js";
import * as part13 from "./part13.js";
import * as part14 from "./part14.js";
import * as part15 from "./part15.js";
import * as part16 from "./part16.js";
import * as part17 from "./part17.js";
import * as part18 from "./part18.js";
import * as part19 from "./part19.js";
import * as part20 from "./part20.js";
import * as part21 from "./part21.js";
import * as part22 from "./part22.js";
import * as part23 from "./part23.js";

const parts = [part0, part1, part2, part3, part4, part5, part6, part7, part8, part9, part10, part11, part12, part13, part14, part15, part16, part17, part18, part19, part20, part21, part22, part23, ];

export function render(input) {
  const parsed = parse(input);
  let n = 0;
  for (const part of parts) n += Object.keys(part).length;
  return "heavy-0:" + parsed.value + ":" + n;
}
