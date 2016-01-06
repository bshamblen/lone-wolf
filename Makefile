test:
	./node_modules/.bin/mocha $(T) --async-only test/*.test.js

test-transactions:
	./node_modules/.bin/mocha $(T) --async-only test/transactions.test.js

test-property-types:
	./node_modules/.bin/mocha $(T) --async-only test/property-types.test.js

test-classifications:
	./node_modules/.bin/mocha $(T) --async-only test/classifications.test.js

test-contact-types:
	./node_modules/.bin/mocha $(T) --async-only test/contact-types.test.js

test-members:
	./node_modules/.bin/mocha $(T) --async-only test/members.test.js

.PHONY: test