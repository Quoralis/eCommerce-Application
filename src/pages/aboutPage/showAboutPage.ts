import { createEl } from '../../utils/createElement.js';
import logoRSS from '../../assets/images/rss-logo.svg';
import fotoYana from '../../assets/images/developers/yana-foto.jpg';
import fotoStas from '../../assets/images/developers/stanislav-foto.png';
import fotoArseniy from '../../assets/images/developers/arseniy-foto.png';

interface Developer {
  name: string;
  role: string;
  avatar: string;
  github: string;
  description: string;
  contributions: string[];
}

const developers: Developer[] = [
  {
    name: 'Stanislav Tsibulskii',
    role: 'Developer',
    avatar: fotoStas,
    github: 'https://github.com/Quoralis',
    description:
      'I worked on registration, login, and authentication. Also developed catalog rendering and pagination.',
    contributions: [
      'User registration and login via API',
      'Authentication logic setup',
      'Rendering card product and catalog ',
      'Developing pagination for catalog',
    ],
  },
  {
    name: 'Arseniy Krutoi',
    role: 'Team lead',
    avatar: fotoArseniy,
    github: 'https://github.com/1Arseniy',
    description:
      'I built the login page, user profile, and part of the cart. Learned a lot during the RS School course.',
    contributions: [
      'Added login page',
      'Added cart page via Api',
      'Added user information in user page',
      'Helped Stanislav with the catalog and about page',
    ],
  },
  {
    name: 'Yana Malakhova',
    role: 'Developer',
    avatar: fotoYana,
    github: 'https://github.com/Zorro-amarillo',
    description: 'Yana your description',
    contributions: ['-', '-', '-', '-'],
  },
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
      'container-about',
    ],
    parent,
  });

  developers.forEach((dev, i) => {
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
        'uk-flex-center',
        'uk-flex-middle',
      ],
      parent: card,
    });

    createEl({
      tag: 'img',
      attributes: { src: dev.avatar, alt: `${dev.name}-photo` },
      classes: ['img-developer', 'uk-border-rounded', 'uk-margin-small-right'],
      parent: titleWrapper,
    });

    createEl({
      tag: 'h2',
      text: dev.name,
      classes: ['uk-margin-remove-bottom', 'uk-text-top', 'about-title'],
      parent: titleWrapper,
    });

    createEl({
      tag: 'span',
      text: dev.role,
      classes: [
        'uk-margin-small-top',
        'uk-margin-small-bottom',
        'uk-text-secondary',
      ],
      parent: card,
    });

    createEl({
      tag: 'p',
      text: dev.description,
      classes: ['uk-text-break'],
      parent: card,
    });

    const ul = createEl({
      tag: 'ul',
      parent: card,
    });

    dev.contributions.forEach((item) => {
      createEl({
        tag: 'li',
        text: item,
        parent: ul,
      });
    });

    const iconsWrapper = createEl({
      tag: 'div',
      classes: ['uk-flex', 'uk-flex-center'],
      parent: card,
    });

    createEl({
      tag: 'a',
      classes: ['uk-icon-button'],
      attributes: {
        'uk-icon': 'github',
        'uk-tooltip': 'title: GitHub; delay: 300; pos: bottom',
        href: dev.github,
        target: '_blank',
      },
      parent: iconsWrapper,
    });

    if (i === 1) {
      const linkRSS = createEl({
        tag: 'a',
        classes: ['uk-margin-small-left'],
        attributes: {
          href: 'http://rs.school/',
          target: '_blank',
        },
        parent: iconsWrapper,
      });

      createEl({
        tag: 'img',
        classes: ['logo-rss'],
        attributes: {
          src: logoRSS,
          alt: 'rss-school-logo',
        },
        parent: linkRSS,
      });
    }
  });
};

export const showAboutPage = (): void => {
  const main = <HTMLElement>document.querySelector('main');
  aboutCards(main);
};
