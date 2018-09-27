import UniversalRouter from 'universal-router'

const routes = [
  {
    path: '', // optional
    action: () => `<h1>Home</h1>`,
  },
  {
    path: '/posts',
    action: () => console.log('checking child routes for /posts'),
    children: [
      {
        path: '', // optional, matches both "/posts" and "/posts/"
        action: () => `<h1>Posts</h1>`,
      },
      {
        path: '/:id',
        action: (context) => `<h1>Post #${context.params.id}</h1>`,
      },
    ],
  },
]

const router = new UniversalRouter(routes)

window.router = router;
router.resolve('/posts').then(html => {
  console.log('changing page: ', html);
  // document.body.innerHTML = html // renders: <h1>Posts</h1>
});
