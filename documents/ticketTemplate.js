const pdfTemplate = (ticket) => {
  const { ticketNumber, from, to, price, owner, departingDate } = ticket;

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>testing .js</title>
    <style>
      table,
      tr {
        border-bottom: 1px solid #e0e0e0;
        border-collapse: collapse;
      }
      .row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .row-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .text-light {
        color: white;
      }
      .grd-to-bottom-right {
        background: linear-gradient(to bottom right, #158a93, #75c8ce);
        border-radius: 9px;
        padding: 10px;
        
        margin: 0 auto;
      }

      p {
        font-size: 16px;
      }
    </style> 
  </head>
  <body>
    <div class="grd-to-bottom-right">
      <div>
        <table>
          <tr>
            <td>
              <div class="row">
                <p style="color: #ffed6c">Name:</p>
                <p class="text-light">${owner.name}</p>
              </div>
            </td>
            <td>
              <div class="row">
                <p style="color: #ffed6c">Gender:</p>
                <p class="text-light">${owner.gender}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="row">
                <p style="color: #ffed6c">Price:</p>
                <p class="text-light">${price} Tsh</p>
              </div>
            </td>
            <td>
              <div class="row">
                <p style="color: #ffed6c">Seat Number:</p>
                <h4 style="color: purple; font-weight: bold">
                  ${ticketNumber}
                </h4>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="{2}">
              <div class="row">
                <p style="color: #ffed6c">Journey route:</p>
                <p class="text-light">
                  ${from}
                  <span style="color: #ffed6c"> to </span> ${to}
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="{2}">
              <div class="row">
                <p style="color: #ffed6c">Departing Date:</p>
                <p class="text-light">${departingDate}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <div style="width:100%" class="row-center">
        <div class="row-center">
          <p><i> phone </i> &nbsp;</p>
          <p>0710162838</p>
          <p>0625772838</p>
        </div>

      </div>
    </div>
  </body>
</html>


     `
















}

module.exports = pdfTemplate