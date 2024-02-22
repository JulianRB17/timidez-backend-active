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

  async createContact(data, next) {
    try {
      const { email, firstName } = data;
      this._options.method = 'POST';
      this.specificURL = 'contacts';
      this._options.body = JSON.stringify({
        contact: {
          email: email,
          firstName: firstName,
        },
      });
      return await this._fetchData();
    } catch (err) {
      next(err);
    }
  }

  async postContactToAList(contactId, next) {
    try {
      this._options.method = 'POST';
      this.specificURL = 'contactLists';
      this._options.body = JSON.stringify({
        contactList: {
          list: process.env.ACTIVE_CAMPAIGN_LIST_ID,
          contact: contactId,
          status: 1,
        },
      });
      return await this._fetchData();
    } catch (err) {
      next(err);
    }
  }

  async postContactToMasterList(contactId, next) {
    try {
      this._options.method = 'POST';
      this.specificURL = 'contactLists';
      this._options.body = JSON.stringify({
        contactList: {
          list: 1,
          contact: contactId,
          status: 1,
        },
      });
      return await this._fetchData();
    } catch (err) {
      next(err);
    }
  }

  async getLists() {
    try {
      this._options.method = 'GET';
      this.specificURL = 'lists';
      this._options.body = null;
      return await this._fetchData();
    } catch (err) {
      next(err);
    }
  }
}

const activeCampaignApi = new ActiveCampaignApi();
module.exports = activeCampaignApi;
