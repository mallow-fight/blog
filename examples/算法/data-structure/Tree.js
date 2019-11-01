/**
 * 			  A
 * 			 / \
 * 			B		C		
 * 		 / \ / \
 * 		D	 E F	G
 * 	 / \		 / \
 * 	H	  I   J   K
 * 先序：ABDHIECFGJK
 * 中序：HDIBEAFCJGK
 * 后序：HIDEBFJKGCA
 * 层次：ABCDEFGHIJK
 */

/**
 * 实现给你一棵树，计算出它的深度和前中后序和层次遍历结果
 */
function log(value) {
	console.log(value);
}
function Tree_Traverse(tree) {
	this.preorder_traversal = function() {
		const result = [];
		function iteration(aTree) {
			const {root, left, right} = aTree;
			if (root) {
				result.push(root)
			}
			if (left) {
				iteration(left)
			}
			if (right) {
				iteration(right)
			}
		}
		iteration(tree)
		log(result)
	}
	this.inorder_traversal = function() {
		const result = [];
		function iteration(aTree) {
			const {root, left, right} = aTree;
			if (left) {
				iteration(left)
			}
			if (root) {
				result.push(root)
			}
			if (right) {
				iteration(right)
			}
		}
		iteration(tree)
		log(result)
	}
	this.postorder_traversal = function() {
		const result = [];
		function iteration(aTree) {
			const {root, left, right} = aTree;
			if (left) {
				iteration(left)
			}
			if (right) {
				iteration(right)
			}
			if (root) {
				result.push(root)
			}
		}
		iteration(tree)
		log(result)
	}
	this.void_traversal = function() {
		const result = {};
		function iteration(aTree, floor) {
			const {left, right, root} = aTree;
			if (!result[floor]) {
				result[floor] = []
			}
			result[floor].push(root)
			floor ++
			if (left) {
				iteration(left, floor)
			}
			if (right) {
				iteration(right, floor)
			}
		}
		iteration(tree, 1)
		log(result)
	}
}

/**
 * 实现根据两个不同的遍历计算出树的结构
 * 1. 先序 + 中序
 * 2. 中序 + 后序
 * 为什么（后序 + 前序）或者（层次 + 深度遍历）不能确定唯一一颗树，可用反证法，A->B，两个结点可推算出不同的树
 * @param {a：先序, b：中序, c：后序}
 */

function Tree_Structure() {
	this.getTreeByAB = function(a, b, tree = {}) {
		const root = a[0];
		if (!root) return;
		tree.root = root;
		const index = b.indexOf(root);
		const leftBTree = b.slice(0, index);
		const rightBTree = b.slice(index + 1, b.length);
		const leftATree = a.slice(1, leftBTree.length + 1);
		const rightATree = a.slice(leftBTree.length + 1, a.length);
		tree.left = this.getTreeByAB(leftATree, leftBTree, tree.left = {});
		tree.right = this.getTreeByAB(rightATree, rightBTree, tree.right = {});
		return tree;
	}
	this.getTreeByBC = function(b, c) {
		// 同理根据后序得到根结点位置，然后分隔中序，继续对中序分隔后的数组进行同样操作的递归
	}
	this.log = function(tree) {
		console.log(JSON.stringify(tree));
	}
}

module.exports = {
	Tree_Traverse,
	Tree_Structure
};