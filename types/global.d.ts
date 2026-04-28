// global.d.ts
declare module '*.css';

// SVG
declare module '*.svg' {
    const content: string;
    export default content;
}