install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix 

vs:
	code .

link:
	npm link

demo:
	asciinema rec demo.cast

say-hello:
	echo Hello, World!