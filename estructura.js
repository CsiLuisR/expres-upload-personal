let files1 = {
    file: [
        {name : 1},{name : 2}
    ]
}

let files2 = {
    file : 
        {name : 1}
}

const identificar = (obj) => {
    Array.isArray(obj) ? console.log('es un array') : console.log('no es un array')
}

identificar(files2.file)