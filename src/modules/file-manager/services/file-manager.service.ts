import { HttpException, Injectable } from "@nestjs/common";
import { _argsFind, _response_I } from "../../../common/interfaces";
import { imageFormat_I, OwnerRelation_I } from "../interfaces/index";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FileStore } from "../schemas/files.schema";
import { DateProcessService, ProcessDataService } from "../../../common/adapters";
import { _argsUpdate } from "../../../common/interfaces/responseUpdate.interface";
import { fileFormatBody_I } from "../interfaces/fileTemplate.dto";


import * as fs from 'fs';
import path from "path";




@Injectable()
export class FileManagerService {

    constructor(
        private readonly _processData: ProcessDataService,
        private readonly _dateProcessService: DateProcessService,
        @InjectModel(FileStore.name) private FileStoreModel: Model<FileStore>,
    ) {

    }

    async getFile_Process(id: string): Promise<_response_I> {

        let _Response: _response_I;

        const args: _argsFind = {
            findObject: {
                _id: String(id),
            },

        }

        await this._processData._findOneDB(this.FileStoreModel, args).then((r: _response_I) => {
            _Response = r;
        }, (err: _response_I) => {

            _Response = err;

            // throw new HttpException({
            //     status: _Response.statusCode,
            //     error: _Response.message,
            // }, _Response.statusCode, {
            //     cause: _Response.err
            // });

        });

        return _Response;

    }

    async saveFileStore(idStore: string, files: Express.Multer.File[], ownerRelation: OwnerRelation_I): Promise<_response_I> {

        let _Response: _response_I;

        let newElements: imageFormat_I[];

        await this.setFileElements(files, ownerRelation).then((r: imageFormat_I[]) => {
            newElements = r;
        }, (err: _response_I) => {

            _Response = err;
            throw new HttpException({
                status: _Response.statusCode,
                error: _Response.message,
            }, _Response.statusCode, {
                cause: _Response.err
            });

        });

        let aux_storeFile: any = null;
        await this.getFile_Process(idStore).then((r: _response_I) => {

            aux_storeFile = r.data;

        }, err => {

            aux_storeFile = null;
        });

        if (!aux_storeFile) {

            let fileStore = new this.FileStoreModel(...newElements);

            await this._processData._saveDB(fileStore).then((r: _response_I) => {

                _Response = r;

            }, (err: _response_I) => {

                _Response = err;
                throw new HttpException({
                    status: _Response.statusCode,
                    error: _Response.message,
                }, _Response.statusCode, {
                    cause: _Response.err
                });

            });

        } else {

            await this.removeFile(
                aux_storeFile.src
            ).then();

            let aux = newElements.find(l => {
                if (l.name === 'profilePic') {
                    return l;
                }
            });

            const data: any = {
                ...aux,
                "updatedAt.date": this._dateProcessService.setDate(),
            }

            const args: _argsUpdate = {
                findObject: {
                    _id: String(aux_storeFile._id),
                },
                set: {
                    $set: data
                }
            }

            await this._processData._updateDB(this.FileStoreModel, args).then((respo: _response_I) => {

                _Response = respo;

            }, (error2: _response_I) => {
                _Response = error2;
                _Response.message = [
                    {
                        message: 'No se pudo procesar el o los archivos',
                        type: 'global'
                    }
                ]

                throw new HttpException({
                    status: _Response.statusCode,
                    error: _Response.message,
                }, _Response.statusCode, {
                    cause: _Response.err
                });

            });

        }

        return _Response;

    }

    async getFile(body: any) {

        return new Promise(async (resolve, reject) => {

            let noFile: string = './assets/no-img.jpg';

            if (body.file == null || body.file == '') {

                reject(noFile);
            }

            let file: string = '.' + body.file;

            await fs.exists(file, existe => {

                if (!existe) {
                    // path = './assets/no-img.jpg';
                    reject(noFile);

                }

                resolve(file);

            });

            // reject(noFile);

        })

    }

