/*
 * @Author: hsir1990
 * @Date: 2021-03-05 18:47:26
 * @LastEditTime: 2021-03-09 11:32:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \baike\html-generator-cli\index.js
 */
#!/usr/bin/env node
//上面那行的作用   Windows基于UNIX的系统不关心文件的扩展名（此处为“.js”），因此不知道使用哪种语言。我们必须告诉系统使用Node运行脚本。
const fs = require('fs');

let title = 'title1';
const args = process.argv.slice(2);

let page = `${args[0]}.html`||`index.html`

// const html = `<!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="utf-8">
//     <title>${title}</title>
//   </head>
//   <body>
//   </body>
// </html>`;

// fs.writeFile(page, html, error => {
// 	if(error){
// 		console.log(error);
// 	}
// })
let json = '';

async function fileRead(){
	let jsonStr = await readFileJson()
	console.log(jsonStr)
	let htmlStr = await readFileHtml(jsonStr)
	console.log(htmlStr)
	await fileWrite(htmlStr)
}
fileRead()

/**
 * @description: 读取json文件
 * @param {*}
 * @return {*}
 */
function readFileJson(){
	return new Promise((resolve, reject)=>{
		fs.readFile("index.json",'utf-8',(err,data)=>{
			if(err){
				console.log("error");
			}else{
				let json = JSON.parse(data); 
				resolve(json)
			}
		})
	})
	
	// return json
}
/**
 * @description: 读取html文件
 * @param {*} arg
 * @return {*}
 */
function readFileHtml(arg){
	return new Promise((resolve,reject)=>{
		fs.readFile("./index.html",'utf-8',function(err,data){
			if(err){
				console.log("error");
			}else{
				var htmlData = data
				
				// htmlData = htmlData.replace(/\$\{[\S\s]{1,}\}/gm, '22')
				
				// htmlData = htmlData.replace(/\$\{title\}/gm, '22')
				// htmlData = htmlData.replace(re, '22')
				var htmlMatch = htmlData.match(/\$\{[\S]{1,}(?=\})\}/gm)
				// console.log(htmlMatch)
				htmlMatch.forEach(function(val, key){
					v = val.slice(2,val.length-1)
					var re =new RegExp("\\$\\{" + v + "\\}","gm")
					htmlData = htmlData.replace(re, arg[v])
				})
	
				var htmlMatchFor = htmlData.match(/<%[^%]{1,}(?=%>)/gm)
				// console.log(htmlMatchFor)
				htmlMatchFor.forEach(function(val, key){
					let nameFunction = val.match(/function(\s\S*)\(args\)/)
					nameFunction = nameFunction[1].trim();
					v = val.slice(2,val.length-2).trim()
					var ss= eval("(false || "+v+")")
					let nf = arg[nameFunction]
					var strFor =  ss(nf)
					var re =new RegExp("<%[^%]{1,}" + nameFunction + "[^%]{1,}(?=%>)%>","gmi")
					// console.log(re)
					htmlData = htmlData.replace(re, strFor)
					
				})
				resolve(htmlData)
			}
		});
	})
}

/**
 * @description: 写出html文件
 * @param {*} arg
 * @return {*}
 */		
function fileWrite(arg){
	fs.writeFile(page, arg, error => {
		if(error){
			console.log(error);
		}
	})
}		
	
		
    


console.log("READ FILE ASYNC END")

//可用命令   html-generator-cli hell