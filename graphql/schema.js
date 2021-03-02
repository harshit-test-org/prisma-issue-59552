const { objectType, queryField, list } = require('nexus');

exports.Child = objectType({
	name: 'Child',
	definition(t) {
		t.nonNull.string('id');
	},
});

exports.Parent = objectType({
	name: 'Parent',
	definition(t) {
		t.nonNull.string('id');
		t.nonNull.field('child', {
			type: 'Child',
			resolve: async (parent, args, ctx) => {
				return ctx.prisma.child.findUnique({
					where: {
						id: parent.childId,
					},
				});
			},
		});
	},
});

exports.ParentQuery = queryField('parents', {
	type: list('Parent'),
	resolve: (parent, args, ctx) => {
		return ctx.prisma.parent.findMany();
	},
});
