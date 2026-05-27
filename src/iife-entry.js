// Entry point for the IIFE / legacy `<script>`-tag bundle.
// esbuild reads this file, follows the import, and emits a self-contained
// browser-global build at dist/braowser.legacy.js. The default export is
// what gets attached to window.Braowser.
import { Braowser } from './braowser.js';
export default Braowser;
