declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<void>;
    };
  }
}

export {};

export const MathJaxTypeset = async () => {
  if (window.MathJax) {
    await window.MathJax.typesetPromise();
  }
};

export const MathJaxTypesetPromise = window.MathJax?.typesetPromise;
