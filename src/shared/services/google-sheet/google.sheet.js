import marked from 'marked';
import { getByUrl } from '../api/api';
import { ENVIRONMENTS, getEnvironment } from '../../environment';

export const cache = {};    // local cache of parsed sheets

export const GOOGLE_SHEET_CMS = {
  // when to get CMS static data (daily refreshed) or dynamically direct from the sheet
  getStatic: {
    [ENVIRONMENTS.PRODUCTION]: true,
    [ENVIRONMENTS.PRE_PRODUCTION]: true,
    [ENVIRONMENTS.ACCEPTANCE]: false,
    [ENVIRONMENTS.DEVELOPMENT]: false
  },
  staticAddress: 'https://data.amsterdam.nl/cms',
  key: '1ZExuZHhmvBRP-7rhuY43Lv7dWuAsGKXwfKd1_3BZfbI',
  index: {
    news: 1,
    beleid: 2,
    help: 3,
    snelwegwijs: 4,
    apis: 5,
    proclaimer: 6,
    info: 7,
    inloggen: 8,
    statistieken: 9
  }
};

function getStaticSheet(key, index) {
  // The 'static' version of the sheet is accessed by url
  // The contents is refreshed on a daily basis or on demand by a curl script that is run by Jenkins
  // Like curl https://spreadsheets.google.com/feeds/list/$KEY/$INDEX/public/basic?alt=json > [somefile]
  // No params, no cancel promise, don't send the user token along with the request
  return getByUrl(`${GOOGLE_SHEET_CMS.staticAddress}/${key}.${index}.json`, null, null, false);
}

function getDynamicSheet(key, index) {
  const target = `https://spreadsheets.google.com/feeds/list/${key}/${index}/public/basic?alt=json`;
  return fetch(target).then(
    (response) => response.json()
  );
}

function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelCase(identifier) {
  return identifier.split('-').reduce((whole, part) => (
    whole + (whole ? uppercaseFirst(part) : part)
  ), '');
}

function parseContents(contents) {
  const isDateValue = /(\d{1,2})-(\d{1,2})-(\d{4})/;
  const isDateKey = /datum/i;
  const isHref = /^(\[link |<a href=)/;
  // Set feed properties
  const feed = {
    title: contents.feed.title.$t,
    lastUpdated: contents.feed.updated.$t
  };

  // Extract entries
  const entries = contents.feed.entry.map((entry, id) => (
    entry
      .content.$t                             // 'attr-x: value, attr-y: value, ...'
      .replace(/^attr-/, '')                          // 'x: value, attr-y: value, ...'
      .split(/, attr-/)                               // ['x:value', 'y:value', ...]
      .map((keyValue) => keyValue.split(/: ([^]*)/))    // [[x, value], [y, value], ...]
      .reduce((item, [key, value]) => {
        // { id: 'item0', x: { value: value, ... }, y: {...}, ...}
        const camelKey = camelCase(key);
        const result = item;
        if (typeof value !== 'undefined') {
          result[camelKey] = {
            value,
            html: marked(value),
            isHref: Boolean(value.match(isHref)),
            isDate: Boolean(value.match(isDateValue) && key.match(isDateKey))
          };
          if (result[camelKey].isDate) {
            const match = isDateValue.exec(value);
            result[camelKey].date = new Date(match[3], match[2] - 1, match[1]);
          }
        }
        return result;
      }, {
        id: `item${id}`
      })
  ));

  return {
    feed,
    entries
  };
}

export default function getContents(type) {
  const promise = new Promise((resolve) => {
    const key = GOOGLE_SHEET_CMS.key;
    const index = GOOGLE_SHEET_CMS.index[type];
    const getSheet = GOOGLE_SHEET_CMS.getStatic[getEnvironment(window.location.host)] ?
      getStaticSheet : getDynamicSheet;

    if (cache[key] && cache[key][index]) {
      resolve(cache[key][index]);  // resolves to the value or the promise
    } else {
      cache[key] = cache[key] || {};
      let result = {
        feed: {
          title: ''
        },
        entries: []
      };
      getSheet(key, index)
        .then((contents) => {
          result = parseContents(contents);
        })
        .finally(() => {
          cache[key][index] = result;
          resolve(cache[key][index]);
        });
    }
  });

  return promise;
}
