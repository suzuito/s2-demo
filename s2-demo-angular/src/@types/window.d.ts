import { S2 } from "../lib/s2";
import { S2W } from "../lib/s2w";

declare global {
    interface Window {
        s2: S2;
        s2w: S2W;
    }
}
