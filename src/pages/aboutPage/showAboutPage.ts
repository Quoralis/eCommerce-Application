import { createEl } from '../../utils/createElement.js';
import logoRSS from '../../assets/images/rss-logo.svg';

const arrDevalopers = [
  'Stanislav Tsibulskii',
  'Arseniy Krutoi',
  'Yana Malakhova',
];

const arrGitHubLinks = [
  'https://github.com/Quoralis',
  'https://github.com/1Arseniy',
  'https://github.com/Zorro-amarillo',
];

const descriptionDevelopers = [
  'Stas your description',
  'Arseniy',
  'Yana your description',
];

const aboutCards = (parent: HTMLElement): void => {
  const aboutPage = createEl({
    tag: 'div',
    classes: [
      'about-page',
      'uk-height-viewport',
      'uk-flex',
      'uk-flex-around',
      'uk-flex-middle',
      'uk-flex-wrap',
      'container-registration',
    ],
    parent: parent,
  });

  for (let i = 0; i < 3; i++) {
    const card = createEl({
      tag: 'div',
      classes: [
        'uk-flex',
        'uk-flex-column',
        'uk-card',
        'uk-height-large',
        'uk-width-large',
        'uk-card-default',
        'uk-border-rounded',
        'uk-padding-large',
        'card-login',
        'card-about',
      ],
      parent: aboutPage,
    });

    createEl({
      tag: 'h2',
      text: arrDevalopers[i],
      classes: ['uk-heading-divider'],
      parent: card,
    });

    createEl({
      tag: 'span',
      text: descriptionDevelopers[i],
      classes: ['uk-text-lowercase', 'uk-text-break'],
      parent: card,
    });

    const iconsWraper = createEl({
      tag: 'div',
      classes: ['uk-flex', 'uk-flex-center'],
      parent: card,
    });

    createEl({
      tag: 'a',
      classes: ['uk-icon-button'],
      attributes: {
        'uk-icon': 'github',
        'uk-tooltip': 'title: gitHub; delay: 300; pos: bottom',
        href: arrGitHubLinks[i],
      },
      parent: iconsWraper,
    });
    if (i === 1) {
      const linkRSS = createEl({
        tag: 'a',
        classes: ['uk-margin-small-left'],
        attributes: {
          href: 'http://rs.school/',
        },
        parent: iconsWraper,
      });

      createEl({
        tag: 'img',
        classes: ['logo-rss'],
        attributes: {
          src: logoRSS,
        },
        parent: linkRSS,
      });
    }
  }
};

export const showAboutPage = (): void => {
  const main = <HTMLElement>document.querySelector('main');
  aboutCards(main);
};
