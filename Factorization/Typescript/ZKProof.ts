//Problem: Prover claims to know a polynomial (p(x)) of a particular degree, that has t(x) = (x − 1)(x − 2) as its co-factor.

const r = 23
const tx = [1, -3, 2]

// ----------------------------------------------- Verifier Functions -----------------------------------------------

// Verifier Function 1
const tOfX = () => {
    //Find t(r)
    const t = substitute(r, tx);
    return t
}

// Verifier Function 2
const verify = () => {
    const t = tOfX();
    const [p, h] = prove();

    return (t === p/h)
}

// ----------------------------------------------- Prover Functions -----------------------------------------------

// Prover Function
const prove = () => {
    const px = [1, -3, 2, 0] 

    let [hx, rx] = longDivision(tx, px);
    let a = typeof(hx) === "number" ? [hx] : hx;
    let b = typeof(rx) === "number" ? [rx] : rx;
    const _hx: number[] = a.concat(b[0]);

    const p = substitute(r, px);
    const h = substitute(r, _hx);

    return [p, h];
}

// ---------------------------Helper Functions--------------------------------

const longDivision = (tx: number[], px: number[]) => {
    let quotient: number[] = [];
    let remainder: number = 0;
    let remainders = px;
    let count: number = 0;

    while (remainders.length > 1) {
        const q = remainders[0] / tx[count];
        quotient.push(Math.floor(q));

        let _remainders: number[] = [];
        let minicount: number = 0
        tx.map((t) => {
            const r = remainders[minicount] - q * t;
            if (r !== 0) {
                _remainders.push(r);
            }
            minicount++;
        })
        remainders = _remainders;
        if (tx.slice(count).length > _remainders.length) {
            count++;
        }
    }

    remainder = remainders[0];
    console.log([quotient, remainder ? remainder : 0]);
    return [quotient, remainder ? remainder : 0];
}

const substitute = (x: number, polynomial: number[]) => {
    let result: number[] = [];
    const degree: number = polynomial.length - 1;

    polynomial.map((p, i) => {
        result.push(p * x ** (degree - i));
    })

    const sum = result.reduce((a, b) => a + b, 0);
    return sum;
}