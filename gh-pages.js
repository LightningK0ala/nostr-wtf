import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'gh-pages',
  repo: 'https://github.com/LightningK0ala/nostr-wtf.git', // Update to point to your repository
  user: {
   name: 'Lightning K0ala', // update to use your name
   email: 'lightningk0ala@protonmail.com' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);
