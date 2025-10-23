import { Component } from "@angular/core";

@Component({
  selector: "pdr-smiley",
  template: `<div class="smiley-page">
    <h1>Pure CSS Smiley</h1>
    <div class="face">
      <div class="eyes-area">
        <div class="eyes">
          <div class="eye"></div>
          <div class="eye"></div>
        </div>
      </div>
      <div class="mouth-area">
        <div class="mouth"></div>
        <div class="tongue"></div>
        <div class="tongue-line"></div>
      </div>
    </div>
  </div>`,
  styles: `
    * {
      box-sizing: border-box;
    }

    .smiley-page {
      text-align: center;
      padding: 2rem;
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .smiley-page h1 {
      margin-bottom: 3rem;
      font-size: 2.5rem;
      font-weight: 300;
    }

    .face {
      width: 40vmin;
      height: 40vmin;
      background: var(--pdr-smiley-face);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 3vmin;
    }

    .eyes-area {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex: 1;
      width: 100%;
    }

    .eyes {
      display: flex;
      justify-content: space-between;
      width: 50%;
    }

    .eye {
      width: 6vmin;
      height: 8vmin;
      background: var(--pdr-smiley-eye);
      border-radius: 50%;
    }

    .mouth-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
      width: 100%;
    }

    .mouth {
      width: 24vmin;
      height: 15vmin;
      border-bottom: 6vmin solid var(--pdr-smiley-mouth);
      border-radius: 0 0 50% 50%;
      z-index: 2;
    }

    .tongue {
      width: 10vmin;
      height: 12vmin;
      border-bottom: 7vmin solid var(--pdr-smiley-tongue);
      border-radius: 0 0 50% 50%;
      margin-top: -10vmin;
      z-index: 3;
    }

    .tongue-line {
      width: 1vmin;
      height: 6vmin;
      background: var(--pdr-smiley-tongue-line);
      border-radius: 0 0 25% 25%;
      margin-top: -7vmin;
      z-index: 4;
      align-self: center;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .face {
        width: 60vmin;
        height: 60vmin;
      }
      .eye {
        width: 8vmin;
        height: 10vmin;
      }
      .mouth {
        width: 32vmin;
        height: 16vmin;
        border-bottom-width: 7vmin;
      }
      .tongue {
        width: 14vmin;
        height: 18vmin;
        margin-top: -15vmin;
        border-bottom-width: 9vmin;
      }
      .tongue-line {
        height: 7vmin;
        margin-top: -8vmin;
      }
    }
  `,
})
export class Smiley {}
