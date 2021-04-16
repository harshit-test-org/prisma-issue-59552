const { objectType, queryField, list } = require("nexus");
const { Prisma } = require("@prisma/client");

exports.Child = objectType({
  name: "Child",
  definition(t) {
    t.nonNull.string("id");
  },
});

exports.Parent = objectType({
  name: "Parent",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.field("child", {
      type: "Child",
      resolve: async (parent, args, ctx) => {
        console.log(parent.childId);
        return ctx.prisma.child.findFirst({
          where: {
            id: parent.childId.toNumber(),
          },
        });
      },
    });
  },
});

exports.ParentQuery = queryField("parents", {
  type: list("Parent"),
  resolve: (parent, args, ctx) => {
    return ctx.prisma.parent.findMany();
  },
});
