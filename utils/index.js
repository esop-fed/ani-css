export const promisify = fn =>
    new Promise((resolve, reject) =>
        (...args) => fn(...args, (err, result) =>
            err ? reject(err) : resolve(result)
        )
    )

export const readBlob = blob => {
    const reader = new FileReader();

    reader.readAsBinaryString(blob);

    return new Promise(resolve => {
        reader.onload = e => {
            resolve(e.target.result);
        }
    })
}

export const getType = v =>
    v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
