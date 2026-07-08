// Landing hero. The headline renders as: headlineLines (each on its own line),
// then headlineBeforeEm + an accented headlineEm. Edit everything below.
export const heroData = {
  headlineLines: ['Your'],
  headlineBeforeEm: '',
  headlineEm: 'Name.',
  lede:
    'A one-line introduction — who you are and what you do. Replace this with your own words.',
  metaLines: ['Based in [Your City]', '[Your role or school]', 'Open to opportunities'],
  // Short exchange-style city code for the live clock line, e.g. 'NYC'.
  // Set to '' to hide the clock.
  clockCity: '[CITY]',
  // Your initials, dealt as the hero's hole-card monogram. Set to null to hide.
  initials: ['Y', 'N'],
  buttons: [
    {
      text: 'View Projects',
      variant: 'primary',
      action: 'projects',
    },
    {
      text: "Let's Chat",
      variant: 'secondary',
      action: 'contact',
    },
  ],
};
