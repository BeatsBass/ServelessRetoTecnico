const axios = require('axios')
const qs = require('querystring')

const removeAccent = (str) => {
    return (str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase()
}
const deleteSpace = (str) => {
    return str.replace(/ +/g,'_')
}

module.exports.translateFunction = async (word) => {
    if (word.match(/color|url|id/g)) return word
    const url = 'https://www.google.com/async/translate?vet=12ahUKEwjVotGE2PzsAhUKjlkKHY2kAs4QqDgwAHoECAEQJg..i&ei=sf-sX5WGJ4qc5gKNyYrwDA&yv=3'
    const requestBody = {
        async: `translate,sl:en,tl:es,st:${word},id:1605173268996,qc:true,ac:true,_id:tw-async-translate,_pms:s,_fmt:pc`
    }

    const config = {
        headers: {
            'accept': '*/*',
            'accept-encoding': 'gzip',
            'accept-language': 'es-419,es;q=0.9',
            'content-length': '207',
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'cookie': 'ANID=AHWqTUnyoLRaKmb84PXOWR_RkgchLcmVmsHKhmZ6l4mLECV2OQtgW5XLwwAB7UWJ; SID=3Qe8ZxPsh54Pd-kO9xD_N7nBPSkDH-MJYfeioe6qLvckjxt5bdH4NOhxNRZjJ85LJfOmYA.; __Secure-3PSID=3Qe8ZxPsh54Pd-kO9xD_N7nBPSkDH-MJYfeioe6qLvckjxt5rNZDcB0XtwGALcRdl9sW3A.; HSID=A7CdOIOWMxhNQRCsu; SSID=Ax-VPe5b_ZzmPp9H1; APISID=ylvTEwcdMxl1hni-/Afv2Vq-JR7pajxxgF; SAPISID=q6EYJ356G546bvpq/AwvHeWxkiSFH9v5kb; __Secure-3PAPISID=q6EYJ356G546bvpq/AwvHeWxkiSFH9v5kb; OTZ=5711835_76_76__76_; 1P_JAR=2020-11-12-09; DV=Iw5ppSm5k-0WMGXCIkB2f6hw-Gy8Wxc; NID=204=bLz2tAGPBPc5GJzjeajf_7e_0pkiT7SLW9vhs_n6hYv-YTljlwuKO1I_yzvnByMzNUnQc_deQ4zBpx_-YirAih9LiJ9J4J0Vpu54sGOT7YyjprHvt_JYF6LLBIkCWrq6eFivxWnXxIlY8jI-sk2HN-m0c3ycQyfyAJGpfIVS3nc3Jk7vpr0I7vm1TB8nlLykTQvQltaE13C6bV46kZUOwW8rRJeob3D2W2r2A3pSIkSv50rq81FA--J9WVGuEeO0073uecN2; SIDCC=AJi4QfEQ9zseuzn06jxdToZ2AbBwGuZkk-5DfH-MOC1DkgbXwuYKutLcI50E-RYlYXrrYot_aw; __Secure-3PSIDCC=AJi4QfHojlvEIH32RdNqMIx56LRWcIPUlz37eJYduY-Un-PkLNeijGV2zvIvIo9uGpxK0k9IOw',
            'origin': 'https://www.google.com',
            'referer': 'https://www.google.com/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36'
        }
    }

    const requestData = await axios.post(url, qs.stringify(requestBody), config)
    const data = requestData.data
    const regex = /<span id="tw-answ-target-text">[^<]*<\/span>/g
    const found = data.match(regex)
    /* console.log(found) */
    if (found !== null) {
        const foundRegex = found[0].match(/>[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+/g)
        if (foundRegex !== null) {
            const dataFormat = removeAccent(foundRegex[0].slice(1))
            return deleteSpace(dataFormat)
        }
        else {
            console.log("data error 2")
            console.log(typeof data)
            console.log(data)
            return word
        }
    } else {
        console.log("data error 1")
        console.log(typeof data)
        console.log(data)
        return word
    }

    /*  */
}





