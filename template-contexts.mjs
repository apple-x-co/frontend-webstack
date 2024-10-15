const templateContexts = {
  'src/templates/news/index.ejs': {
    data: {
      entries: [
        { id: 1, title: 'HELLO :)', url: '1.html' },
        { id: 2, title: 'HELLO :-D', url: '2.html' },
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
  templateContexts,
};
