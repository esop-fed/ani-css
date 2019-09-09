export const promisify = fn =>
    new Promise((resolve, reject) =>
        (...args) => fn(...args, (err, result) =>
            err ? reject(err) : resolve(result)
        )
    )

export const readBlob = blob => {
    const reader = new FileReader();

    reader.readAsText(blob, 'utf-8');

    return new Promise(resolve => {
        reader.onload = e => {
            resolve(e.target.result);
        }
    })
}

export const getType = v =>
    v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

export const loadScript = (url, globalName) => {
    const script = document.createElement('script');
    const body = document.querySelector('body');

    script.src = url;
    
    body.appendChild(script);

    return new Promise((resolve, reject) => {
        script.onload = () => {
            resolve(window[globalName]);
        };

        script.onerror = err => {
            reject(err);
        }
    })
}
