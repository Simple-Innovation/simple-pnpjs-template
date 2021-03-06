import "dotenv/config";
import { SPDefault } from "@pnp/nodejs";
import { spfi } from "@pnp/sp";
import "@pnp/sp/webs/index.js";
import { Configuration } from "@azure/msal-node";
import { getPrivateKeyFromBase64DER } from "simple-der";

async function connectSharePoint() {
  // configure your node options (only once in your application)
  const config: Configuration = {
    auth: {
      authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/`,
      clientId: process.env.AZURE_AD_APP_CLIENT_ID,
      clientCertificate: {
        thumbprint: "FCAF1EA82F524E1B717A7AF3B1CC4665C517A31B",
        privateKey: getPrivateKeyFromBase64DER(
          "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"
        ),
      },
    },
  };

  const sp = spfi().using(
    SPDefault({
      baseUrl: `https://${process.env.SHAREPOINT_TENANT}.sharepoint.com/`,
      msal: {
        config: config,
        scopes: [
          `https://${process.env.SHAREPOINT_TENANT}.sharepoint.com/.default`,
        ],
      },
    })
  );

  // make a call to SharePoint and log it in the console
  const w = await sp.web.select("Title", "Description")();
  console.log(JSON.stringify(w, null, 4));
}

connectSharePoint();
