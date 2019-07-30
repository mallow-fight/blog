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
 * 实现根据任意两个不同的遍历计算出树的结构
 */

function Tree_Structure(tree) {

}

module.exports = {
	Tree_Traverse,
	Tree_Structure
};