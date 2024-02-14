const fetch = require('node-fetch');
const { ACTIVE_CAMPAIGN_URL, API_KEY } = process.env;

class ActiveCampaignApi {
  constructor() {
    this._baseUrl = ACTIVE_CAMPAIGN_URL;
    this._options = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'Api-Token': API_KEY,
      },
    };
  }

  _fetchData() {
    return fetch(this._baseUrl + this.specificURL, this._options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => console.error(err));
  }

  //   https://pipedream.com/apps/activecampaign/integrations/mongodb

  createContact(data) {
    const { email, username } = data;
    this._options.method = 'POST';
    this.specificURL = 'contacts';
    this._options.body = JSON.stringify({
      contact: {
        email: email,
        firstName: username,
      },
    });
    this._fetchData();
  }

  postContactToAList(data) {
    const contactId = data.id;
    this._options.method = 'POST';
    this.specificURL = 'contactLists';
    this._options.body = JSON.stringify({
      contactList: {
        list: process.env.LIST_ID,
        contact: contactId,
        status: 1,
      },
    });
    this._fetchData();
  }
}

const activeCampaignApi = new ActiveCampaignApi();
module.exports = activeCampaignApi;
