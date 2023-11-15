class Solution:
    def numOfWays(self, nums: List[int]) -> int:
        big = 10**9 + 7
        dp = [[0] * len(nums) for _ in range(len(nums))]

        def helper(nums):
            nonlocal big, dp
            if len(nums) <= 1:
                return 1

            root = nums[0]
            smaller = [num for num in nums[1:] if num < root]
            bigger = [num for num in nums[1:] if num >= root]

            left = helper(smaller)
            right = helper(bigger)
            m = len(smaller) + len(bigger)
            n = min(len(smaller), len(bigger))

            c = combination(m, n)

            res = (left * right) % big
            res = (res * c) % big
            return res

        def combination(m, n):
            nonlocal dp
            if n == m:
                return 1
            elif n == 0:
                return 1
            if dp[m][n] != 0:
                return dp[m][n]

            res = (combination(m - 1, n) + combination(m - 1, n - 1)) % big
            dp[m][n] = res
            return res

        return helper(nums) - 1
