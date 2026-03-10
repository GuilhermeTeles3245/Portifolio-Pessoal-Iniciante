let quadradoA1 = [339,108,377,108,377,146,339,146]

for (item in quadradoA1){
    if (item%2==1){
        quadradoA1[item] += 39
    } else {
        quadradoA1[item] = quadradoA1[item]
    }
}

console.log(`${quadradoA1}`)