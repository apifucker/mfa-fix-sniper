"use strict";

const fs = require("fs");

const tls = require("tls");

const WebSocket = require("ws");

const extractJsonFromString = require("extract-json-from-string");

const http2 = require("http2");

const colors = require("colors");

const axios = require("axios");

const path = require('path')

const { token, guildId, password, webhookURL } = JSON.parse(fs.readFileSync("config.json"));

process.title = `rush wishes you a good flight!`;

let vanity;

let mfaToken = "";

const guilds = {};

    console.clear();

    console.log(

        colors.green(`
 █████  ██    ██ ███████╗██   ██╗███████╗███████╗ ██████╗ ██████╗      
██╔══██╗██║   ██║██╔════╝██║  ██║██╔════╝██║  ██║██╔═══██╗██╔══██╗        
██████╔╝██║   ██║███████╗███████║███████╗███████║██║   ██║██████╔╝        
██╔══██╗██║   ██║╚════██║██╔══██║╚════██║██╔══██║██║   ██║██╔═══╝         
██║  ██║╚██████╔╝███████║██║  ██║███████║██║  ██║╚██████╔╝██║             
╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝             
                                                                          
██╗   ██╗ █████╗ ███╗   ██╗██╗████████╗██╗   ██╗      Made By: rush                   
██║   ██║██╔══██╗████╗  ██║██║╚══██╔══╝╚██╗ ██╔╝      Discord: @apifucker  
██║   ██║███████║██╔██╗ ██║██║   ██║    ╚████╔╝       İtemsatış: https://www.itemsatis.com/p/rushshop           
╚██╗ ██╔╝██╔══██║██║╚██╗██║██║   ██║     ╚██╔╝        İtempazar: https://www.itempazar.com/profil/rushshop             
 ╚████╔╝ ██║  ██║██║ ╚████║██║   ██║      ██║         discord.gg/1978         
  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝      ╚═╝                      
                                                                          
██╗   ██╗██████╗ ██╗         ███████╗███╗   ██╗██╗██████╗ ███████╗██████╗ 
██║   ██║██╔══██╗██║         ██╔════╝████╗  ██║██║██╔══██╗██╔════╝██╔══██╗   API VERSION: V10
██║   ██║██████╔╝██║         ███████╗██╔██╗ ██║██║██████╔╝█████╗  ██████╔╝   MFA : YES
██║   ██║██╔══██╗██║         ╚════██║██║╚██╗██║██║██╔═══╝ ██╔══╝  ██╔══██╗   
╚██████╔╝██║  ██║███████╗    ███████║██║ ╚████║██║██║     ███████╗██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
        `)
    );

const q = {

    s: () => Math.floor(Math.random() * 350) + 50,

  };

const tlsSocket = tls.connect({ host: "discord.com", port: 443 });

tlsSocket.on("data", (data) => {
      const ext = extractJsonFromString(data.toString());
  
      const find = ext.find((e) => e.code || e.message);
  
      if (find) {
    }
})

  async function notifyWebhook(find) {
   
    const msDelay = q.s();

    const requestBody = {
      content: `@everyone ${vanity} \n\`\`\`json\n${JSON.stringify(find)}\`\`\`\nMS: ${msDelay}`
    };

    try {
      await axios.post(webhookURL, requestBody);
    } catch (error) {
      console.error('Failed to notify webhook:', error);
    }
  }

tlsSocket.on("error", () => process.exit());

