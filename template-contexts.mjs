const globalVars = {
  websiteName: 'EXAMPLE SITE',
};

const templateContexts = {
  'src/templates/news/index.ejs': {
    data: {
      entries: [
        { id: 1, title: 'HELLO :)' },
        { id: 2, title: 'HELLO :-D' },
      ],
    },
  },
  'src/templates/news/detail.ejs': {
    pages: [
      {
        slug: '1.html', data: {
          id: 1, title: 'HELLO :)',
        },
      },
      {
        slug: '2.html', data: {
          id: 2, title: 'HELLO :-D',
        },
      },
    ],
  },
};

export {
  globalVars,
  templateContexts,
};
