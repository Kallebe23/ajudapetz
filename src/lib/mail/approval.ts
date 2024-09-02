import { Resend } from "resend";
const resend = new Resend(process.env.AUTH_RESEND_KEY);

interface Params {
  to: string;
  donationTitle: string;
}

export async function sendApprovalEmail({ to, donationTitle }: Params) {
  const { data, error } = await resend.emails.send({
    from: "Ajuda Petz <info@ajudapetz.com.br>",
    to: to,
    subject: "Anúncio Aprovado!",
    html: html({ donationTitle }),
  });

  return { data, error };
}

function html(params: { donationTitle: string }) {
  const { donationTitle } = params;

  return `
  <body>
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style=" max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; ">
          Seu anúncio foi aprovado
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px; font-size: 18px; font-family: sans-serif;">${donationTitle}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px; font-size: 18px; font-family: sans-serif;">
                <a target="_blank" href="https://ajudapetz.com.br" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif;  text-decoration: none; border-radius: 5px; padding: 10px 20px;  display: inline-block; font-weight: bold;">Ajuda Petz</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;
}
