let quadradoA1 = [339,147,377,147,377,185,339,185]
//B1
console.log(`<area class="quadrado" shape="poly" coords="${quadradoA1}" href="#A1" alt="B1">`)

for (let i = 2; i <= 10; i++){
    for (item in quadradoA1){
        if (item%2==0){
            quadradoA1[item] += 39
        } else {
            quadradoA1[item] = quadradoA1[item]
        }
    }
    console.log(`<area class="quadrado" shape="poly" coords="${quadradoA1}" href="#A1" alt="B1">`)
}