tlsSocket.on("end", () => process.exit());

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9164 Chrome/124.0.6367.243 Electron/30.2.0 Safari/537.36',
    'X-Debug-Options': 'bugReporterEnabled',
    'Authorization': token,
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'X-Audit-Log-Reason': '',
    'X-Context-Properties': 'nosniff',
    'X-Discord-Locale': 'tr',
    'X-Discord-Timezone': 'Europe/Istanbul',
    'X-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MTY0Iiwib3NfdmVyc2lvbiI6IjEwLjAuMjI2MzEiLCJvc19hcmNoIjoieDY0IiwiYXBwX2FyY2giOiJ4NjQiLCJzeXN0ZW1fbG9jYWxlIjoidHIiLCJicm93c2VyX3VzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBkaXNjb3JkLzEuMC45MTY0IENocm9tZS8xMjQuMC42MzY3LjI0MyBFbGVjdHJvbi8zMC4yLjAgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6IjMwLjIuMCIsIm9zX3Nka192ZXJzaW9uIjoiMjI2MzEiLCJjbGllbnRfdnVibF9udW1iZXIiOjUyODI2LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ=='
  };

  async function ticket(find) {

    try {
  
      const initialResponse = await http2Request("PATCH", `/api/v10/guilds/${guildId}/vanity-url`, headers);
  
      const data = JSON.parse(initialResponse);
  
      if (data.code === 200) {
  
        vanityUpdate();
  
      } else if (data.code === 60003) {
  
        const ticket = data.mfa.ticket;
  
        await mfa(ticket, find);
        
      } else {
  
        console.log(colors.red("HATA:", data.code));
  
      }
  
    } catch (error) {
  
      console.error(colors.red("HATA:", error));
  
    }
  
  }
  
  async function mfa(ticket, find) {
  
    try {
  
      const mfaResponse = await http2Request(
  
        "POST",
  
        "/api/v10/mfa/finish",
  
        {
  
          ...headers,
  
          "Content-Type": "application/json",
  
        },
  
        JSON.stringify({
  
          ticket: ticket,
  
          mfa_type: "password",
  
          data: password,
  
        })
  
      );
  
      const responseData = JSON.parse(mfaResponse);
  
      if (responseData.token) {
  
        mfaToken = responseData.token;
  
        vanityUpdate(find);
  
      } else {
  
        throw new Error(`HATA: ${JSON.stringify(responseData)}`);
  
      }
  
    } catch (error) {
  
      console.error(colors.red("HATA:", error));
  
    }
  
  }
  
  async function vanityUpdate(find) {
  
    try {
  
      const msDelay = q.s();
  
      const vanityResponse = await http2Request(
  
        "PATCH",
  
        `/api/v10/guilds/${guildId}/vanity-url`,
  
        {
  
          ...headers,
  
          "X-Discord-MFA-Authorization": mfaToken,
  
          Cookie: `__Secure-recent_mfa=${mfaToken}`,
  
          "Content-Type": "application/json",
  
        },
  
        JSON.stringify({
  
          code: find,
  
        })
      );
  
      const vanityData = JSON.parse(vanityResponse);
  
      if (vanityData.code === 200) {
  
        console.log(colors.blue("Vanity URL:", vanityData));
  
      } else {
  
        console.error(colors.blue("Vanity URL:", vanityData));
  
      }
  
    } catch (error) {
  
      console.error(colors.red("HATA:", error));
  
    }
  
  }

async function http2Request(method, path, customHeaders = {}, body = null) {

  return new Promise((resolve, reject) => {

    const client = http2.connect("https://discord.com");

    const req = client.request({

      ":method": method,

      ":path": path,

      ...customHeaders,

    });

    let data = "";

    req.on("response", (headers, flags) => {

      req.on("data", (chunk) => {

        data += chunk;

      });

      req.on("end", () => {

        resolve(data);

        client.close();

      });

    });

    req.on("error", (err) => {

      reject(err);

      client.close();

    });

    if (body) {

      req.write(body);

    }

    req.end();

  });

}

tlsSocket.on("secureConnect", () => {

  const websocket = new WebSocket("wss://gateway.discord.gg");

  websocket.onclose = () => process.exit();

  websocket.onmessage = (message) => {

    const { d, op, t } = JSON.parse(message.data);

    if (t === "GUILD_UPDATE") {

      const find = guilds[d.guild_id];

      if (find && find !== d.vanity_url_code) {

        ticket(find);
        notifyWebhook(find);

        vanity = `${find} `;

      }

    } else if (t === "GUILD_DELETE") {

      const find = guilds[d.id];

      if (find) {

        ticket(find);
        notifyWebhook(find);
        
        vanity = `${find} `;

      }

    } else if (t === "READY") {

      d.guilds.forEach((guild) => {

        if (guild.vanity_url_code) {

          guilds[guild.id] = guild.vanity_url_code;

        } else {

          console.log(colors.yellow(guild.name));

        }

      });


      console.log(colors.green(guilds));

    }


    if (op === 10) {

      websocket.send(


        JSON.stringify({

          op: 2,

          d: {

            token: token,

            intents: 32767,

            properties: { os: "iOS", browser: "google", device: "" },

          },

        })

      );
      setInterval(

        () => websocket.send(JSON.stringify({ op: 1, d: {}, s: null, t: "heartbeat" })),

        d.heartbeat_interval

      );

    } else if (op === 7) {

      process.exit();

    }

  };

  setInterval(() => tlsSocket.write(["GET / HTTP/1.2", "Host: discord.com", "", ""].join("\r\n")), 400);

});
console.log("SNIPER AKTIF / @apifucker");