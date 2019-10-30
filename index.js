const fetch = require('node-fetch');
const readline = require('readline-sync');
const uuid = require('uuid/v4');
const cheerio = require('cheerio');
const fs = require('async-file');
const chalk = require('chalk');
const delay = require('delay');
const replaceString = require("replace-string")
var sessionnya = uuid();


const bikinunik = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const bikinnama = () => new Promise((resolve, reject) => {
	fetch('https://fakenametool.net/random-name-generator/random/id_ID/indonesia/1', {
		method: 'GET'
	})
	.then(res => res.text())
	.then(result => {
		const $ = cheerio.load(result);
		const resText = $('div[class=col-lg-10] span').text();
		resolve(resText);
	})
	.catch(err => {
		reject(err)
	})
});


const regis = (emailnya, namanya, resultnomorus, sessionnya, uniknya) => new Promise((resolve, reject) => {
    // emailnya, namanya, nomornya, sessionnya, uniknya
    const url = 'https://api.gojekapi.com/v5/customers';
    const badan = {
        "email": emailnya,
		"name": namanya,
		"phone": `${resultnomorus}`, // (660) 209-2670
		"signed_up_country":"ID"
    }
    fetch(url, {
        method: 'POST',
        headers: { 
            'X-Session-ID': sessionnya,
			'X-Platform': 'Android',
			'X-UniqueId': uniknya,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
			'Accept': 'application/json',
			// 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0', 
			'Authorization': 'Bearer',
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
			'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // console.log(result) PENTING
    })
    .catch(err => {
        reject(err) // console.log(err) PENTING
    })

});

const verify = (sessionnya, uniknya, otpnya, tokennya) => new Promise((resolve, reject) => {
        const url = 'https://api.gojekapi.com/v5/customers/phone/verify';
    
        const boday = {
            "client_name":"gojek:cons:android",
            "client_secret":"83415d06-ec4e-11e6-a41b-6c40088ab51e",
            "data":
            {
                "otp": otpnya,
                "otp_token": tokennya
            }
        };
    
        fetch (url, {
            method : 'POST',
            headers : {
                'X-Session-ID': sessionnya,
                'X-Platform': 'Android',
                'X-UniqueId': uniknya,
                'X-AppVersion': '3.34.1',
                'X-AppId': 'com.gojek.app',
                'Accept': 'application/json',
                // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
                'X-PhoneModel': 'Android,Custom',
                'X-PushTokenType': 'FCM',
                'X-DeviceOS': 'Android,6.0', 
                'Authorization': 'Bearer',
                'Accept-Language': 'en-ID',
                'X-User-Locale': 'en_ID',
                'Content-Type': 'application/json; charset=UTF-8',
                'User-Agent': 'okhttp/3.12.1'
            },
            body: JSON.stringify(boday)
        })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(err)
        })
    });



const functionSetPin = (pin, otpPin, aksesnya, uuid, uniqid) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/wallet/pin';

    const badan = {
        "pin":pin
    };

    fetch (url, {
        method : 'POST',
        headers : {
            'otp': otpPin,
            'X-Session-ID': uuid,
            'X-Platform': 'Android',
            'X-UniqueId': uniqid,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            // 'User-uuid': accountId, 
            'Authorization': `Bearer ${aksesnya}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});


const functionredeemvoc = (kodevoucher, sessionnya, uniknya, aksesnya) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/go-promotions/v1/promotions/enrollments'
    const badan = {
        "promo_code": kodevoucher
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0',
            // 'User-uuid': accountId, 
            'Authorization': `Bearer ${aksesnya}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
    body: JSON.stringify(badan)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result) // console.log(result) PENTING
    })
    .catch(err => {
        reject(err) // console.log(err) PENTING
    })

});


const ambildata = (sessionnya, uniknya, aksestokennya) => new Promise((resolve, reject) => {
    fetch('https://api.gojekapi.com/gopoints/v3/wallet/vouchers?limit=10&page=1', {
        method: 'GET',
        headers: {
        
            'X-Session-ID': sessionnya,
			'X-Platform': 'Android',
			'X-UniqueId': uniknya,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
			'Accept': 'application/json',
			// 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0', 
			'Authorization': `Bearer ${aksestokennya}`,
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        
    })
    .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(result)
        })
});

const getkodevoucher = (sessionnya, uniknya, aksesnya) => new Promise((resolve, reject) => {
    fetch('https://api.gojekapi.com/v2/customer/cards/food', {
        method: 'GET',
        headers: {
        
            'X-Session-ID': sessionnya,
            'X-Platform': 'Android',
            'X-UniqueId': uniknya,
            'X-AppVersion': '3.34.1',
            'X-AppId': 'com.gojek.app',
            'Accept': 'application/json',
            // 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
            'X-PhoneModel': 'Android,Custom',
            'X-PushTokenType': 'FCM',
            'X-DeviceOS': 'Android,6.0', 
            'Authorization': `Bearer ${aksesnya}`,
            'Accept-Language': 'en-ID',
            'X-User-Locale': 'en_ID',
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'okhttp/3.12.1'
        },
        
    })
    .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            reject(result)
        })
});


(async () => {
    try{

        const uniknya = bikinunik(16);
        const acakadut = await bikinunik(13);
        const emailnya = `${acakadut}@gmail.com`;
        const namanya = await bikinnama();
        console.log("")
        console.log(chalk.yellow(`Auto Create Go-Jek Account + Auto Redeem Go-Food Voucher`))
        const resultnomorus = readline.question(chalk.yellow("Input your number (Include country code Ex: +1xxxxxxx): "))
        console.log(chalk.yellow(`All set!`))
        console.log(chalk.yellow(`Ready to create a new account`))
        console.log(chalk.green(`Name: ${namanya}`))
        console.log(chalk.green(`Email: ${emailnya}`))
        const register = await regis(emailnya, namanya, resultnomorus, sessionnya, uniknya);
        console.log(chalk.yellow('Sending OTP...'))
        const otpnya = readline.question("Input OTP Code: ")
        const tokennya = register.data.otp_token
        const verifyOTP = await verify(sessionnya, uniknya, otpnya, tokennya);
        const aksesnya = verifyOTP.data.access_token
        const nomorhpbro = verifyOTP.data.customer.phone
        const idnyabro = verifyOTP.data.resource_owner_id
        console.log(chalk.yellow('All set!'))
        console.log(chalk.yellow('Your registration was successful!'))
        console.log(chalk.green(`This is your access token: ${aksesnya}`))
        const saveToken = await fs.appendFile('token.txt',`${resultnomorus} | ${namanya} | ${emailnya} | ${idnyabro} | ${aksesnya}\n`, function (err) {
            if (err) throw err;
            console.log('Gagal Menyimpan Acces Token!');
        });
       
        
        console.log(chalk.green("Trying to redeem it for you boss!"))
        const kodevoucher = "GOFOOBOBA07"

        const redeem = await functionredeemvoc(kodevoucher, sessionnya, uniknya, aksesnya)
        // console.log(redeem)
        if(redeem.success === false){
            
            console.log(chalk.red(redeem.errors[0].message));
            
            }else{
        const pesan = redeem.data.message
        const yeay = redeem.data.title
        console.log(chalk.yellow(`${yeay} ${pesan}`));
        // console.log(chalk.yellow('Your voucher was successfully redeemed!'))
        console.log(chalk.yellow("Well done Boss. Let's create another account, don't waste your time.\n"))
        }        


    }catch(e){
        console.log(e) 
    }

})();
