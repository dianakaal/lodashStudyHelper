const rp = require("request-promise"),
        jsdom = require('jsdom'),
        fs = require('fs')
        cp = require('child_process')

async function run() {
        const cmd = process.argv[2]
        const data = await rp('https://lodash.com/docs/4.17.4')
        const dom = new jsdom.JSDOM(data)
        const block = dom.window.document.getElementById(cmd)
        fs.writeFileSync(cmd + '.html', '<html><body>' + block.parentNode.outerHTML + '</body></html')
        cp.execFile('open', [cmd + '.html'])
}

run().catch(err=>{
        console.error(err)
        process.exit(1)
})
