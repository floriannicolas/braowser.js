// Build the legacy IIFE bundle that exposes `window.Braowser` for old
// projects that can't use ESM. The source is the same modern ES2020+ code;
// esbuild transpiles ?., ??, async/await, and import/export down to ES2015.
import { build } from 'esbuild';

const common = {
    entryPoints: ['src/iife-entry.js'],
    bundle: true,
    format: 'iife',
    globalName: 'Braowser',
    target: 'es2015',
    // The IIFE attaches an object { default: BraowserClass } to globalName.
    // Unwrap it so users can write `new Braowser()` not `new Braowser.default()`.
    footer: {
        js: "if (typeof window !== 'undefined') window.Braowser = Braowser.default;",
    },
};

await build({ ...common, outfile: 'dist/braowser.legacy.js' });
await build({ ...common, outfile: 'dist/braowser.legacy.min.js', minify: true });

console.log('Built:');
console.log('  dist/braowser.legacy.js');
console.log('  dist/braowser.legacy.min.js');
