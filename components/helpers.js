/* eslint-disable import/prefer-default-export */
export function ratingDisplay(ratingNum){
    if (!Number.isInteger(ratingNum)) {
        const string = ratingNum.toString()
        return `${string[0]}_half`
    }
    return ratingNum;
}

export function priceDisplay(budget) {
    const nums = [1, 2, 3, 4];
    const result = [];
    for (let i = 0; i <= budget; i++) {
      result.push(nums[i]);
    }
    return `${result.join(',')}`;
  }