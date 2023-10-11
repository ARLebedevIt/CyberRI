declare module "*.module.css"
declare module '*.scss' {
  const css: { [key: string]: string };
  export default css;
}
declare module '*.sass' {
  const css: { [key: string]: string };
  export default css;
}
declare module '*.module.css' {
  const styles: { readonly [key: string]: string }
  export default styles
}
declare module 'react-markup';
declare module '*.webp';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.webm';
declare module '*.mp4';
declare module 'uuid'

declare module 'cursor-effects'
