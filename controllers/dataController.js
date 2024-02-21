require('dotenv').config();

const getData = function (req, res, next) {
  const dates = {
    webinarDate: process.env.WEBINAR_DATE,
    programaDate: process.env.PROGRAMA_DATE,
    moduleDates: process.env.MODULES_DATES,

    moduleDate_1: process.env.MODULE_DATE_1,
    moduleDate_2: process.env.MODULE_DATE_2,
    moduleDate_3: process.env.MODULE_DATE_3,
    moduleDate_4: process.env.MODULE_DATE_4,
    moduleDate_5: process.env.MODULE_DATE_5,
    moduleDate_6: process.env.MODULE_DATE_6,
    moduleDate_7: process.env.MODULE_DATE_7,
    moduleDate_8: process.env.MODULE_DATE_8,
    moduleDate_9: process.env.MODULE_DATE_9,
  };
  const urls = {
    repetitionUrl: process.env.REPETITION_URL,
    fbGroupUrl: process.env.FB_GROUP_URL,
    whatsappUrl: process.env.WHATSAPP_URL,
    encuestaWebinarUrl: process.env.ENCUESTA_WEBINAR_URL,

    buyoutUrl: process.env.BUYOUT_URL,
    fbPermaUrl: process.env.FB_PERMA_URL,
    igUrl: process.env.IG_URL,
    tiktokUrl: process.env.TIKTOK_URL,
  };
  res.json({ dates, urls });
};

module.exports = {
  getData,
};
