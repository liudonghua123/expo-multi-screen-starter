import { join } from 'path';
import url from 'url';
import { existsSync } from 'fs';
import list from './list.json';
import item from './item.json';
import itemfj from './itemfj.json';

const items = list.aaData;

export default {
  '/asjyj/findPageQbSwxszbsStr.do': (req, res) => {
    const { iDisplayLength = items.length, iDisplayStart = 0 } = req.query;
    const aaData = [...items].splice(iDisplayStart, iDisplayLength);
    const data = {
      ...list,
      aaData,
      iTotalDisplayRecords: aaData.length,
      iTotalRecords: items.length
    };
    res.json(data);
  },

  '/asjyj/findOneVQbSwxszbStr.do': (req, res) => {
    res.json(item);
  },

  '/asjyj/findVQbSwxszbfjStr.do': (req, res) => {
    res.json(itemfj);
  },

  '/FJ/*': (req, res) => {
    const path = url.parse(req.url).pathname;
    console.info(`request url ${path}`);
    const filePath = join(__dirname, path);
    if (existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendFile(join(__dirname, 'default.png'));
    }
  }
};
