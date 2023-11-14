from typing import List

class Solution:
    def recoverArray(self, n: int, sums: List[int]) -> List[int]:
        def findX(array):
            nonlocal ans
            size = len(array)
            if size <= 1 or size % 2 != 0:
                return
            if size == 2:
                ans.append(array[0] + array[1])
                return

            p = 1
            x = v = 0
            subhaszero = False

            while p < size:
                x = array[p] - array[0]
                subarray, otherarray = [], []
                q = []
                freq = {}

                for s in array:
                    q.append(s)
                    freq[s] = freq.get(s, 0) + 1

                while q:
                    v = q.pop(0)
                    if freq[v]:
                        freq[v] -= 1
                        new_v = v + x
                        if freq.get(new_v, 0):
                            freq[new_v] -= 1
                            subarray.append(new_v - x)
                            subhaszero |= (new_v == x)
                            otherarray.append(new_v)
                        else:
                            break

                if len(subarray) == (size // 2):
                    if subhaszero:
                        ans.append(x)
                        findX(subarray)
                    else:
                        ans.append(-x)
                        findX(otherarray)
                    return

                p += 1
                while p < size and array[p] == array[p - 1]:
                    p += 1

            return

        ans = []
        sums.sort()
        findX(sums)
        return ans if len(ans) == n else []
