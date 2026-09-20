export interface SandboxProject {
  title: string;
  description: string;
  icon: string;
  link: string;
  slug: string;
}

/**
 * Base URL for the static HTML sandbox demos. Update this single constant
 * if you move the folder or deploy elsewhere (e.g. S3, Netlify, Vercel).
 */
const SANDBOX_BASE_URL = 'https://jonathanzietsman.github.io/portfolio.io';

export const sandboxProjects: SandboxProject[] = [
  {
    title: 'List Program',
    description: 'Dynamic list rendering with add, remove, and reorder.',
    icon: 'https://img.icons8.com/bubbles/100/edit-property.png',
    link: `${SANDBOX_BASE_URL}/Chapter 5/index.html`,
    slug: 'list-program',
  },
  {
    title: 'Custom JavaScript',
    description: 'My own flavor of a JavaScript robot toy.',
    icon: 'https://img.icons8.com/bubbles/100/futurama-bender.png',
    link: `${SANDBOX_BASE_URL}/Chapter 7/index.html`,
    slug: 'custom-js',
  },
  {
    title: 'Dream Car',
    description: 'Interactive car configurator built with vanilla JS.',
    icon: 'https://img.icons8.com/bubbles/100/fiat-500.png',
    link: `${SANDBOX_BASE_URL}/Chapter 8/car.html`,
    slug: 'dream-car',
  },
  {
    title: 'Super Calculator',
    description: 'A fully working calculator with keyboard support.',
    icon: 'https://img.icons8.com/bubbles/100/calculator--v1.png',
    link: `${SANDBOX_BASE_URL}/supercal/index.html`,
    slug: 'super-calculator',
  },
  {
    title: 'Custom Train',
    description: 'Animated train with customizable carriages.',
    icon: 'https://img.icons8.com/bubbles/100/locomotive.png',
    link: `${SANDBOX_BASE_URL}/Chapter 12/chap12.html`,
    slug: 'custom-train',
  },
  {
    title: 'Wish List',
    description: 'Add, save, and manage a personal wish list.',
    icon: 'https://img.icons8.com/bubbles/100/wish.png',
    link: `${SANDBOX_BASE_URL}/Chapter 13/wishlist.html`,
    slug: 'wish-list',
  },
  {
    title: 'Pizzeria',
    description: 'Order builder for a fictional pizza shop.',
    icon: 'https://img.icons8.com/bubbles/100/kawaii-pizza.png',
    link: `${SANDBOX_BASE_URL}/Chapter 14/chap14.html`,
    slug: 'pizzeria',
  },
  {
    title: 'Choose My Own Adventure',
    description: 'A branching narrative adventure game.',
    icon: 'https://img.icons8.com/bubbles/100/passenger-with-baggage.png',
    link: `${SANDBOX_BASE_URL}/Chapter 16/adventure.html`,
    slug: 'adventure',
  },
  {
    title: 'Weather Forecast',
    description: 'Fetches and displays a live weather forecast.',
    icon: 'https://img.icons8.com/bubbles/100/partly-cloudy-night.png',
    link: `${SANDBOX_BASE_URL}/Chapter 17/chap17.html`,
    slug: 'weather',
  },
  {
    title: 'Hangman',
    description: 'Classic word-guessing game with visuals.',
    icon: 'https://img.icons8.com/bubbles/100/bloons-td-6.png',
    link: `${SANDBOX_BASE_URL}/hangman/index.html`,
    slug: 'hangman',
  },
  {
    title: 'Shopping Cart',
    description: 'Add items, adjust quantities, see the total.',
    icon: 'https://img.icons8.com/bubbles/100/shopping-cart-loaded.png',
    link: `${SANDBOX_BASE_URL}/shopcart/index.html`,
    slug: 'shopping-cart',
  },
  {
    title: 'Guessing Game',
    description: 'Guess the secret number with hot/cold hints.',
    icon: 'https://img.icons8.com/bubbles/100/axie-infinity.png',
    link: `${SANDBOX_BASE_URL}/Guessing Game/secretNum.html`,
    slug: 'guessing-game',
  },
];