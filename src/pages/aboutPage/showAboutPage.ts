import { createEl } from '../../utils/createElement.js';
import logoRSS from '../../assets/images/rss-logo.svg';
import fotoYana from '../../assets/images/developers/yana-foto.jpg';
import fotoStas from '../../assets/images/developers/stanislav-foto.png';
import fotoArseniy from '../../assets/images/developers/arseniy-foto.png';

const arrDevalopers = [
  'Stanislav Tsibulskii',
  'Arseniy Krutoi',
  'Yana Malakhova',
];

const fotoDevelopers = [fotoStas, fotoArseniy, fotoYana];

const Rollsdevelopers = ['Developer', 'Team lead', 'Developer'];

const arrGitHubLinks = [
  'https://github.com/Quoralis',
  'https://github.com/1Arseniy',
  'https://github.com/Zorro-amarillo',
];

const descriptionDevelopers = [
  'Stas your description',
  "Hello my name is Arseniy, 17 years old, I'm from Belarus, Gomel. In this app I make Login page, User profile page, partially Cart page. Also I helped Stanislav with Catalog page. I can confidently say that I learned a lot at rs-school",
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
        'uk-flex-center',
        'uk-card',
        'uk-height-large',
        'uk-width-large',
        'uk-card-default',
        'uk-border-rounded',
        'uk-padding-large',
        'card-about',
      ],
      parent: aboutPage,
    });

    const titleWrapper = createEl({
      tag: 'div',
      classes: [
        'uk-heading-divider',
        'uk-margin-remove-bottom',
        'uk-flex',
        'uk-flex-bottom',
      ],
      parent: card,
    });

    createEl({
      tag: 'img',
      attributes: { src: fotoDevelopers[i], alt: 'github-icon' },
      classes: ['img-developer', 'uk-border-rounded', 'uk-margin-small-right'],
      parent: titleWrapper,
    });

    createEl({
      tag: 'h2',
      text: arrDevalopers[i],
      classes: ['uk-margin-remove-bottom', 'uk-text-top', 'about-title'],
      parent: titleWrapper,
    });

    createEl({
      tag: 'span',
      classes: [
        'uk-margin-small-top',
        'uk-margin-small-bottom',
        'uk-text-secondary',
      ],
      text: Rollsdevelopers[i],
      parent: card,
    });

    createEl({
      tag: 'span',
      text: descriptionDevelopers[i],
      classes: ['uk-text-break'],
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
