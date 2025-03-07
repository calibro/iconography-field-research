import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {

	kit: {
		adapter: adapter(
			{
				fallback: 'index.html'
			},
			
		),
		paths: {
            base: process.env.NODE_ENV === 'production' ? '/iconography-field-research' : '',
        }
	}
};

export default config;
