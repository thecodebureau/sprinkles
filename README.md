# sprinkles

Dust filters and helpers.

Sprinkles has been built so developers only require the helpers and filters they actually need in a specific project. A file
that exports filters and helpers might look like so:

```
module.exports = {
	helpers: {
		contains: function(chunk, context, bodies, params) {
			return _.contains(params.array, params.value) ? chunk.render(bodies.block, context) : chunk;
		},
		pagination: require('sprinkles/helper/pagination'),
		if: require('sprinkles/helper/if')
	},
	
	filters: _.extend({
		lc: function(value) {
			return _.isString(value) ? value.toLowerCase() : value;
		},
		title: function(page) {
			return _.compact(['EnergyManagement', page && page.title]).join(' - ');
		}
	}, require('sprinkles/filters/date'))
};
```