    // ide: [
    // {
    //   fieldname: 'ide',
    //   originalname: 'FINANCE DEPARTMENT QUESTIONNAIRE HH_4.pdf',
    //   encoding: '7bit',
    //   mimetype: 'application/pdf',
    //   destination: './files/users/615f921deb6bd953cf9b93c8/credentials',
    //   filename: 'FINANCE DEPARTMENT QUESTIONNAIRE HH_4-6c2eb104a19740591.pdf',
    // //   path: 'files\\users\\615f921deb6bd953cf9b93c8\\credentials\\FINANCE DEPARTMENT QUESTIONNAIRE HH_4-6c2eb104a19740591.pdf',
    //   size: 125095
    // }
    //   ],

    // async setFileElements(files: any, type: string, ownerRelation: OwnerRelation_I ) {
    async setFileElements(files: any, ownerRelation: OwnerRelation_I) {

        return new Promise(async (resolve, reject) => {

            let elements: imageFormat_I[] = [];

            try {
                if (Array.isArray(files) && files.length > 0) {

                    await files.forEach((element: any) => {

                        let x: imageFormat_I = {
                            name: element.fieldname,
                            type: 'file',
                            file: element.filename,
                            src: element.destination.replace("./", "/") + element.filename,
                            format: element.mimetype,
                            folder: element.destination.replace("./", "/"),
                            details: null,
                            ownerRelation: ownerRelation
                        }

                        elements.push(x);

                    });

                    resolve(elements);

                }

                if (this.isAnyObject(files) && Object.keys(files).length > 0) {

                    await Object.keys(files).forEach((value, key) => {

                        // console.log('objeto', files[value].fieldname);
                        // console.log('objeto', value);
                        let x: imageFormat_I = {
                            name: files[value][0].fieldname,
                            type: 'file',
                            file: files[value][0].filename,
                            src: files[value][0].destination.replace("./", "/") + '/' + files[value][0].filename,
                            format: files[value][0].mimetype,
                            folder: files[value][0].destination.replace("./", "/"),
                            details: null,
                            ownerRelation: ownerRelation
                        }

                        elements.push(x);

                    });

                    resolve(elements);

                }

            } catch (error) {

                let _Response: _response_I = {
                    ok: false,
                    statusCode: 400,
                    message: [
                        {
                            message: 'Error al procesar elementos',
                            type: 'global'
                        }
                    ]
                }
                reject(_Response);

            }


        })

    }

    isAnyObject(value) {
        return value != null && (typeof value === 'object' || typeof value === 'function');
    }

    // replaceFiles(newElements: any[], oldElements: any[]) {
    //     return new Promise((resolve, reject) => {

    //         if(newElements.length > 0){

    //             newElements.forEach(element => {

    //             });

    //         }
    //         if (fs.existsSync(dir)) {
    //             // Do something

    //             fs.unlink(dir, (err) => {
    //                 if (err) {
    //                     console.error(err)
    //                     reject(false);
    //                 }

    //                 resolve(true);

    //                 //file removed
    //             })

    //         } else {

    //             resolve(true);

    //         }

    //     })

    // }


    async retargetFile(file: any, nameFolder: string, newTarget: string) {

        return new Promise(async (resolve, reject) => {

            if (Array.isArray(file)) {
                let f: any[] = [];
                f = file;
                await f.forEach(async (ele, idx) => {

                    await Object.entries(ele).forEach(([key, value]) => {

                        let aux: string = ele[key];

                        if (aux != null) {

                            aux = aux.replace(nameFolder, newTarget);

                            f[idx][key] = aux;

                        }
                    });

                    // f[idx] = ele;

                });

                console.log('new model file', f);

                resolve(f);

            }

        });

    }

    async renameFolder(originalPath: string, newName: string) {

        return new Promise((resolve, reject) => {

            let src: string = `.${originalPath}`;

            console.log('el path que se va a eliminar', src);

            // let rename: string = `./..${path}/${newName}`;
            let rename: string = path.normalize(path.join(src, '..'));
            rename = rename + '/' + newName;

            if (fs.existsSync(src)) {
                // Do something
                console.log('existe', src);
                fs.rename(src, rename, function (err) {

                    if (err) {
                        console.error(err)
                        reject(false);
                    }

                    console.log('se renombró', rename);

                    resolve(true);

                })

            } else {

                resolve(true);

            }


        });

    }

