/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let fullsorted =[]

    if(nums1.length >=1 && nums2.length >=1){
          fullsorted = [...nums1,...nums2]
          fullsorted = fullsorted.sort((a,b)=>a-b)
    }else{
        if(nums1.length ==0){
            fullsorted =[...nums2]
        }
        else if(nums2.length ==0){
            fullsorted=[...nums1]
        }
    }
    
 
    if(fullsorted.length%2 ===1){
       return fullsorted[(fullsorted.length-1)/2]
    }else{
        let mean = (fullsorted[(fullsorted.length/2)-1] + fullsorted[(fullsorted.length/2)])/2

        return mean
    }
};