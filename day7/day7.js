const fs = require('fs');

fs.readFile('day7.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    function isTargetAchievable(ind, nums, res, target){
        if(ind===nums.length-1){
            if(res+parseInt(nums[ind])===target){
                return true;
            }
            if(res*parseInt(nums[ind])===target){
                return true;
            }
            if(parseInt(res.toString()+nums[ind].toString())===target){
                return true;
            }
            else return false;
        }
        if(ind>=nums.length){
            return false;
        }
        return (isTargetAchievable(ind+1, nums, res+parseInt(nums[ind]), target) ||
        isTargetAchievable(ind+1, nums, res*parseInt(nums[ind]), target) || 
        isTargetAchievable(ind+1, nums, parseInt(res.toString()+nums[ind].toString()), target));

    }
    const inputs = data.split(`\n`);
    let ans = 0;
    inputs.forEach(input => {
        const [target, values] = input.split(": ");
        const numbers = values.split(" ");
        if(isTargetAchievable(1, numbers, parseInt(numbers[0]), parseInt(target))){
            ans+=parseInt(target)
        }
    });
    console.log(ans)
    
})