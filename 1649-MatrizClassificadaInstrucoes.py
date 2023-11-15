class Solution:
    def createSortedArray(self, instructions: List[int]) -> int:
        mod = 10**9 + 7
        max_val = max(instructions)
        bit = [0] * (max_val + 2)

        def update(i):
            while i <= max_val + 1:
                bit[i] += 1
                i += i & -i

        def query(i):
            result = 0
            while i > 0:
                result += bit[i]
                i -= i & -i
            return result

        total_cost = 0

        for i, value in enumerate(instructions):
            left_count = query(value - 1)
            right_count = i - query(value)
            total_cost += min(left_count, right_count)
            total_cost %= mod
            update(value)

        return total_cost

