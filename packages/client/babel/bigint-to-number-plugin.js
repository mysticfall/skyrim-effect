module.exports = function ({types: t}) {
    return {
        visitor: {
            BigIntLiteral(path) {
                const value = path.node.value

                path.replaceWith(t.numericLiteral(Number(value)))
            }
        }
    }
}
