---
title: 树
order: 5
type: v2/theory/dataStructure
---

> https://juejin.im/entry/59979aaaf265da24817a5928
> https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/1450?fr=aladdin

## 定义

1. 树是由根结点和若干颗子树构成的。
2. 树是由一个集合以及在该集合上定义的一种关系构成的。
3. 集合中的元素称为树的结点，所定义的关系称为父子关系。
4. 父子关系在树的结点之间建立了一个层次结构，在这种层次结构中有一个结点具有特殊的地位，这个结点称为该树的根结点，或称为树根。

### 完全二叉树

1. 若设二叉树的深度为h，除第h层外，其它各层（1～h-1）的结点数都达到最大个数，第h层所有的结点都连续集中在最左边，这就是完全二叉树。

## 实现

```js
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
 * 为什么（后序 + 前序）或者（层次 + 深度遍历）不能确定唯一一颗树？可用反证法，A->B，两个结点可推算出不同的树，所以首先需要确定根结点的位置。
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
```