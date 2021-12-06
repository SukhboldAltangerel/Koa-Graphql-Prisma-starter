import { statSync, readdirSync, lstatSync, readdir } from 'fs'
import path, { join, dirname } from 'path'

// const read = readdirSync('schemas/test')

// console.log(read)

// const getFiles = path => {
//    const files = []
//    for (const file of readdirSync(path)) {
//       const fullPath = path + '/' + file
//       if (lstatSync(fullPath).isDirectory())
//          getFiles(fullPath).forEach(x => files.push(file + '/' + x))
//       else files.push(file)
//    }
//    return files
// }

// console.log(getFiles('schemas/test'))

// const __dirname = path.resolve()

// const pathSchema = join(__dirname, 'schemas/test')

// console.log(import('./test/main.js'))

// function getImports(path) {
//    const imports = []
//    for (const file of readdirSync(path)) {
//       const pathFull = join(path, file)
//       if (lstatSync(pathFull).isDirectory()) {
//          getImports(pathFull).forEach(file => imports.push(import(join(pathFull, file))))
//       } else {
//          // imports.push(import())
//       }
//    }
//    return imports
// }

// console.log(getImports(pathSchema))

async function getImports(path = 'schemas/test') {
   for (const file of await readdir(path)) {
      console.log('🚀', join(__dirname, file))
      // yield await import(join(__dirname, file))
   }
}

getImports()

const imports = {}
let i = 0;

// (async () => {
//    for await (const im of getImports()) {
//       imports[i++] = im
//    }
//    console.log(imports)
// })()



// import { promises } from 'fs'
// import { join } from 'path'

// export default async function* () {
//    for (const model of await promises.readdir(__dirname)) {
//       if (model === 'index.js') continue
//       yield await import(join(__dirname, model))
//    }
// }

// import modelDefiners from './models'

// (async () => {
//   for await (const {default: modelDefiner} of modelDefiners()) {
//     if (typeof modelDefiner === 'function') {
//       modelDefiner()
//     }
//   }
// })()



// const pow = (function* () {
//    console.log(Math.pow((yield "x"), (yield "y")))
// }())

// pow.next()
// pow.next(2)
// pow.next(3)



// import defExportMain, { regExport as regExportMain } from './test/main.js'
// import defExport, { regExport } from './test/testSub1/sub1.js'
// import defExport2, { regExport as regExport2 } from './test/testSub2/sub2.js'

// const schemas = {
//    defExport,
//    regExport,
//    defExport2,
//    regExport2,
//    defExportMain,
//    regExportMain
// }

// console.log(schemas)

// export default schemas
