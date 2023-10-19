// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
import fetch from 'node-fetch';
import fs from 'fs';

// const fs = require('fs');
// const fetch = require('cross-fetch');


const fileName3 = "KIA__Niro"; //--

const KIA = "https://api.aldautomotive.com/rms/carmarket/b2c/vehicleads?facets=mileage,price,modelYear,firstRegistrationYear,makeAndModel,fuelType,gearbox,bodyType,location,mainColor,term,financeMode,seat,isCommercial&makes=KIA%2CHYUNDAI&Models=NIRO&orderBy=makeAndModel&orderDirection=asc"; //--


//=========function sleep 
function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) {}
}
// sleep(2000);



//========= sendTelegramMessage
// const TelegramBot = require('node-telegram-bot-api');
// const request = require('request');

import TelegramBot from 'node-telegram-bot-api';
import request from 'request';



// const chatId = "-531419872"
// const token = "5977345155:AAGjhQkf3DnREGW7h1mjldFhBUXthImf1bY";

const chatId = "-4000813111"
const token = "6901983655:AAHEBEn2ys7VkXKWuAR9SrENmpMzoX1jwA4";
const bot = new TelegramBot(token, { polling: true });


    async function sendTelegramFile(fileName,message) {

        bot.sendMessage(chatId, message)

        bot.sendDocument(chatId, fileName)
            .then(() => {
                console.log('File sent');
            })
            .catch((error) => {
                console.error(error);
            });
    }


    async function sendTelegramMessage(text,fileName,message) {
        console.log("++++++++++++++")
        console.log(text)
        bot.sendMessage(chatId, text)
    }
//=========

//=========  ParseJSON
async function ParseJSON(fileName, message) {

    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        const dataArray = JSON.parse(data);

        // console.log(`====================================== 1.2 ======================================`);
        // console.log(dataArray.items[0])
        // console.log("length = "+dataArray.items.length)

        let listMessages=[];
        let carIdArray = [];
        let version;
        let idcar;
        let idFinance;
        let financetype
        let make;
        let model;
        let year; 
        let mileage; 
        let price; 
        let reference; 

        for(let i=0; i<dataArray.items.length; i++){

            version = dataArray.items[i].version;
            version = version.replace(/ /g, "-");
            version = version.replace(/. /g, "-");
            version = version.replace(/1.6/g, "16");
            idcar = dataArray.items[i].id;
            idFinance = dataArray.items[i].financeData[0].id;
            financetype = dataArray.items[i].financeData[0].financeMode;
            make = dataArray.items[i].make;
            model = dataArray.items[i].model;
            reference = dataArray.items[i].reference;
            year = dataArray.items[i].firstRegistrationYear;
            mileage = dataArray.items[i].mileageValue;
            price = dataArray.items[i].financeData[0].price;
            

            carIdArray[i]=idcar;

            listMessages[i]="_https://shop.aldcarmarket.com/de-de/car/kia/niro/"+version+"/"+idcar+"?financetype="+financetype+"&quoteId="+idFinance+" _"+make+" "+model+" "+year+"_Mileage : "+mileage+"_ID : "+reference+"_Price : "+price+" EUR_";
        }

        // console.log(listMessages);
        // console.log(JSON.stringify(listMessages));
        // console.log(carIdArray);
        // console.log(`====================================== 2 ======================================`);  

        let status = false;
        fs.readFile(fileName+2, (err, data) => {
            if (err) throw err;
            const carArray = JSON.parse(data);

            for(let j=0; j<dataArray.items.length; j++){
                for(let i=0; i<carArray.length; i++){
                    if(carArray[i]==dataArray.items[j].id){
                        // console.log(carArray[i]+" == "+dataArray.items[j].id)
                        status=false;
                        // console.log(status)
                        break;
                    }
                    else{
                        // console.log(carArray[i]+" != "+dataArray.items[j].id)
                        status=true;
                        // console.log(status)

                    }
                }
                if(status==true){
                    break;
                }
            }
            
            console.log(`====================================== 3 ======================================`);
            console.log(status)
 
        //============       
            if(status==true){
                listMessages= JSON.stringify(listMessages);
                // console.log(listMessages);

                listMessages = listMessages.replace(/\[/, message+"\n[");
                listMessages = listMessages.replace(/\["/g, " ");
                listMessages = listMessages.replace(/"]/g, " ");
                listMessages = listMessages.replace(/_/g, "\n");
                listMessages = listMessages.replace(/","/g, "================================================================\n");
                // console.log("urlGroups")
                // console.log(urlGroups)
                sleep(1000)
                sendTelegramMessage(listMessages, fileName, message)
            }



        //============
            fs.writeFile(fileName, JSON.stringify(listMessages), err => {
                if (err) {
                    console.error(err);
                } else {
                    // console.log(`File saved: ${fileName}`);
                    console.log(`====================================== 4 ======================================`);
                    console.log(`File saved:` + fileName);
                }
            });
            sleep(1000)

           
        //============
            fs.writeFile(fileName+2, JSON.stringify(carIdArray), err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`====================================== 5 ======================================`);
                    // console.log(`File saved: ${fileName}`);
                    console.log(`File saved:` + fileName+2);
                }
            });


        });

    });
}
//=========


//=========  clockworkLogs
let responseObj;
(async () => {
    async function clockworkLogs(URL, fileName, message) {
        // sleep(3000)
        try {
            const response = await fetch(URL, {
                headers: {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "ru,ru-RU;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
                    "angular-build": "20231005.1-tnc",
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "x-ald-subscription-key": "6b2007dc3a864fcea99040d8c3e72a69",
                    "x-country": "de",
                    "x-partner": "ald",
                    "x-tenant": "ald",
                    "Referer": "https://shop.aldcarmarket.com/de-de/catalog?financetype=cash&make=KIA,HYUNDAI",
                    "Referrer-Policy": "no-referrer-when-downgrade"
                },
                method: "GET",
            });
            const responseObj = await response.json();

            fs.writeFile(fileName, JSON.stringify(responseObj), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`File saved: ${fileName}`);
                    console.log(`====================================== 1 ======================================`);
                    console.log(JSON.stringify(responseObj));

                    ParseJSON(fileName, message);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

  
    await clockworkLogs(KIA, fileName3, "😱😱😱  A new car has appeared  😱😱😱_@kokhanat_@KokhanS_");
})();
//=========

setTimeout(() => {  
    // process.kill(process.pid, 'SIGSTOP');
    process.exit(-1);
}, 5000);

