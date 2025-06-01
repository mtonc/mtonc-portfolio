import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';


export async function GET({ site }) {
	const blog = await getCollection('blog');
  let feed = undefined;
  feed = await rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: site,
		items: blog.map(post => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});

  return feed !== undefined ?
    new Response(feed,{
      status: 200,
      statusText: 'OK'
    }):
    new Response(null, {
      tatus: 500,
      statusText: 'Server Error'
    });
}
