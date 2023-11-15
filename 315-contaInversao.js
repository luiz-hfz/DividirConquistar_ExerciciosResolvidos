Array.prototype.bisect_left = function(target) {
    let start = 0,
      end = this.length - 1,
      mid = 0;
    while (this[mid] !== target) {
      mid = (start + end) >> 1;
      if (this[mid] > target) end = mid - 1;
      else if (this[mid] < target) start = mid + 1;
    }
    while (this[mid] === this[mid - 1]) mid--;
    return mid;
  }
  
  
  /**
   * @param {number[]} nums
   * @return {number[]}
   */
  var countSmaller = function(nums) {
    let arr = [...nums].sort((a, b) => a - b), ans = [];
    console.log({length: nums.length});
    if (nums.length > 999)
      for(let i = 0; i < nums.length; i++) {
        ans[i] = arr.bisect_left(nums[i]);
        arr.splice(ans[i], 1);
      }
    else
      for(let i = 0; i < nums.length; i++) {
        ans[i] = arr.indexOf(nums[i]);
        arr.splice(ans[i], 1);
      }
    return ans;
  };