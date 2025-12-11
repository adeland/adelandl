// Import all MDX files from the posts directory
const postModules = import.meta.glob('../content/posts/*.mdx', { eager: true });

// Transform the imported modules into a posts array
const posts = Object.values(postModules).map((module) => {
  // Each MDX file exports frontmatter as a named export
  const frontmatter = module.frontmatter || {};
  const Component = module.default;
  
  return {
    ...frontmatter,
    Component
  };
});

// Sort posts by date (newest first)
posts.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB - dateA;
});

// Create a map for O(1) lookup by slug
const postsBySlug = {};
posts.forEach((post) => {
  if (post.slug) {
    postsBySlug[post.slug] = post;
  }
});

export { posts, postsBySlug };
