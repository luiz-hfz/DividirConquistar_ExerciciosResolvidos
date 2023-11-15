from typing import List

class Solution:
    def goodTriplets(self, nums1: List[int], nums2: List[int]) -> int:
        def divide_and_conquer(l, r):
            if l == r:
                return

            mid = l + (r - l) // 2
            divide_and_conquer(l, mid)
            divide_and_conquer(mid + 1, r)

            i, j, k = 0, 0, 0
            temp1 = nums2[l:mid + 1]
            temp2 = nums2[mid + 1:r + 1]
            temp = [0] * (r - l + 1)

            while i < len(temp1) and j < len(temp2):
                if indicies1[temp1[i]] < indicies1[temp2[j]]:
                    temp[k] = temp1[i]
                    i += 1
                else:
                    temp[k] = temp2[j]
                    left[temp2[j]] += i
                    j += 1
                k += 1

            while i < len(temp1):
                temp[k] = temp1[i]
                i += 1
                k += 1

            while j < len(temp2):
                temp[k] = temp2[j]
                left[temp2[j]] += i
                j += 1
                k += 1

            nums2[l:r + 1] = temp

            i = len(temp1) - 1
            j = len(temp2) - 1
            k = len(temp) - 1

            while i >= 0 and j >= 0:
                if indicies1[temp1[i]] > indicies1[temp2[j]]:
                    right[temp1[i]] += len(temp2) - j - 1
                    i -= 1
                else:
                    j -= 1

            while i >= 0:
                right[temp1[i]] += len(temp2) - j - 1
                i -= 1

        n = len(nums1)
        indicies1 = [0] * n
        left = [0] * n
        right = [0] * n

        for i in range(n):
            indicies1[nums1[i]] = i

        divide_and_conquer(0, n - 1)

        output = sum(left[i] * right[i] for i in range(n))
        return output
