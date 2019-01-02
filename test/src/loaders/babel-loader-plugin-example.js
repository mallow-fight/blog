module.exports = function({types: t}) {
  return {
    visitor: {
      BinaryExpression(path) {
        if (path.node.operator !== '===') {
          return;
        }
        path.node.left = t.identifier('mallow');
        path.node.right = t.identifier('lucy');
        path.replaceWithMultiple([
          t.expressionStatement(t.stringLiteral("Is this the real life?")),
          t.expressionStatement(t.stringLiteral("Is this just fantasy?")),
          t.expressionStatement(t.stringLiteral("(Enjoy singing the rest of the song in your head)")),
        ]);
      }
    }
  }
}