    removeFolder(dir: string) {

        return new Promise((resolve, reject) => {

            let src: string = `.${dir}`;

            if (fs.existsSync(src)) {
                // delete directory recursively
                try {
                    fs.rmdirSync(src, { recursive: true });
                    console.log(`${src} is deleted!`);
                    resolve(true);
                } catch (err) {
                    console.error(`Error while deleting ${src}.`);
                    reject(false);
                }

            } else {

                resolve(true);

            }

        });

    }

    removeFile(dir: string) {
        return new Promise((resolve, reject) => {

            let src: string = `.${dir}`;

            if (fs.existsSync(src)) {
                // Do something

                fs.unlink(src, (err) => {
                    if (err) {
                        console.error(err)
                        reject(false);
                    }

                    resolve(true);

                });

            } else {

                resolve(true);

            }

        })

    }


    async getFilesInDirectory(path) {
        // lee todos los elementos del directorio
        const files = fs.readdirSync(path);

        // filtra solo los archivos, y no los subdirectorios
        let filteredFiles = files.filter(function (file) {
            return fs.statSync(path + '/' + file).isFile();
        });

        filteredFiles = await filteredFiles.sort(function (a, b) {
            // Extraer los números de las cadenas de texto usando expresiones regulares
            var numeroA = parseInt(a.match(/\d+/)[0]);
            var numeroB = parseInt(b.match(/\d+/)[0]);

            // Comparar los números en orden numérico ascendente
            return numeroA - numeroB;
        });
        // devuelve el array con los nombres de los archivos
        return filteredFiles;
    }


    path_existVerify(directoryPath: string) {

        return new Promise(async (resolve, reject) => {

            try {
                // let resp_exist = await fs.statSync(directoryPath)

                await fs.exists(directoryPath, existe => {

                    if (!existe) {
                        // path = './assets/no-img.jpg';
                        reject(false);

                    }

                    resolve(true);

                });

                // resolve(true)

            } catch (error) {

                console.log(error);

                let _Response: _response_I = {
                    ok: false,
                    statusCode: 404,
                    err: error,
                    message: [
                        {
                            message: 'Error al procesar elementos',
                            type: 'global'
                        }
                    ]
                }

                throw new HttpException({
                    status: _Response.statusCode,
                    error: _Response.message,
                }, _Response.statusCode, {
                    cause: _Response.err
                });


                reject(false);
                // reject(false)

            }

        })

    }


    async get_fileFormatBody(file: Uint8Array, fileName: string, path: string, destination: string): Promise<fileFormatBody_I> {

        // fieldname: 'profilePic',
        // originalname: 'Group 9377.png',
        // encoding: '7bit',
        // mimetype: 'image/png',
        // destination: './files/images/',
        // filename: 'Group 9377-102b4472c7fe3dab7.png',
        // path: 'files\\images\\Group 9377-102b4472c7fe3dab7.png',
        // size: 876492

        return new Promise((resolve, reject) => {


            let fileBody: fileFormatBody_I = {
                fieldname: 'bingoCarton',
                originalname: fileName,
                encoding: '7bit',
                mimetype: 'application/pdf',
                // destination: destination,
                // path: path,
                destination: './' + destination.replace(process.cwd() + '/', '') + '/',
                path: path.replace(process.cwd() + '/', ''),
                filename: fileName,
                size: file.length
            }


            resolve(fileBody);

        })

    }

    async saveDirectFile(file: Uint8Array, dest: string, pathName: string) {

        let _dest: string = dest;

        if (!fs.existsSync(_dest)) {
            fs.mkdirSync(_dest, { recursive: true });
        }

        // Guardar el archivo en la ruta de destino
        fs.writeFileSync(pathName, file);

    }


}

