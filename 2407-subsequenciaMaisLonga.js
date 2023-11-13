class SegmentTree {
    constructor(A) {
        const n = A.length;
        const closest_2_power = Math.ceil(Math.log2(n));
        // Preencher com zeros para alcançar a potência de 2 mais próxima
        A.push(...Array((2 << (closest_2_power - 1)) - n).fill(0));

        this._closest_2_power = closest_2_power;
        this._arr = A;
        this.tree = Array(2 * A.length - 1).fill(0);

        this._buildSegTree(0, 0, this._arr.length - 1);
    }

    // Construir a árvore de segmento para a consulta de máximo
    _buildSegTree(treeIndex, left, right) {
        // Nó folha
        if (left === right) {
            this.tree[treeIndex] = this._arr[left];
            return this.tree[treeIndex];
        }

        const mid = left + Math.floor((right - left) / 2);
        const leftSeg = this._buildSegTree(treeIndex * 2 + 1, left, mid);
        const rightSeg = this._buildSegTree(treeIndex * 2 + 2, mid + 1, right);
        return Math.max(leftSeg, rightSeg);
    }

    query(queryLeft, queryRight, treeIndex = 0, segLeft = 0, segRight = this._arr.length - 1) {
        // Valores padrão
        if (segLeft === null) segLeft = 0;
        if (segRight === null) segRight = this._arr.length - 1;
        if (treeIndex === null) treeIndex = 0;

        // Se o intervalo do segmento está totalmente contido na consulta
        if (queryLeft <= segLeft && queryRight >= segRight) {
            return this.tree[treeIndex];
        }

        // Se não estiver contido
        if (queryRight < segLeft || queryLeft > segRight) {
            return 0;
        }

        // Divida e conquiste ambos os lados
        const mid = segLeft + Math.floor((segRight - segLeft) / 2);
        const leftSeg = this.query(queryLeft, queryRight, treeIndex * 2 + 1, segLeft, mid);
        const rightSeg = this.query(queryLeft, queryRight, treeIndex * 2 + 2, mid + 1, segRight);
        return Math.max(leftSeg, rightSeg);
    }

    update(originalIndex, newValue, treeIndex = 0, segLeft = 0, segRight = this._arr.length - 1) {
        if (segLeft === segRight) {
            this.tree[treeIndex] = newValue;
            return;
        }

        const mid = segLeft + Math.floor((segRight - segLeft) / 2);
        if (originalIndex <= mid) {
            this.update(originalIndex, newValue, treeIndex * 2 + 1, segLeft, mid);
        } else {
            this.update(originalIndex, newValue, treeIndex * 2 + 2, mid + 1, segRight);
        }

        this.tree[treeIndex] = Math.max(this.tree[treeIndex * 2 + 1], this.tree[treeIndex * 2 + 2]);
    }
}

var lengthOfLIS = function(nums, k) {
    const MAX = Math.max(...nums);
    const A = Array(MAX + 1).fill(0);

    const segTree = new SegmentTree(A);
    let ans = 0;

    for (const v of nums) {
        const maxIntervalSum = segTree.query(Math.max(0, v - k), v - 1);
        const vLIS = Math.max(1, 1 + maxIntervalSum);
        segTree.update(v, vLIS);
        ans = Math.max(ans, vLIS);
    }
    return ans;
};